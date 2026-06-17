/**
 * Auto-cleanup rules for fact volume control.
 *
 * Cleanup is run at the start of each analysis pass.
 * Rules:
 *  1. Delete flagged_for_removal facts older than `flagged_cleanup_days`.
 *  2. Delete zero-confirmation facts older than `instinct_ttl_days`.
 *  3. Enforce per-dir hard caps by deleting lowest-confidence facts.
 */
import type { Config } from "./types.js";
export declare function cleanupFlaggedFacts(dir: string, flaggedCleanupDays: number): number;
export declare function cleanupZeroConfirmedFacts(dir: string, ttlDays: number): number;
export declare function enforceFactCap(dir: string, maxCount: number): number;
export interface FactCleanupResult {
    flaggedDeleted: number;
    zeroConfirmedDeleted: number;
    capDeleted: number;
    total: number;
}
export declare function runFactCleanupPass(projectId: string | null | undefined, config: Config, baseDir?: string): FactCleanupResult;
//# sourceMappingURL=fact-cleanup.d.ts.map