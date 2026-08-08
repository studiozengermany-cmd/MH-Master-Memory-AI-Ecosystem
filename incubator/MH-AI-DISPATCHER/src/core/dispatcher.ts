import path from 'node:path';
import fs from 'node:fs/promises';
import { ProjectContractSchema, type ProjectContract, type ProjectRuntime, type ProjectTask, type TaskRuntime } from '../types.js';
import { FileStore } from '../store/fileStore.js';
import { GitManager } from '../git/gitManager.js';
import { routeTask } from './router.js';
import { dependenciesSatisfied, validateChangedPaths } from './guards.js';
import { runClaudeExecutor } from '../engines/claudeCode.js';
import { runAntigravityExecutor } from '../engines/antigravity.js';
import { runReviewer } from '../engines/reviewer.js';
import { runShell } from '../utils/process.js';
import { NotionReporter } from '../integrations/notion.js';
import { config } from '../config.js';
import { log } from '../utils/log.js';

export class Dispatcher {
  private readonly git: GitManager;
  private readonly notion = new NotionReporter();
  private readonly active = new Set<string>();
  private timer?: NodeJS.Timeout;

  constructor(public readonly store: FileStore) {
    this.git = new GitManager(store.worktreeRoot);
  }

  async init(): Promise<void> {
    await this.store.init();
    await this.recoverInterruptedTasks();
    this.timer = setInterval(() => void this.tick(), 1_000);
    this.timer.unref();
  }

  async close(): Promise<void> {
    if (this.timer) clearInterval(this.timer);
  }

  private async recoverInterruptedTasks(): Promise<void> {
    for (const project of await this.store.list()) {
      let changed = false;
      for (const task of Object.values(project.tasks)) {
        if (task.status === 'running' || task.status === 'reviewing') {
          task.status = 'rework';
          task.error = 'Dispatcher restarted while this task was active; task queued for a clean retry.';
          changed = true;
        }
      }
      if (changed) await this.store.save(project);
    }
  }

  async createLockedProject(input: unknown): Promise<ProjectRuntime> {
    const contract = ProjectContractSchema.parse(input);
    if (await this.store.exists(contract.projectId)) throw new Error(`Project ${contract.projectId} already exists`);
    await this.git.verifyRepo(path.resolve(contract.repoPath));
    const integration = await this.git.ensureIntegration(contract.projectId, path.resolve(contract.repoPath), contract.baseBranch);
    const now = new Date().toISOString();
    const tasks: Record<string, TaskRuntime> = {};
    for (const task of contract.tasks) tasks[task.id] = { taskId: task.id, status: 'pending', attempt: 0 };
    const runtime: ProjectRuntime = {
      contract: { ...contract, repoPath: path.resolve(contract.repoPath) },
      status: 'locked',
      integrationBranch: integration.branch,
      integrationWorktree: integration.worktree,
      tasks,
      createdAt: now,
      updatedAt: now
    };
    await this.store.save(runtime);
    await this.store.event('project.created', { projectId: contract.projectId, tasks: contract.tasks.length });
    return runtime;
  }

  async startProject(projectId: string): Promise<ProjectRuntime> {
    const runtime = await this.store.get(projectId);
    if (runtime.status === 'completed') return runtime;
    runtime.status = 'running';
    await this.store.save(runtime);
    await this.store.event('project.started', { projectId });
    void this.tick();
    return runtime;
  }

  async pauseProject(projectId: string): Promise<ProjectRuntime> {
    const runtime = await this.store.get(projectId);
    runtime.status = 'paused';
    await this.store.save(runtime);
    await this.store.event('project.paused', { projectId });
    return runtime;
  }

  async resumeProject(projectId: string): Promise<ProjectRuntime> {
    return await this.startProject(projectId);
  }

  async resolveTask(projectId: string, taskId: string, action: 'retry' | 'owner_approve' | 'skip', note = ''): Promise<ProjectRuntime> {
    const runtime = await this.store.get(projectId);
    const task = runtime.tasks[taskId];
    if (!task) throw new Error(`Unknown task ${taskId}`);
    const contractTask = runtime.contract.tasks.find((value) => value.id === taskId)!;
    if (action === 'owner_approve') contractTask.ownerApproved = true;
    if (action === 'skip') {
      task.status = 'passed';
      task.finishedAt = new Date().toISOString();
      task.error = `Skipped by planner/owner. ${note}`.trim();
    } else {
      task.status = 'rework';
      task.decisionRequest = undefined;
      task.error = note || undefined;
    }
    if (runtime.status !== 'paused') runtime.status = 'running';
    await this.store.save(runtime);
    await this.store.event('task.resolved', { projectId, taskId, action, note });
    return runtime;
  }

  async getProject(projectId: string): Promise<ProjectRuntime> {
    return await this.store.get(projectId);
  }

