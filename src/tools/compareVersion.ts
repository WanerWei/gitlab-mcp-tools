import { z } from 'zod';
import { BaseTool } from './base';
import { DiffParams } from '@/types';
import { logger } from '@/utils/logger';

export class DiffTool extends BaseTool {
  name = 'gitlab.getDiff';
  description = 'Get diff information for GitLab project';
  
  inputSchema = z.object({
    projectId: z.string().min(1, 'Project ID cannot be empty'),
    from: z.string().min(1, 'Source branch cannot be empty'),
    to: z.string().min(1, 'Target branch cannot be empty'),
  });

  outputSchema = z.any();

  async run(args: DiffParams, extra: any) {
    const result = await this.executeWithErrorHandling(async () => {
      const { projectId, from, to } = args;
      
      const api = await this.getGitlabClient();
      
      logger.info(`[${this.name}] Comparing branches: ${from}...${to} in project ${projectId}`);
      
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
    });

    return this.formatResponse(result);
  }
}

export const getDiffTool = new DiffTool(); 