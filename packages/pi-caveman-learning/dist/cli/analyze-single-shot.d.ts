/**
 * Single-shot (non-agentic) analyzer core.
 *
 * Replaces the multi-turn agentic session with a single complete() call.
 * The model receives all current instincts inline and returns a JSON change-set.
 * Changes are applied client-side, eliminating the ~16x cache-read multiplier.
 */
import type { AssistantMessage, Context } from "@earendil-works/pi-ai";
import { complete } from "@earendil-works/pi-ai";
import type { Instinct } from "../types.js";
export interface InstinctChangePayload {
    id: string;
    title: string;
    trigger: string;
    action: string;
    confidence: number;
    domain: string;
    scope: "project" | "global";
    observation_count?: number;
    confirmed_count?: number;
    contradicted_count?: number;
    inactive_count?: number;
    evidence?: string[];
    last_confirmed_session?: string;
}
export interface InstinctChange {
    action: "create" | "update" | "delete";
    instinct?: InstinctChangePayload;
    /** For delete: the instinct ID to remove. */
    id?: string;
    /** For delete: the scope to target. */
    scope?: "project" | "global";
}
export interface SingleShotResult {
    changes: InstinctChange[];
    message: AssistantMessage;
}
/**
 * Parses the model's raw text response into an array of InstinctChange.
 * Strips markdown code fences if present. Throws on invalid JSON or schema.
 */
export declare function parseChanges(raw: string): InstinctChange[];
/**
 * Builds a full Instinct from a create/update change.
 * Returns null for delete changes, changes with missing instinct data,
 * invalid fields, or semantically duplicate actions.
 *
 * @param change        - The change to apply
 * @param existing      - The existing instinct with this ID, if any
 * @param projectId     - Project ID for scoping
 * @param allInstincts  - All current instincts, used for dedup check on creates
 */
export declare function buildInstinctFromChange(change: InstinctChange, existing: Instinct | null, projectId: string, allInstincts?: Instinct[]): Instinct | null;
/**
 * Formats existing instincts as a compact JSON array for inline context.
 * Reduces token usage by ~70% compared to full YAML+markdown serialization.
 * Includes only the fields the analyzer needs to make decisions.
 */
export declare function formatInstinctsCompact(instincts: Instinct[]): string;
/**
 * Estimates the token count of a text string using a chars/token heuristic.
 */
export declare function estimateTokens(text: string): number;
/**
 * Formats existing instincts as serialized markdown blocks for inline context.
 * @deprecated Use formatInstinctsCompact for lower token usage.
 */
export declare function formatInstinctsForPrompt(instincts: Instinct[]): string;
/**
 * Runs a single complete() call with the provided context.
 * Returns parsed changes and the raw AssistantMessage (for usage stats).
 */
export declare function runSingleShot(context: Context, model: Parameters<typeof complete>[0], apiKey: string, signal?: AbortSignal): Promise<SingleShotResult>;
//# sourceMappingURL=analyze-single-shot.d.ts.map