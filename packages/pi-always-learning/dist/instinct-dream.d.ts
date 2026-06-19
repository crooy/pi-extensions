/**
 * /instinct-dream slash command handler.
 *
 * Interactive version of consolidation that runs inside a Pi session.
 * Loads all instincts, builds a consolidation prompt, and sends it as
 * a followUp message for the LLM to review with the user.
 */
import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { InstalledSkill } from "./types.js";
export declare const COMMAND_NAME = "instinct-dream";
export declare function handleInstinctDream(_args: string, ctx: ExtensionCommandContext, pi: ExtensionAPI, projectId?: string | null, baseDir?: string, projectRoot?: string | null, installedSkills?: InstalledSkill[]): Promise<void>;
//# sourceMappingURL=instinct-dream.d.ts.map