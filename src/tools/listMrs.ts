import { z } from 'zod';
import { BaseTool } from './base.js';
import { logger } from '@/utils/logger.js';

export class ListMrsTool extends BaseTool {
  static toolName = 'list_mrs';
  static description = 'List all merge requests for a GitLab project, optionally filtered by state (opened, closed, merged).';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
    state: z.enum(['opened', 'closed', 'merged']).describe('The state of the merge request').optional(),
  });
  static outputSchema = z.any();

  static async run(args: { projectId: string; state?: 'opened' | 'closed' | 'merged' }, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId, state } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[list_mrs] Get MR list: ${projectId}, state: ${state}`);
      const mrs = await api.MergeRequests.all(projectId, state ? { state } : {});
      return mrs.map((mr: any) => ({
        iid: mr.iid,
        title: mr.title,
        state: mr.state,
        author: mr.author?.username,
        webUrl: mr.web_url,
        createdAt: mr.created_at,
      }));
    }, 'list_mrs');
    return BaseTool.formatResponse(result);
  }
}
