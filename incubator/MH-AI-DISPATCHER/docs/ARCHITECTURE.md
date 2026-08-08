# MH AI Dispatcher — Architecture v0.1

## One front door

The owner discusses and locks the project plan in ChatGPT Work. The dispatcher is not another planner. It is the gearbox that turns the locked plan into execution.

```text
Owner
  ↓
ChatGPT Work — Planner / Director
  ↓  LOCKED PROJECT CONTRACT
MH AI Dispatcher
  ├─ Claude Code harness + configured GPT route → core/high-detail work
  ├─ Antigravity / Gemini → bounded implementation work
  ├─ Reviewer → read-only diff/acceptance review
  ├─ Git worktrees → isolated parallel execution
  └─ Notion → Work Orders / Reviews / Evidence / Incidents
```

## Core law

```text
PLAN != EXECUTE
EXECUTE != REVIEW
REVIEW != OWNER DECISION
```

Executors cannot rewrite the planner's blueprint. Every task has `allowedPaths`, `forbiddenPaths`, acceptance criteria, and an escalation boundary. The dispatcher independently validates changed paths and runs planner-provided validation commands before review.

## Routing

- Critical risk: owner gate before execution.
- Operations without explicit approval: planner gate.
- Architecture/backend/refactor/bugfix/infra/database/auth/security or high risk: Claude Code harness + existing configured model route.
- Frontend/test/docs or low risk: Antigravity.
- Explicit `preferredEngine` from the planner overrides automatic routing after safety gates.

## Parallelism

Each task gets a dedicated git worktree and branch. Passed work is merged into a project integration branch. Dependent tasks start only after dependencies pass. Merge conflicts are escalated rather than guessed through.

## Failure loop

Executor → path guard → validation commands → reviewer.

- `PASS`: commit + merge to integration branch.
- `FIX`: retry same task, bounded by `maxAttemptsPerTask`.
- `ESCALATE`: return to planner.
- Retry limit exceeded: return to owner.

This prevents an infinite agent ping-pong loop.
