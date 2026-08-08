import fs from 'node:fs/promises';
import path from 'node:path';
import { runProcess } from '../utils/process.js';

function safeSegment(value: string): string {
  return value.replace(/[^A-Za-z0-9._-]/g, '-');
}

export class GitManager {
  constructor(private readonly worktreeRoot: string, private readonly timeoutMs = 120_000) {}

  private async git(cwd: string, args: string[]) {
    const result = await runProcess('git', args, { cwd, timeoutMs: this.timeoutMs });
    if (result.exitCode !== 0) throw new Error(`git ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
    return result;
  }

  async verifyRepo(repoPath: string): Promise<void> {
    const result = await this.git(repoPath, ['rev-parse', '--is-inside-work-tree']);
    if (result.stdout.trim() !== 'true') throw new Error(`${repoPath} is not a git repository`);
  }

  async ensureIntegration(projectId: string, repoPath: string, baseBranch: string): Promise<{ branch: string; worktree: string }> {
    const branch = `mh/${safeSegment(projectId)}/integration`;
    const root = path.join(this.worktreeRoot, safeSegment(projectId));
    const worktree = path.join(root, 'integration');
    await fs.mkdir(root, { recursive: true });

    const branchCheck = await runProcess('git', ['show-ref', '--verify', '--quiet', `refs/heads/${branch}`], { cwd: repoPath, timeoutMs: this.timeoutMs });
    const worktreeExists = await fs.access(path.join(worktree, '.git')).then(() => true).catch(() => false);
    if (!worktreeExists) {
      if (branchCheck.exitCode === 0) await this.git(repoPath, ['worktree', 'add', worktree, branch]);
      else await this.git(repoPath, ['worktree', 'add', '-b', branch, worktree, baseBranch]);
    }
    return { branch, worktree };
  }

  async createTaskWorktree(projectId: string, taskId: string, attempt: number, repoPath: string, integrationBranch: string): Promise<{ branch: string; worktree: string }> {
    const root = path.join(this.worktreeRoot, safeSegment(projectId));
    const branch = `mh/${safeSegment(projectId)}/${safeSegment(taskId)}-a${attempt}`;
    const worktree = path.join(root, `${safeSegment(taskId)}-a${attempt}`);
    await this.git(repoPath, ['worktree', 'remove', '--force', worktree]).catch(() => undefined);
    await fs.rm(worktree, { recursive: true, force: true });
    await this.git(repoPath, ['worktree', 'prune']).catch(() => undefined);
    await this.git(repoPath, ['branch', '-D', branch]).catch(() => undefined);
    await this.git(repoPath, ['worktree', 'add', '-b', branch, worktree, integrationBranch]);
    return { branch, worktree };
  }

  async changedFiles(worktree: string): Promise<string[]> {
    const tracked = await this.git(worktree, ['diff', '--name-only']);
    const staged = await this.git(worktree, ['diff', '--name-only', '--cached']);
    const untracked = await this.git(worktree, ['ls-files', '--others', '--exclude-standard']);
    return [...new Set(`${tracked.stdout}\n${staged.stdout}\n${untracked.stdout}`
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean))];
  }

  async commitAll(worktree: string, message: string): Promise<string> {
    await this.git(worktree, ['add', '-A']);
    const staged = await runProcess('git', ['diff', '--cached', '--quiet'], { cwd: worktree, timeoutMs: this.timeoutMs });
    if (staged.exitCode === 0) return (await this.git(worktree, ['rev-parse', 'HEAD'])).stdout.trim();
    await this.git(worktree, ['commit', '-m', message]);
    return (await this.git(worktree, ['rev-parse', 'HEAD'])).stdout.trim();
  }

  async mergeIntoIntegration(integrationWorktree: string, branch: string): Promise<{ ok: boolean; error?: string }> {
    const result = await runProcess('git', ['merge', '--no-ff', '--no-edit', branch], { cwd: integrationWorktree, timeoutMs: this.timeoutMs });
    if (result.exitCode === 0) return { ok: true };
    await runProcess('git', ['merge', '--abort'], { cwd: integrationWorktree, timeoutMs: this.timeoutMs });
    return { ok: false, error: result.stderr || result.stdout };
  }

  async pushBranch(repoPath: string, branch: string): Promise<void> {
    await this.git(repoPath, ['push', '-u', 'origin', branch]);
  }
}
