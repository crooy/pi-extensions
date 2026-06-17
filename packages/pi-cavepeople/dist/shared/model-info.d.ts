export declare const THINKING_LEVELS: readonly ["off", "minimal", "low", "medium", "high", "xhigh"];
export type ThinkingLevel = typeof THINKING_LEVELS[number];
export type ThinkingLevelMap = Partial<Record<ThinkingLevel, string | null>>;
export interface ModelInfo {
    provider: string;
    id: string;
    fullId: string;
    reasoning?: boolean;
    thinkingLevelMap?: ThinkingLevelMap;
}
interface RegistryModelLike {
    provider: string;
    id: string;
    reasoning?: boolean;
    thinkingLevelMap?: ThinkingLevelMap;
}
export declare function toModelInfo(model: RegistryModelLike): ModelInfo;
/** Resolve the effective thinking level from a model string (which may contain a known suffix like `:high`)
 * and an explicit thinking config value. Returns `undefined` when no thinking is applicable
 * (e.g. no model was specified, or the model has no suffix and no config was provided). */
export declare function resolveEffectiveThinking(model: string | undefined, configThinking: string | undefined): string | undefined;
export declare function splitKnownThinkingSuffix(model: string): {
    baseModel: string;
    thinkingSuffix: string;
};
export declare function findModelInfo(model: string | undefined, availableModels: ModelInfo[] | undefined, preferredProvider?: string): ModelInfo | undefined;
export declare function getSupportedThinkingLevels(model: ModelInfo | undefined): ThinkingLevel[];
export {};
//# sourceMappingURL=model-info.d.ts.map