  async listProjects(): Promise<ProjectRuntime[]> {
    return await this.store.list();
  }

  private async tick(): Promise<void> {
    const projects = await this.store.list();
    for (const runtime of projects) {
      if (runtime.status !== 'running') continue;
      const projectId = runtime.contract.projectId;
      const runningCount = Object.values(runtime.tasks).filter((task) => ['running', 'reviewing'].includes(task.status)).length;
      const maxParallel = Math.min(runtime.contract.maxParallel, config.maxParallel);
      let slots = Math.max(0, maxParallel - runningCount);
      if (slots === 0) continue;

      const passed = new Set(Object.values(runtime.tasks).filter((task) => task.status === 'passed').map((task) => task.taskId));
      for (const contractTask of runtime.contract.tasks) {
        if (slots <= 0) break;
        const task = runtime.tasks[contractTask.id]!;
        if (!['pending', 'rework'].includes(task.status)) continue;
        if (this.active.has(`${projectId}:${task.taskId}`)) continue;
        if (!dependenciesSatisfied(runtime.contract, task.taskId, passed)) continue;
        slots -= 1;
        this.active.add(`${projectId}:${task.taskId}`);
        void this.executeTask(projectId, task.taskId).finally(() => this.active.delete(`${projectId}:${task.taskId}`));
      }

      const statuses = Object.values(runtime.tasks).map((task) => task.status);
      if (statuses.length > 0 && statuses.every((status) => status === 'passed')) {
        runtime.status = 'completed';
        await this.store.save(runtime);
        await this.store.event('project.completed', { projectId });
        if (config.gitPush) await this.git.pushBranch(runtime.contract.repoPath, runtime.integrationBranch).catch((error) => {
          log('warn', 'project.integration.push_failed', { projectId, error: String(error) });
        });
      } else if (statuses.some((status) => status === 'waiting_owner')) {
        runtime.status = 'blocked';
        await this.store.save(runtime);
      }
    }
  }

