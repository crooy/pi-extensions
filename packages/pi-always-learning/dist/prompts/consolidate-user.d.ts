/**
 * User prompt builder for the consolidation (dream) pass.
 * Embeds all instincts and optional AGENTS.md context.
 */
import type { Instinct, InstalledSkill } from "../types.js";
export interface ConsolidatePromptOptions {
    agentsMdProject?: string | null;
    agentsMdGlobal?: string | null;
    installedSkills?: InstalledSkill[];
    projectName?: string;
    projectId?: string;
}
/**
 * Builds the user prompt for a consolidation pass.
 * Unlike the observation analyzer, this prompt contains only instincts
 * and guidelines - no observations.
 */
export declare function buildConsolidateUserPrompt(instincts: readonly Instinct[], options?: ConsolidatePromptOptions): string;
//# sourceMappingURL=consolidate-user.d.ts.map