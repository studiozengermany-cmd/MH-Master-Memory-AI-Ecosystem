import type { Request, Response, NextFunction } from 'express';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { config } from './config.js';
import { Dispatcher } from './core/dispatcher.js';
import { FileStore } from './store/fileStore.js';
import { createMcpServer } from './mcp/server.js';
import { log } from './utils/log.js';

const dispatcher = new Dispatcher(new FileStore(config.dataDir));
await dispatcher.init();

const app = createMcpExpressApp({ host: config.host });
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/health') return next();
  if (!config.controlToken) {
    res.status(503).json({ error: 'MH_CONTROL_TOKEN is not configured' });
    return;
  }
  const authorization = req.header('authorization');
  if (authorization !== `Bearer ${config.controlToken}`) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }
  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, service: 'mh-ai-dispatcher', version: '0.1.0', notion: Boolean(config.notion.token) });
});

app.post('/mcp', async (req: Request, res: Response) => {
  const server = createMcpServer(dispatcher);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on('close', () => {
      void transport.close();
      void server.close();
    });
  } catch (error) {
    log('error', 'mcp.request.failed', { error: String(error) });
    if (!res.headersSent) res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error' }, id: null });
  }
});
app.get('/mcp', (_req: Request, res: Response) => res.status(405).json({ error: 'POST only' }));
app.delete('/mcp', (_req: Request, res: Response) => res.status(405).json({ error: 'POST only' }));

app.get('/api/projects', async (_req: Request, res: Response) => res.json(await dispatcher.listProjects()));
app.get('/api/projects/:id', async (req: Request, res: Response) => {
  try { res.json(await dispatcher.getProject(req.params.id!)); }
  catch (error) { res.status(404).json({ error: String(error) }); }
});
app.post('/api/projects', async (req: Request, res: Response) => {
  try { res.status(201).json(await dispatcher.createLockedProject(req.body)); }
  catch (error) { res.status(400).json({ error: String(error) }); }
});
app.post('/api/projects/:id/start', async (req: Request, res: Response) => {
  try { res.json(await dispatcher.startProject(req.params.id!)); }
  catch (error) { res.status(400).json({ error: String(error) }); }
});
app.post('/api/projects/:id/pause', async (req: Request, res: Response) => res.json(await dispatcher.pauseProject(req.params.id!)));
app.post('/api/projects/:id/resume', async (req: Request, res: Response) => res.json(await dispatcher.resumeProject(req.params.id!)));
app.post('/api/projects/:id/tasks/:taskId/resolve', async (req: Request, res: Response) => {
  try {
    const action = req.body?.action as 'retry' | 'owner_approve' | 'skip';
    res.json(await dispatcher.resolveTask(req.params.id!, req.params.taskId!, action, String(req.body?.note || '')));
  } catch (error) { res.status(400).json({ error: String(error) }); }
});

const httpServer = app.listen(config.port, config.host, () => {
  log('info', 'server.started', { host: config.host, port: config.port, dataDir: config.dataDir });
});

async function shutdown() {
  httpServer.close();
  await dispatcher.close();
  process.exit(0);
}
process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());
