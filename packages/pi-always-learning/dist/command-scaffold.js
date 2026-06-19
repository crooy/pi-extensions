/**
 * Command scaffolding from instinct clusters.
 *
 * When 3+ related instincts in the same domain form an actionable workflow,
 * generates a Pi slash command scaffold that codifies the pattern.
 */
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toCommandName(domain) {
    return domain
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}
function formatInstinctAsStep(instinct, index) {
    return [
        `${index + 1}. **${instinct.title}**`,
        `   - Trigger: ${instinct.trigger}`,
        `   - Action: ${instinct.action}`,
        "",
    ].join("\n");
}
// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
/**
 * Generates a command scaffold from a domain cluster of instincts.
 * The scaffold describes a slash command that encodes the workflow
 * distilled from the instinct cluster.
 */
export function generateCommandScaffold(cluster) {
    const name = toCommandName(cluster.domain);
    const sortedInstincts = [...cluster.instincts].sort((a, b) => b.confidence - a.confidence);
    const description = `Learned ${cluster.domain} workflow from coding sessions. ` +
        `Encodes ${sortedInstincts.length} steps distilled from instinct observations.`;
    const steps = sortedInstincts.map((inst, i) => formatInstinctAsStep(inst, i));
    const content = [
        `# /${name} Command`,
        "",
        `> Auto-generated from ${sortedInstincts.length} graduated instincts in the "${cluster.domain}" domain.`,
        "",
        `## Description`,
        "",
        description,
        "",
        `## Command: \`/${name}\``,
        "",
        `When invoked, this command should guide the agent through these steps:`,
        "",
        ...steps,
        `## Implementation Notes`,
        "",
        `Register this command in your Pi extension's \`index.ts\`:`,
        "",
        "```typescript",
        `pi.registerCommand("${name}", {`,
        `  description: "${description.replace(/"/g, '\\"')}",`,
        `  handler: async (args, ctx) => {`,
        `    // TODO: Implement ${name} workflow`,
        `  },`,
        `});`,
        "```",
        "",
    ].join("\n");
    return {
        name,
        description,
        domain: cluster.domain,
        content,
        sourceInstinctIds: sortedInstincts.map((i) => i.id),
    };
}
/**
 * Generates command scaffolds for all qualifying clusters.
 */
export function generateAllCommandScaffolds(clusters) {
    return clusters.map(generateCommandScaffold);
}
//# sourceMappingURL=command-scaffold.js.map