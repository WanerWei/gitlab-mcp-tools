import { z } from 'zod';

// GitLab配置类型
export interface GitlabConfig {
  token: string;
  gitlabUrl: string;
}

// MCP工具基础类型
export interface McpTool {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  outputSchema: z.ZodSchema;
  run: (args: any, extra: any) => Promise<any>;
}

// GitLab API响应类型
export interface GitlabApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Merge Request创建参数类型
export interface CreateMrParams {
  projectId: string;
  sourceBranch: string;
  targetBranch: string;
  title: string;
  description?: string;
}

// Diff比较参数类型
export interface DiffParams {
  projectId: string;
  from: string;
  to: string;
}

// 日志级别类型
export type LogLevel = 'info' | 'error' | 'warn' | 'debug';

// 日志接口
export interface Logger {
  info: (msg: string) => void;
  error: (msg: string) => void;
  warn: (msg: string) => void;
  debug: (msg: string) => void;
}

// 错误处理接口
export interface ErrorHandler {
  handle: (error: any) => any;
} 