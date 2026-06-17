/**
 * /instinct-status command for pi-caveman-learning.
 * Displays all instincts grouped by domain with confidence scores,
 * trend arrows, and feedback ratios.
 */
import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { Instinct, Fact } from "./types.js";
declare const COMMAND_NAME = "instinct-status";
/**
 * Returns a trend arrow based on confirmed vs contradicted counts.
 * ↑ when confirmed > contradicted, ↓ when contradicted > confirmed, → when equal.
 */
export declare function getTrendArrow(instinct: Instinct): string;
/**
 * Formats a single instinct line for display.
 * Format: [confidence] title trend feedback_ratio [⚠ FLAGGED FOR REMOVAL]
 */
export declare function formatInstinct(instinct: Instinct): string;
/**
 * Groups instincts by domain. Returns a sorted record (sorted by domain name).
 */
export declare function groupByDomain(instincts: Instinct[]): Record<string, Instinct[]>;
/**
 * Formats the full status output string from a list of instincts.
 * Returns a header message when no instincts exist.
 */
export declare function formatStatusOutput(instincts: Instinct[]): string;
/**
 * Formats a single fact line for display.
 */
export declare function formatFact(fact: Fact): string;
/**
 * Formats all facts as a status section string.
 * Returns empty string when no facts exist.
 */
export declare function formatFactsStatusSection(facts: Fact[]): string;
/**
 * Loads all instincts from disk (project + global), including flagged ones.
 * Does NOT apply confidence filtering - status command shows everything.
 */
export declare function loadAllInstincts(projectId?: string | null, baseDir?: string): Instinct[];
/**
 * Command handler for /instinct-status.
 * Loads all instincts and facts, formats them grouped by domain, and notifies the user.
 */
export declare function handleInstinctStatus(_args: string, ctx: ExtensionCommandContext, projectId?: string | null, baseDir?: string): Promise<void>;
export { COMMAND_NAME };
//# sourceMappingURL=instinct-status.d.ts.map