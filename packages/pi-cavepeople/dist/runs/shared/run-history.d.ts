export interface RunEntry {
    agent: string;
    task: string;
    ts: number;
    status: "ok" | "error";
    duration: number;
    exit?: number;
}
export declare function recordRun(agent: string, task: string, exitCode: number, durationMs: number): void;
export declare function loadRunsForAgent(agent: string): RunEntry[];
//# sourceMappingURL=run-history.d.ts.map