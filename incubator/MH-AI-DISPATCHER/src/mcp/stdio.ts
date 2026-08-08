import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from '../config.js';
import { Dispatcher } from '../core/dispatcher.js';
import { FileStore } from '../store/fileStore.js';
import { createMcpServer } from './server.js';

const dispatcher = new Dispatcher(new FileStore(config.dataDir));
await dispatcher.init();
const server = createMcpServer(dispatcher);
const transport = new StdioServerTransport();
await server.connect(transport);

process.on('SIGINT', async () => {
  await dispatcher.close();
  await server.close();
  process.exit(0);
});
