import { getCurrentActiveInstincts } from "./active-instincts.js";
import { appendObservation } from "./observations.js";
import { scrubSecrets } from "./scrubber.js";
import { logError } from "./error-logger.js";
function getSessionId(ctx) {
    return ctx.sessionManager.getSessionId();
}
function buildActiveInstincts() {
    const ids = getCurrentActiveInstincts();
    return ids.length > 0 ? { active_instincts: ids } : {};
}
export function handleTurnStart(event, ctx, project, baseDir) {
    try {
        const observation = {
            timestamp: new Date().toISOString(),
            event: "turn_start",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            turn_index: event.turnIndex,
            ...buildActiveInstincts(),
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "session-observer:handleTurnStart", err, baseDir);
    }
}
export function handleTurnEnd(event, ctx, project, baseDir) {
    try {
        const toolCount = event.toolResults?.length ?? 0;
        const errorCount = Array.isArray(event.toolResults)
            ? event.toolResults.filter((r) => {
                if (r && typeof r === "object" && "isError" in r) {
                    return r.isError;
                }
                return false;
            }).length
            : 0;
        const contextUsage = ctx.getContextUsage();
        const tokensUsed = contextUsage?.tokens ?? undefined;
        const observation = {
            timestamp: new Date().toISOString(),
            event: "turn_end",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            turn_index: event.turnIndex,
            tool_count: toolCount,
            error_count: errorCount,
            ...(tokensUsed != null ? { tokens_used: tokensUsed } : {}),
            ...buildActiveInstincts(),
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "session-observer:handleTurnEnd", err, baseDir);
    }
}
export function handleUserBash(event, ctx, project, baseDir) {
    try {
        const observation = {
            timestamp: new Date().toISOString(),
            event: "user_bash",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            command: scrubSecrets(event.command),
            cwd: event.cwd,
            ...buildActiveInstincts(),
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "session-observer:handleUserBash", err, baseDir);
    }
}
export function handleSessionCompact(event, ctx, project, baseDir) {
    try {
        const observation = {
            timestamp: new Date().toISOString(),
            event: "session_compact",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            from_extension: event.fromExtension,
            ...buildActiveInstincts(),
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "session-observer:handleSessionCompact", err, baseDir);
    }
}
export function handleModelSelect(event, ctx, project, baseDir) {
    try {
        const modelName = event.model?.id ?? event.model?.name ?? "unknown";
        const previousModelName = event.previousModel?.id ?? event.previousModel?.name;
        const observation = {
            timestamp: new Date().toISOString(),
            event: "model_select",
            session: getSessionId(ctx),
            project_id: project.id,
            project_name: project.name,
            model: modelName,
            ...(previousModelName ? { previous_model: previousModelName } : {}),
            model_change_source: event.source,
        };
        appendObservation(observation, project.id, baseDir);
    }
    catch (err) {
        logError(project.id, "session-observer:handleModelSelect", err, baseDir);
    }
}
//# sourceMappingURL=session-observer.js.map