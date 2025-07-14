import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { getDiffTool } from './tools/compareVersion';
import { createMrTool } from './tools/compareVersion';
import { logger } from './utils/logger';
import { errorHandler } from './utils/errorHandler';

export const mcpServer = new McpServer({
  name: 'gitlab-mcp-tools',
  version: '1.0.0',
});

// Register tools
const tools = [getDiffTool, createMrTool];

tools.forEach(tool => {
  try {
    mcpServer.registerTool(tool.name, {
      title: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema.shape,
    }, tool.run as any);
    
    logger.info(`[MCP Server] Successfully registered tool: ${tool.name}`);
  } catch (error) {
    logger.error(`[MCP Server] Failed to register tool: ${tool.name} - ${error}`);
    errorHandler.handle(error);
  }
});

logger.info(`[MCP Server] Server initialization completed, registered ${tools.length} tools`); 