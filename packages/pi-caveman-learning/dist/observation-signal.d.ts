/**
 * Observation batch signal scoring.
 * Determines whether a batch of observations contains enough signal
 * to warrant running the analyzer (and spending tokens).
 */
import type { PromptFrequencyTable } from "./types.js";
export declare const LOW_SIGNAL_THRESHOLD = 3;
export interface FrequencyBoostContext {
    readonly projectFrequency: PromptFrequencyTable;
    readonly minSessions: number;
    readonly scoreBoost: number;
}
interface ScoreResult {
    readonly score: number;
    readonly errors: number;
    readonly corrections: number;
    readonly userPrompts: number;
    readonly recurringPrompts: number;
    readonly activeInstinctBoost: number;
}
export declare const ACTIVE_INSTINCT_BOOST_CAP = 3;
export declare function scoreObservationBatch(lines: string[], freqContext?: FrequencyBoostContext): ScoreResult;
export declare function isLowSignalBatch(lines: string[], freqContext?: FrequencyBoostContext): boolean;
export {};
//# sourceMappingURL=observation-signal.d.ts.map