import { ReviewResultSchema, type CommandEvidence, type ProjectContract, type ProjectTask, type ReviewResult } from '../types.js';
import { reviewerPrompt } from '../core/prompts.js';
import { extractJsonObject } from '../utils/json.js';
import { runProcess } from '../utils/process.js';
import { config } from '../config.js';

const REVIEW_SCHEMA = JSON.stringify({
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'FIX', 'ESCALATE'] },
    summary: { type: 'string' },
    verifiedStrengths: { type: 'array', items: { type: 'string' } },
    verifiedErrors: { type: 'array', items: { type: 'string' } },
    requiredFixes: { type: 'array', items: { type: 'string' } },
    decisionRequest: { type: 'string' },
    confidence: { type: 'number', minimum: 0, maximum: 1 }
  },
  required: ['verdict', 'summary', 'verifiedStrengths', 'verifiedErrors', 'requiredFixes', 'confidence'],
  additionalProperties: false
});

export async function runReviewer(
  contract: ProjectContract,
  task: ProjectTask,
  cwd: string,
  validation: CommandEvidence[],
  changedFiles: string[]
): Promise<ReviewResult> {
  const args = [
    '-p',
    '--output-format', 'json',
    '--json-schema', REVIEW_SCHEMA,
    '--max-turns', String(config.reviewer.maxTurns),
    '--permission-mode', 'plan',
    '--no-session-persistence',
    '--tools', 'Read,Glob,Grep,Bash',
    '--allowedTools', 'Read',
    '--allowedTools', 'Glob',
    '--allowedTools', 'Grep',
    '--allowedTools', 'Bash(git status *)',
    '--allowedTools', 'Bash(git diff *)',
    '--allowedTools', 'Bash(git log *)'
  ];
  if (config.reviewer.model) args.push('--model', config.reviewer.model);
  args.push(reviewerPrompt(contract, task, validation, changedFiles));

  const result = await runProcess(config.reviewer.command, args, { cwd, timeoutMs: config.reviewTimeoutMs });
  if (result.exitCode !== 0) {
    return {
      verdict: 'ESCALATE',
      summary: `Reviewer failed with exit ${result.exitCode}`,
      verifiedStrengths: [],
      verifiedErrors: [result.stderr || result.stdout],
      requiredFixes: [],
      decisionRequest: 'Reviewer execution failed; inspect runner configuration before accepting this task.',
      confidence: 0
    };
  }
  try {
    const outer = extractJsonObject(result.stdout) as Record<string, unknown>;
    return ReviewResultSchema.parse(outer.structured_output ?? outer.structuredOutput ?? outer);
  } catch (error) {
    return {
      verdict: 'ESCALATE',
      summary: `Reviewer output could not be parsed: ${String(error)}`,
      verifiedStrengths: [],
      verifiedErrors: [result.stdout.slice(-4000)],
      requiredFixes: [],
      decisionRequest: 'Reviewer result was not machine-readable.',
      confidence: 0
    };
  }
}
