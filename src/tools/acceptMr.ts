import { z } from 'zod';
import { BaseTool } from './base.js';
import { logger } from '@/utils/logger.js';

export class AcceptMrTool extends BaseTool {
  static toolName = 'accept_mr';
  static description = 'Merge a specific merge request in a GitLab project, with an optional custom merge commit message.';
  static inputSchema = z.object({
    projectId: z
      .string()
      .describe("The ID of the project")
      .min(1, "Project ID cannot be empty"),
    mrIid: z
      .union([z.string(), z.number()])
      .describe("The ID of the merge request"),
    mergeCommitMessage: z.string().describe("The message of the merge commit").optional(),
  });
  static outputSchema = z.any();

  static async run(args: { projectId: string; mrIid: string | number; mergeCommitMessage?: string }, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId, mrIid, mergeCommitMessage } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[accept_mr] Accept MR: ${mrIid} in project ${projectId}`);
      const mr = await api.MergeRequests.accept(projectId, mrIid, {
        merge_commit_message: mergeCommitMessage,
      });
      return mr;
    }, 'accept_mr');
    return BaseTool.formatResponse(result);
  }
}
