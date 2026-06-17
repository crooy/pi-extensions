import { type AsyncStatus } from "../../shared/types.ts";
export interface AsyncResumeParams {
    id?: string;
    runId?: string;
    dir?: string;
    index?: number;
}
export interface AsyncResumeDeps {
    asyncDirRoot?: string;
    resultsDir?: string;
    kill?: (pid: number, signal?: NodeJS.Signals | 0) => boolean;
    now?: () => number;
}
export type AsyncResumeTarget = {
    kind: "live" | "revive";
    runId: string;
    asyncDir?: string;
    state: AsyncStatus["state"];
    agent: string;
    index: number;
    intercomTarget: string;
    cwd?: string;
    sessionFile?: string;
};
export interface AsyncRunLocation {
    asyncDir: string | null;
    resultPath: string | null;
    resolvedId?: string;
}
export declare function findAsyncRunPrefixMatches(prefix: string, asyncDirRoot: string, resultsDir: string): Array<{
    id: string;
    location: AsyncRunLocation;
}>;
export declare function resolveAsyncRunLocation(params: AsyncResumeParams, asyncDirRoot: string, resultsDir: string): AsyncRunLocation;
export declare function resolveAsyncResumeTarget(params: AsyncResumeParams, deps?: AsyncResumeDeps): AsyncResumeTarget;
export declare function buildRevivedAsyncTask(target: AsyncResumeTarget, message: string): string;
//# sourceMappingURL=async-resume.d.ts.map