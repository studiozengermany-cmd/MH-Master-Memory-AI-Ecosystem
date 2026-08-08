import path from 'node:path';

function intEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : fallback;
}

function boolEnv(name: string, fallback = false): boolean {
  const raw = process.env[name];
  if (raw === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase());
}

export const config = {
  host: process.env.MH_BIND_HOST || '127.0.0.1',
  port: intEnv('MH_PORT', 8787),
  controlToken: process.env.MH_CONTROL_TOKEN || '',
  dataDir: path.resolve(process.env.MH_DATA_DIR || '.mh-dispatcher'),
  maxParallel: intEnv('MH_MAX_PARALLEL', 2),
  taskTimeoutMs: intEnv('MH_TASK_TIMEOUT_MS', 45 * 60 * 1000),
  reviewTimeoutMs: intEnv('MH_REVIEW_TIMEOUT_MS', 15 * 60 * 1000),
  gitPush: boolEnv('MH_GIT_PUSH', false),
  claude: {
    command: process.env.MH_CLAUDE_COMMAND || 'claude',
    model: process.env.MH_CLAUDE_MODEL || '',
    permissionMode: process.env.MH_CLAUDE_PERMISSION_MODE || 'acceptEdits',
    maxTurns: intEnv('MH_CLAUDE_MAX_TURNS', 40),
    maxBudgetUsd: process.env.MH_CLAUDE_MAX_BUDGET_USD || '',
    allowedTools: (process.env.MH_CLAUDE_ALLOWED_TOOLS || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
  },
  antigravity: {
    command: process.env.MH_AGY_COMMAND || 'agy',
    model: process.env.MH_AGY_MODEL || '',
    skipPermissions: boolEnv('MH_AGY_SKIP_PERMISSIONS', false)
  },
  reviewer: {
    command: process.env.MH_REVIEWER_COMMAND || 'claude',
    model: process.env.MH_REVIEWER_MODEL || '',
    maxTurns: intEnv('MH_REVIEWER_MAX_TURNS', 15)
  },
  notion: {
    token: process.env.NOTION_TOKEN || '',
    version: process.env.NOTION_VERSION || '2026-03-11',
    workOrdersSourceId: process.env.NOTION_WORK_ORDERS_SOURCE_ID || 'baf3e579-4081-4aeb-b4b0-8b633febf00e',
    reviewsSourceId: process.env.NOTION_REVIEWS_SOURCE_ID || 'cafc77b3-78a3-46e9-810f-fd93a734d100',
    evidenceSourceId: process.env.NOTION_EVIDENCE_SOURCE_ID || '37910ddc-c20b-4025-9ff3-66293383739a'
  }
};
