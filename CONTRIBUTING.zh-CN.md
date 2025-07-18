# 贡献指南

[English](CONTRIBUTING.md) | [中文](CONTRIBUTING.zh-CN.md)

感谢您对GitLab MCP工具集的关注！

## 🚀 开发环境设置

```bash
# 克隆项目
git clone <repository-url>
cd gitlab-mcp-tools

# 安装依赖
npm install

# 配置环境变量
export GITLAB_TOKEN=your_token_here
export GITLAB_URL=https://gitlab.example.com

# 开发模式
npm run dev
```

## 📝 代码规范

- 使用TypeScript进行开发
- 遵循ESLint规则：`npm run lint`
- 所有工具必须继承`BaseTool`类
- 使用Zod进行参数验证
- 添加适当的注释和文档

## 🛠️ 添加新工具

### 1. 创建工具类
```typescript
import { z } from 'zod';
import { BaseTool } from './base.js';
import { logger } from '@/utils/logger.js';

export class NewTool extends BaseTool {
  static toolName = 'new_tool';
  static description = 'Description of the new tool';
  static inputSchema = z.object({
    // 定义输入参数
  });
  static outputSchema = z.any();

  static async run(args: any, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      // 实现工具逻辑
    }, 'new_tool');
    return BaseTool.formatResponse(result);
  }
}
```

### 2. 注册工具
在`src/tools/registry.ts`中添加：
```typescript
import { NewTool } from "./newTool.js";

export const toolClasses = [
  // ... 其他工具
  NewTool,
];
```

### 3. 更新文档
- 更新README中的工具列表
- 添加使用示例

## 📋 提交规范

使用约定式提交格式：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```bash
git commit -m "feat: add new tool for listing project issues"
git commit -m "fix: resolve authentication error in createMr tool"
git commit -m "docs: update README with new tool examples"
```

## 🔄 Pull Request流程

1. Fork项目到您的GitHub账户
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m "feat: add your feature"`
4. 推送到分支：`git push origin feature/your-feature`
5. 创建Pull Request
6. 等待代码审查和合并

## 📞 获取帮助

如果您在贡献过程中遇到问题：
1. 查看现有Issue和Pull Request
2. 创建新的Issue描述问题
3. 在Issue中提供详细的错误信息和复现步骤

感谢所有为这个项目做出贡献的开发者！ 