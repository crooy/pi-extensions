import type { AgentToolResult } from "@earendil-works/pi-agent-core";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { Details } from "../shared/types.ts";
type ManagementContext = Pick<ExtensionContext, "cwd" | "modelRegistry">;
interface ManagementParams {
    action?: string;
    agent?: string;
    chainName?: string;
    agentScope?: string;
    config?: unknown;
}
export declare function handleList(params: ManagementParams, ctx: ManagementContext): AgentToolResult<Details>;
export declare function handleCreate(params: ManagementParams, ctx: ManagementContext): AgentToolResult<Details>;
export declare function handleUpdate(params: ManagementParams, ctx: ManagementContext): AgentToolResult<Details>;
export declare function handleManagementAction(action: string, params: ManagementParams, ctx: ManagementContext): AgentToolResult<Details>;
export {};
//# sourceMappingURL=agent-management.d.ts.map