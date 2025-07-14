# Project Architecture Documentation

## Project Structure

```
src/
├── config/          # Configuration management
│   └── index.ts     # Application configuration
├── tools/           # Tool implementations
│   ├── base.ts      # Tool base class
│   ├── registry.ts  # Tool registry
│   ├── createMr.ts  # Create MR tool
│   └── diff.ts      # Get diff tool
├── types/           # Type definitions
│   └── index.ts     # Global types
├── utils/           # Utility functions
│   ├── logger.ts    # Logging system
│   ├── errorHandler.ts # Error handling
│   └── gitlabConfig.ts # GitLab configuration
├── mcpServer.ts     # MCP server
└── index.ts         # Application entry
```

## Design Principles

### 1. Modular Design
- Each tool is an independent class inheriting from BaseTool
- Configuration, logging, and error handling are independent modules
- Use dependency injection and interface isolation principles

### 2. Type Safety
- Use TypeScript for complete type checking
- Use Zod for runtime parameter validation
- Define clear interfaces and types

### 3. Error Handling
- Unified error handling mechanism
- Categorize error types (API, validation, network, etc.)
- Detailed error logs and context information

### 4. Configuration Management
- Environment variable-driven configuration
- Configuration validation and default value handling
- Support for different environment configurations

### 5. Logging System
- Hierarchical logging (debug, info, warn, error)
- Timestamp and context information
- Configurable log levels

## Core Components

### BaseTool
Base class for all tools, providing:
- GitLab client management
- Unified error handling
- Response formatting

### ToolRegistry
Tool registry, providing:
- Tool registration and lookup
- Tool list management
- Extensibility support

### Logger
Logging system, providing:
- Hierarchical log output
- Timestamp formatting
- Configurable log levels

### ErrorHandler
Error handler, providing:
- Error categorization and parsing
- Unified error response format
- Detailed error information

## Extension Guide

### Adding New Tools
1. Create a new tool class that extends BaseTool
2. Implement necessary abstract methods
3. Register the tool in registry.ts
4. Add corresponding type definitions

### Adding New Configuration
1. Add configuration items in config/index.ts
2. Update AppConfig interface
3. Use configuration in corresponding modules

### Adding New Utility Functions
1. Create new files in utils/ directory
2. Define clear interfaces
3. Add appropriate error handling
4. Update type definitions 