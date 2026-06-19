/**
 * Graduation pipeline - pure functions for instinct lifecycle management.
 *
 * Determines which instincts are mature enough to graduate into permanent
 * knowledge (AGENTS.md, skills, or commands), and which have exceeded
 * their TTL and should be culled.
 */
import type { Instinct, GraduationTarget } from "./types.js";
export interface MaturityCheck {
    eligible: boolean;
    reasons: string[];
}
export interface GraduationCandidate {
    instinct: Instinct;
    target: GraduationTarget;
    reason: string;
}
export interface DomainCluster {
    domain: string;
    instincts: Instinct[];
}
export interface TtlResult {
    toCull: Instinct[];
    toDecay: Instinct[];
}
/**
 * Returns the age of an instinct in days based on created_at.
 * Uses a reference date for testability.
 */
export declare function getAgeDays(instinct: Instinct, now?: number): number;
/**
 * Checks whether an instinct meets all graduation maturity criteria.
 * Returns structured result with reasons for any failures.
 */
export declare function checkMaturity(instinct: Instinct, agentsMdContent: string | null, now?: number): MaturityCheck;
/**
 * Finds all instincts that qualify for graduation to AGENTS.md.
 */
export declare function findAgentsMdCandidates(instincts: Instinct[], agentsMdContent: string | null, now?: number): GraduationCandidate[];
/**
 * Groups instincts by domain, returning only clusters meeting the size threshold.
 */
export declare function findDomainClusters(instincts: Instinct[], minSize: number): DomainCluster[];
/**
 * Finds instinct clusters that qualify for skill scaffolding.
 */
export declare function findSkillCandidates(instincts: Instinct[]): DomainCluster[];
/**
 * Finds instinct clusters that qualify for command scaffolding.
 */
export declare function findCommandCandidates(instincts: Instinct[]): DomainCluster[];
/**
 * Identifies instincts that have exceeded the TTL without graduating.
 * - Instincts with confidence < cull threshold are marked for outright deletion
 * - Others are marked for aggressive decay
 */
export declare function enforceTtl(instincts: Instinct[], now?: number): TtlResult;
/**
 * Marks an instinct as graduated. Returns a new instinct with graduated_to
 * and graduated_at set. Does not mutate the original.
 */
export declare function markGraduated(instinct: Instinct, target: GraduationTarget, now?: Date): Instinct;
//# sourceMappingURL=graduation.d.ts.map