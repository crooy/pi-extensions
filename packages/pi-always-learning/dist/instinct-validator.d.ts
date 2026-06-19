/**
 * Instinct validation and semantic deduplication.
 * Rejects instincts with empty, undefined, nonsense, or low-quality fields,
 * and detects near-duplicate instincts via Jaccard similarity.
 */
import type { Instinct } from "./types.js";
export declare const KNOWN_DOMAINS: Set<string>;
/** Common imperative verbs expected at the start of an instinct action. */
export declare const KNOWN_VERBS: Set<string>;
export interface ValidationResult {
    valid: boolean;
    reason?: string;
    /** Non-fatal warnings that indicate lower-quality instincts. */
    warnings?: string[];
}
/**
 * Validates that an instinct's fields meet quality requirements.
 *
 * Rules:
 * - action and trigger must be non-empty, non-null, non-"undefined", and >= 10 chars
 * - action first word should be a known imperative verb (warning if not)
 * - domain, if provided, must be in KNOWN_DOMAINS (with "other" as escape hatch)
 *
 * Returns { valid: true } or { valid: false, reason: "..." }.
 * Non-fatal issues are reported in the optional `warnings` array.
 */
export declare function validateInstinct(fields: {
    action: unknown;
    trigger: unknown;
    domain?: unknown;
}): ValidationResult;
/**
 * Tokenizes text into a set of meaningful lowercase words.
 * Splits on non-alphanumeric characters and filters stop words and short tokens.
 */
export declare function tokenize(text: string): Set<string>;
/**
 * Computes Jaccard similarity between two token sets.
 * Returns 1.0 for two empty sets, 0.0 if one is empty.
 */
export declare function jaccardSimilarity(a: Set<string>, b: Set<string>): number;
export interface SimilarityMatch {
    instinct: Instinct;
    similarity: number;
}
/**
 * Checks whether a candidate instinct is semantically similar to any existing instinct.
 *
 * Tokenizes trigger+action for both candidate and each existing instinct,
 * computes Jaccard similarity, and returns the closest match above the threshold.
 *
 * @param candidate  - The new instinct being considered (trigger + action)
 * @param existing   - All current instincts to check against
 * @param skipId     - ID to skip (the candidate's own ID on updates)
 * @param threshold  - Similarity threshold; default 0.6
 */
export declare function findSimilarInstinct(candidate: {
    trigger: string;
    action: string;
}, existing: Instinct[], skipId?: string, threshold?: number): SimilarityMatch | null;
//# sourceMappingURL=instinct-validator.d.ts.map