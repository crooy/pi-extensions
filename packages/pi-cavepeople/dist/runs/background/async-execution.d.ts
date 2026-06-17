/**
 * Async execution logic for subagent tool
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { AgentConfig } from "../../agents/agents.ts";
import { type ChainStep } from "../../shared/settings.ts";
import { type AvailableModelInfo } from "../shared/model-fallback.ts";
import { type AcceptanceInput, type ArtifactConfig, type Details, type MaxOutputConfig, type NestedRouteInfo, type ResolvedControlConfig, type SubagentRunMode } from "../../shared/types.ts";
interface AsyncExecutionContext {
    pi: ExtensionAPI;
    cwd: string;
    currentSessionId: string;
    currentModelProvider?: string;
}
interface AsyncChainParams {
    chain: ChainStep[];
    task?: string;
    resultMode?: Exclude<SubagentRunMode, "single">;
    agents: AgentConfig[];
    ctx: AsyncExecutionContext;
    availableModels?: AvailableModelInfo[];
    cwd?: string;
    maxOutput?: MaxOutputConfig;
    artifactsDir?: string;
    artifactConfig: ArtifactConfig;
    shareEnabled: boolean;
    sessionRoot?: string;
    chainSkills?: string[];
    sessionFilesByFlatIndex?: (string | undefined)[];
    dynamicFanoutMaxItems?: number;
    maxSubagentDepth: number;
    worktreeSetupHook?: string;
    worktreeSetupHookTimeoutMs?: number;
    controlConfig?: ResolvedControlConfig;
    controlIntercomTarget?: string;
    childIntercomTarget?: (agent: string, index: number) => string | undefined;
    nestedRoute?: NestedRouteInfo;
    acceptance?: AcceptanceInput;
}
interface AsyncSingleParams {
    agent: string;
    task?: string;
    agentConfig: AgentConfig;
    ctx: AsyncExecutionContext;
    cwd?: string;
    maxOutput?: MaxOutputConfig;
    artifactsDir?: string;
    artifactConfig: ArtifactConfig;
    shareEnabled: boolean;
    sessionRoot?: string;
    sessionFile?: string;
    skills?: string[];
    output?: string | boolean;
    outputMode?: "inline" | "file-only";
    modelOverride?: string;
    availableModels?: AvailableModelInfo[];
    maxSubagentDepth: number;
    worktreeSetupHook?: string;
    worktreeSetupHookTimeoutMs?: number;
    controlConfig?: ResolvedControlConfig;
    controlIntercomTarget?: string;
    childIntercomTarget?: (agent: string, index: number) => string | undefined;
    nestedRoute?: NestedRouteInfo;
    acceptance?: AcceptanceInput;
}
interface AsyncExecutionResult {
    content: Array<{
        type: "text";
        text: string;
    }>;
    details: Details;
    isError?: boolean;
}
export declare function formatAsyncStartedMessage(headline: string): string;
/**
 * Check if jiti is available for async execution
 */
export declare function isAsyncAvailable(): boolean;
/**
 * Execute a chain asynchronously
 */
export declare function executeAsyncChain(id: string, params: AsyncChainParams): AsyncExecutionResult;
/**
 * Execute a single agent asynchronously
 */
export declare function executeAsyncSingle(id: string, params: AsyncSingleParams): AsyncExecutionResult;
export {};
//# sourceMappingURL=async-execution.d.ts.map