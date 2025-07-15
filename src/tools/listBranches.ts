import { z } from 'zod';
import { BaseTool } from './base.js';
import { logger } from '@/utils/logger.js';

export class ListBranchesTool extends BaseTool {
  static toolName = 'list_branches';
  static description = 'List all branches in a specified GitLab project, including their status and metadata.';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
  });
  static outputSchema = z.any();

  static async run(args: { projectId: string }, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[list_branches] Get project branches: ${projectId}`);
      const branches = await api.Branches.all(projectId);
      return branches.map((b: any) => ({
        name: b.name,
        merged: b.merged,
        protected: b.protected,
        default: b.default,
        webUrl: b.web_url,
      }));
    }, 'list_branches');
    return BaseTool.formatResponse(result);
  }
}
