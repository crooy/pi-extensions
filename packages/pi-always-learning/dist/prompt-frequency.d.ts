import type { PromptFrequencyTable, GlobalPromptFrequencyTable } from "./types.js";
export declare function normalizePrompt(text: string): string;
export declare function hashPrompt(normalized: string): string;
export declare function getProjectFrequencyPath(projectId: string, baseDir?: string): string;
export declare function getGlobalFrequencyPath(baseDir?: string): string;
export declare function loadProjectFrequencyTable(projectId: string, baseDir?: string): PromptFrequencyTable;
export declare function saveProjectFrequencyTable(table: PromptFrequencyTable, projectId: string, baseDir?: string): void;
export declare function loadGlobalFrequencyTable(baseDir?: string): GlobalPromptFrequencyTable;
export declare function saveGlobalFrequencyTable(table: GlobalPromptFrequencyTable, baseDir?: string): void;
export declare function updateFrequencyTable(table: PromptFrequencyTable, text: string, sessionId: string, now?: Date): PromptFrequencyTable;
export declare function updateGlobalFrequencyTable(table: GlobalPromptFrequencyTable, text: string, sessionId: string, projectId: string, now?: Date): GlobalPromptFrequencyTable;
export declare function updateFrequencyTablesFromLines(lines: readonly string[], projectTable: PromptFrequencyTable, globalTable: GlobalPromptFrequencyTable, now?: Date): {
    readonly project: PromptFrequencyTable;
    readonly global: GlobalPromptFrequencyTable;
};
//# sourceMappingURL=prompt-frequency.d.ts.map