import { z } from 'zod';

export const EngineSchema = z.enum(['auto', 'claude-code-gpt', 'antigravity']);
export type Engine = z.infer<typeof EngineSchema>;

export const RiskSchema = z.enum(['low', 'medium', 'high', 'critical']);
export type Risk = z.infer<typeof RiskSchema>;

export const TaskKindSchema = z.enum([
  'architecture',
  'backend',
  'frontend',
  'test',
  'docs',
  'refactor',
  'bugfix',
  'infra',
  'database',
  'auth',
  'security',
  'ops'
]);
export type TaskKind = z.infer<typeof TaskKindSchema>;

export const TaskStatusSchema = z.enum([
  'pending',
  'blocked',
  'running',
  'reviewing',
  'rework',
  'passed',
  'failed',
  'waiting_planner',
  'waiting_owner'
]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>;

export const ProjectStatusSchema = z.enum([
  'locked',
  'running',
  'paused',
  'completed',
  'blocked',
  'failed'
]);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ProjectTaskSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9._-]+$/),
  title: z.string().min(3),
  objective: z.string().min(3),
  kind: TaskKindSchema,
  risk: RiskSchema.default('medium'),
  preferredEngine: EngineSchema.default('auto'),
  allowedPaths: z.array(z.string().min(1)).min(1),
  forbiddenPaths: z.array(z.string().min(1)).default([]),
  acceptance: z.array(z.string().min(1)).min(1),
  validationCommands: z.array(z.string().min(1)).default([]),
  dependsOn: z.array(z.string().min(1)).default([]),
  ownerApproved: z.boolean().default(false),
  estimatedMinutes: z.number().int().positive().optional()
});
export type ProjectTask = z.infer<typeof ProjectTaskSchema>;

export const ProjectContractSchema = z.object({
  projectId: z.string().regex(/^[A-Za-z0-9._-]+$/),
  name: z.string().min(3),
  repoPath: z.string().min(1),
  baseBranch: z.string().min(1).default('main'),
  planner: z.string().default('ChatGPT Work'),
  state: z.literal('LOCKED'),
  goal: z.string().min(3),
  locked: z.array(z.string().min(1)).min(1),
  flexible: z.array(z.string().min(1)).default([]),
  escalate: z.array(z.string().min(1)).default([]),
  globalForbiddenPaths: z.array(z.string().min(1)).default([
    '.git/**', '.env', '.env.*', '**/*.pem', '**/*.key', '**/credentials*', '**/secrets*'
  ]),
  validationCommands: z.array(z.string().min(1)).default([]),
  maxParallel: z.number().int().min(1).max(8).default(2),
  maxAttemptsPerTask: z.number().int().min(1).max(5).default(2),
  tasks: z.array(ProjectTaskSchema).min(1)
}).superRefine((contract, ctx) => {
  const ids = new Set(contract.tasks.map((task) => task.id));
  if (ids.size !== contract.tasks.length) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Task IDs must be unique', path: ['tasks'] });
  }
  for (const task of contract.tasks) {
    for (const dependency of task.dependsOn) {
      if (!ids.has(dependency)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Task ${task.id} depends on unknown task ${dependency}`,
          path: ['tasks']
        });
      }
      if (dependency === task.id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Task ${task.id} cannot depend on itself`,
          path: ['tasks']
        });
      }
    }
  }
});
export type ProjectContract = z.infer<typeof ProjectContractSchema>;

export const AgentResultSchema = z.object({
  status: z.enum(['done', 'blocked', 'failed']),
  summary: z.string(),
  decisionRequest: z.string().optional(),
  notes: z.array(z.string()).default([])
});
export type AgentResult = z.infer<typeof AgentResultSchema>;

export const ReviewResultSchema = z.object({
  verdict: z.enum(['PASS', 'FIX', 'ESCALATE']),
  summary: z.string(),
  verifiedStrengths: z.array(z.string()).default([]),
  verifiedErrors: z.array(z.string()).default([]),
  requiredFixes: z.array(z.string()).default([]),
  decisionRequest: z.string().optional(),
  confidence: z.number().min(0).max(1)
});
export type ReviewResult = z.infer<typeof ReviewResultSchema>;

export interface CommandEvidence {
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

export interface TaskRuntime {
  taskId: string;
  status: TaskStatus;
  attempt: number;
  engine?: Exclude<Engine, 'auto'>;
  branch?: string;
  worktreePath?: string;
  commitSha?: string;
  notionPageId?: string;
  lastAgentResult?: AgentResult;
  lastReview?: ReviewResult;
  validation?: CommandEvidence[];
  decisionRequest?: string;
  startedAt?: string;
  finishedAt?: string;
  error?: string;
}

export interface ProjectRuntime {
  contract: ProjectContract;
  status: ProjectStatus;
  integrationBranch: string;
  integrationWorktree?: string;
  tasks: Record<string, TaskRuntime>;
  createdAt: string;
  updatedAt: string;
}
