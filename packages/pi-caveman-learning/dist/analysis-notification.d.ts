/**
 * Extension-side notification for analysis events.
 *
 * On `before_agent_start`, consumes pending analysis events and shows
 * a brief one-line notification summarizing instinct changes since the
 * last session interaction.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type AnalysisEvent } from "./analysis-event-log.js";
/**
 * Aggregates multiple analysis events into a single summary line.
 * Returns null when no changes occurred.
 */
export declare function formatNotification(events: readonly AnalysisEvent[]): string | null;
/**
 * Checks for pending analysis events and shows a notification if any exist.
 * Safe to call on every `before_agent_start` - no-ops when there's nothing.
 */
export declare function checkAnalysisNotifications(ctx: ExtensionContext, projectId: string | null, baseDir?: string): void;
//# sourceMappingURL=analysis-notification.d.ts.map