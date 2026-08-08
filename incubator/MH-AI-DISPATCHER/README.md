# MH AI DISPATCHER

**Status:** bootstrap v0.1 — execution skeleton, not production-frozen.

One purpose: after a project plan is approved in ChatGPT Work, stop making the owner copy/paste commands between AI tools.

```text
ChatGPT Work (Planner)
       ↓ LOCKED contract
MH AI Dispatcher
       ├─ Claude Code + existing GPT route: core/high-detail tasks
       ├─ Antigravity/Gemini: bounded implementation tasks
       ├─ read-only reviewer
       ├─ isolated Git worktrees
       └─ Notion evidence/status
```

## What v0.1 already enforces

- A project cannot enter the dispatcher unless its contract says `state: "LOCKED"`.
- Every task has explicit allowed paths and acceptance criteria.
- Critical tasks stop for owner approval.
- Ops tasks stop for planner approval unless explicitly approved.
- Automatic routing uses Claude Code for high-detail/core work and Antigravity for bounded implementation work.
- Every task runs in a separate Git worktree/branch.
- File-scope violations are rejected before commit.
- Validation commands run outside the AI agent.
- Review is separate and read-only.
- `FIX` loops are bounded; retry exhaustion goes to the owner instead of looping forever.
- Passed task branches merge into a project integration branch, never directly into `main`.
- Notion reporting is optional and uses the existing AI Review League databases when a token is configured.
- MCP and REST control surfaces both use the same dispatcher core.

## Setup

```bash
cp .env.example .env
npm install
npm run check
npm run dev
```

Set a long random `MH_CONTROL_TOKEN` before using the API/MCP endpoint.

### Keep the current Claude Code + GPT routing

If Claude Code already shows a custom model route from `.claude/settings.json` (for example `cx/gpt-5.6-sol`), **leave `MH_CLAUDE_MODEL` empty**. The dispatcher launches Claude Code normally and lets that existing configuration choose the model.

### Antigravity

Antigravity's `-p` mode is used for non-interactive execution. `MH_AGY_SKIP_PERMISSIONS` is deliberately `false` by default. Turn it on only after disposable-worktree tests, because the corresponding CLI flag auto-approves all tool permissions.

## Control API

- `GET /health`
- `POST /api/projects` — store a LOCKED contract
- `POST /api/projects/:id/start`
- `GET /api/projects/:id`
- `POST /api/projects/:id/pause`
- `POST /api/projects/:id/resume`
- `POST /api/projects/:id/tasks/:taskId/resolve`
- `POST /mcp` — stateless Streamable HTTP MCP

All except `/health` require:

```text
Authorization: Bearer <MH_CONTROL_TOKEN>
```

## MCP tools

- `start_locked_project`
- `project_status`
- `list_projects`
- `pause_project`
- `resume_project`
- `resolve_task`

`start_locked_project` takes the complete contract as JSON text. This keeps the planner's approved blueprint intact as one signed-off object rather than rebuilding it field-by-field across tools.

## Notion

When `NOTION_TOKEN` is present, the dispatcher reports into the existing:

- `02 — WORK ORDERS`
- `03 — REVIEW SUBMISSIONS`
- `04 — EVIDENCE & INCIDENTS`

No token means Notion reporting is disabled; execution still works.

## First acceptance test

Do **not** start with a real product. Point `examples/project.contract.json` at a disposable git repository and use one low-risk UI/docs task. Confirm:

1. a worktree is created;
2. the chosen executor changes only allowed files;
3. validation runs;
4. reviewer returns PASS/FIX/ESCALATE;
5. PASS merges only to `mh/<project>/integration`;
6. Notion receives status/evidence if enabled.

Then test a deliberate forbidden-path edit and a critical task. Both must stop correctly.

See `docs/ARCHITECTURE.md`, `docs/CLAUDE-4.8-HANDOFF.md`, and platform deployment notes before production use.
