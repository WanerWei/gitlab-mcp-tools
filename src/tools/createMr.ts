import { z } from 'zod';
import { BaseTool } from './base.js';
import { CreateMrParams } from '@/types/index.js';
import { logger } from '@/utils/logger.js';

export class CreateMrTool extends BaseTool {
  static toolName = 'create_mr';
  static description = 'Create a new merge request in a GitLab project from a source branch to a target branch, with title and optional description.';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
    sourceBranch: z.string().describe('The source branch').min(1, 'Source branch cannot be empty'),
    targetBranch: z.string().describe('The target branch').min(1, 'Target branch cannot be empty'),
    title: z.string().describe('The title of the merge request').min(1, 'Title cannot be empty'),
    description: z.string().describe('The description of the merge request').optional(),
  });
  static outputSchema = z.any();

  static async run(args: CreateMrParams, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId, sourceBranch, targetBranch, title, description } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[create_mr] Creating MR: ${sourceBranch} -> ${targetBranch} in project ${projectId}`);
      const mr = await api.MergeRequests.create(
        projectId,
        sourceBranch,
        targetBranch,
        title,
        { description }
      );
      return {
        id: mr.id,
        iid: mr.iid,
        title: mr.title,
        description: mr.description,
        sourceBranch: mr.source_branch,
        targetBranch: mr.target_branch,
        state: mr.state,
        webUrl: mr.web_url,
        createdAt: mr.created_at
      };
    }, 'create_mr');
    return BaseTool.formatResponse(result);
  }
} 