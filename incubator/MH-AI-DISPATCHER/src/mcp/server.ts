import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Dispatcher } from '../core/dispatcher.js';

function textResult(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] };
}

export function createMcpServer(dispatcher: Dispatcher): McpServer {
  const server = new McpServer({ name: 'mh-ai-dispatcher', version: '0.1.0' });

  server.registerTool('start_locked_project', {
    title: 'Start Locked Project',
    description: 'Create a project from a planner-approved LOCKED contract and start automatic dispatch.',
    inputSchema: { contractJson: z.string().min(2) }
  }, async ({ contractJson }) => {
    try {
      const runtime = await dispatcher.createLockedProject(JSON.parse(contractJson));
      const started = await dispatcher.startProject(runtime.contract.projectId);
      return textResult({ projectId: started.contract.projectId, status: started.status, tasks: Object.keys(started.tasks).length });
    } catch (error) {
      return { ...textResult({ error: String(error) }), isError: true };
    }
  });

  server.registerTool('project_status', {
    title: 'Project Status',
    description: 'Read current dispatcher project/task status.',
    inputSchema: { projectId: z.string() }
  }, async ({ projectId }) => textResult(await dispatcher.getProject(projectId)));

  server.registerTool('list_projects', {
    title: 'List Projects',
    description: 'List dispatcher projects.',
    inputSchema: {}
  }, async () => textResult(await dispatcher.listProjects()));

  server.registerTool('pause_project', {
    title: 'Pause Project',
    description: 'Stop dispatching new tasks. Already-running tasks are allowed to finish.',
    inputSchema: { projectId: z.string() }
  }, async ({ projectId }) => textResult(await dispatcher.pauseProject(projectId)));

  server.registerTool('resume_project', {
    title: 'Resume Project',
    description: 'Resume dispatching a paused/blocked project.',
    inputSchema: { projectId: z.string() }
  }, async ({ projectId }) => textResult(await dispatcher.resumeProject(projectId)));

  server.registerTool('resolve_task', {
    title: 'Resolve Task Gate',
    description: 'Planner/owner resolution for a gated task. Use owner_approve only after explicit owner approval.',
    inputSchema: {
      projectId: z.string(),
      taskId: z.string(),
      action: z.enum(['retry', 'owner_approve', 'skip']),
      note: z.string().default('')
    }
  }, async ({ projectId, taskId, action, note }) => textResult(await dispatcher.resolveTask(projectId, taskId, action, note)));

  return server;
}
