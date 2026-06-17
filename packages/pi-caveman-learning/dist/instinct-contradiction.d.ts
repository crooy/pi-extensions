/**
 * Contradiction detection for instincts with opposing actions.
 *
 * Detects instincts that have similar triggers but semantically opposed actions
 * using pattern-based heuristics (negation words, antonym verb pairs).
 * No LLM cost - purely deterministic.
 */
import type { Instinct } from "./types.js";
/**
 * Pairs of verbs/keywords that indicate opposing intent when one appears
 * in each action. Order within each pair does not matter.
 */
export declare const OPPOSING_VERB_PAIRS: ReadonlyArray<readonly [string, string]>;
export interface ContradictionMatch {
    instinctA: Instinct;
    instinctB: Instinct;
    triggerSimilarity: number;
    reason: string;
}
/**
 * Checks whether two actions are semantically opposing using verb pair matching
 * and negation pattern detection.
 *
 * @returns A reason string if opposing, null otherwise.
 */
export declare function hasOpposingAction(actionA: string, actionB: string): string | null;
/**
 * Finds all contradictory pairs in a set of instincts.
 *
 * A contradiction is defined as:
 * 1. Similar triggers (Jaccard similarity >= threshold on trigger tokens)
 * 2. Opposing actions (detected via verb pairs or negation patterns)
 *
 * Instincts with `flagged_for_removal` are excluded.
 * Each pair is reported once (no duplicates).
 *
 * @param instincts - All instincts to check
 * @param triggerThreshold - Jaccard similarity threshold for triggers (default 0.4)
 * @returns Array of contradiction matches
 */
export declare function findContradictions(instincts: readonly Instinct[], triggerThreshold?: number): ContradictionMatch[];
//# sourceMappingURL=instinct-contradiction.d.ts.map