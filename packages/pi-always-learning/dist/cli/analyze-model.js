import { getModel, getProviders, } from "@earendil-works/pi-ai";
function isKnownProvider(value) {
    return getProviders().includes(value);
}
export async function resolveAnalyzerModel(config, authStorage) {
    const providerId = config.provider;
    const modelId = config.model;
    if (!isKnownProvider(providerId)) {
        throw new Error(`Unknown analyzer provider: ${providerId}`);
    }
    // getModel returns undefined for unknown model IDs but its overload signature
    // only accepts known model IDs — cast the result to include undefined so the
    // runtime guard below is reachable for arbitrary config values.
    const model = getModel(providerId, modelId);
    if (!model) {
        throw new Error(`Unknown analyzer model: ${providerId}/${modelId}`);
    }
    const apiKey = await authStorage.getApiKey(providerId);
    if (!apiKey) {
        throw new Error(`No API key configured for provider: ${providerId}. ` +
            "Set credentials via Pi auth.json, /login, or the provider's API key environment variable.");
    }
    return { apiKey, model, modelId, providerId };
}
//# sourceMappingURL=analyze-model.js.map