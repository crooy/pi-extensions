/**
 * Skill scaffolding from instinct clusters.
 *
 * When 3+ related instincts in the same domain form a cohesive topic,
 * generates a SKILL.md file that can be installed as a Pi skill.
 */
import type { DomainCluster } from "./graduation.js";
export interface SkillScaffold {
    name: string;
    description: string;
    domain: string;
    content: string;
    sourceInstinctIds: string[];
}
/**
 * Generates a SKILL.md scaffold from a domain cluster of instincts.
 */
export declare function generateSkillScaffold(cluster: DomainCluster): SkillScaffold;
/**
 * Generates skill scaffolds for all qualifying clusters.
 */
export declare function generateAllSkillScaffolds(clusters: DomainCluster[]): SkillScaffold[];
//# sourceMappingURL=skill-scaffold.d.ts.map