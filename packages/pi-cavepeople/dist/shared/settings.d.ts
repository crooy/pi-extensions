/**
 * Chain behavior, template resolution, and directory management
 */
import type { AgentConfig } from "../agents/agents.ts";
import { type AcceptanceInput, type JsonSchemaObject, type OutputMode } from "./types.ts";
export interface ResolvedStepBehavior {
    output: string | false;
    outputMode: OutputMode;
    reads: string[] | false;
    progress: boolean;
    skills: string[] | false;
    model?: string;
}
export interface StepOverrides {
    output?: string | false;
    outputMode?: OutputMode;
    reads?: string[] | false;
    progress?: boolean;
    skills?: string[] | false;
    model?: string;
}
/** Sequential step: single agent execution */
export interface SequentialStep {
    agent: string;
    task?: string;
    phase?: string;
    label?: string;
    as?: string;
    outputSchema?: JsonSchemaObject;
    cwd?: string;
    output?: string | false;
    outputMode?: OutputMode;
    reads?: string[] | false;
    progress?: boolean;
    skill?: string | string[] | false;
    model?: string;
    acceptance?: AcceptanceInput;
}
/** Parallel task item within a parallel step */
export interface ParallelTaskItem {
    agent: string;
    task?: string;
    phase?: string;
    label?: string;
    as?: string;
    outputSchema?: JsonSchemaObject;
    cwd?: string;
    count?: number;
    output?: string | false;
    outputMode?: OutputMode;
    reads?: string[] | false;
    progress?: boolean;
    skill?: string | string[] | false;
    model?: string;
    acceptance?: AcceptanceInput;
}
export interface DynamicExpandSpec {
    from: {
        output: string;
        path: string;
    };
    item?: string;
    key?: string;
    maxItems?: number;
    onEmpty?: "skip" | "fail";
}
export type DynamicParallelTemplate = Omit<ParallelTaskItem, "as" | "count">;
export interface DynamicCollectSpec {
    as: string;
    outputSchema?: JsonSchemaObject;
}
export interface DynamicParallelStep {
    expand: DynamicExpandSpec;
    parallel: DynamicParallelTemplate;
    collect: DynamicCollectSpec;
    concurrency?: number;
    failFast?: boolean;
    phase?: string;
    label?: string;
    acceptance?: AcceptanceInput;
}
/** Parallel step: multiple agents running concurrently */
export interface ParallelStep {
    parallel: ParallelTaskItem[];
    concurrency?: number;
    failFast?: boolean;
    worktree?: boolean;
    cwd?: string;
}
/** Union type for chain steps */
export type ChainStep = SequentialStep | ParallelStep | DynamicParallelStep;
export declare function isParallelStep(step: ChainStep): step is ParallelStep;
export declare function isDynamicParallelStep(step: ChainStep): step is DynamicParallelStep;
/** Get all agent names in a step (single for sequential, multiple for parallel) */
export declare function getStepAgents(step: ChainStep): string[];
export declare function createChainDir(runId: string, baseDir?: string): string;
export declare function removeChainDir(chainDir: string): void;
export declare function cleanupOldChainDirs(): void;
/** Resolved templates for a chain - string for sequential, string[] for parallel */
export type ResolvedTemplates = (string | string[])[];
/**
 * Resolve templates for a chain with parallel step support.
 * Returns string for sequential steps, string[] for parallel steps.
 */
export declare function resolveChainTemplates(steps: ChainStep[]): ResolvedTemplates;
/**
 * Resolve effective chain behavior per step.
 * Priority: step override > agent frontmatter > false (disabled)
 */
export declare function resolveStepBehavior(agentConfig: AgentConfig, stepOverrides: StepOverrides, chainSkills?: string[]): ResolvedStepBehavior;
export declare function resolveTaskTextForFileUpdatePolicy(task: string | undefined, originalTask?: string): string | undefined;
export declare function taskDisallowsFileUpdates(task: string | undefined): boolean;
export declare function suppressProgressForReadOnlyTask(behavior: ResolvedStepBehavior, task: string | undefined, originalTask?: string): ResolvedStepBehavior;
/**
 * Build chain instructions from resolved behavior.
 * These are appended to the task to tell the agent what to read/write.
 */
export declare function writeInitialProgressFile(progressDir: string): void;
export declare function buildChainInstructions(behavior: ResolvedStepBehavior, chainDir: string, isFirstProgressAgent: boolean, previousSummary?: string): {
    prefix: string;
    suffix: string;
};
/**
 * Resolve behaviors for all tasks in a parallel step.
 * Creates namespaced output paths to avoid collisions.
 */
export declare function resolveParallelBehaviors(tasks: ParallelTaskItem[], agentConfigs: AgentConfig[], stepIndex: number, chainSkills?: string[]): ResolvedStepBehavior[];
/**
 * Create subdirectories for parallel step outputs
 */
export declare function createParallelDirs(chainDir: string, stepIndex: number, taskCount: number, agentNames: string[]): void;
export type { ParallelTaskResult } from "../runs/shared/parallel-utils.ts";
export { aggregateParallelOutputs } from "../runs/shared/parallel-utils.ts";
//# sourceMappingURL=settings.d.ts.map