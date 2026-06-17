interface CompletionDataLike {
    id?: unknown;
    agent?: unknown;
    timestamp?: unknown;
    sessionId?: unknown;
    taskIndex?: unknown;
    totalTasks?: unknown;
    success?: unknown;
}
export declare function buildCompletionKey(data: CompletionDataLike, fallback: string): string;
export declare function markSeenWithTtl(seen: Map<string, number>, key: string, now: number, ttlMs: number): boolean;
export declare function getGlobalSeenMap(storeKey: string): Map<string, number>;
export {};
//# sourceMappingURL=completion-dedupe.d.ts.map