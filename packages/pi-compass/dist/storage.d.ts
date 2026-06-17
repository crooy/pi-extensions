import type { CodeMap, CodeTour, CacheEntry } from "./types.js";
export declare function getBaseDir(): string;
export declare function getProjectDir(projectId: string, baseDir?: string): string;
export declare function getCodemapPath(projectId: string, baseDir?: string): string;
export declare function getToursDir(projectId: string, baseDir?: string): string;
export declare function getTourPath(projectId: string, topic: string, baseDir?: string): string;
export declare function ensureStorageLayout(projectId: string, baseDir?: string): void;
export declare function loadCachedCodemap(projectId: string, baseDir?: string): CacheEntry<CodeMap> | null;
export declare function saveCachedCodemap(projectId: string, entry: CacheEntry<CodeMap>, baseDir?: string): void;
export declare function loadCachedTour(projectId: string, topic: string, baseDir?: string): CacheEntry<CodeTour> | null;
export declare function saveCachedTour(projectId: string, topic: string, entry: CacheEntry<CodeTour>, baseDir?: string): void;
//# sourceMappingURL=storage.d.ts.map