import { McpTool } from "@/types";
import { createMrTool } from "./createMr";
import { compareVersionTool } from "./compareVersion";

export class ToolRegistry {
  private tools: Map<string, McpTool> = new Map();

  constructor() {
    this.registerDefaultTools();
  }

  private registerDefaultTools() {
    this.registerTool(createMrTool);
    this.registerTool(compareVersionTool);
  }

  registerTool(tool: McpTool) {
    this.tools.set(tool.name, tool);
  }

  getTool(name: string): McpTool | undefined {
    return this.tools.get(name);
  }

  getAllTools(): McpTool[] {
    return Array.from(this.tools.values());
  }

  getToolNames(): string[] {
    return Array.from(this.tools.keys());
  }

  hasTool(name: string): boolean {
    return this.tools.has(name);
  }
}

export const toolRegistry = new ToolRegistry();
