/**
 * /instinct-import command for pi-caveman-learning.
 * Imports instincts from a JSON file into the inherited instincts directory.
 * Destination is determined by each instinct's scope field:
 *   - scope "project" -> projects/<id>/instincts/inherited/
 *   - scope "global"  -> instincts/inherited/
 */
import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { Instinct } from "./types.js";
export declare const COMMAND_NAME = "instinct-import";
export interface ValidationError {
    index: number;
    reason: string;
}
/**
 * Validates a raw JSON object as an Instinct.
 * Returns an error string if invalid, null if valid.
 */
export declare function validateImportObject(obj: unknown, index: number): ValidationError | null;
export interface LoadResult {
    valid: Instinct[];
    invalid: ValidationError[];
}
/**
 * Reads and parses the import JSON file.
 * Returns valid instincts and validation errors separately.
 */
export declare function loadImportFile(filePath: string): LoadResult;
export interface PartitionResult {
    toImport: Instinct[];
    duplicates: string[];
}
/**
 * Partitions instincts into those to import and those skipped as duplicates.
 * Checks existing inherited instincts in both project and global directories.
 */
export declare function partitionByDuplicates(instincts: Instinct[], projectId: string | null | undefined, baseDir: string): PartitionResult;
/**
 * Returns the inherited instincts directory for the given instinct.
 * Project-scoped instincts go into the project's inherited dir.
 * Global instincts go into the global inherited dir.
 */
export declare function getTargetDir(instinct: Instinct, projectId: string | null | undefined, baseDir: string): string;
/**
 * Command handler for /instinct-import.
 * Reads the JSON file at the given path, validates each instinct,
 * skips duplicates, and saves valid instincts to inherited/ directories.
 */
export declare function handleInstinctImport(args: string, ctx: ExtensionCommandContext, projectId?: string | null, baseDir?: string): Promise<void>;
//# sourceMappingURL=instinct-import.d.ts.map