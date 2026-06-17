/**
 * User prompt and agent end observation handlers for pi-caveman-learning.
 * Captures before_agent_start (user_prompt) and agent_end events as JSONL observations.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
export interface BeforeAgentStartEvent {
    type: "before_agent_start";
    prompt: string;
    systemPrompt: string;
}
export interface AgentEndEvent {
    type: "agent_end";
}
import type { ProjectEntry } from "./types.js";
/**
 * Handles before_agent_start events.
 * Records an observation with event: user_prompt and scrubbed prompt text.
 */
export declare function handleBeforeAgentStart(event: BeforeAgentStartEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
/**
 * Handles agent_end events.
 * Records an observation with event: agent_end.
 */
export declare function handleAgentEnd(_event: AgentEndEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
//# sourceMappingURL=prompt-observer.d.ts.map