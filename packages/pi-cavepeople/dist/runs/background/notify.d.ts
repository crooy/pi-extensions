/**
 * Subagent completion notifications.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
export interface SubagentNotifyDetails {
    agent: string;
    status: "completed" | "failed" | "paused";
    taskInfo?: string;
    resultPreview: string;
    durationMs?: number;
    sessionLabel?: string;
    sessionValue?: string;
}
export default function registerSubagentNotify(pi: ExtensionAPI): void;
//# sourceMappingURL=notify.d.ts.map