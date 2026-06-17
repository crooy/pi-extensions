/**
 * Structured logging for the background analyzer CLI.
 * Writes to a configurable log file (default: ~/.pi/continuous-learning/analyzer.log).
 * Each line is a JSON object for easy parsing and grep-ability.
 *
 * Log levels: info, warn, error
 * Never throws - all I/O failures fall back to stderr.
 */
export interface ProjectRunStats {
    readonly project_id: string;
    readonly project_name: string;
    readonly duration_ms: number;
    readonly observations_processed: number;
    readonly observations_total: number;
    readonly instincts_created: number;
    readonly instincts_updated: number;
    readonly instincts_deleted: number;
    readonly tokens_input: number;
    readonly tokens_output: number;
    readonly tokens_cache_read: number;
    readonly tokens_cache_write: number;
    readonly tokens_total: number;
    readonly cost_usd: number;
    readonly model: string;
    readonly skipped_reason?: string;
}
export interface RunSummary {
    readonly total_duration_ms: number;
    readonly projects_processed: number;
    readonly projects_skipped: number;
    readonly projects_errored: number;
    readonly projects_total: number;
    readonly total_tokens: number;
    readonly total_cost_usd: number;
    readonly total_instincts_created: number;
    readonly total_instincts_updated: number;
    readonly total_instincts_deleted: number;
    readonly project_stats: readonly ProjectRunStats[];
}
export declare class AnalyzeLogger {
    private readonly logPath;
    constructor(logPath?: string);
    getLogPath(): string;
    info(message: string, data?: Record<string, unknown>): void;
    warn(message: string, data?: Record<string, unknown>): void;
    error(message: string, error?: unknown, data?: Record<string, unknown>): void;
    /** Log the start of a full analyzer run */
    runStart(projectCount: number): void;
    /** Log that a project was skipped (with reason) */
    projectSkipped(projectId: string, projectName: string, reason: string): void;
    /** Log the start of a project analysis */
    projectStart(projectId: string, projectName: string, newObservations: number, totalObservations: number): void;
    /** Log per-project results after analysis completes */
    projectComplete(stats: ProjectRunStats): void;
    /** Log a project that errored during analysis */
    projectError(projectId: string, projectName: string, error: unknown): void;
    /** Log the full run summary */
    runComplete(summary: RunSummary): void;
    private ensureLogDir;
    private write;
    private rotateIfNeeded;
}
//# sourceMappingURL=analyze-logger.d.ts.map