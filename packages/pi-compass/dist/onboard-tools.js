import { Type } from "@sinclair/typebox";
import { getOrGenerateCodemap } from "./codemap-generator.js";
import { formatCodemapMarkdown } from "./codemap-formatter.js";
import { detectAvailableTopics, getOrGenerateTour, formatTourMarkdown } from "./tour-generator.js";
const CodemapParams = Type.Object({});
const TourParams = Type.Object({
    topic: Type.Optional(Type.String({ description: "Tour topic (e.g., 'auth', 'api', 'testing'). Omit to list available topics." })),
});
function createCodemapTool(stateRef) {
    return {
        name: "codebase_map",
        label: "Codebase Map",
        description: "Returns a structured map of the current codebase including directory tree, packages, frameworks, entry points, build scripts, and conventions",
        promptSnippet: "Get or generate a structured map of the current codebase",
        parameters: CodemapParams,
        async execute(_toolCallId, _params, _signal, _onUpdate, _ctx) {
            const state = stateRef.get();
            if (!state.project) {
                throw new Error("No project detected.");
            }
            const { codemap } = getOrGenerateCodemap(state.project.root, state.project.id, state.project.name);
            const markdown = formatCodemapMarkdown(codemap);
            return {
                content: [{ type: "text", text: markdown }],
                details: { projectId: codemap.projectId, contentHash: codemap.contentHash },
            };
        },
    };
}
function createTourTool(stateRef) {
    return {
        name: "code_tour",
        label: "Code Tour",
        description: "Returns a guided walkthrough of a specific area of the codebase, or lists available topics",
        promptSnippet: "Get a guided code tour for a specific topic or area",
        parameters: TourParams,
        async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
            const state = stateRef.get();
            if (!state.project) {
                throw new Error("No project detected.");
            }
            const codemap = state.cachedCodemap?.data
                ?? getOrGenerateCodemap(state.project.root, state.project.id, state.project.name).codemap;
            if (!params.topic) {
                const topics = detectAvailableTopics(state.project.root, codemap);
                return {
                    content: [{
                            type: "text",
                            text: topics.length > 0
                                ? `Available tour topics: ${topics.join(", ")}`
                                : "No tour topics detected.",
                        }],
                    details: { topics },
                };
            }
            const tour = getOrGenerateTour(state.project.root, params.topic, codemap, state.project.id);
            return {
                content: [{ type: "text", text: formatTourMarkdown(tour) }],
                details: { topic: tour.topic, steps: tour.steps.length },
            };
        },
    };
}
export function registerOnboardTools(pi, stateRef) {
    const guidelines = [
        "Use codebase_map to understand the overall project structure. Use code_tour to walk through specific areas in detail.",
    ];
    pi.registerTool({
        ...createCodemapTool(stateRef),
        promptGuidelines: guidelines,
    });
    pi.registerTool({
        ...createTourTool(stateRef),
        promptGuidelines: guidelines,
    });
}
//# sourceMappingURL=onboard-tools.js.map