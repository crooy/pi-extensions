/**
 * Tool call observation handlers for pi-caveman-learning.
 * Captures tool_execution_start and tool_execution_end events as JSONL observations.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
export interface ToolExecutionStartEvent {
    type: "tool_execution_start";
    toolCallId: string;
    toolName: string;
    args: unknown;
}
export interface ToolExecutionEndEvent {
    type: "tool_execution_end";
    toolCallId: string;
    toolName: string;
    result: unknown;
    isError: boolean;
}
import type { ProjectEntry } from "./types.js";
export declare const MAX_TOOL_INPUT_LENGTH = 5000;
export declare const MAX_TOOL_OUTPUT_LENGTH = 5000;
/**
 * Handles tool_execution_start events.
 * Records an observation with event: tool_start, tool name, and scrubbed/truncated input.
 */
export declare function handleToolStart(event: ToolExecutionStartEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
/**
 * Handles tool_execution_end events.
 * Records an observation with event: tool_complete, tool name, scrubbed/truncated output, and is_error.
 */
export declare function handleToolEnd(event: ToolExecutionEndEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
//# sourceMappingURL=tool-observer.d.ts.map