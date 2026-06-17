/**
 * Instinct loading and filtering for the injector.
 * Loads project and global instincts, filters by confidence threshold,
 * sorts by confidence descending, and caps to max_instincts.
 */
import type { Instinct, Config } from "./types.js";
export declare function inferDomains(userPrompt: string): Set<string>;
export interface LoadInstinctsOptions {
    /** Project ID, or undefined/null when running outside a project. */
    projectId?: string | null;
    /** Minimum confidence threshold (default: DEFAULT_CONFIG.min_confidence). */
    minConfidence?: number;
    /** Maximum number of instincts to return (default: DEFAULT_CONFIG.max_instincts). */
    maxInstincts?: number;
    /** Optional base directory for storage (used in tests). */
    baseDir?: string;
    /** Domains relevant to the current context — matched instincts sort first. */
    relevantDomains?: Set<string>;
}
/**
 * Filters, sorts, and caps a flat list of instincts.
 * Pure function - no I/O.
 */
export declare function filterInstincts(instincts: Instinct[], minConfidence: number, maxInstincts: number, relevantDomains?: Set<string>): Instinct[];
/**
 * Loads instincts from disk, filters by confidence threshold, sorts by
 * confidence descending, and caps to max_instincts.
 *
 * When projectId is provided (and non-null), loads both project-scoped
 * instincts and global instincts. Otherwise loads only global instincts.
 */
export declare function loadAndFilterInstincts(options?: LoadInstinctsOptions): Instinct[];
/**
 * Convenience wrapper - uses thresholds from a Config object.
 */
export declare function loadAndFilterFromConfig(config: Config, projectId?: string | null, baseDir?: string, relevantDomains?: Set<string>): Instinct[];
//# sourceMappingURL=instinct-loader.d.ts.map