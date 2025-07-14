import { z } from 'zod';
import { BaseTool } from './base';
import { CreateMrParams } from '@/types';
import { logger } from '@/utils/logger';

export class CreateMrTool extends BaseTool {
  name = 'gitlab.createMr';
  description = 'Create GitLab Merge Request';
  
  inputSchema = z.object({
    projectId: z.string().min(1, 'Project ID cannot be empty'),
    sourceBranch: z.string().min(1, 'Source branch cannot be empty'),
    targetBranch: z.string().min(1, 'Target branch cannot be empty'),
    title: z.string().min(1, 'Title cannot be empty'),
    description: z.string().optional(),
  });

  outputSchema = z.any();

  async run(args: CreateMrParams, extra: any) {
    const result = await this.executeWithErrorHandling(async () => {
      const { projectId, sourceBranch, targetBranch, title, description } = args;
      
      const api = await this.getGitlabClient();
      
      logger.info(`[${this.name}] Creating MR: ${sourceBranch} -> ${targetBranch} in project ${projectId}`);
      
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
    });

    return this.formatResponse(result);
  }
}

export const createMrTool = new CreateMrTool(); 