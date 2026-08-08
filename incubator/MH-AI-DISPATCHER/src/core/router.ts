import type { Engine, ProjectTask } from '../types.js';

export interface RouteDecision {
  engine?: Exclude<Engine, 'auto'>;
  gate?: 'planner' | 'owner';
  reason: string;
}

const CLAUDE_KINDS = new Set(['architecture', 'backend', 'refactor', 'bugfix', 'infra', 'database', 'auth', 'security']);
const AGY_KINDS = new Set(['frontend', 'test', 'docs']);

export function routeTask(task: ProjectTask): RouteDecision {
  if (task.risk === 'critical' && !task.ownerApproved) {
    return { gate: 'owner', reason: 'Critical-risk task requires explicit owner approval before execution.' };
  }

  if (task.preferredEngine !== 'auto') {
    return { engine: task.preferredEngine, reason: `Planner explicitly selected ${task.preferredEngine}.` };
  }

  if (task.kind === 'ops' && !task.ownerApproved) {
    return { gate: 'planner', reason: 'Operations task is kept outside automatic execution until planner/owner approves it.' };
  }

  if (task.risk === 'high' || CLAUDE_KINDS.has(task.kind)) {
    return { engine: 'claude-code-gpt', reason: 'High-detail/core task routed to Claude Code harness + configured GPT route.' };
  }

  if (task.risk === 'low' || AGY_KINDS.has(task.kind)) {
    return { engine: 'antigravity', reason: 'Clear bounded implementation task routed to Antigravity.' };
  }

  return { engine: 'claude-code-gpt', reason: 'Medium-risk default uses the senior execution engine.' };
}
