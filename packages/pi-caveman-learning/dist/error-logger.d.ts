/**
 * Error logging utility for pi-caveman-learning.
 * Writes structured error entries to projects/<id>/analyzer.log.
 * All write failures are silently swallowed - the logger must never throw.
 */
/**
 * Returns the absolute path to the analyzer log for the given project.
 * Exported for testing.
 */
export declare function getLogPath(projectId: string, baseDir?: string): string;
/**
 * Logs an error to `projects/<projectId>/analyzer.log`.
 *
 * When `projectId` is null (e.g. session_start failed before project detection),
 * falls back to `console.warn` only.
 *
 * Never throws - all I/O failures are silently swallowed.
 */
export declare function logError(projectId: string | null, context: string, error: unknown, baseDir?: string): void;
/**
 * Logs a warning (non-error) message to the analyzer log.
 * Used for subprocess stderr output and other non-fatal warnings.
 *
 * Never throws - all I/O failures are silently swallowed.
 */
export declare function logWarning(projectId: string | null, context: string, message: string, baseDir?: string): void;
/**
 * Logs an informational message to the analyzer log.
 * Used for tracking analyzer lifecycle events (started, completed, skipped).
 *
 * Never throws - all I/O failures are silently swallowed.
 */
export declare function logInfo(projectId: string | null, context: string, message: string, baseDir?: string): void;
//# sourceMappingURL=error-logger.d.ts.map