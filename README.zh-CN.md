# GitLab MCP 工具集

基于MCP协议的GitLab工具集，支持diff信息获取、Merge Request创建等，便于在Cursor等平台集成。

## 🚀 特性

- **TypeScript开发**：完整的类型安全和智能提示
- **模块化架构**：清晰的代码结构和易于扩展
- **统一错误处理**：分类错误处理和详细日志
- **配置管理**：环境变量驱动的灵活配置
- **工具基类**：可复用的工具开发模式
- **ESLint集成**：代码质量检查和格式化

## 📦 安装与使用

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
# 监听模式编译
npm run dev

# 代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix
```

### 构建
```bash
npm run build
```

### 运行
```bash
# 设置环境变量
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com  # 必需
export LOG_LEVEL=info  # 可选，默认为 info

# 运行工具
npm start
```

### 通过npx调用
```bash
# 设置环境变量
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com  # 必需

# 运行工具
npx gitlab-mcp-tools
```

## 🔧 环境变量

| 变量名 | 必需 | 默认值 | 说明 |
|--------|------|--------|------|
| `GITLAB_TOKEN` | ✅ | - | GitLab访问Token |
| `GITLAB_URL` | ✅ | - | GitLab服务地址（必需） |
| `LOG_LEVEL` | ❌ | info | 日志级别 (debug/info/warn/error) |
| `LOG_TIMESTAMP` | ❌ | true | 是否显示时间戳 |

## 🏗️ 项目结构

```
src/
├── config/          # 配置管理
├── tools/           # 工具实现
│   ├── base.ts      # 工具基类
│   ├── registry.ts  # 工具注册器
│   ├── createMr.ts  # 创建MR工具
│   └── diff.ts      # 获取Diff工具
├── types/           # 类型定义
├── utils/           # 工具函数
├── mcpServer.ts     # MCP服务器
└── index.ts         # 应用入口
```

## 🛠️ 可用工具

### gitlab.getDiff
获取GitLab项目的diff信息

**参数：**
- `projectId`: 项目ID
- `from`: 起始分支/提交
- `to`: 目标分支/提交

### gitlab.createMr
创建GitLab Merge Request

**参数：**
- `projectId`: 项目ID
- `sourceBranch`: 源分支
- `targetBranch`: 目标分支
- `title`: MR标题
- `description`: MR描述（可选）

## 🔌 Cursor集成

在Cursor中配置MCP Tools时，指向`npx gitlab-mcp-tools`，并通过环境变量传递token等参数。

## 🧪 开发

### 添加新工具
1. 创建新的工具类，继承`BaseTool`
2. 实现必要的抽象方法
3. 在`registry.ts`中注册工具
4. 添加相应的类型定义

### 代码质量
- 使用ESLint进行代码检查
- 遵循TypeScript最佳实践
- 保持代码注释和文档更新

## 📄 开源协议

MIT 