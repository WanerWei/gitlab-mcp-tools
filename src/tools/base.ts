import { Gitlab } from '@gitbeaker/node';
import { z } from 'zod';
import { McpTool, GitlabConfig, GitlabApiResponse } from '@/types';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/utils/errorHandler';
import { getGitlabConfig } from '@/utils/gitlabConfig';

export abstract class BaseTool implements McpTool {
  abstract name: string;
  abstract description: string;
  abstract inputSchema: z.ZodSchema;
  abstract outputSchema: z.ZodSchema;

  protected gitlabClient: any = null;
  protected config: GitlabConfig | null = null;

  protected async getGitlabClient(): Promise<any> {
    if (!this.gitlabClient) {
      this.config = getGitlabConfig();
      this.gitlabClient = new Gitlab({
        host: this.config.gitlabUrl,
        token: this.config.token,
      });
      logger.debug(`[${this.name}] GitLab client initialized successfully`);
    }
    return this.gitlabClient;
  }

  protected async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    context: string = this.name
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

  protected formatResponse<T>(data: T): any {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  }

  abstract run(args: any, extra: any): Promise<any>;
} 