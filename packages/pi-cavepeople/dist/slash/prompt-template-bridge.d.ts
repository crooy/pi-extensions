export declare const PROMPT_TEMPLATE_SUBAGENT_REQUEST_EVENT = "prompt-template:subagent:request";
export declare const PROMPT_TEMPLATE_SUBAGENT_STARTED_EVENT = "prompt-template:subagent:started";
export declare const PROMPT_TEMPLATE_SUBAGENT_RESPONSE_EVENT = "prompt-template:subagent:response";
export declare const PROMPT_TEMPLATE_SUBAGENT_UPDATE_EVENT = "prompt-template:subagent:update";
export declare const PROMPT_TEMPLATE_SUBAGENT_CANCEL_EVENT = "prompt-template:subagent:cancel";
interface PromptTemplateDelegationTask {
    agent: string;
    task: string;
    model?: string;
    cwd?: string;
}
interface PromptTemplateDelegationRequest {
    requestId: string;
    agent: string;
    task: string;
    tasks?: PromptTemplateDelegationTask[];
    context: "fresh" | "fork";
    model: string;
    cwd: string;
    worktree?: boolean;
}
export interface PromptTemplateBridgeEvents {
    on(event: string, handler: (data: unknown) => void): (() => void) | void;
    emit(event: string, data: unknown): void;
}
interface PromptTemplateBridgeResult {
    isError?: boolean;
    content?: unknown;
    details?: {
        results?: Array<{
            agent?: string;
            messages?: unknown[];
            finalOutput?: string;
            exitCode?: number;
            error?: string;
            model?: string;
        }>;
        progress?: Array<{
            index?: number;
            agent?: string;
            status?: string;
            currentTool?: string;
            currentToolArgs?: string;
            recentOutput?: string[];
            recentTools?: Array<{
                tool?: string;
                args?: string;
            }>;
            toolCount?: number;
            durationMs?: number;
            tokens?: number;
        }>;
    };
}
interface PromptTemplateBridgeOptions<Ctx extends {
    cwd?: string;
}> {
    events: PromptTemplateBridgeEvents;
    getContext: () => Ctx | null;
    execute: (requestId: string, request: PromptTemplateDelegationRequest, signal: AbortSignal, ctx: Ctx, onUpdate: (result: PromptTemplateBridgeResult) => void) => Promise<PromptTemplateBridgeResult>;
}
export declare function registerPromptTemplateDelegationBridge<Ctx extends {
    cwd?: string;
}>(options: PromptTemplateBridgeOptions<Ctx>): {
    cancelAll: () => void;
    dispose: () => void;
};
export {};
//# sourceMappingURL=prompt-template-bridge.d.ts.map