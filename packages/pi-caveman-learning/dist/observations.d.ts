/**
 * JSONL observation file writing and archival.
 * Appends observations to per-project observations.jsonl files,
 * archives files at 10MB, and cleans up archives older than 30 days.
 */
import type { Observation } from "./types.js";
/**
 * Appends one observation as a JSON line to the project's observations.jsonl.
 * Automatically archives the file if it has grown to or beyond 10MB.
 */
export declare function appendObservation(observation: Observation, projectId: string, baseDir?: string): void;
/**
 * Deletes archive files older than 30 days.
 * Should be called once per session_start.
 */
/**
 * Counts non-empty lines in the project's observations.jsonl file.
 * Returns 0 when the file does not exist.
 */
export declare function countObservations(projectId: string, baseDir?: string): number;
export declare function cleanOldArchives(projectId: string, baseDir?: string): void;
//# sourceMappingURL=observations.d.ts.map