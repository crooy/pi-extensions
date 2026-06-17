import type { AuthStorage } from "@earendil-works/pi-coding-agent";
import { type Api, type Model } from "@earendil-works/pi-ai";
import type { Config } from "../types.js";
type AnalyzerAuthStorage = Pick<AuthStorage, "getApiKey">;
export interface AnalyzerModelResolution {
    readonly apiKey: string;
    readonly model: Model<Api>;
    readonly modelId: string;
    readonly providerId: string;
}
export declare function resolveAnalyzerModel(config: Config, authStorage: AnalyzerAuthStorage): Promise<AnalyzerModelResolution>;
export {};
//# sourceMappingURL=analyze-model.d.ts.map