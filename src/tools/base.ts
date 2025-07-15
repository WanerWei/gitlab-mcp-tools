import { Gitlab } from '@gitbeaker/node';
import { z } from 'zod';
import { GitlabConfig, GitlabApiResponse } from '@/types/index.js';
import { logger } from '@/utils/logger.js';
import { errorHandler } from '@/utils/errorHandler.js';
import { getGitlabConfig } from '@/utils/gitlabConfig.js';

// 所有子类需用 static toolName/description/inputSchema/outputSchema/run
export abstract class BaseTool {
  static toolName: string;
  static description: string;
  static inputSchema: z.AnyZodObject;
  static outputSchema: z.ZodSchema;

  // 静态缓存 client
  private static gitlabClient: any = null;
  private static config: GitlabConfig | null = null;

  static async getGitlabClient(): Promise<any> {
    if (!BaseTool.gitlabClient) {
      BaseTool.config = getGitlabConfig();
      BaseTool.gitlabClient = new Gitlab({
        host: BaseTool.config.gitlabUrl,
        token: BaseTool.config.token,
      });
      logger.debug(`[BaseTool] GitLab client initialized successfully`);
    }
    return BaseTool.gitlabClient;
  }

  static async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    context: string = 'BaseTool'
  ): Promise<GitlabApiResponse<T>> {
    try {
      logger.info(`[${context}] Starting operation`);
      const result = await operation();
      logger.info(`[${context}] Operation completed successfully`);
      return {
        success: true,
        data: result
      };
    } catch (error: any) {
      logger.error(`[${context}] Operation failed: ${error.message}`);
      const errorResult = errorHandler.handle(error);
      return {
        success: false,
        error: errorResult.error
      };
    }
  }

  static formatResponse<T>(data: T): any {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }

  // 所有子类 run 也应为 static
  static async run(args: any, extra: any): Promise<any> {
    throw new Error('Not implemented');
  }
} 