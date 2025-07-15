import { z } from "zod";
import { BaseTool } from "./base.js";
import { logger } from "@/utils/logger.js";

export class ProjectVariablesTool extends BaseTool {
  static toolName = "project_variables";
  static description = 'Fetch all CI/CD variables defined for a specified GitLab project.';
  static inputSchema = z.object({
    projectId: z.string().describe('The ID of the project').min(1, 'Project ID cannot be empty'),
  });
  static outputSchema = z.any();

  static async run(args: { projectId: string }, extra: any) {
    const result = await BaseTool.executeWithErrorHandling(async () => {
      const { projectId } = args;
      const api = await BaseTool.getGitlabClient();
      logger.info(`[project_variables] Get project variables: ${projectId}`);
      const variables = await api.ProjectVariables.all(projectId);
      return variables.map((v: any) => ({
        key: v.key,
        value: v.value,
        protected: v.protected,
        masked: v.masked,
        environmentScope: v.environment_scope,
      }));
    }, 'project_variables');
    return BaseTool.formatResponse(result);
  }
}
