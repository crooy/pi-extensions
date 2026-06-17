import type { ModelInfo as AvailableModelInfo } from "../../shared/model-info.ts";
import type { Usage } from "../../shared/types.ts";
export type { AvailableModelInfo };
interface ModelAttemptSummary {
    model: string;
    success: boolean;
    exitCode?: number | null;
    error?: string;
    usage?: Usage;
}
export declare function splitThinkingSuffix(model: string): {
    baseModel: string;
    thinkingSuffix: string;
};
export declare function resolveModelCandidate(model: string | undefined, availableModels: AvailableModelInfo[] | undefined, preferredProvider?: string): string | undefined;
export declare function buildModelCandidates(primaryModel: string | undefined, fallbackModels: string[] | undefined, availableModels: AvailableModelInfo[] | undefined, preferredProvider?: string): string[];
export declare function isRetryableModelFailure(error: string | undefined): boolean;
export declare function formatModelAttemptNote(attempt: ModelAttemptSummary, nextModel?: string): string;
//# sourceMappingURL=model-fallback.d.ts.map