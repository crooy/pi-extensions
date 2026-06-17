import { type ActivityState, type AsyncJobStep, type AsyncParallelGroupStatus, type NestedRunSummary, type SubagentRunMode, type TokenUsage } from "../../shared/types.ts";
interface AsyncRunStepSummary {
    index: number;
    agent: string;
    label?: string;
    phase?: string;
    outputName?: string;
    structured?: boolean;
    status: AsyncJobStep["status"];
    activityState?: ActivityState;
    lastActivityAt?: number;
    currentTool?: string;
    currentToolArgs?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    recentTools?: Array<{
        tool: string;
        args: string;
        endMs: number;
    }>;
    recentOutput?: string[];
    turnCount?: number;
    toolCount?: number;
    durationMs?: number;
    tokens?: TokenUsage;
    skills?: string[];
    model?: string;
    thinking?: string;
    attemptedModels?: string[];
    error?: string;
    children?: NestedRunSummary[];
}
export interface AsyncRunSummary {
    id: string;
    asyncDir: string;
    sessionId?: string;
    state: "queued" | "running" | "complete" | "failed" | "paused";
    activityState?: ActivityState;
    lastActivityAt?: number;
    currentTool?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    turnCount?: number;
    toolCount?: number;
    mode: SubagentRunMode;
    cwd?: string;
    startedAt: number;
    lastUpdate?: number;
    endedAt?: number;
    currentStep?: number;
    chainStepCount?: number;
    parallelGroups?: AsyncParallelGroupStatus[];
    steps: AsyncRunStepSummary[];
    sessionDir?: string;
    outputFile?: string;
    totalTokens?: TokenUsage;
    sessionFile?: string;
    nestedChildren?: NestedRunSummary[];
    nestedWarnings?: string[];
}
interface AsyncRunListOptions {
    states?: Array<AsyncRunSummary["state"]>;
    sessionId?: string;
    limit?: number;
    resultsDir?: string;
    kill?: (pid: number, signal?: NodeJS.Signals | 0) => boolean;
    now?: () => number;
    reconcile?: boolean;
}
export declare function listAsyncRuns(asyncDirRoot: string, options?: AsyncRunListOptions): AsyncRunSummary[];
export declare function formatAsyncRunOutputPath(run: Pick<AsyncRunSummary, "asyncDir" | "outputFile">): string | undefined;
export declare function formatAsyncRunProgressLabel(run: Pick<AsyncRunSummary, "mode" | "state" | "currentStep" | "chainStepCount" | "parallelGroups" | "steps">): string;
export declare function formatAsyncRunList(runs: AsyncRunSummary[], heading?: string): string;
export {};
//# sourceMappingURL=async-status.d.ts.map