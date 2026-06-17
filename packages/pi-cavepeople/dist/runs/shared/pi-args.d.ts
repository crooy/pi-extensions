import { parseNestedPathEnv, type NestedPathEntry } from "./nested-path.ts";
import type { JsonSchemaObject } from "../../shared/types.ts";
export declare const SUBAGENT_CHILD_ENV = "PI_SUBAGENT_CHILD";
export declare const SUBAGENT_ORCHESTRATOR_TARGET_ENV = "PI_SUBAGENT_ORCHESTRATOR_TARGET";
export declare const SUBAGENT_RUN_ID_ENV = "PI_SUBAGENT_RUN_ID";
export declare const SUBAGENT_CHILD_AGENT_ENV = "PI_SUBAGENT_CHILD_AGENT";
export declare const SUBAGENT_CHILD_INDEX_ENV = "PI_SUBAGENT_CHILD_INDEX";
export declare const SUBAGENT_FANOUT_CHILD_ENV = "PI_SUBAGENT_FANOUT_CHILD";
export declare const SUBAGENT_PARENT_EVENT_SINK_ENV = "PI_SUBAGENT_PARENT_EVENT_SINK";
export declare const SUBAGENT_PARENT_CONTROL_INBOX_ENV = "PI_SUBAGENT_PARENT_CONTROL_INBOX";
export declare const SUBAGENT_PARENT_ROOT_RUN_ID_ENV = "PI_SUBAGENT_PARENT_ROOT_RUN_ID";
export declare const SUBAGENT_PARENT_RUN_ID_ENV = "PI_SUBAGENT_PARENT_RUN_ID";
export declare const SUBAGENT_PARENT_CHILD_INDEX_ENV = "PI_SUBAGENT_PARENT_CHILD_INDEX";
export declare const SUBAGENT_PARENT_DEPTH_ENV = "PI_SUBAGENT_PARENT_DEPTH";
export declare const SUBAGENT_PARENT_PATH_ENV = "PI_SUBAGENT_PARENT_PATH";
export declare const SUBAGENT_PARENT_CAPABILITY_TOKEN_ENV = "PI_SUBAGENT_PARENT_CAPABILITY_TOKEN";
interface BuildPiArgsInput {
    baseArgs: string[];
    task: string;
    sessionEnabled: boolean;
    sessionDir?: string;
    sessionFile?: string;
    model?: string;
    thinking?: string;
    systemPromptMode?: "append" | "replace";
    inheritProjectContext: boolean;
    inheritSkills: boolean;
    tools?: string[];
    extensions?: string[];
    systemPrompt?: string | null;
    mcpDirectTools?: string[];
    cwd?: string;
    promptFileStem?: string;
    intercomSessionName?: string;
    orchestratorIntercomTarget?: string;
    runId?: string;
    childAgentName?: string;
    childIndex?: number;
    parentEventSink?: string;
    parentControlInbox?: string;
    parentRootRunId?: string;
    parentRunId?: string;
    parentChildIndex?: number;
    parentDepth?: number;
    parentPath?: NestedPathEntry[];
    parentCapabilityToken?: string;
    structuredOutput?: {
        schema: JsonSchemaObject;
        schemaPath: string;
        outputPath: string;
    };
}
interface BuildPiArgsResult {
    args: string[];
    env: Record<string, string | undefined>;
    tempDir?: string;
}
export declare function applyThinkingSuffix(model: string | undefined, thinking: string | undefined): string | undefined;
export declare function buildPiArgs(input: BuildPiArgsInput): BuildPiArgsResult;
export declare const parseParentPathEnv: typeof parseNestedPathEnv;
export declare function cleanupTempDir(tempDir: string | null | undefined): void;
export {};
//# sourceMappingURL=pi-args.d.ts.map