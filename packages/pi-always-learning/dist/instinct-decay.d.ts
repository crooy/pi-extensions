/**
 * Passive confidence decay for instincts.
 * Applied at the start of each analysis run to age out stale instincts.
 *
 * Decay: -0.02 per week since updated_at, clamped to [0.1, 0.9].
 * Instincts dropping below 0.1 are flagged for removal.
 *
 * US-031: Passive Confidence Decay
 */
import type { Instinct } from "./types.js";
/**
 * Applies passive decay to a single instinct.
 *
 * Returns the updated instinct (with adjusted confidence and refreshed
 * updated_at) when the decay is significant, or null if no meaningful
 * change occurred.
 *
 * Does not mutate the input instinct.
 */
export declare function applyDecayToInstinct(instinct: Instinct): Instinct | null;
/**
 * Applies decay to all instincts found in a directory.
 * Saves any instincts with meaningful confidence changes.
 *
 * @param dir - Directory containing .md instinct files
 * @returns Number of instincts updated on disk
 */
export declare function applyDecayInDir(dir: string): number;
/**
 * Runs a full decay pass over personal instincts for a project and globally.
 * Called at the start of each analysis run, before the Haiku subprocess
 * applies feedback adjustments.
 *
 * @param projectId - Project ID to decay (skipped when null/undefined)
 * @param baseDir - Base storage directory (defaults to ~/.pi/continuous-learning/)
 * @returns Total number of instincts updated across both scopes
 */
export declare function runDecayPass(projectId?: string | null, baseDir?: string): number;
//# sourceMappingURL=instinct-decay.d.ts.map