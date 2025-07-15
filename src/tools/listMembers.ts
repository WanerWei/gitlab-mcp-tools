import { z } from 'zod';
import { BaseTool } from './base.js';
import { logger } from '@/utils/logger.js';

export class ListMembersTool extends BaseTool {
  static toolName = 'list_members';
  static description = 'List all members and their access levels for a specified GitLab project.';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
  });
  static outputSchema = z.any();

  static async run(args: { projectId: string }, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[list_members] Get project members: ${projectId}`);
      const members = await api.ProjectMembers.all(projectId);
      return members.map((m: any) => ({
        id: m.id,
        username: m.username,
        name: m.name,
        accessLevel: m.access_level,
        state: m.state,
      }));
    }, 'list_members');
    return BaseTool.formatResponse(result);
  }
}
