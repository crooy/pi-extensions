export interface WorktreeSetup {
    cwd: string;
    worktrees: WorktreeInfo[];
    baseCommit: string;
}
interface WorktreeInfo {
    path: string;
    agentCwd: string;
    branch: string;
    index: number;
    nodeModulesLinked: boolean;
    syntheticPaths: string[];
}
interface WorktreeDiff {
    index: number;
    agent: string;
    branch: string;
    diffStat: string;
    filesChanged: number;
    insertions: number;
    deletions: number;
    patchPath: string;
}
interface WorktreeTaskCwdConflict {
    index: number;
    agent: string;
    cwd: string;
}
interface WorktreeSetupHookConfig {
    hookPath: string;
    timeoutMs?: number;
}
interface CreateWorktreesOptions {
    agents?: string[];
    setupHook?: WorktreeSetupHookConfig;
}
export declare function findWorktreeTaskCwdConflict(tasks: ReadonlyArray<{
    agent: string;
    cwd?: string;
}>, sharedCwd: string): WorktreeTaskCwdConflict | undefined;
export declare function formatWorktreeTaskCwdConflict(conflict: WorktreeTaskCwdConflict, sharedCwd: string): string;
export declare function resolveExpectedWorktreeAgentCwd(cwd: string, runId: string, index: number): string;
export declare function createWorktrees(cwd: string, runId: string, count: number, options?: CreateWorktreesOptions): WorktreeSetup;
export declare function diffWorktrees(setup: WorktreeSetup, agents: string[], diffsDir: string): WorktreeDiff[];
export declare function cleanupWorktrees(setup: WorktreeSetup): void;
export declare function formatWorktreeDiffSummary(diffs: WorktreeDiff[]): string;
export {};
//# sourceMappingURL=worktree.d.ts.map