import type { TddState, TddConfig } from "./types.js";
export declare function buildTddInjectionBlock(state: TddState, config: TddConfig): string | null;
export declare function isTestRunStale(state: TddState): boolean;
export interface BeforeAgentStartEvent {
    type: "before_agent_start";
    prompt: string;
    systemPrompt: string;
}
export interface InjectionResult {
    systemPrompt: string;
}
export declare function handleBeforeAgentStart(event: BeforeAgentStartEvent, state: TddState, config: TddConfig): InjectionResult | undefined;
//# sourceMappingURL=tdd-injector.d.ts.map