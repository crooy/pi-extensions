import type { AgentToolResult } from "@earendil-works/pi-agent-core";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type AgentConfig, type AgentScope } from "../../agents/agents.ts";
import { type ChainStep } from "../../shared/settings.ts";
import { type AcceptanceInput, type ControlConfig, type Details, type ExtensionConfig, type MaxOutputConfig, type SubagentState } from "../../shared/types.ts";
interface TaskParam {
    agent: string;
    task: string;
    cwd?: string;
    count?: number;
    output?: string | boolean;
    outputMode?: "inline" | "file-only";
    reads?: string[] | boolean;
    progress?: boolean;
    model?: string;
    skill?: string | string[] | boolean;
    acceptance?: AcceptanceInput;
}
export interface SubagentParamsLike {
    action?: string;
    id?: string;
    runId?: string;
    dir?: string;
    index?: number;
    agent?: string;
    task?: string;
    message?: string;
    chain?: ChainStep[];
    tasks?: TaskParam[];
    concurrency?: number;
    worktree?: boolean;
    context?: "fresh" | "fork";
    async?: boolean;
    clarify?: boolean;
    share?: boolean;
    control?: ControlConfig;
    sessionDir?: string;
    cwd?: string;
    maxOutput?: MaxOutputConfig;
    artifacts?: boolean;
    includeProgress?: boolean;
    model?: string;
    skill?: string | string[] | boolean;
    output?: string | boolean;
    outputMode?: "inline" | "file-only";
    agentScope?: unknown;
    chainDir?: string;
    acceptance?: AcceptanceInput;
}
interface ExecutorDeps {
    pi: ExtensionAPI;
    state: SubagentState;
    config: ExtensionConfig;
    asyncByDefault: boolean;
    tempArtifactsDir: string;
    getSubagentSessionRoot: (parentSessionFile: string | null) => string;
    expandTilde: (p: string) => string;
    discoverAgents: (cwd: string, scope: AgentScope) => {
        agents: AgentConfig[];
    };
    allowMutatingManagementActions?: boolean;
}
export declare function createSubagentExecutor(deps: ExecutorDeps): {
    execute: (id: string, params: SubagentParamsLike, signal: AbortSignal, onUpdate: ((r: AgentToolResult<Details>) => void) | undefined, ctx: ExtensionContext) => Promise<AgentToolResult<Details>>;
};
export {};
//# sourceMappingURL=subagent-executor.d.ts.map