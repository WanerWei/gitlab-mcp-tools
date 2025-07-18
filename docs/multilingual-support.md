# 多语言支持说明

本项目支持中文和英文两种语言，提供完整的文档和界面本地化。

## 🌍 支持的语言

- **English** (en) - 英文
- **中文** (zh-CN) - 简体中文

## 📁 多语言文件结构

```
├── README.md              # 英文主文档
├── README.zh-CN.md        # 中文主文档
├── CONTRIBUTING.md        # 英文贡献指南
├── CONTRIBUTING.zh-CN.md  # 中文贡献指南
├── .github/
│   ├── config.yml         # GitHub多语言配置
│   ├── workflows/
│   │   └── multilingual.yml # 多语言CI/CD
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md     # 多语言问题报告模板
│       └── feature_request.md # 多语言功能请求模板
└── scripts/
    └── detect-languages.js   # 语言检测脚本
```

## 🔗 语言切换

在每个文档的顶部都有语言切换链接：

```
[English](README.md) | [中文](README.zh-CN.md)
```

## 🛠️ 开发工具

### 语言检测脚本

运行以下命令检查多语言文件状态：

```bash
npm run check-languages
```

### GitHub Actions

项目配置了自动化的多语言检查：

- 验证所有语言文件是否存在
- 检查文件大小是否合理
- 自动添加多语言标签

## 📝 添加新语言

1. 创建新的语言文件，命名格式：`文件名.语言代码.md`
2. 在语言检测脚本中添加新语言配置
3. 更新所有文档的语言切换链接
4. 创建对应的 Issue 模板

## 🎯 最佳实践

1. **保持同步**：确保所有语言版本的文档内容同步更新
2. **文化适应**：根据目标语言的文化习惯调整表达方式
3. **术语一致**：保持技术术语的翻译一致性
4. **链接检查**：定期检查语言切换链接的有效性

## 🔧 配置说明

### GitHub 配置

`.github/config.yml` 文件定义了支持的语言：

```yaml
languages:
  - name: "English"
    code: "en"
    file: "README.md"
  - name: "中文"
    code: "zh-CN"
    file: "README.zh-CN.md"
```

### CI/CD 配置

`.github/workflows/multilingual.yml` 提供了：

- 文档验证
- 文件大小检查
- 自动标签管理

## 📞 支持

如果您发现翻译问题或需要添加新语言支持，请：

1. 创建 Issue 描述问题
2. 提供具体的修改建议
3. 参与翻译工作

感谢所有为多语言支持做出贡献的开发者！ 