/**
 * Structured logging for the background analyzer CLI.
 * Writes to a configurable log file (default: ~/.pi/continuous-learning/analyzer.log).
 * Each line is a JSON object for easy parsing and grep-ability.
 *
 * Log levels: info, warn, error
 * Never throws - all I/O failures fall back to stderr.
 */
import { appendFileSync, mkdirSync, renameSync, statSync } from "node:fs";
import { dirname } from "node:path";
import { join } from "node:path";
import { getBaseDir } from "../storage.js";
// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const DEFAULT_LOG_FILENAME = "analyzer.log";
const MAX_LOG_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB - rotate beyond this
// ---------------------------------------------------------------------------
// Logger
// ---------------------------------------------------------------------------
export class AnalyzeLogger {
    logPath;
    constructor(logPath) {
        this.logPath = logPath ?? join(getBaseDir(), DEFAULT_LOG_FILENAME);
        this.ensureLogDir();
    }
    getLogPath() {
        return this.logPath;
    }
    info(message, data) {
        this.write("info", message, data);
    }
    warn(message, data) {
        this.write("warn", message, data);
    }
    error(message, error, data) {
        const errorData = { ...data };
        if (error instanceof Error) {
            errorData.error_message = error.message;
            errorData.error_stack = error.stack;
        }
        else if (error !== undefined) {
            errorData.error_message = String(error);
        }
        this.write("error", message, errorData);
    }
    /** Log the start of a full analyzer run */
    runStart(projectCount) {
        this.info("Analyzer run started", {
            event: "run_start",
            project_count: projectCount,
            pid: process.pid,
        });
    }
    /** Log that a project was skipped (with reason) */
    projectSkipped(projectId, projectName, reason) {
        this.info(`Skipped ${projectName}`, {
            event: "project_skipped",
            project_id: projectId,
            project_name: projectName,
            reason,
        });
    }
    /** Log the start of a project analysis */
    projectStart(projectId, projectName, newObservations, totalObservations) {
        this.info(`Processing ${projectName}`, {
            event: "project_start",
            project_id: projectId,
            project_name: projectName,
            new_observations: newObservations,
            total_observations: totalObservations,
        });
    }
    /** Log per-project results after analysis completes */
    projectComplete(stats) {
        const durationSec = (stats.duration_ms / 1000).toFixed(1);
        const costFormatted = stats.cost_usd.toFixed(4);
        this.info(`Completed ${stats.project_name} in ${durationSec}s - ` +
            `tokens: ${stats.tokens_total}, cost: $${costFormatted}, ` +
            `instincts: +${stats.instincts_created} ~${stats.instincts_updated} -${stats.instincts_deleted}`, { event: "project_complete", ...stats });
    }
    /** Log a project that errored during analysis */
    projectError(projectId, projectName, error) {
        this.error(`Error processing ${projectName}`, error, {
            event: "project_error",
            project_id: projectId,
            project_name: projectName,
        });
    }
    /** Log the full run summary */
    runComplete(summary) {
        const durationSec = (summary.total_duration_ms / 1000).toFixed(1);
        const costFormatted = summary.total_cost_usd.toFixed(4);
        this.info(`Run complete in ${durationSec}s - ` +
            `${summary.projects_processed}/${summary.projects_total} projects processed, ` +
            `${summary.projects_skipped} skipped, ${summary.projects_errored} errored - ` +
            `tokens: ${summary.total_tokens}, cost: $${costFormatted}, ` +
            `instincts: +${summary.total_instincts_created} ~${summary.total_instincts_updated} -${summary.total_instincts_deleted}`, { event: "run_complete", ...summary });
    }
    // -------------------------------------------------------------------------
    // Internal
    // -------------------------------------------------------------------------
    ensureLogDir() {
        try {
            mkdirSync(dirname(this.logPath), { recursive: true });
        }
        catch {
            // Best effort
        }
    }
    write(level, message, data) {
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            ...data,
        };
        const line = JSON.stringify(entry) + "\n";
        try {
            this.rotateIfNeeded();
            appendFileSync(this.logPath, line, "utf-8");
        }
        catch {
            // Fall back to stderr - never lose log entries entirely
            process.stderr.write(`[analyze] ${line}`);
        }
    }
    rotateIfNeeded() {
        try {
            const stat = statSync(this.logPath);
            if (stat.size > MAX_LOG_SIZE_BYTES) {
                renameSync(this.logPath, this.logPath + ".old");
            }
        }
        catch {
            // File doesn't exist yet or stat failed - fine
        }
    }
}
//# sourceMappingURL=analyze-logger.js.map