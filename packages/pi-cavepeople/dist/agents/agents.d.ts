/**
 * Agent discovery and configuration
 */
import type { AcceptanceInput, OutputMode } from "../shared/types.ts";
export { buildRuntimeName, frontmatterNameForConfig, parsePackageName } from "./identity.ts";
export type AgentScope = "user" | "project" | "both";
export type AgentSource = "builtin" | "user" | "project";
type SystemPromptMode = "append" | "replace";
export type AgentDefaultContext = "fresh" | "fork";
export declare function defaultSystemPromptMode(name: string): SystemPromptMode;
export declare function defaultInheritProjectContext(name: string): boolean;
export declare function defaultInheritSkills(): boolean;
export interface BuiltinAgentOverrideBase {
    model?: string;
    fallbackModels?: string[];
    thinking?: string;
    systemPromptMode: SystemPromptMode;
    inheritProjectContext: boolean;
    inheritSkills: boolean;
    defaultContext?: AgentDefaultContext;
    disabled?: boolean;
    systemPrompt: string;
    skills?: string[];
    tools?: string[];
    mcpDirectTools?: string[];
    completionGuard?: boolean;
}
interface BuiltinAgentOverrideConfig {
    model?: string | false;
    fallbackModels?: string[] | false;
    thinking?: string | false;
    systemPromptMode?: SystemPromptMode;
    inheritProjectContext?: boolean;
    inheritSkills?: boolean;
    defaultContext?: AgentDefaultContext | false;
    disabled?: boolean;
    systemPrompt?: string;
    skills?: string[] | false;
    tools?: string[] | false;
    completionGuard?: boolean;
}
interface BuiltinAgentOverrideInfo {
    scope: "user" | "project";
    path: string;
    base: BuiltinAgentOverrideBase;
}
export interface AgentConfig {
    name: string;
    localName?: string;
    packageName?: string;
    description: string;
    tools?: string[];
    mcpDirectTools?: string[];
    model?: string;
    fallbackModels?: string[];
    thinking?: string;
    systemPromptMode: SystemPromptMode;
    inheritProjectContext: boolean;
    inheritSkills: boolean;
    defaultContext?: AgentDefaultContext;
    systemPrompt: string;
    source: AgentSource;
    filePath: string;
    skills?: string[];
    extensions?: string[];
    output?: string;
    defaultReads?: string[];
    defaultProgress?: boolean;
    interactive?: boolean;
    maxSubagentDepth?: number;
    completionGuard?: boolean;
    disabled?: boolean;
    extraFields?: Record<string, string>;
    override?: BuiltinAgentOverrideInfo;
}
export interface ChainStepConfig {
    agent?: string;
    task?: string;
    phase?: string;
    label?: string;
    as?: string;
    outputSchema?: string | Record<string, unknown>;
    output?: string | false;
    outputMode?: OutputMode;
    reads?: string[] | false;
    model?: string;
    skills?: string[] | false;
    progress?: boolean;
    parallel?: unknown;
    expand?: unknown;
    collect?: unknown;
    concurrency?: number;
    failFast?: boolean;
    worktree?: boolean;
    acceptance?: AcceptanceInput;
}
export interface ChainConfig {
    name: string;
    localName?: string;
    packageName?: string;
    description: string;
    source: AgentSource;
    filePath: string;
    steps: ChainStepConfig[];
    extraFields?: Record<string, string>;
}
export interface ChainDiscoveryDiagnostic {
    source: "user" | "project";
    filePath: string;
    error: string;
}
interface AgentDiscoveryResult {
    agents: AgentConfig[];
    projectAgentsDir: string | null;
}
export declare function buildBuiltinOverrideConfig(base: BuiltinAgentOverrideBase, draft: Pick<AgentConfig, "model" | "fallbackModels" | "thinking" | "systemPromptMode" | "inheritProjectContext" | "inheritSkills" | "defaultContext" | "disabled" | "systemPrompt" | "skills" | "tools" | "mcpDirectTools" | "completionGuard">): BuiltinAgentOverrideConfig | undefined;
export declare function saveBuiltinAgentOverride(cwd: string, name: string, scope: "user" | "project", override: BuiltinAgentOverrideConfig): string;
export declare function removeBuiltinAgentOverride(cwd: string, name: string, scope: "user" | "project"): string;
export declare function discoverAgents(cwd: string, scope: AgentScope): AgentDiscoveryResult;
export declare function discoverAgentsAll(cwd: string): {
    builtin: AgentConfig[];
    user: AgentConfig[];
    project: AgentConfig[];
    chains: ChainConfig[];
    chainDiagnostics: ChainDiscoveryDiagnostic[];
    userDir: string;
    projectDir: string | null;
    userChainDir: string;
    projectChainDir: string | null;
    userSettingsPath: string;
    projectSettingsPath: string | null;
};
//# sourceMappingURL=agents.d.ts.map