/**
 * Instinct CRUD operations.
 * Provides functions to load, save, list, and delete instinct files from disk.
 * Path traversal prevention: instinct IDs must be kebab-case (no ".." possible).
 */
import type { Instinct } from "./types.js";
export declare function invalidateCache(dir?: string): void;
/**
 * Load a single instinct from a .md file path.
 */
export declare function loadInstinct(filePath: string): Instinct;
/**
 * Save an instinct to <dir>/<id>.md.
 * Validates the instinct ID against path traversal before writing.
 */
export declare function saveInstinct(instinct: Instinct, dir: string): void;
/**
 * List and load all instincts from a directory.
 * Silently skips files that fail to parse (malformed instinct files).
 */
export declare function listInstincts(dir: string): Instinct[];
/**
 * Load all personal instincts for a specific project.
 */
export declare function loadProjectInstincts(projectId: string, baseDir?: string): Instinct[];
/**
 * Load all global personal instincts.
 */
export declare function loadGlobalInstincts(baseDir?: string): Instinct[];
//# sourceMappingURL=instinct-store.d.ts.map