import { type ArtifactPaths } from "./types.ts";
export declare function getArtifactsDir(sessionFile: string | null): string;
export declare function getArtifactPaths(artifactsDir: string, runId: string, agent: string, index?: number): ArtifactPaths;
export declare function ensureArtifactsDir(dir: string): void;
export declare function writeArtifact(filePath: string, content: string): void;
export declare function writeMetadata(filePath: string, metadata: object): void;
export declare function appendJsonl(filePath: string, line: string): void;
export declare function cleanupOldArtifacts(dir: string, maxAgeDays: number): void;
export declare function cleanupAllArtifactDirs(maxAgeDays: number): void;
//# sourceMappingURL=artifacts.d.ts.map