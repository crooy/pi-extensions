import type { CodeMap } from "./types.js";
export declare function computeContentHash(cwd: string): string;
export declare function generateCodemap(cwd: string, projectId: string, projectName: string): CodeMap;
export interface CodemapResult {
    readonly codemap: CodeMap;
    readonly fromCache: boolean;
    readonly stale: boolean;
}
export declare function getOrGenerateCodemap(cwd: string, projectId: string, projectName: string, baseDir?: string): CodemapResult;
//# sourceMappingURL=codemap-generator.d.ts.map