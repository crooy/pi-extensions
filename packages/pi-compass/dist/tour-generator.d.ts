import type { CodeMap, CodeTour } from "./types.js";
export declare function detectAvailableTopics(_cwd: string, codemap: CodeMap): readonly string[];
export declare function generateTour(cwd: string, topic: string, codemap: CodeMap): CodeTour;
export declare function formatTourMarkdown(tour: CodeTour): string;
export declare function getOrGenerateTour(cwd: string, topic: string, codemap: CodeMap, projectId: string, baseDir?: string): CodeTour;
//# sourceMappingURL=tour-generator.d.ts.map