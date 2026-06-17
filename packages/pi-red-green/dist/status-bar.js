const PHASE_LABELS = {
    idle: "IDLE",
    red: "RED",
    green: "GREEN",
    refactor: "REFACTOR",
    complete: "COMPLETE",
};
export function formatStatusText(state) {
    const label = PHASE_LABELS[state.phase];
    if (state.phase === "idle" || !state.task) {
        return `TDD: ${label}`;
    }
    const truncatedTask = state.task.length > 40 ? state.task.slice(0, 37) + "..." : state.task;
    return `TDD: ${label} - ${truncatedTask}`;
}
export function updateStatusBar(ctx, state) {
    try {
        ctx.ui.setStatus?.("pi-red-green", formatStatusText(state));
    }
    catch {
        // Graceful fallback: setStatus may not be supported
    }
}
export function clearStatusBar(ctx) {
    try {
        ctx.ui.setStatus?.("pi-red-green", undefined);
    }
    catch {
        // Graceful fallback
    }
}
//# sourceMappingURL=status-bar.js.map