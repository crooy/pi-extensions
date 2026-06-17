import type { CodeMap, CompassState } from "./types.js";
export interface BeforeAgentStartEvent {
    type: "before_agent_start";
    prompt: string;
    systemPrompt: string;
}
export interface InjectionResult {
    systemPrompt: string;
}
export declare function buildCodemapInjection(codemap: CodeMap, stale: boolean, maxChars: number): string;
export declare function handleBeforeAgentStart(event: BeforeAgentStartEvent, state: CompassState, maxChars: number): InjectionResult | undefined;
//# sourceMappingURL=codemap-injector.d.ts.map