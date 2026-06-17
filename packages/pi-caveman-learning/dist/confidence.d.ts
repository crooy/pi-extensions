/**
 * Pure functions for instinct confidence scoring.
 * No I/O - all functions take plain values and return plain values.
 */
export type FeedbackOutcome = "confirmed" | "contradicted" | "inactive";
/**
 * Returns the confirmation confidence delta using diminishing returns.
 * Higher confirmed_count yields smaller increments to prevent runaway scores.
 */
export declare function confirmationDelta(confirmedCount: number): number;
export interface ConfidenceResult {
    confidence: number;
    flaggedForRemoval: boolean;
}
/**
 * Returns the initial confidence score for a newly discovered instinct
 * based on how many observations support it.
 */
export declare function initialConfidence(observationCount: number): number;
/**
 * Adjusts confidence based on a feedback outcome from the observer loop.
 * For "confirmed" outcomes, applies diminishing returns based on how many
 * times the instinct has already been confirmed (higher count = smaller delta).
 * Returns the clamped confidence and a flag indicating if removal is warranted.
 *
 * @param current       - Current confidence value
 * @param outcome       - Feedback outcome type
 * @param confirmedCount - Current confirmed_count (used for diminishing returns on confirmations)
 */
export declare function adjustConfidence(current: number, outcome: FeedbackOutcome, confirmedCount?: number): ConfidenceResult;
/**
 * Applies passive time-based decay of -0.02 per week since lastUpdated.
 * Future lastUpdated values produce zero decay.
 */
export declare function applyPassiveDecay(confidence: number, lastUpdated: string): ConfidenceResult;
//# sourceMappingURL=confidence.d.ts.map