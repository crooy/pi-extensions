/**
 * Analyzer user prompt construction.
 * Returns the user prompt string used by the Haiku background analyzer
 * to locate observations and instinct files for the current project.
 */
import type { InstalledSkill, ProjectEntry } from "../types.js";
/**
 * Reads the last `maxEntries` lines from a JSONL observations file.
 * Returns an empty array if the file does not exist.
 *
 * @param observationsPath - Absolute path to observations.jsonl
 * @param maxEntries - Maximum number of lines to return (default 500)
 */
export declare function tailObservations(observationsPath: string, maxEntries?: number): string[];
export interface TailSinceResult {
    lines: string[];
    totalLineCount: number;
    /** Number of raw new lines before preprocessing. */
    rawLineCount: number;
}
export declare function tailObservationsSince(observationsPath: string, sinceLineCount: number, maxEntries?: number, preprocess?: boolean): TailSinceResult;
export interface AnalyzerUserPromptOptions {
    agentsMdProject?: string | null;
    agentsMdGlobal?: string | null;
    installedSkills?: InstalledSkill[];
    observationLines?: string[];
}
/**
 * Builds the user prompt for the background Haiku analyzer.
 * Includes observation and instinct file paths plus project context.
 * Optionally includes AGENTS.md content and installed skills for deduplication.
 * Template construction only - no subprocess I/O.
 *
 * @param observationsPath - Absolute path to the project's observations.jsonl
 * @param instinctsDir     - Absolute path to the project's instincts directory
 * @param project          - ProjectEntry with id and name
 * @param options          - Optional AGENTS.md content and installed skills
 */
export declare function buildAnalyzerUserPrompt(observationsPath: string, instinctsDir: string, project: ProjectEntry, options?: AnalyzerUserPromptOptions): string;
//# sourceMappingURL=analyzer-user.d.ts.map