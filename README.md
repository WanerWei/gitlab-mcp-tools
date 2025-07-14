# GitLab MCP Tools

GitLab tools based on MCP protocol, supporting diff information retrieval, Merge Request creation, and more, for easy integration with platforms like Cursor.

## 🚀 Features

- **TypeScript Development**: Complete type safety and intelligent hints
- **Modular Architecture**: Clear code structure and easy extensibility
- **Unified Error Handling**: Categorized error handling and detailed logging
- **Configuration Management**: Environment variable-driven flexible configuration
- **Tool Base Class**: Reusable tool development pattern
- **ESLint Integration**: Code quality checking and formatting

## 📦 Installation and Usage

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
# Watch mode compilation
npm run dev

# Code checking
npm run lint

# Auto-fix code formatting
npm run lint:fix
```

### Build
```bash
npm run build
```

### Run
```bash
# Set environment variables
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com  # Required
export LOG_LEVEL=info  # Optional, default is info

# Run the tool
npm start
```

### Run via npx
```bash
# Set environment variables
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com  # Required

# Run the tool
npx gitlab-mcp-tools
```

## 🔧 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITLAB_TOKEN` | ✅ | - | GitLab access token |
| `GITLAB_URL` | ✅ | - | GitLab service URL (required) |
| `LOG_LEVEL` | ❌ | info | Log level (debug/info/warn/error) |
| `LOG_TIMESTAMP` | ❌ | true | Whether to show timestamps |

## 🏗️ Project Structure

```
src/
├── config/          # Configuration management
├── tools/           # Tool implementations
│   ├── base.ts      # Tool base class
│   ├── registry.ts  # Tool registry
│   ├── createMr.ts  # Create MR tool
│   └── diff.ts      # Get diff tool
├── types/           # Type definitions
├── utils/           # Utility functions
├── mcpServer.ts     # MCP server
└── index.ts         # Application entry
```

## 🛠️ Available Tools

### gitlab.getDiff
Get diff information for GitLab project

**Parameters:**
- `projectId`: Project ID
- `from`: Source branch/commit
- `to`: Target branch/commit

### gitlab.createMr
Create GitLab Merge Request

**Parameters:**
- `projectId`: Project ID
- `sourceBranch`: Source branch
- `targetBranch`: Target branch
- `title`: MR title
- `description`: MR description (optional)

## 🔌 Cursor Integration

When configuring MCP Tools in Cursor, point to `npx gitlab-mcp-tools` and pass tokens and other parameters through environment variables.

## 🧪 Development

### Adding New Tools
1. Create a new tool class that extends `BaseTool`
2. Implement necessary abstract methods
3. Register the tool in `registry.ts`
4. Add corresponding type definitions

### Code Quality
- Use ESLint for code checking
- Follow TypeScript best practices
- Keep code comments and documentation updated

## 📄 License

MIT 