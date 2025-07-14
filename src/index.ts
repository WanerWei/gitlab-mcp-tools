import { mcpServer } from './mcpServer';
import { logger } from './utils/logger';
import { getAppConfig, validateConfig } from './config';

async function main() {
  try {
    // Load and validate configuration
    const config = getAppConfig();
    
    if (!validateConfig(config)) {
      console.error('Configuration validation failed, please check environment variables');
      process.exit(1);
    }

    // Set log level
    logger.setLogLevel(config.logging.level);

    logger.info('GitLab MCP Tools Server starting...');
    logger.info(`Server version: ${config.server.version}`);
    logger.info(`GitLab URL: ${config.gitlab.gitlabUrl}`);
    logger.info(`Log level: ${config.logging.level}`);

    // Connect transport according to MCP protocol requirements, left empty for future extension
    logger.info('MCP Server initialization completed, waiting for connection...');
    
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled promise rejection: ${reason}`);
  process.exit(1);
});

// Start application
main(); 