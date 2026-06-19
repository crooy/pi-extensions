/**
 * /instinct-promote command for pi-always-learning.
 * Promotes project-scoped instincts to global scope.
 *
 * With an ID argument: promotes that specific project instinct to global.
 * Without an ID: auto-promotes all qualifying instincts
 *   (confidence >= 0.8, present in 2+ projects).
 */
import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { Instinct } from "./types.js";
export declare const COMMAND_NAME = "instinct-promote";
/** Minimum confidence to qualify for auto-promotion. */
export declare const AUTO_PROMOTE_MIN_CONFIDENCE = 0.8;
/** Minimum number of distinct projects an instinct must appear in for auto-promotion. */
export declare const AUTO_PROMOTE_MIN_PROJECTS = 2;
/**
 * Builds a promoted copy of the instinct with scope set to global and
 * project-specific fields removed.
 * Does NOT mutate the original.
 */
export declare function toGlobalInstinct(instinct: Instinct): Instinct;
/**
 * Returns all known project IDs from the projects.json registry.
 */
export declare function getKnownProjectIds(baseDir: string): string[];
/**
 * Promotes a single project instinct to global personal/ by ID.
 * Returns the promoted instinct, or null if not found.
 */
export declare function promoteById(id: string, projectId: string, baseDir: string): Instinct | null;
/**
 * Finds instinct IDs that appear in at least minProjects distinct projects.
 * Returns a map of id -> array of matching instincts across projects.
 */
export declare function findCrossProjectInstincts(projectIds: string[], baseDir: string): Map<string, Instinct[]>;
/**
 * Auto-promotes all qualifying instincts:
 *   - confidence >= AUTO_PROMOTE_MIN_CONFIDENCE
 *   - present in >= AUTO_PROMOTE_MIN_PROJECTS distinct projects
 * Already-global instincts (same ID in global personal/) are skipped.
 *
 * Returns the list of promoted instincts.
 */
export declare function autoPromoteInstincts(baseDir: string): Instinct[];
/**
 * Command handler for /instinct-promote.
 * With an ID arg: promotes that specific instinct.
 * Without an ID: auto-promotes qualifying instincts.
 */
export declare function handleInstinctPromote(args: string, ctx: ExtensionCommandContext, projectId?: string | null, baseDir?: string): Promise<void>;
//# sourceMappingURL=instinct-promote.d.ts.map