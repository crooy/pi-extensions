/**
 * General utility functions for the subagent extension
 */
import type { Message } from "@earendil-works/pi-ai";
import type { AsyncStatus, Details, DisplayItem, ErrorInfo, SingleResult } from "./types.ts";
export declare function getAgentDir(): string;
export declare function resolveChildCwd(baseCwd: string, childCwd: string | undefined): string;
/**
 * Read async job status from disk (with mtime-based caching)
 */
export declare function readStatus(asyncDir: string): AsyncStatus | null;
/**
 * Get human-readable last activity time for a file
 */
export declare function getLastActivity(outputFile: string | undefined): string;
/**
 * Find the latest session file in a directory
 */
export declare function findLatestSessionFile(sessionDir: string): string | null;
/**
 * Get the final text output from a list of messages
 */
export declare function getFinalOutput(messages: Message[]): string;
export declare function getSingleResultOutput(result: Pick<SingleResult, "finalOutput" | "messages">): string;
/**
 * Extract display items (text and tool calls) from messages
 */
export declare function getDisplayItems(messages: Message[] | undefined): DisplayItem[];
export declare function compactForegroundResult(result: SingleResult): SingleResult;
export declare function compactForegroundDetails(details: Details): Details;
/**
 * Detect errors in subagent execution from messages (only errors with no subsequent success)
 */
export declare function detectSubagentError(messages: Message[]): ErrorInfo;
/**
 * Extract a preview of tool arguments for display
 */
export declare function extractToolArgsPreview(args: Record<string, unknown>): string;
/**
 * Extract text content from various message content formats
 */
export declare function extractTextFromContent(content: unknown): string;
export { mapConcurrent } from "../runs/shared/parallel-utils.ts";
//# sourceMappingURL=utils.d.ts.map