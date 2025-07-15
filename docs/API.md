# API文档

## 工具列表

### gitlab.getDiff
获取GitLab项目的diff信息。

**参数：**
- `projectId` (string, 必需): 项目ID或路径
- `from` (string, 必需): 起始分支/提交
- `to` (string, 必需): 目标分支/提交

**返回值：**
```json
{
  "success": true,
  "data": {
    "projectId": "my-group/my-project",
    "from": "main",
    "to": "feature/new-feature",
    "commits": [...],
    "diffs": [...],
    "compareTimeout": false,
    "compareSameRef": false
  }
}
```

### gitlab.createMr
创建GitLab Merge Request。

**参数：**
- `projectId` (string, 必需): 项目ID或路径
- `sourceBranch` (string, 必需): 源分支
- `targetBranch` (string, 必需): 目标分支
- `title` (string, 必需): MR标题
- `description` (string, 可选): MR描述

**返回值：**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "iid": 45,
    "title": "添加新功能",
    "webUrl": "https://gitlab.example.com/my-group/my-project/-/merge_requests/45"
  }
}
```

### gitlab.acceptMr
合并指定的Merge Request。

**参数：**
- `projectId` (string, 必需): 项目ID或路径
- `mrIid` (string|number, 必需): Merge Request的IID
- `mergeCommitMessage` (string, 可选): 合并提交信息

### gitlab.listMrs
列出项目的Merge Request。

**参数：**
- `projectId` (string, 必需): 项目ID或路径
- `state` (string, 可选): MR状态筛选 (opened/closed/merged)

### gitlab.listBranches
列出项目的所有分支。

**参数：**
- `projectId` (string, 必需): 项目ID或路径

### gitlab.deleteBranch
删除指定分支。

**参数：**
- `projectId` (string, 必需): 项目ID或路径
- `branch` (string, 必需): 分支名称

### gitlab.listMembers
列出项目成员。

**参数：**
- `projectId` (string, 必需): 项目ID或路径

### gitlab.projectVariables
获取项目的CI/CD变量。

**参数：**
- `projectId` (string, 必需): 项目ID或路径

## 通用响应格式

所有工具都返回统一的响应格式：

```json
{
  "success": true|false,
  "data": {...},
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## 错误代码

| 错误代码 | 说明 |
|----------|------|
| `INVALID_PARAMS` | 参数验证失败 |
| `PROJECT_NOT_FOUND` | 项目不存在 |
| `BRANCH_NOT_FOUND` | 分支不存在 |
| `MR_NOT_FOUND` | Merge Request不存在 |
| `INSUFFICIENT_PERMISSIONS` | 权限不足 |
| `NETWORK_ERROR` | 网络错误 |
| `API_ERROR` | GitLab API错误 |

## 权限要求

| 工具 | 所需权限 |
|------|----------|
| `getDiff` | 项目读取权限 |
| `createMr` | 项目写入权限 |
| `acceptMr` | 项目维护者权限 |
| `listMrs` | 项目读取权限 |
| `listBranches` | 项目读取权限 |
| `deleteBranch` | 项目维护者权限 |
| `listMembers` | 项目读取权限 |
| `projectVariables` | 项目读取权限 | 