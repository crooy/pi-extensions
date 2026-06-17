/**
 * Storage layout creation for pi-caveman-learning.
 * Creates the directory structure under ~/.pi/continuous-learning/
 * on first use, and maintains the projects.json registry.
 */
import type { ProjectEntry } from "./types.js";
export declare function getBaseDir(): string;
export declare function getProjectDir(projectId: string, baseDir?: string): string;
export declare function getObservationsPath(projectId: string, baseDir?: string): string;
export declare function getArchiveDir(projectId: string, baseDir?: string): string;
export declare function getProjectInstinctsDir(projectId: string, source: "personal" | "inherited", baseDir?: string): string;
export declare function getGlobalInstinctsDir(source: "personal" | "inherited", baseDir?: string): string;
export declare function getProjectFactsDir(projectId: string, source: "personal", baseDir?: string): string;
export declare function getGlobalFactsDir(source: "personal", baseDir?: string): string;
export declare function getProjectsRegistryPath(baseDir?: string): string;
export declare function getGlobalSummaryPath(baseDir?: string): string;
export declare function getProjectSummaryPath(projectId: string, baseDir?: string): string;
/**
 * Ensures the full storage directory layout exists.
 * Idempotent - safe to call multiple times.
 *
 * @param project - Project entry with metadata
 * @param baseDir - Base directory (defaults to ~/.pi/continuous-learning/)
 */
export declare function ensureStorageLayout(project: ProjectEntry, baseDir?: string): void;
//# sourceMappingURL=storage.d.ts.map