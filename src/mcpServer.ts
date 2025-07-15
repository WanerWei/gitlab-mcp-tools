import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getAllTools } from "./tools/registry.js";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./utils/errorHandler.js";

export const mcpServer = new McpServer({
  name: "gitlab-mcp-tools",
  version: "1.0.0",
  description: "GitLab MCP Tools",
});

// Register tools
const tools = getAllTools();

tools.forEach((ToolClass) => {
  try {
    mcpServer.registerTool(
      ToolClass.toolName,
      {
        title: ToolClass.toolName,
        description: ToolClass.description,
        inputSchema: ToolClass.inputSchema.shape,
      },
      (args: any, extra: any) => ToolClass.run(args, extra)
    );

    logger.info(`[MCP Server] Successfully registered tool: ${ToolClass.toolName}`);
  } catch (error) {
    logger.error(
      `[MCP Server] Failed to register tool: ${ToolClass.toolName} - ${error}`
    );
    errorHandler.handle(error);
  }
});

logger.info(
  `[MCP Server] Server initialization completed, registered ${tools.length} tools`
);
