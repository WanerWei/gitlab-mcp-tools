import { z } from 'zod';
import { BaseTool } from './base.js';
import { DiffParams } from '@/types/index.js';
import { logger } from '@/utils/logger.js';

export class DiffTool extends BaseTool {
  static toolName = 'get_diff';
  static description = 'Retrieve the commit and file differences between two branches in a specific GitLab project.';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
    from: z.string().describe('The source branch').min(1, 'Source branch cannot be empty'),
    to: z.string().describe('The target branch').min(1, 'Target branch cannot be empty'),
  });
  static outputSchema = z.any();

  static async run(args: DiffParams, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId, from, to } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[get_diff] Comparing branches: ${from}...${to} in project ${projectId}`);
      const diff = await api.Repositories.compare(projectId, from, to);
      return {
        projectId,
        from,
        to,
        commits: diff.commits,
        diffs: diff.diffs,
        compareTimeout: diff.compare_timeout,
        compareSameRef: diff.compare_same_ref
      };
    }, 'get_diff');
    return BaseTool.formatResponse(result);
  }
} 