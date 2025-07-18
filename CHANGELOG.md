# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## [1.0.0] - 2025-07-14

### 🎉 新增
- 初始版本发布
- 支持gitlab.getDiff工具 - 获取项目分支差异
- 支持gitlab.createMr工具 - 创建Merge Request
- 支持gitlab.acceptMr工具 - 合并Merge Request
- 支持gitlab.listMrs工具 - 列出项目Merge Request
- 支持gitlab.listBranches工具 - 列出项目分支
- 支持gitlab.deleteBranch工具 - 删除指定分支
- 支持gitlab.listMembers工具 - 列出项目成员
- 支持gitlab.projectVariables工具 - 获取项目CI/CD变量
- MCP协议集成
- TypeScript完整支持

### ��️ 技术特性
- 模块化架构设计
- 统一错误处理机制
- 环境变量配置管理
- 分级日志系统
- 工具基类模式
- ESLint代码质量检查
- Zod参数验证

### 📚 文档
- 完整的中英文README文档
- 架构设计文档
- 贡献指南
- 故障排除指南

## [未发布]

### 计划功能
- 支持Issue管理工具
- 支持Pipeline管理工具
- 支持Webhook管理工具
- 批量操作支持
- 缓存机制优化 