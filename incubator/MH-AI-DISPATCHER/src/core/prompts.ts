import type { ProjectContract, ProjectTask, CommandEvidence } from '../types.js';

function bullets(values: string[]): string {
  return values.length ? values.map((value) => `- ${value}`).join('\n') : '- none';
}

export function executorPrompt(contract: ProjectContract, task: ProjectTask, engineName: string, retryFeedback = ''): string {
  return `You are an EXECUTOR inside MINH HIEU STUDIO's locked-plan workflow.
You are NOT the planner and you must not redesign the project.

PROJECT: ${contract.name} (${contract.projectId})
GOAL: ${contract.goal}
PLANNER: ${contract.planner}
ENGINE SLOT: ${engineName}

LOCKED PROJECT DECISIONS (must remain true):
${bullets(contract.locked)}

FLEXIBLE AREA (you may choose implementation details only here):
${bullets(contract.flexible)}

ESCALATE INSTEAD OF DECIDING:
${bullets(contract.escalate)}

TASK ${task.id}: ${task.title}
OBJECTIVE: ${task.objective}
KIND: ${task.kind}
RISK: ${task.risk}

ALLOWED PATHS:
${bullets(task.allowedPaths)}

FORBIDDEN PATHS:
${bullets([...contract.globalForbiddenPaths, ...task.forbiddenPaths])}

ACCEPTANCE CRITERIA:
${bullets(task.acceptance)}

PREVIOUS ATTEMPT / REVIEW FEEDBACK:
${retryFeedback ? retryFeedback : '- none; this is the first attempt'}

RULES:
1. Work only inside the current git worktree.
2. Do not push, deploy, change git remotes, rotate credentials, or change billing/security policy.
3. Do not change files outside ALLOWED PATHS.
4. Do not reinterpret LOCKED decisions.
5. If completion requires a forbidden path, an ESCALATE decision, or a new architecture decision, STOP and return status=blocked with a precise decision request.
6. Do the implementation completely within scope. Do not leave fake TODOs or claim tests passed unless they actually ran.
7. The dispatcher will independently run validation commands and a separate review after you finish.

At the end, return a concise machine-readable result. Do not ask the owner routine questions.`;
}

export function reviewerPrompt(
  contract: ProjectContract,
  task: ProjectTask,
  validation: CommandEvidence[],
  changedFiles: string[]
): string {
  const validationSummary = validation.map((item) => `${item.exitCode === 0 ? 'PASS' : 'FAIL'}: ${item.command}`).join('\n') || 'No validation commands configured.';
  return `You are the independent REVIEWER. Read-only review only. Do not edit files.
Review the current worktree against the locked plan and task acceptance criteria.

PROJECT GOAL: ${contract.goal}
LOCKED DECISIONS:
${bullets(contract.locked)}
ESCALATE DECISIONS:
${bullets(contract.escalate)}

TASK ${task.id}: ${task.title}
OBJECTIVE: ${task.objective}
ACCEPTANCE:
${bullets(task.acceptance)}
ALLOWED PATHS:
${bullets(task.allowedPaths)}
CHANGED FILES:
${bullets(changedFiles)}
VALIDATION RESULTS:
${validationSummary}

Inspect git diff and relevant files. Verdict rules:
- PASS only when the implementation stays in scope, acceptance is met, and validations support it.
- FIX for concrete implementation defects that the same executor can repair without changing the plan.
- ESCALATE when fixing requires changing locked architecture/scope or an owner/planner decision.
Return only the structured review result required by the CLI schema.`;
}
