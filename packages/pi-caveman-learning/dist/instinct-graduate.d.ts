/**
 * /instinct-graduate command for pi-caveman-learning.
 *
 * Scans instincts for graduation candidates, presents proposals to the user,
 * and writes to AGENTS.md / scaffolds skills / scaffolds commands on approval.
 * Also enforces TTL - culling or decaying stale instincts.
 */
import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { Instinct } from "./types.js";
import type { GraduationCandidate, DomainCluster, TtlResult } from "./graduation.js";
import type { SkillScaffold } from "./skill-scaffold.js";
import type { CommandScaffold } from "./command-scaffold.js";
export declare const COMMAND_NAME = "instinct-graduate";
/**
 * Builds the full graduation prompt to send to the LLM for user-facing review.
 */
export declare function buildGraduationPrompt(agentsMdCandidates: GraduationCandidate[], skillClusters: DomainCluster[], commandClusters: DomainCluster[], ttl: TtlResult): string;
/**
 * Graduates instincts to AGENTS.md. Writes entries and marks instincts as graduated.
 */
export declare function graduateToAgentsMd(instincts: Instinct[], agentsMdPath: string, baseDir: string): Instinct[];
/**
 * Graduates instincts to a skill scaffold. Writes SKILL.md and marks instincts.
 */
export declare function graduateToSkill(cluster: DomainCluster, outputDir: string, baseDir: string): SkillScaffold;
/**
 * Graduates instincts to a command scaffold. Writes command doc and marks instincts.
 */
export declare function graduateToCommand(cluster: DomainCluster, outputDir: string, baseDir: string): CommandScaffold;
/**
 * Deletes TTL-expired instincts from disk.
 */
export declare function cullExpiredInstincts(instincts: Instinct[], baseDir: string): number;
/**
 * Aggressively decays TTL-expired instincts by halving their confidence.
 */
export declare function decayExpiredInstincts(instincts: Instinct[], baseDir: string): number;
/**
 * Command handler for /instinct-graduate.
 * Scans for graduation candidates and sends a prompt for user review.
 */
export declare function handleInstinctGraduate(_args: string, ctx: ExtensionCommandContext, pi: ExtensionAPI, projectId?: string | null, baseDir?: string, projectRoot?: string | null): Promise<void>;
//# sourceMappingURL=instinct-graduate.d.ts.map