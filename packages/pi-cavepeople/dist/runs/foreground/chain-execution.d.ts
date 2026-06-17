/**
 * Chain execution logic for subagent tool
 */
import type { AgentToolResult } from "@earendil-works/pi-agent-core";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { AgentConfig } from "../../agents/agents.ts";
import { type ChainStep } from "../../shared/settings.ts";
import { type ActivityState, type ArtifactConfig, type ControlEvent, type Details, type IntercomEventBus, type NestedRouteInfo, type ResolvedControlConfig } from "../../shared/types.ts";
interface ChainExecutionParams {
    chain: ChainStep[];
    task?: string;
    agents: AgentConfig[];
    ctx: ExtensionContext;
    intercomEvents?: IntercomEventBus;
    signal?: AbortSignal;
    runId: string;
    cwd?: string;
    shareEnabled: boolean;
    sessionDirForIndex: (idx?: number) => string | undefined;
    sessionFileForIndex?: (idx?: number) => string | undefined;
    artifactsDir: string;
    artifactConfig: ArtifactConfig;
    includeProgress?: boolean;
    clarify?: boolean;
    onUpdate?: (r: AgentToolResult<Details>) => void;
    onControlEvent?: (event: ControlEvent) => void;
    controlConfig: ResolvedControlConfig;
    childIntercomTarget?: (agent: string, index: number) => string | undefined;
    orchestratorIntercomTarget?: string;
    foregroundControl?: {
        updatedAt: number;
        currentAgent?: string;
        currentIndex?: number;
        currentActivityState?: ActivityState;
        lastActivityAt?: number;
        currentTool?: string;
        currentToolStartedAt?: number;
        currentPath?: string;
        turnCount?: number;
        tokens?: number;
        toolCount?: number;
        interrupt?: () => boolean;
    };
    chainSkills?: string[];
    chainDir?: string;
    dynamicFanoutMaxItems?: number;
    maxSubagentDepth: number;
    nestedRoute?: NestedRouteInfo;
    worktreeSetupHook?: string;
    worktreeSetupHookTimeoutMs?: number;
}
interface ChainExecutionResult {
    content: Array<{
        type: "text";
        text: string;
    }>;
    details: Details;
    isError?: boolean;
    /** User requested async execution via TUI - caller should dispatch to executeAsyncChain */
    requestedAsync?: {
        chain: ChainStep[];
        chainSkills: string[];
    };
}
/**
 * Execute a chain of subagent steps
 */
export declare function executeChain(params: ChainExecutionParams): Promise<ChainExecutionResult>;
export {};
//# sourceMappingURL=chain-execution.d.ts.map