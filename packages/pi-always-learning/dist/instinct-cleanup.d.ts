/**
 * Auto-cleanup rules for instinct volume control.
 *
 * Cleanup is run at the start of each analysis pass, before decay.
 * Rules (all thresholds are config-driven):
 *  1. Delete flagged_for_removal instincts older than `flagged_cleanup_days`.
 *  2. Delete zero-confirmation instincts older than `instinct_ttl_days`.
 *  3. Enforce per-dir hard caps by deleting lowest-confidence instincts.
 */
import type { Config } from "./types.js";
/**
 * Deletes instincts marked `flagged_for_removal` whose `updated_at` is older
 * than `flaggedCleanupDays`. `updated_at` is set when the flag is applied,
 * so it serves as a proxy for when the instinct was flagged.
 *
 * @returns Number of instincts deleted.
 */
export declare function cleanupFlaggedInstincts(dir: string, flaggedCleanupDays: number): number;
/**
 * Deletes instincts with `confirmed_count === 0` whose `created_at` is older
 * than `ttlDays`. These instincts were never validated by the agent and have
 * aged out of relevance.
 *
 * @returns Number of instincts deleted.
 */
export declare function cleanupZeroConfirmedInstincts(dir: string, ttlDays: number): number;
/**
 * Enforces a hard cap on the number of instincts in a directory.
 * When the count exceeds `maxCount`, deletes the lowest-confidence instincts
 * until the count is at or below the cap.
 *
 * @returns Number of instincts deleted.
 */
export declare function enforceInstinctCap(dir: string, maxCount: number): number;
/**
 * Flags the lower-confidence instinct in each contradictory pair.
 * When confidence is equal, both are flagged.
 * Already-flagged instincts are excluded from contradiction detection.
 *
 * @returns Number of instincts newly flagged.
 */
export declare function cleanupContradictions(dir: string): number;
export interface CleanupResult {
    flaggedDeleted: number;
    zeroConfirmedDeleted: number;
    contradictionsFlagged: number;
    capDeleted: number;
    total: number;
}
/**
 * Runs all cleanup rules against a single directory.
 * Order: flagged → zero-confirmed → cap enforcement (cap runs last so it
 * accounts for deletions made by the earlier rules).
 */
/**
 * Runs all cleanup rules against a single directory.
 * Order: flagged → zero-confirmed → contradictions → cap enforcement
 * (cap runs last so it accounts for deletions/flags from earlier rules).
 */
export declare function cleanupDir(dir: string, config: Config, maxCount: number): CleanupResult;
/**
 * Runs a full cleanup pass over project and global instinct directories.
 * Called at the start of each analysis run, before decay.
 *
 * @param projectId - Project ID to clean up (skipped when null/undefined)
 * @param config    - Runtime config (provides all thresholds)
 * @param baseDir   - Base storage directory (defaults to ~/.pi/continuous-learning/)
 * @returns Aggregated cleanup result across both scopes
 */
export declare function runCleanupPass(projectId: string | null | undefined, config: Config, baseDir?: string): CleanupResult;
//# sourceMappingURL=instinct-cleanup.d.ts.map