  private async executeTask(projectId: string, taskId: string): Promise<void> {
    let runtime = await this.store.get(projectId);
    const contractTask = runtime.contract.tasks.find((value) => value.id === taskId);
    if (!contractTask) return;
    let task = runtime.tasks[taskId]!;

    const route = routeTask(contractTask);
    if (route.gate) {
      task.status = route.gate === 'owner' ? 'waiting_owner' : 'waiting_planner';
      task.decisionRequest = route.reason;
      task.error = route.reason;
      await this.store.save(runtime);
      await this.notion.updateWorkOrder(task.notionPageId, task);
      await this.store.event('task.gated', { projectId, taskId, gate: route.gate, reason: route.reason });
      return;
    }

    task.attempt += 1;
    if (task.attempt > runtime.contract.maxAttemptsPerTask) {
      task.status = 'waiting_owner';
      task.decisionRequest = `Task exceeded ${runtime.contract.maxAttemptsPerTask} automatic attempts.`;
      await this.store.save(runtime);
      await this.notion.updateWorkOrder(task.notionPageId, task);
      return;
    }

    task.status = 'running';
    task.engine = route.engine;
    task.startedAt = new Date().toISOString();
    task.error = undefined;
    await this.store.save(runtime);

    if (!task.notionPageId) {
      task.notionPageId = await this.notion.createWorkOrder(runtime.contract, contractTask, task);
      await this.store.save(runtime);
    } else {
      await this.notion.updateWorkOrder(task.notionPageId, task);
    }

    try {
      const work = await this.git.createTaskWorktree(
        projectId,
        taskId,
        task.attempt,
        runtime.contract.repoPath,
        runtime.integrationBranch
      );
      task.branch = work.branch;
      task.worktreePath = work.worktree;
      await this.store.save(runtime);
      await this.store.event('task.started', { projectId, taskId, engine: task.engine, attempt: task.attempt, branch: task.branch });

      const retryFeedback = task.attempt > 1 ? (task.error || task.lastReview?.requiredFixes.join('; ') || '') : '';
      const agentResult = task.engine === 'antigravity'
        ? await runAntigravityExecutor(runtime.contract, contractTask, work.worktree, retryFeedback)
        : await runClaudeExecutor(runtime.contract, contractTask, work.worktree, retryFeedback);
      task.lastAgentResult = agentResult;

      if (agentResult.status === 'blocked') {
        task.status = 'waiting_planner';
        task.decisionRequest = agentResult.decisionRequest || agentResult.summary;
        task.error = agentResult.summary;
        await this.store.save(runtime);
        await this.notion.updateWorkOrder(task.notionPageId, task);
        await this.notion.evidence(runtime.contract, contractTask, task, task.error, 'Incident', 'Medium');
        return;
      }
      if (agentResult.status === 'failed') throw new Error(agentResult.summary);

      const changedFiles = await this.git.changedFiles(work.worktree);
      const pathGuard = validateChangedPaths(runtime.contract, contractTask, changedFiles);
      if (!pathGuard.ok) {
        task.status = 'waiting_planner';
        task.decisionRequest = `Executor changed files outside the locked task scope: ${pathGuard.violations.join('; ')}`;
        task.error = task.decisionRequest;
        await this.store.save(runtime);
        await this.notion.updateWorkOrder(task.notionPageId, task);
        await this.notion.evidence(runtime.contract, contractTask, task, task.error, 'Incident', 'High');
        return;
      }

      const commands = [...runtime.contract.validationCommands, ...contractTask.validationCommands];
      task.validation = [];
      for (const command of commands) {
        const evidence = await runShell(command, work.worktree, Math.min(config.taskTimeoutMs, 15 * 60 * 1000));
        task.validation.push(evidence);
        if (evidence.exitCode !== 0) break;
      }
      const validationFailed = task.validation.some((item) => item.exitCode !== 0);
      if (validationFailed) {
        task.status = task.attempt >= runtime.contract.maxAttemptsPerTask ? 'waiting_owner' : 'rework';
        task.error = 'Independent validation failed.';
        task.decisionRequest = task.status === 'waiting_owner' ? 'Validation still fails after the automatic retry limit.' : undefined;
        await this.store.save(runtime);
        await this.notion.updateWorkOrder(task.notionPageId, task);
        await this.notion.evidence(runtime.contract, contractTask, task, task.error, 'Incident', 'High');
        return;
      }

      task.status = 'reviewing';
      await this.store.save(runtime);
      await this.notion.updateWorkOrder(task.notionPageId, task);
      const review = await runReviewer(runtime.contract, contractTask, work.worktree, task.validation, changedFiles);
      task.lastReview = review;
      await this.notion.createReview(runtime.contract, contractTask, task, review);

      if (review.verdict === 'ESCALATE') {
        task.status = 'waiting_planner';
        task.decisionRequest = review.decisionRequest || review.summary;
        task.error = review.summary;
        await this.store.save(runtime);
        await this.notion.updateWorkOrder(task.notionPageId, task);
        return;
      }

      if (review.verdict === 'FIX') {
        task.status = task.attempt >= runtime.contract.maxAttemptsPerTask ? 'waiting_owner' : 'rework';
        task.error = review.requiredFixes.join('; ') || review.summary;
        task.decisionRequest = task.status === 'waiting_owner' ? `Automatic retry limit reached. Last review: ${task.error}` : undefined;
        await this.store.save(runtime);
        await this.notion.updateWorkOrder(task.notionPageId, task);
        await this.notion.evidence(runtime.contract, contractTask, task, task.error, 'Incident', 'Medium');
        return;
      }

      task.commitSha = await this.git.commitAll(work.worktree, `feat(${taskId}): ${contractTask.title}`);
      const merged = await this.git.mergeIntoIntegration(runtime.integrationWorktree!, work.branch);
      if (!merged.ok) {
        task.status = 'waiting_planner';
        task.error = `Integration merge conflict: ${merged.error}`;
        task.decisionRequest = 'Resolve integration conflict or change task ordering.';
        await this.store.save(runtime);
        await this.notion.updateWorkOrder(task.notionPageId, task);
        await this.notion.evidence(runtime.contract, contractTask, task, task.error, 'Incident', 'High');
        return;
      }

      if (config.gitPush) await this.git.pushBranch(runtime.contract.repoPath, work.branch);
      task.status = 'passed';
      task.finishedAt = new Date().toISOString();
      await this.store.save(runtime);
      await this.notion.updateWorkOrder(task.notionPageId, task);
      await this.notion.evidence(runtime.contract, contractTask, task, `PASS: ${review.summary}`, 'Evidence', 'Positive');
      await this.store.event('task.passed', { projectId, taskId, commitSha: task.commitSha, branch: task.branch });
    } catch (error) {
      runtime = await this.store.get(projectId);
      task = runtime.tasks[taskId]!;
      task.status = task.attempt >= runtime.contract.maxAttemptsPerTask ? 'waiting_owner' : 'rework';
      task.error = String(error);
      task.decisionRequest = task.status === 'waiting_owner' ? `Execution failed after ${task.attempt} attempts: ${task.error}` : undefined;
      await this.store.save(runtime);
      await this.notion.updateWorkOrder(task.notionPageId, task);
      const currentTask = runtime.contract.tasks.find((value) => value.id === taskId)!;
      await this.notion.evidence(runtime.contract, currentTask, task, task.error, 'Incident', 'High');
      await this.store.event('task.failed_attempt', { projectId, taskId, attempt: task.attempt, error: task.error });
      log('error', 'task.execution.failed', { projectId, taskId, error: task.error });
    }
  }
}
