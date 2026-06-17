/**
 * Fact CRUD operations.
 * Provides functions to load, save, list, and delete fact files from disk.
 * Path traversal prevention: fact IDs must be kebab-case (no ".." possible).
 */
import type { Fact } from "./types.js";
export declare function invalidateFactCache(dir?: string): void;
export declare function loadFact(filePath: string): Fact;
export declare function saveFact(fact: Fact, dir: string): void;
export declare function listFacts(dir: string): Fact[];
export declare function loadProjectFacts(projectId: string, baseDir?: string): Fact[];
export declare function loadGlobalFacts(baseDir?: string): Fact[];
//# sourceMappingURL=fact-store.d.ts.map