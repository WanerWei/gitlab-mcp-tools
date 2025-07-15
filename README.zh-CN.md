# GitLab MCP 工具集

基于MCP协议的GitLab工具集，支持diff信息获取、Merge Request管理、分支管理、成员管理等，便于在Cursor等平台集成。

## 🚀 特性

- **TypeScript开发**：完整的类型安全和智能提示
- **模块化架构**：清晰的代码结构和易于扩展
- **统一错误处理**：分类错误处理和详细日志
- **配置管理**：环境变量驱动的灵活配置
- **工具基类**：可复用的工具开发模式
- **ESLint集成**：代码质量检查和格式化

## ⚡ 快速开始

### 1. 安装
```bash
npm install -g gitlab-mcp-tools
```

### 2. 配置环境变量
```bash
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com
```

### 3. 在Cursor中使用
在Cursor的MCP配置中添加：
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

## 📦 安装与使用

### 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd gitlab-mcp-tools

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

### 全局安装
```bash
npm install -g gitlab-mcp-tools
```

## 🛠️ 可用工具

### gitlab.getDiff
获取GitLab项目的diff信息

**参数：**
- `projectId` (string): 项目ID或路径
- `from` (string): 起始分支/提交
- `to` (string): 目标分支/提交

**示例：**
```javascript
await gitlab.getDiff({
  projectId: "my-group/my-project",
  from: "main",
  to: "feature/new-feature"
});
```

### gitlab.createMr
创建GitLab Merge Request

**参数：**
- `projectId` (string): 项目ID或路径
- `sourceBranch` (string): 源分支
- `targetBranch` (string): 目标分支
- `title` (string): MR标题
- `description` (string, 可选): MR描述

**示例：**
```javascript
await gitlab.createMr({
  projectId: "my-group/my-project",
  sourceBranch: "feature/new-feature",
  targetBranch: "main",
  title: "添加新功能",
  description: "实现了用户管理功能"
});
```

### gitlab.acceptMr
合并指定的Merge Request

**参数：**
- `projectId` (string): 项目ID或路径
- `mrIid` (string|number): Merge Request的IID
- `mergeCommitMessage` (string, 可选): 合并提交信息

**示例：**
```javascript
await gitlab.acceptMr({
  projectId: "my-group/my-project",
  mrIid: 123,
  mergeCommitMessage: "合并新功能到主分支"
});
```

### gitlab.listMrs
列出项目的Merge Request

**参数：**
- `projectId` (string): 项目ID或路径
- `state` (string, 可选): MR状态筛选 (opened/closed/merged)

**示例：**
```javascript
await gitlab.listMrs({
  projectId: "my-group/my-project",
  state: "opened"
});
```

### gitlab.listBranches
列出项目的所有分支

**参数：**
- `projectId` (string): 项目ID或路径

**示例：**
```javascript
await gitlab.listBranches({
  projectId: "my-group/my-project"
});
```

### gitlab.deleteBranch
删除指定分支

**参数：**
- `projectId` (string): 项目ID或路径
- `branch` (string): 分支名称

**示例：**
```javascript
await gitlab.deleteBranch({
  projectId: "my-group/my-project",
  branch: "feature/old-feature"
});
```

### gitlab.listMembers
列出项目成员

**参数：**
- `projectId` (string): 项目ID或路径

**示例：**
```javascript
await gitlab.listMembers({
  projectId: "my-group/my-project"
});
```

### gitlab.projectVariables
获取项目的CI/CD变量

**参数：**
- `projectId` (string): 项目ID或路径

**示例：**
```javascript
await gitlab.projectVariables({
  projectId: "my-group/my-project"
});
```

## 🔧 环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `GITLAB_TOKEN` | ✅ | - | GitLab访问Token |
| `GITLAB_URL` | ✅ | - | GitLab服务地址 |
| `LOG_LEVEL` | ❌ | info | 日志级别 (debug/info/warn/error) |
| `LOG_TIMESTAMP` | ❌ | true | 是否显示时间戳 |

## 📄 开源协议

MIT 