/**
 * /instinct-export command for pi-caveman-learning.
 * Exports instincts to a JSON file in the current directory.
 * Optional args: scope (project|global) and domain filter.
 */
import type { ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { Instinct, InstinctScope } from "./types.js";
declare const COMMAND_NAME = "instinct-export";
export interface ExportArgs {
    scope: InstinctScope | null;
    domain: string | null;
}
/**
 * Parses space-separated args string.
 * If first token is "project" or "global", it is treated as scope filter.
 * Remaining tokens (if any) are joined as domain filter.
 */
export declare function parseExportArgs(args: string): ExportArgs;
/**
 * Filters instincts by optional scope and domain.
 * Immutable - returns a new array.
 */
export declare function filterInstinctsForExport(instincts: Instinct[], scope: InstinctScope | null, domain: string | null): Instinct[];
/**
 * Generates an export filename with timestamp.
 * Format: instincts-export-<YYYYMMDDTHHmmss>.json
 */
export declare function buildExportFilename(now?: Date): string;
/**
 * Loads instincts from disk (project + global) for export.
 * Does NOT apply confidence filtering - export includes everything.
 */
export declare function loadAllInstinctsForExport(projectId?: string | null, baseDir?: string): Instinct[];
/**
 * Command handler for /instinct-export.
 * Loads instincts, applies optional filters, writes JSON file to cwd.
 */
export declare function handleInstinctExport(args: string, ctx: ExtensionCommandContext, projectId?: string | null, baseDir?: string): Promise<void>;
export { COMMAND_NAME };
//# sourceMappingURL=instinct-export.d.ts.map