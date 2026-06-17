import type { Message } from "@earendil-works/pi-ai";
interface CompletionMutationGuardInput {
    agent: string;
    task: string;
    messages: Message[];
    tools?: string[];
    mcpDirectTools?: string[];
}
interface CompletionMutationGuardResult {
    expectedMutation: boolean;
    attemptedMutation: boolean;
    triggered: boolean;
}
export declare function expectsImplementationMutation(agent: string, task: string): boolean;
export declare function hasMutationToolCall(messages: Message[]): boolean;
export declare function evaluateCompletionMutationGuard(input: CompletionMutationGuardInput): CompletionMutationGuardResult;
export {};
//# sourceMappingURL=completion-guard.d.ts.map