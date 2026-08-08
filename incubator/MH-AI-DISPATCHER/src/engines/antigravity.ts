import { AgentResultSchema, type AgentResult, type ProjectContract, type ProjectTask } from '../types.js';
import { executorPrompt } from '../core/prompts.js';
import { extractJsonObject } from '../utils/json.js';
import { runProcess } from '../utils/process.js';
import { config } from '../config.js';

export async function runAntigravityExecutor(contract: ProjectContract, task: ProjectTask, cwd: string, retryFeedback = ''): Promise<AgentResult> {
  const prompt = `${executorPrompt(contract, task, 'Antigravity / Gemini executor', retryFeedback)}

FINAL RESPONSE FORMAT: return ONLY one JSON object with exactly these keys:
{"status":"done|blocked|failed","summary":"...","decisionRequest":"optional...","notes":["..."]}`;
  const args: string[] = [];
  if (config.antigravity.model) args.push('--model', config.antigravity.model);
  if (config.antigravity.skipPermissions) args.push('--dangerously-skip-permissions');
  args.push('-p', prompt);

  const result = await runProcess(config.antigravity.command, args, { cwd, timeoutMs: config.taskTimeoutMs });
  if (result.exitCode !== 0) {
    return {
      status: 'failed',
      summary: `Antigravity exited ${result.exitCode}: ${result.stderr || result.stdout}`,
      notes: []
    };
  }
  try {
    return AgentResultSchema.parse(extractJsonObject(result.stdout));
  } catch {
    // The dispatcher still validates paths, runs commands, and reviews the diff. A useful fallback
    // avoids discarding completed implementation solely because a CLI decorated its final answer.
    return {
      status: 'done',
      summary: result.stdout.trim().slice(-4000) || 'Antigravity finished without a parseable final summary.',
      notes: ['Final AGY response was not strict JSON; independent validation/review remains mandatory.']
    };
  }
}
