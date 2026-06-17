import type { TddConfig } from "./types.js";
export type FileClassification = "test" | "implementation" | "other";
export declare function detectLanguage(filePath: string): string | null;
export declare function classifyFile(filePath: string, config: TddConfig): FileClassification;
//# sourceMappingURL=file-classifier.d.ts.map