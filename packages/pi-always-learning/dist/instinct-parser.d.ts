/**
 * Instinct file parsing and serialization.
 * Instinct files use YAML frontmatter + a markdown body for the action text.
 *
 * Format:
 * ---
 * id: some-kebab-id
 * title: Human readable title
 * trigger: when condition is met
 * confidence: 0.7
 * ...other metadata...
 * ---
 *
 * Action text describing what to do.
 */
import type { Instinct } from "./types.js";
/**
 * Parse an instinct markdown file (YAML frontmatter + body) into an Instinct.
 * Throws if required fields are missing or the ID is not kebab-case.
 * Clamps confidence to 0.1–0.9 rather than throwing.
 */
export declare function parseInstinct(content: string): Instinct;
/**
 * Serialize an Instinct into a YAML-frontmatter markdown string.
 * Confidence is clamped to 0.1–0.9 before writing.
 */
export declare function serializeInstinct(instinct: Instinct): string;
//# sourceMappingURL=instinct-parser.d.ts.map