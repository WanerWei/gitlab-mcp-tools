import { mcpServer } from "./mcpServer.js";
import { logger } from "./utils/logger.js";
import { getAppConfig, validateConfig } from "./config/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function main() {
  try {
    // Load and validate configuration
    const config = getAppConfig();

    if (!validateConfig(config)) {
      console.error(
        "Configuration validation failed, please check environment variables"
      );
      process.exit(1);
    }

    // Set log level
    logger.setLogLevel(config.logging.level);

    logger.info("GitLab MCP Tools Server starting...");
    logger.info(`Server version: ${config.server.version}`);
    logger.info(`GitLab URL: ${config.gitlab.gitlabUrl}`);
    logger.info(`Log level: ${config.logging.level}`);

    // Connect transport according to MCP protocol requirements, left empty for future extension
    logger.info(
      "MCP Server initialization completed, waiting for connection..."
    );

    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);

  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled promise rejection: ${reason}`);
  process.exit(1);
});

// Start application
main().catch((error) => {
  console.error("Fatal error in main()", error);
  process.exit(1);
});
