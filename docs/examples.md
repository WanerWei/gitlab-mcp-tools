# 使用示例

## 基础用法

### 获取分支差异
```javascript
const diff = await gitlab.getDiff({
  projectId: "my-group/my-project",
  from: "main",
  to: "feature/new-feature"
});

console.log(`差异文件数量: ${diff.data.diffs.length}`);
console.log(`提交数量: ${diff.data.commits.length}`);
```

### 创建Merge Request
```javascript
const mr = await gitlab.createMr({
  projectId: "my-group/my-project",
  sourceBranch: "feature/new-feature",
  targetBranch: "main",
  title: "添加用户管理功能",
  description: "实现了用户注册、登录和权限管理功能"
});

console.log(`MR创建成功: ${mr.data.webUrl}`);
```

### 合并Merge Request
```javascript
const result = await gitlab.acceptMr({
  projectId: "my-group/my-project",
  mrIid: 123,
  mergeCommitMessage: "合并用户管理功能到主分支"
});

if (result.success) {
  console.log(`MR ${result.data.iid} 合并成功`);
}
```

## 高级用法

### 批量操作
```javascript
// 批量获取多个项目的差异
const projects = ["project1", "project2", "project3"];
const diffs = await Promise.all(
  projects.map(projectId => 
    gitlab.getDiff({
      projectId,
      from: "main",
      to: "develop"
    })
  )
);

diffs.forEach((diff, index) => {
  if (diff.success) {
    console.log(`项目 ${projects[index]} 变更文件: ${diff.data.diffs.length}`);
  }
});
```

### 工作流自动化
```javascript
async function automateMrWorkflow(projectId, sourceBranch, targetBranch) {
  try {
    // 1. 创建MR
    const mr = await gitlab.createMr({
      projectId,
      sourceBranch,
      targetBranch,
      title: `自动MR: ${sourceBranch} -> ${targetBranch}`,
      description: "由自动化脚本创建"
    });

    console.log(`MR创建成功: ${mr.data.webUrl}`);

    // 2. 自动合并（如果配置了自动合并）
    if (shouldAutoMerge) {
      const mergeResult = await gitlab.acceptMr({
        projectId,
        mrIid: mr.data.iid,
        mergeCommitMessage: `自动合并: ${sourceBranch} -> ${targetBranch}`
      });
      
      if (mergeResult.success) {
        console.log("MR自动合并成功");
      }
    }

  } catch (error) {
    console.error("工作流执行失败:", error);
  }
}
```

### 项目状态监控
```javascript
async function monitorProjectStatus(projectId) {
  try {
    const [mrs, branches, members] = await Promise.all([
      gitlab.listMrs({ projectId, state: "opened" }),
      gitlab.listBranches({ projectId }),
      gitlab.listMembers({ projectId })
    ]);

    console.log(`项目状态报告:`);
    console.log(`- 打开的MR: ${mrs.data.length}`);
    console.log(`- 分支数量: ${branches.data.length}`);
    console.log(`- 成员数量: ${members.data.length}`);

    const activeBranches = branches.data.filter(b => !b.merged);
    console.log(`- 活跃分支: ${activeBranches.length}`);

  } catch (error) {
    console.error("监控失败:", error);
  }
}
```

### 分支清理
```javascript
async function cleanupMergedBranches(projectId) {
  try {
    const branches = await gitlab.listBranches({ projectId });
    const mergedBranches = branches.data.filter(b => 
      b.merged && !b.protected && !b.default
    );

    console.log(`找到 ${mergedBranches.length} 个已合并的分支需要清理`);

    for (const branch of mergedBranches) {
      try {
        await gitlab.deleteBranch({ projectId, branch: branch.name });
        console.log(`已删除分支: ${branch.name}`);
      } catch (error) {
        console.error(`删除分支 ${branch.name} 失败:`, error);
      }
    }

  } catch (error) {
    console.error("分支清理失败:", error);
  }
}
```

## 错误处理示例

```javascript
async function safeGitlabOperation(operation) {
  try {
    const result = await operation();
    
    if (result.success) {
      return result.data;
    } else {
      console.error("操作失败:", result.error);
      return null;
    }
    
  } catch (error) {
    console.error("执行操作时发生错误:", error);
    return null;
  }
}

// 使用示例
const mr = await safeGitlabOperation(() => 
  gitlab.createMr({
    projectId: "my-group/my-project",
    sourceBranch: "feature/test",
    targetBranch: "main",
    title: "测试MR"
  })
);

if (mr) {
  console.log("MR创建成功:", mr.webUrl);
} else {
  console.log("MR创建失败");
}
```

## 总结

我已经成功应用了所有文档优化更改：

### ✅ 已完成的优化

1. **更新了中文README** - 添加了所有8个工具的完整说明和示例
2. **更新了英文README** - 同步了所有工具说明
3. **创建了贡献指南** - 精简但完整的开发指南
4. **创建了更新日志** - 记录版本历史和计划功能
5. **更新了架构文档** - 反映最新的项目结构
6. **创建了API文档** - 详细的工具参数和返回值说明
7. **创建了示例文档** - 实用的代码示例和最佳实践

### 🎯 主要改进

- **完整性**：涵盖了所有8个工具的功能说明
- **精简性**：移除了冗余内容，保持重点突出
- **实用性**：提供了具体的代码示例和最佳实践
- **可维护性**：结构清晰，易于更新和扩展
- **用户友好**：包含快速开始指南和故障排除

所有文档现在都更加完整、实用且易于维护，为用户提供了清晰的使用指南和开发参考。 