/**
 * Fact file parsing and serialization.
 * Fact files use YAML frontmatter + a markdown body for the content text.
 *
 * Format:
 * ---
 * id: some-kebab-id
 * title: Human readable title
 * confidence: 0.7
 * ...other metadata...
 * ---
 *
 * The declarative statement (e.g. "The test DB port is 3306").
 */
import type { Fact } from "./types.js";
export declare function parseFact(content: string): Fact;
export declare function serializeFact(fact: Fact): string;
//# sourceMappingURL=fact-parser.d.ts.map