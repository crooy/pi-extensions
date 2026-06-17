export interface RunnerSubagentStep {
    agent: string;
    task: string;
    phase?: string;
    label?: string;
    outputName?: string;
    structured?: boolean;
    cwd?: string;
    model?: string;
    thinking?: string;
    modelCandidates?: string[];
    tools?: string[];
    extensions?: string[];
    mcpDirectTools?: string[];
    completionGuard?: boolean;
    systemPrompt?: string | null;
    systemPromptMode?: "append" | "replace";
    inheritProjectContext: boolean;
    inheritSkills: boolean;
    skills?: string[];
    outputPath?: string;
    outputMode?: "inline" | "file-only";
    sessionFile?: string;
    maxSubagentDepth?: number;
    structuredOutput?: {
        schema: import("../../shared/types.ts").JsonSchemaObject;
        schemaPath: string;
        outputPath: string;
    };
    structuredOutputSchema?: import("../../shared/types.ts").JsonSchemaObject;
    effectiveAcceptance?: import("../../shared/types.ts").ResolvedAcceptanceConfig;
}
export interface ParallelStepGroup {
    parallel: RunnerSubagentStep[];
    concurrency?: number;
    failFast?: boolean;
    worktree?: boolean;
}
export interface DynamicRunnerGroup {
    expand: import("../../shared/settings.ts").DynamicExpandSpec;
    parallel: RunnerSubagentStep;
    collect: import("../../shared/settings.ts").DynamicCollectSpec;
    concurrency?: number;
    failFast?: boolean;
    phase?: string;
    label?: string;
    effectiveAcceptance?: import("../../shared/types.ts").ResolvedAcceptanceConfig;
}
export type RunnerStep = RunnerSubagentStep | ParallelStepGroup | DynamicRunnerGroup;
export declare function isParallelGroup(step: RunnerStep): step is ParallelStepGroup;
export declare function isDynamicRunnerGroup(step: RunnerStep): step is DynamicRunnerGroup;
export declare function flattenSteps(steps: RunnerStep[]): RunnerSubagentStep[];
export declare function mapConcurrent<T, R>(items: T[], limit: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]>;
export interface ParallelTaskResult {
    agent: string;
    taskIndex?: number;
    output: string;
    exitCode: number | null;
    error?: string;
    model?: string;
    attemptedModels?: string[];
    outputTargetPath?: string;
    outputTargetExists?: boolean;
}
export declare function aggregateParallelOutputs(results: ParallelTaskResult[], headerFormat?: (index: number, agent: string) => string): string;
export declare const MAX_PARALLEL_CONCURRENCY = 4;
//# sourceMappingURL=parallel-utils.d.ts.map