# Windows quick start

Requirements: Node.js 22+, Git, Claude Code, Antigravity CLI. Both agent CLIs should already be signed in/configured for the Windows user running the dispatcher.

```powershell
git clone <repo-url>
cd MH-AI-DISPATCHER
Copy-Item .env.example .env
npm install
npm run check
npm run dev
```

The dispatcher defaults to `127.0.0.1:8787`. Keep it local during initial testing.

Health check:

```powershell
Invoke-RestMethod http://127.0.0.1:8787/health
```

For the user's current Claude Code setup, leave `MH_CLAUDE_MODEL` blank. Claude Code will continue reading the existing `~/.claude/settings.json`, including any configured gateway/model routing.

Do not turn on `MH_AGY_SKIP_PERMISSIONS=true` until bounded worktree tests have passed. The dispatcher already isolates code work by worktree, but skip-permissions still grants the agent broad host capabilities.
