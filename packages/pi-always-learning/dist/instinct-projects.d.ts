/**
 * /instinct-projects command for pi-always-learning.
 * Displays all known projects with their instinct counts and last seen dates.
 */
import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { ProjectEntry } from "./types.js";
export declare const COMMAND_NAME = "instinct-projects";
/**
 * Reads the projects.json registry. Returns an empty record on missing/invalid file.
 */
export declare function readProjectsRegistry(baseDir?: string): Record<string, ProjectEntry>;
/**
 * Counts .md files in a project's personal instincts directory.
 * Returns 0 if the directory does not exist.
 */
export declare function countProjectInstincts(projectId: string, baseDir?: string): number;
/**
 * Formats an ISO 8601 date string as a human-readable local date.
 * Falls back to the raw string on parse failure.
 */
export declare function formatDate(isoDate: string): string;
/**
 * Formats the full projects output string from a registry.
 * Returns a fallback message when no projects exist.
 */
export declare function formatProjectsOutput(registry: Record<string, ProjectEntry>, baseDir?: string): string;
/**
 * Command handler for /instinct-projects.
 * Reads the project registry, counts instincts per project, and displays results.
 */
export declare function handleInstinctProjects(_args: string, ctx: ExtensionCommandContext, baseDir?: string): Promise<void>;
//# sourceMappingURL=instinct-projects.d.ts.map