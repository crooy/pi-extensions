import * as fs from "node:fs";
import { SessionManager } from "@earendil-works/pi-coding-agent";
export function resolveSubagentContext(value) {
    return value === "fork" ? "fork" : "fresh";
}
export function createForkContextResolver(sessionManager, requestedContext, options = {}) {
    if (resolveSubagentContext(requestedContext) !== "fork") {
        return {
            sessionFileForIndex: () => undefined,
        };
    }
    const parentSessionFile = sessionManager.getSessionFile();
    if (!parentSessionFile) {
        throw new Error("Forked subagent context requires a persisted parent session.");
    }
    const leafId = sessionManager.getLeafId();
    if (!leafId) {
        throw new Error("Forked subagent context requires a current leaf to fork from.");
    }
    const openSession = options.openSession
        ?? sessionManager.openSession
        ?? ((file, dir) => SessionManager.open(file, dir));
    const sessionDir = sessionManager.getSessionDir?.();
    const cachedSessionFiles = new Map();
    return {
        sessionFileForIndex(index = 0) {
            const cached = cachedSessionFiles.get(index);
            if (cached)
                return cached;
            try {
                if (!fs.existsSync(parentSessionFile)) {
                    throw new Error(`Parent session file does not exist: ${parentSessionFile}. Pi has not persisted enough history to fork yet.`);
                }
                const sourceManager = openSession(parentSessionFile, sessionDir);
                const sessionFile = sourceManager.createBranchedSession(leafId);
                if (!sessionFile) {
                    throw new Error("Session manager did not return a forked session file.");
                }
                if (!fs.existsSync(sessionFile)) {
                    throw new Error(`Session manager returned a forked session file that does not exist: ${sessionFile}`);
                }
                cachedSessionFiles.set(index, sessionFile);
                return sessionFile;
            }
            catch (error) {
                const cause = error instanceof Error ? error : new Error(String(error));
                throw new Error(`Failed to create forked subagent session: ${cause.message}`, { cause });
            }
        },
    };
}
//# sourceMappingURL=fork-context.js.map