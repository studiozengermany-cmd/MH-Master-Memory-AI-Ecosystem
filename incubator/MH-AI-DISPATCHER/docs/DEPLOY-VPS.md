# VPS deployment (no Docker)

Use this only after local validation. Install Node 22+, Git, Claude Code, and Antigravity CLI directly on the host, then authenticate/configure the agent CLIs for the service account.

Suggested paths:

```text
/opt/mh-ai-dispatcher        application
/var/lib/mh-ai-dispatcher    state/worktrees
/etc/mh-dispatcher.env       secrets/config
```

Build:

```bash
cd /opt/mh-ai-dispatcher
npm ci
npm run check
npm run build
sudo cp deploy/mh-ai-dispatcher.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now mh-ai-dispatcher
```

Keep the service bound to `127.0.0.1`. If ChatGPT Work later needs remote MCP, expose `/mcp` through the existing authenticated Cloudflare/Tailscale path instead of opening port 8787 directly to the internet.
