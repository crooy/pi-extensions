/**
 * Utility for reading and writing AGENTS.md files.
 * Provides safe wrappers around filesystem access.
 */
import type { Instinct } from "./types.js";
/**
 * Reads an AGENTS.md file and returns its content.
 * Returns null if the file does not exist or cannot be read.
 *
 * @param filePath - Absolute path to the AGENTS.md file
 */
export declare function readAgentsMd(filePath: string): string | null;
/**
 * Formats an instinct as an AGENTS.md section entry.
 * Produces a markdown block with the instinct title as heading and
 * trigger/action as content.
 */
export declare function formatInstinctAsAgentsMdEntry(instinct: Instinct): string;
/**
 * Generates a complete AGENTS.md diff showing proposed additions.
 * Returns the full new content that would result from appending the entries.
 */
export declare function generateAgentsMdDiff(currentContent: string | null, instincts: Instinct[]): string;
/**
 * Appends graduated instinct entries to an AGENTS.md file.
 * Creates the file and parent directories if they don't exist.
 *
 * @param filePath - Absolute path to AGENTS.md
 * @param instincts - Instincts to append as entries
 * @returns The new file content that was written
 */
export declare function appendToAgentsMd(filePath: string, instincts: Instinct[]): string;
//# sourceMappingURL=agents-md.d.ts.map