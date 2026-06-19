/**
 * System prompt injection for pi-always-learning.
 * Loads filtered instincts and appends them to the system prompt on each
 * before_agent_start event so the agent benefits from learned behaviors.
 * Also bridges injected instinct IDs to shared active-instincts state (US-023).
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { BeforeAgentStartEvent, AgentEndEvent } from "./prompt-observer.js";
import type { Config, Instinct, Fact } from "./types.js";
/** Subset of BeforeAgentStartEventResult used by this module. */
export interface InjectionResult {
    /** Replacement system prompt to use for this turn. */
    systemPrompt?: string;
}
export declare const INSTINCTS_HEADER = "## \uD83E\uDDE0 Instincts";
export declare const FACTS_HEADER = "## \uD83D\uDCCB Facts";
/**
 * Builds the injection block string from a list of instincts.
 * Returns null when the list is empty (no block needed).
 */
export declare function buildInjectionBlock(instincts: Instinct[], maxChars?: number): string | null;
/**
 * Builds the facts injection block string from a list of facts.
 * Returns null when the list is empty (no block needed).
 * Format per bullet: `- [0.75] content text`
 */
export declare function buildFactsInjectionBlock(facts: Fact[], maxChars?: number): string | null;
/**
 * Returns a modified system prompt string with injected instincts,
 * or null when no qualifying instincts were found.
 * Pure function - no I/O.
 */
export declare function injectInstincts(systemPrompt: string, instincts: Instinct[]): string | null;
/**
 * Handles before_agent_start events.
 * Loads qualifying instincts, appends them to the system prompt, and stores
 * their IDs in shared active-instincts state for observation tagging (US-023).
 * Returns undefined when no instincts qualify (no-op).
 */
export declare function handleBeforeAgentStartInjection(event: BeforeAgentStartEvent, _ctx: ExtensionContext, config: Config, projectId?: string | null, baseDir?: string): InjectionResult | void;
/**
 * Handles agent_end events.
 * Clears active instincts state so the next prompt starts clean (US-023).
 */
export declare function handleAgentEndClearInstincts(_event: AgentEndEvent, _ctx: ExtensionContext): void;
//# sourceMappingURL=instinct-injector.d.ts.map