import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type SubagentState } from "../../shared/types.ts";
interface AsyncJobTrackerOptions {
    completionRetentionMs?: number;
    pollIntervalMs?: number;
    resultsDir?: string;
    kill?: (pid: number, signal?: NodeJS.Signals | 0) => boolean;
    now?: () => number;
}
export declare function createAsyncJobTracker(pi: Pick<ExtensionAPI, "events">, state: SubagentState, asyncDirRoot: string, options?: AsyncJobTrackerOptions): {
    ensurePoller: () => void;
    handleStarted: (data: unknown) => void;
    handleComplete: (data: unknown) => void;
    resetJobs: (ctx?: ExtensionContext) => void;
};
export {};
//# sourceMappingURL=async-job-tracker.d.ts.map