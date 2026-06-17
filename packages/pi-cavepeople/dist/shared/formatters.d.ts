/**
 * Formatting utilities for display output
 */
import type { Usage, SingleResult } from "./types.ts";
import type { ChainStep } from "./settings.ts";
/**
 * Format token count with k suffix for large numbers
 */
export declare function formatTokens(n: number): string;
export declare function formatModelThinking(model?: string, thinking?: string): string;
/**
 * Format usage statistics into a compact string
 */
export declare function formatUsage(u: Usage, model?: string): string;
/**
 * Format duration in human-readable form
 */
export declare function formatDuration(ms: number): string;
/**
 * Build a summary string for a completed/failed chain
 */
export declare function buildChainSummary(steps: ChainStep[], results: SingleResult[], chainDir: string, status: "completed" | "failed", failedStep?: {
    index: number;
    error: string;
}): string;
/**
 * Format a tool call for display
 */
export declare function formatToolCall(name: string, args: Record<string, unknown>, expanded?: boolean): string;
/**
 * Shorten a path by replacing home directory with ~
 */
export declare function shortenPath(p: string): string;
//# sourceMappingURL=formatters.d.ts.map