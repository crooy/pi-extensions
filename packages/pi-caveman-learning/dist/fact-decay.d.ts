/**
 * Passive confidence decay for facts.
 * Applied at the start of each analysis run to age out stale facts.
 *
 * Decay: -0.05 per week since updated_at, clamped to [0.1, 0.9].
 * Facts dropping below 0.1 are flagged for removal.
 */
import type { Fact } from "./types.js";
export declare function applyDecayToFact(fact: Fact): Fact | null;
export declare function applyFactDecayInDir(dir: string): number;
export declare function runFactDecayPass(projectId?: string | null, baseDir?: string): number;
//# sourceMappingURL=fact-decay.d.ts.map