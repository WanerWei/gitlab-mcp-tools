# GitLab MCP Tools

[English](README.md) | [中文](README.zh-CN.md)

GitLab tools based on MCP protocol, supporting diff information retrieval, Merge Request management, branch management, member management, and more, for easy integration with platforms like Cursor.

##  Features

- **TypeScript Development**: Complete type safety and intelligent hints
- **Modular Architecture**: Clear code structure and easy extensibility
- **Unified Error Handling**: Categorized error handling and detailed logging
- **Configuration Management**: Environment variable-driven flexible configuration
- **Tool Base Class**: Reusable tool development pattern
- **ESLint Integration**: Code quality checking and formatting

## ⚡ Quick Start

### 1. Install
```bash
npm install -g gitlab-mcp-tools
```

### 2. Configure Environment Variables
```bash
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com
```

### 3. Use in Cursor
Add to Cursor's MCP configuration:
```json
{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "gitlab-mcp-tools"],
      "env": {
        "GITLAB_TOKEN": "your_token_here",
        "GITLAB_URL": "https://gitlab.example.com"
      }
    }
  }
}
```

## 📦 Installation and Usage

### Local Development
```bash
# Clone project
git clone <repository-url>
cd gitlab-mcp-tools

# Install dependencies
npm install

# Development mode
npm run dev

# Build
npm run build
```

### Global Installation
```bash
npm install -g gitlab-mcp-tools
```

## ️ Available Tools

### gitlab.getDiff
Get diff information for GitLab project

**Parameters:**
- `projectId` (string): Project ID or path
- `from` (string): Source branch/commit
- `to` (string): Target branch/commit

**Example:**
```javascript
await gitlab.getDiff({
  projectId: "my-group/my-project",
  from: "main",
  to: "feature/new-feature"
});
```

### gitlab.createMr
Create GitLab Merge Request

**Parameters:**
- `projectId` (string): Project ID or path
- `sourceBranch` (string): Source branch
- `targetBranch` (string): Target branch
- `title` (string): MR title
- `description` (string, optional): MR description

**Example:**
```javascript
await gitlab.createMr({
  projectId: "my-group/my-project",
  sourceBranch: "feature/new-feature",
  targetBranch: "main",
  title: "Add new feature",
  description: "Implemented user management feature"
});
```

### gitlab.acceptMr
Merge a specific Merge Request

**Parameters:**
- `projectId` (string): Project ID or path
- `mrIid` (string|number): Merge Request IID
- `mergeCommitMessage` (string, optional): Merge commit message

**Example:**
```javascript
await gitlab.acceptMr({
  projectId: "my-group/my-project",
  mrIid: 123,
  mergeCommitMessage: "Merge new feature to main branch"
});
```

### gitlab.listMrs
List Merge Requests for a project

**Parameters:**
- `projectId` (string): Project ID or path
- `state` (string, optional): MR state filter (opened/closed/merged)

**Example:**
```javascript
await gitlab.listMrs({
  projectId: "my-group/my-project",
  state: "opened"
});
```

### gitlab.listBranches
List all branches in a project

**Parameters:**
- `projectId` (string): Project ID or path

**Example:**
```javascript
await gitlab.listBranches({
  projectId: "my-group/my-project"
});
```

### gitlab.deleteBranch
Delete a specific branch

**Parameters:**
- `projectId` (string): Project ID or path
- `branch` (string): Branch name

**Example:**
```javascript
await gitlab.deleteBranch({
  projectId: "my-group/my-project",
  branch: "feature/old-feature"
});
```

### gitlab.listMembers
List project members

**Parameters:**
- `projectId` (string): Project ID or path

**Example:**
```javascript
await gitlab.listMembers({
  projectId: "my-group/my-project"
});
```

### gitlab.projectVariables
Get project CI/CD variables

**Parameters:**
- `projectId` (string): Project ID or path

**Example:**
```javascript
await gitlab.projectVariables({
  projectId: "my-group/my-project"
});
```

## 🔧 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITLAB_TOKEN` | ✅ | - | GitLab access token |
| `GITLAB_URL` | ✅ | - | GitLab service URL |
| `LOG_LEVEL` | ❌ | info | Log level (debug/info/warn/error) |
| `LOG_TIMESTAMP` | ❌ | true | Whether to show timestamps |

## 🔌 Integration Guide

### Cursor Integration
1. Open Cursor settings
2. Find MCP configuration section
3. Add the above configuration
4. Restart Cursor

### Other IDE Integration
Supports any IDE or editor compatible with MCP protocol.

## 🚨 Troubleshooting

### Common Issues

**Q: "Invalid GitLab token" error**
A: Check if GITLAB_TOKEN is set correctly and has sufficient permissions

**Q: Cannot connect to GitLab**
A: Check if GITLAB_URL is correct and network connection is normal

**Q: Project ID format error**
A: Use project path format: `group/project` or numeric ID

**Q: Insufficient permissions error**
A: Ensure token has permissions for corresponding operations like creating MR, deleting branches, etc.

### Debug Mode
```bash
export LOG_LEVEL=debug
npx gitlab-mcp-tools
```

## 🧪 Development

### Project Structure
```
src/
├── config/          # 配置管理
├── tools/           # 工具实现
│   ├── base.ts      # 工具基类
│   ├── registry.ts  # 工具注册器
│   ├── createMr.ts  # 创建MR工具
│   ├── getDiff.ts   # 获取Diff工具
│   ├── acceptMr.ts  # 合并MR工具
│   ├── listMrs.ts   # 列出MR工具
│   ├── listBranches.ts # 列出分支工具
│   ├── deleteBranch.ts # 删除分支工具
│   ├── listMembers.ts  # 列出成员工具
│   └── projectVariables.ts # 项目变量工具
├── types/           # 类型定义
├── utils/           # 工具函数
├── mcpServer.ts     # MCP服务器
└── index.ts         # 应用入口
```

### 添加新工具
1. 创建新的工具类，继承`BaseTool`
2. 实现必要的抽象方法
3. 在`registry.ts`中注册工具
4. 添加相应的类型定义

### 代码质量
```bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 类型检查
npx tsc --noEmit
```

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件 