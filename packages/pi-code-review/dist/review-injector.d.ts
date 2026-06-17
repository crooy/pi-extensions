import type { TurnEdits } from "./types.js";
export interface BeforeAgentStartEvent {
    type: "before_agent_start";
    prompt: string;
    systemPrompt: string;
}
export interface InjectionResult {
    systemPrompt: string;
}
export declare function buildReviewInjectionBlock(edits: TurnEdits): string | null;
export declare function handleBeforeAgentStart(event: BeforeAgentStartEvent, edits: TurnEdits): InjectionResult | undefined;
//# sourceMappingURL=review-injector.d.ts.map