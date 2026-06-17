/**
 * Rendering functions for subagent results
 */
import type { AgentToolResult } from "@earendil-works/pi-agent-core";
import { type ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type Component } from "@earendil-works/pi-tui";
import { type AsyncJobState, type Details } from "../shared/types.ts";
type Theme = ExtensionContext["ui"]["theme"];
interface LegacyResultAnimationContext {
    state: {
        subagentResultAnimationTimer?: ReturnType<typeof setInterval>;
    };
}
export declare function clearLegacyResultAnimationTimer(context: LegacyResultAnimationContext): void;
export declare function widgetRenderKey(job: AsyncJobState): string;
export declare function buildWidgetLines(jobs: AsyncJobState[], theme: Theme, width?: number, expanded?: boolean): string[];
/**
 * Render the async jobs widget
 */
export declare function renderWidget(ctx: ExtensionContext, jobs: AsyncJobState[]): void;
/**
 * Render a subagent result
 */
export declare function renderSubagentResult(result: AgentToolResult<Details>, options: {
    expanded: boolean;
}, theme: Theme): Component;
export {};
//# sourceMappingURL=render.d.ts.map