/**
 * Subagent completion notifications.
 */
import { buildCompletionKey, getGlobalSeenMap, markSeenWithTtl } from "./completion-dedupe.ts";
import { SUBAGENT_ASYNC_COMPLETE_EVENT } from "../../shared/types.ts";
export default function registerSubagentNotify(pi) {
    const unsubscribeStoreKey = "__pi_subagents_notify_unsubscribe__";
    const globalStore = globalThis;
    const previousUnsubscribe = globalStore[unsubscribeStoreKey];
    if (typeof previousUnsubscribe === "function") {
        try {
            previousUnsubscribe();
        }
        catch {
            // Best effort cleanup for stale handlers from an older reload.
        }
    }
    const seen = getGlobalSeenMap("__pi_subagents_notify_seen__");
    const ttlMs = 10 * 60 * 1000;
    const handleComplete = (data) => {
        const result = data;
        const now = Date.now();
        const key = buildCompletionKey(result, "notify");
        if (markSeenWithTtl(seen, key, now, ttlMs))
            return;
        const agent = result.agent ?? "unknown";
        const summary = typeof result.summary === "string" ? result.summary : "";
        const paused = !result.success && (result.exitCode === 0
            || result.state === "paused"
            || summary.startsWith("Paused after interrupt."));
        const status = paused ? "paused" : result.success ? "completed" : "failed";
        const taskInfo = result.taskIndex !== undefined && result.totalTasks !== undefined
            ? ` (${result.taskIndex + 1}/${result.totalTasks})`
            : "";
        const sessionLine = result.shareUrl
            ? `Session: ${result.shareUrl}`
            : result.shareError
                ? `Session share error: ${result.shareError}`
                : result.sessionFile
                    ? `Session file: ${result.sessionFile}`
                    : undefined;
        const displaySummary = summary.trim() ? summary : "(no output)";
        const content = [
            `Background task ${status}: **${agent}**${taskInfo}`,
            "",
            displaySummary,
            sessionLine ? "" : undefined,
            sessionLine,
        ]
            .filter((line) => line !== undefined)
            .join("\n");
        pi.sendMessage({
            customType: "subagent-notify",
            content,
            display: true,
        }, { triggerTurn: true });
    };
    globalStore[unsubscribeStoreKey] = pi.events.on(SUBAGENT_ASYNC_COMPLETE_EVENT, handleComplete);
}
//# sourceMappingURL=notify.js.map