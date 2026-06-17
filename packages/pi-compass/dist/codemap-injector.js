import { formatCodemapMarkdown, truncateCodemap } from "./codemap-formatter.js";
export function buildCodemapInjection(codemap, stale, maxChars) {
    const markdown = formatCodemapMarkdown(codemap);
    const truncated = truncateCodemap(markdown, maxChars);
    const staleNote = stale
        ? "\n\n> This codemap may be outdated. Run `/onboard` to refresh."
        : "";
    return `\n\n${truncated}${staleNote}`;
}
export function handleBeforeAgentStart(event, state, maxChars) {
    if (state.codemapInjected)
        return undefined;
    if (!state.cachedCodemap)
        return undefined;
    const block = buildCodemapInjection(state.cachedCodemap.data, state.stale, maxChars);
    if (!block)
        return undefined;
    return { systemPrompt: event.systemPrompt + block };
}
//# sourceMappingURL=codemap-injector.js.map