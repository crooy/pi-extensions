/**
 * Command scaffolding from instinct clusters.
 *
 * When 3+ related instincts in the same domain form an actionable workflow,
 * generates a Pi slash command scaffold that codifies the pattern.
 */
import type { DomainCluster } from "./graduation.js";
export interface CommandScaffold {
    name: string;
    description: string;
    domain: string;
    content: string;
    sourceInstinctIds: string[];
}
/**
 * Generates a command scaffold from a domain cluster of instincts.
 * The scaffold describes a slash command that encodes the workflow
 * distilled from the instinct cluster.
 */
export declare function generateCommandScaffold(cluster: DomainCluster): CommandScaffold;
/**
 * Generates command scaffolds for all qualifying clusters.
 */
export declare function generateAllCommandScaffolds(clusters: DomainCluster[]): CommandScaffold[];
//# sourceMappingURL=command-scaffold.d.ts.map