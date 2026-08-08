# Claude 4.8 review handoff

This bootstrap is intentionally small. Before production deployment, final reviewer should inspect these points rather than redesigning the system:

1. Verify Claude Code CLI flags against the installed version and the user's custom `cx/gpt-5.6-sol` gateway route.
2. Verify Antigravity non-interactive permission behavior on the actual machine. Do not enable skip-permissions by default.
3. Run `npm run check` and add tests for GitManager against a temporary git repository.
4. End-to-end test one low-risk task in a disposable repository.
5. Verify Notion API writes against current workspace schemas: Work Orders, Review Submissions, Evidence & Incidents.
6. Confirm a `FIX` task retries automatically and a third attempt cannot loop forever.
7. Confirm an out-of-scope file edit is blocked before commit/merge.
8. Confirm a critical task stops at `waiting_owner`.
9. After 48 hours clean, consider enabling git branch push. Do not auto-merge to `main` yet.
10. Only after the above, expose Streamable HTTP `/mcp` through an authenticated HTTPS path for ChatGPT Work.

Do not replace the role split unless a test proves it necessary. Planner stays upstream; dispatcher executes the locked contract.
