/**
 * Project detection via git remote URL hashing.
 * Scopes observations and instincts to the correct project.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { ProjectEntry } from "./types.js";
/**
 * Detect the current project by inspecting git remote URL.
 *
 * Resolution order:
 *   1. git remote get-url origin  -> hash of remote URL
 *   2. git rev-parse --show-toplevel -> hash of repo root path
 *   3. fallback to project ID "global"
 */
export declare function detectProject(pi: ExtensionAPI, cwd: string): Promise<ProjectEntry>;
//# sourceMappingURL=project.d.ts.map