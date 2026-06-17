import * as fs from "node:fs";
import { type IntercomEventBus, type SubagentState } from "../../shared/types.ts";
type ResultWatcherFs = Pick<typeof fs, "existsSync" | "readFileSync" | "unlinkSync" | "readdirSync" | "mkdirSync" | "watch">;
type ResultWatcherTimers = {
    setTimeout: typeof setTimeout;
    clearTimeout: typeof clearTimeout;
    setInterval: typeof setInterval;
    clearInterval: typeof clearInterval;
};
type ResultWatcherDeps = {
    fs?: ResultWatcherFs;
    timers?: ResultWatcherTimers;
};
export declare function createResultWatcher(pi: {
    events: IntercomEventBus;
}, state: SubagentState, resultsDir: string, completionTtlMs: number, deps?: ResultWatcherDeps): {
    startResultWatcher: () => void;
    primeExistingResults: () => void;
    stopResultWatcher: () => void;
};
export {};
//# sourceMappingURL=result-watcher.d.ts.map