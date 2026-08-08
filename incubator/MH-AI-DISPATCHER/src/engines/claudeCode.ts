import { AgentResultSchema, type AgentResult, type ProjectContract, type ProjectTask } from '../types.js';
import { executorPrompt } from '../core/prompts.js';
import { extractJsonObject } from '../utils/json.js';
import { runProcess } from '../utils/process.js';
import { config } from '../config.js';

const AGENT_RESULT_JSON_SCHEMA = JSON.stringify({
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['done', 'blocked', 'failed'] },
    summary: { type: 'string' },
    decisionRequest: { type: 'string' },
    notes: { type: 'array', items: { type: 'string' } }
  },
  required: ['status', 'summary', 'notes'],
  additionalProperties: false
});

function parseClaudeJson(stdout: string): AgentResult {
  const outer = extractJsonObject(stdout) as Record<string, unknown>;
  const candidate = outer.structured_output ?? outer.structuredOutput ?? outer;
  return AgentResultSchema.parse(candidate);
}

export async function runClaudeExecutor(contract: ProjectContract, task: ProjectTask, cwd: string, retryFeedback = ''): Promise<AgentResult> {
  const args = [
    '-p',
    '--output-format', 'json',
    '--json-schema', AGENT_RESULT_JSON_SCHEMA,
    '--max-turns', String(config.claude.maxTurns),
    '--permission-mode', config.claude.permissionMode,
    '--no-session-persistence'
  ];
  if (config.claude.model) args.push('--model', config.claude.model);
  if (config.claude.maxBudgetUsd) args.push('--max-budget-usd', config.claude.maxBudgetUsd);
  for (const tool of config.claude.allowedTools) args.push('--allowedTools', tool);
  args.push(executorPrompt(contract, task, 'Claude Code harness + configured GPT route', retryFeedback));

  const result = await runProcess(config.claude.command, args, { cwd, timeoutMs: config.taskTimeoutMs });
  if (result.exitCode !== 0) {
    return {
      status: 'failed',
      summary: `Claude Code exited ${result.exitCode}: ${result.stderr || result.stdout}`,
      notes: []
    };
  }
  try {
    return parseClaudeJson(result.stdout);
  } catch (error) {
    return {
      status: 'failed',
      summary: `Claude Code returned unparseable structured output: ${String(error)}. Raw: ${result.stdout.slice(-4000)}`,
      notes: []
    };
  }
}
