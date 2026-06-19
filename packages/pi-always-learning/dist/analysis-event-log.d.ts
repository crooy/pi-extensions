/**
 * Append-only analysis event log with atomic rename for safe consumption.
 *
 * The background analyzer appends events to `analysis-events.jsonl`.
 * The extension consumes events by atomically renaming the file to
 * `.consumed`, reading it, then deleting it. On POSIX, rename is atomic -
 * any in-flight appends follow the inode to the renamed file.
 *
 * Multiple analyzer runs can append before the extension reads. No events
 * are lost because each run only appends; the file is never truncated by
 * the analyzer.
 */
export interface InstinctChangeSummary {
    readonly id: string;
    readonly title: string;
    readonly scope: "project" | "global";
    readonly trigger?: string;
    readonly action?: string;
    readonly confidence_delta?: number;
}
export interface AnalysisEvent {
    readonly timestamp: string;
    readonly project_id: string;
    readonly project_name: string;
    readonly created: readonly InstinctChangeSummary[];
    readonly updated: readonly InstinctChangeSummary[];
    readonly deleted: readonly InstinctChangeSummary[];
}
export declare function getEventsPath(projectId: string, baseDir?: string): string;
export declare function getConsumedPath(projectId: string, baseDir?: string): string;
/**
 * Appends an analysis event to the project's event log.
 * Skips writing if nothing changed (all arrays empty).
 * Creates the parent directory if needed.
 */
export declare function appendAnalysisEvent(event: AnalysisEvent, baseDir?: string): void;
/**
 * Atomically consumes all pending analysis events for a project.
 *
 * Strategy:
 * 1. Check for orphaned `.consumed` file from a prior crash - read it first
 * 2. Rename `analysis-events.jsonl` to `.consumed` (atomic on POSIX)
 * 3. Read and parse all lines from `.consumed`
 * 4. Delete `.consumed`
 *
 * Returns an empty array if no events exist or rename fails (e.g. file
 * doesn't exist, or another consumer raced us).
 */
export declare function consumeAnalysisEvents(projectId: string, baseDir?: string): readonly AnalysisEvent[];
//# sourceMappingURL=analysis-event-log.d.ts.map