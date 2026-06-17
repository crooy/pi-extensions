import { createInitialState, createIdleState } from "./state-machine.js";
import { saveState, clearState, appendCycleRecord } from "./storage.js";
import { updateStatusBar, clearStatusBar, formatStatusText } from "./status-bar.js";
export const COMMAND_NAME = "tdd";
export async function handleTddCommand(args, ctx, stateRef, pi) {
    const trimmed = args.trim();
    if (trimmed === "") {
        return showStatus(ctx, stateRef);
    }
    if (trimmed.toLowerCase() === "off") {
        return deactivate(ctx, stateRef);
    }
    return activate(trimmed, ctx, stateRef, pi);
}
function showStatus(ctx, stateRef) {
    const state = stateRef.get();
    if (!state || state.phase === "idle") {
        ctx.ui.notify("TDD is not active. Use /tdd <task description> to start.", "info");
        return;
    }
    ctx.ui.notify(formatStatusText(state), "info");
}
function activate(task, ctx, stateRef, pi) {
    const currentState = stateRef.get();
    if (currentState && currentState.phase !== "idle") {
        recordCycle(currentState);
    }
    const sessionId = currentState?.session_id ?? "";
    const projectId = currentState?.project_id ?? "";
    const newState = createInitialState(task, sessionId, projectId);
    stateRef.set(newState);
    saveState(newState);
    updateStatusBar(ctx, newState);
    if (pi) {
        pi.sendUserMessage(`Implement the following using TDD (red-green-refactor): ${task}`, { deliverAs: "followUp" });
    }
    else {
        ctx.ui.notify(`TDD activated: ${task}\nPhase: RED -- Send a message to begin.`, "info");
    }
}
function deactivate(ctx, stateRef) {
    const state = stateRef.get();
    if (!state || state.phase === "idle") {
        ctx.ui.notify("TDD is not active.", "info");
        return;
    }
    recordCycle(state);
    const idleState = createIdleState(state.session_id, state.project_id);
    stateRef.set(idleState);
    clearState();
    clearStatusBar(ctx);
    ctx.ui.notify("TDD deactivated.", "info");
}
export function recordCycle(state) {
    const record = {
        task: state.task,
        session_id: state.session_id,
        project_id: state.project_id,
        started_at: state.started_at,
        completed_at: new Date().toISOString(),
        final_phase: state.phase,
        test_files: state.test_files,
        impl_files: state.impl_files,
        phase_history: state.phase_history,
    };
    appendCycleRecord(record);
}
//# sourceMappingURL=tdd-command.js.map