import { CreateMrTool } from "./createMr.js";
import { DiffTool } from "./getDiff.js";
import { ListBranchesTool } from "./listBranches.js";
import { AcceptMrTool } from "./acceptMr.js";
import { ListMrsTool } from "./listMrs.js";
import { ProjectVariablesTool } from "./projectVariables.js";
import { DeleteBranchTool } from "./deleteBranch.js";
import { ListMembersTool } from "./listMembers.js";

export const toolClasses = [
  CreateMrTool,
  DiffTool,
  ListBranchesTool,
  AcceptMrTool,
  ListMrsTool,
  ProjectVariablesTool,
  DeleteBranchTool,
  ListMembersTool,
];

export function getAllTools() {
  return toolClasses;
}
