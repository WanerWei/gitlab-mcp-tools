import { z } from 'zod';
import { BaseTool } from './base.js';
import { logger } from '@/utils/logger.js';

export class DeleteBranchTool extends BaseTool {
  static toolName = 'delete_branch';
  static description = 'Delete a specific branch from a given GitLab project repository.';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
    branch: z.string().describe('The name of the branch').min(1, 'Branch name cannot be empty'),
  });
  static outputSchema = z.any();

  static async run(args: { projectId: string; branch: string }, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId, branch } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[delete_branch] Delete branch: ${branch} in project ${projectId}`);
      await api.Branches.remove(projectId, branch);
      return { projectId, branch, deleted: true };
    }, 'delete_branch');
    return BaseTool.formatResponse(result);
  }
}
