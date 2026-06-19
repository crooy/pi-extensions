/**
 * Pure consolidation gate logic for the "instinct-dream" holistic review.
 *
 * Determines whether enough time and sessions have elapsed since the last
 * consolidation to justify a new pass. No I/O - all inputs are passed in.
 */
/** Minimum days between consolidation runs. */
export declare const DEFAULT_CONSOLIDATION_INTERVAL_DAYS = 7;
/** Minimum distinct sessions since last consolidation. */
export declare const DEFAULT_CONSOLIDATION_MIN_SESSIONS = 10;
export interface ConsolidationMeta {
    last_consolidation_at?: string;
    last_consolidation_session_count?: number;
}
export interface ConsolidationGateInput {
    meta: ConsolidationMeta;
    currentSessionCount: number;
    now?: Date;
    intervalDays?: number;
    minSessions?: number;
}
export interface ConsolidationGateResult {
    eligible: boolean;
    reason: string;
}
/**
 * Determines whether a consolidation pass should run based on
 * elapsed time and session count since the last consolidation.
 *
 * Both conditions must be met (dual-gate):
 * 1. At least `intervalDays` since last consolidation
 * 2. At least `minSessions` new sessions since last consolidation
 */
export declare function checkConsolidationGate(input: ConsolidationGateInput): ConsolidationGateResult;
/**
 * Counts distinct session IDs in a JSONL observations file.
 * Scans all lines and extracts unique `"session":"..."` values.
 */
export declare function countDistinctSessions(obsPath: string): number;
export declare function getConsolidationMetaPath(projectId: string, baseDir?: string): string;
export declare function loadConsolidationMeta(projectId: string, baseDir?: string): ConsolidationMeta;
export declare function saveConsolidationMeta(projectId: string, meta: ConsolidationMeta, baseDir?: string): void;
//# sourceMappingURL=consolidation.d.ts.map