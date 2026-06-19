/**
 * Tool call observation handlers for pi-always-learning.
 * Captures tool_execution_start and tool_execution_end events as JSONL observations.
 */
import { getCurrentActiveInstincts } from "./active-instincts.js";
import { appendObservation } from "./observations.js";
import { shouldSkipObservation } from "./observer-guard.js";
import { scrubSecrets } from "./scrubber.js";
import { logError } from "./error-logger.js";
export const MAX_TOOL_INPUT_LENGTH = 5000;
export const MAX_TOOL_OUTPUT_LENGTH = 5000;
function truncate(text, maxLen) {
    if (text.length <= maxLen)
        return text;
    return text.slice(0, maxLen);
}
function getSessionId(ctx) {
    return ctx.sessionManager.getSessionId();
}
function buildActiveInstincts() {
    const ids = getCurrentActiveInstincts();
    return ids.length > 0 ? { active_instincts: ids } : {};
}
/**
 * Handles tool_execution_start events.
 * Records an observation with event: tool_start, tool name, and scrubbed/truncated input.
 */
export function handleToolStart(event, ctx, project, baseDir) {
    try {
        if (shouldSkipObservation())
            return;
        const raw = typeof event.args === "string" ? event.args : JSON.stringify(event.args);
        const input = truncate(scrubSecrets(raw), MAX_TOOL_INPUT_LENGTH);
        const observation = {
            timestamp: new Date().toISOString(),
            event: "tool_start",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            tool: event.toolName,
            input,
            ...buildActiveInstincts(),
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "tool-observer:handleToolStart", err, baseDir);
    }
}
/**
 * Handles tool_execution_end events.
 * Records an observation with event: tool_complete, tool name, scrubbed/truncated output, and is_error.
 */
export function handleToolEnd(event, ctx, project, baseDir) {
    try {
        if (shouldSkipObservation())
            return;
        const raw = typeof event.result === "string"
            ? event.result
            : JSON.stringify(event.result);
        const output = truncate(scrubSecrets(raw), MAX_TOOL_OUTPUT_LENGTH);
        const observation = {
            timestamp: new Date().toISOString(),
            event: "tool_complete",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            tool: event.toolName,
            output,
            is_error: event.isError,
            ...buildActiveInstincts(),
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "tool-observer:handleToolEnd", err, baseDir);
    }
}
//# sourceMappingURL=tool-observer.js.map