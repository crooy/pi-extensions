import type { OutputMode, SavedOutputReference } from "../../shared/types.ts";
export interface SingleOutputSnapshot {
    exists: boolean;
    mtimeMs?: number;
    size?: number;
}
export declare function normalizeSingleOutputOverride(output: string | boolean | undefined, defaultOutput: string | undefined): string | false | undefined;
export declare function resolveSingleOutputPath(output: string | boolean | undefined, runtimeCwd: string, requestedCwd?: string): string | undefined;
export declare function injectSingleOutputInstruction(task: string, outputPath: string | undefined): string;
export declare function formatSavedOutputReference(savedPath: string, fullOutput: string): SavedOutputReference;
export declare function validateFileOnlyOutputMode(outputMode: OutputMode | undefined, outputPath: string | undefined, context: string): string | undefined;
export declare function captureSingleOutputSnapshot(outputPath: string | undefined): SingleOutputSnapshot | undefined;
export declare function resolveSingleOutput(outputPath: string | undefined, fallbackOutput: string, beforeRun: SingleOutputSnapshot | undefined): {
    fullOutput: string;
    savedPath?: string;
    saveError?: string;
};
export declare function finalizeSingleOutput(params: {
    fullOutput: string;
    truncatedOutput?: string;
    outputPath?: string;
    outputMode?: OutputMode;
    exitCode: number;
    savedPath?: string;
    outputReference?: SavedOutputReference;
    saveError?: string;
}): {
    displayOutput: string;
    savedPath?: string;
    outputReference?: SavedOutputReference;
    saveError?: string;
};
//# sourceMappingURL=single-output.d.ts.map