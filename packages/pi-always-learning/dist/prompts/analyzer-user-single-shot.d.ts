/**
 * User prompt builder for the single-shot background analyzer.
 * Includes current instincts inline (no tool calls needed) and filtered observations.
 */
import type { InstalledSkill, Instinct, ProjectEntry } from "../types.js";
export interface SingleShotPromptOptions {
    agentsMdProject?: string | null;
    agentsMdGlobal?: string | null;
    installedSkills?: InstalledSkill[];
}
/**
 * Builds the user prompt for the single-shot analyzer.
 * Embeds all current instincts inline so the model has full context
 * without making any tool calls.
 *
 * @param project          - Project metadata
 * @param existingInstincts - All current instincts (project + global)
 * @param observationLines  - Preprocessed observation lines (JSONL strings)
 * @param options           - Optional AGENTS.md content and installed skills
 */
export declare function buildSingleShotUserPrompt(project: ProjectEntry, existingInstincts: Instinct[], observationLines: string[], options?: SingleShotPromptOptions): string;
//# sourceMappingURL=analyzer-user-single-shot.d.ts.map