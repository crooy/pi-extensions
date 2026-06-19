/**
 * Fact CRUD operations.
 * Provides functions to load, save, list, and delete fact files from disk.
 * Path traversal prevention: fact IDs must be kebab-case (no ".." possible).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync, } from "node:fs";
import { join } from "node:path";
import { parseFact, serializeFact } from "./fact-parser.js";
import { getBaseDir, getProjectFactsDir, getGlobalFactsDir, } from "./storage.js";
const FACT_EXTENSION = ".md";
const CACHE_TTL_MS = 5_000;
const dirCache = new Map();
export function invalidateFactCache(dir) {
    if (dir) {
        dirCache.delete(dir);
    }
    else {
        dirCache.clear();
    }
}
function getMaxMtime(dir) {
    if (!existsSync(dir))
        return 0;
    const files = readdirSync(dir).filter((f) => f.endsWith(FACT_EXTENSION));
    let max = 0;
    for (const file of files) {
        try {
            const mt = statSync(join(dir, file)).mtimeMs;
            if (mt > max)
                max = mt;
        }
        catch {
            // skip files that disappeared between readdir and stat
        }
    }
    return max;
}
function listFactsCached(dir) {
    const now = Date.now();
    const cached = dirCache.get(dir);
    if (cached && now - cached.checkedAt < CACHE_TTL_MS) {
        return cached.facts;
    }
    const currentMaxMtime = getMaxMtime(dir);
    if (cached && currentMaxMtime === cached.maxMtime && currentMaxMtime > 0) {
        dirCache.set(dir, { ...cached, checkedAt: now });
        return cached.facts;
    }
    const facts = listFacts(dir);
    dirCache.set(dir, { facts, maxMtime: currentMaxMtime, checkedAt: now });
    return facts;
}
function assertNoPathTraversal(id) {
    if (id.includes("..") || id.includes("/") || id.includes("\\")) {
        throw new Error(`Invalid fact ID "${id}": path traversal characters are not allowed.`);
    }
}
export function loadFact(filePath) {
    const content = readFileSync(filePath, "utf-8");
    return parseFact(content);
}
export function saveFact(fact, dir) {
    assertNoPathTraversal(fact.id);
    const filePath = join(dir, `${fact.id}${FACT_EXTENSION}`);
    const content = serializeFact(fact);
    writeFileSync(filePath, content, "utf-8");
}
export function listFacts(dir) {
    if (!existsSync(dir)) {
        return [];
    }
    const files = readdirSync(dir).filter((f) => f.endsWith(FACT_EXTENSION));
    const facts = [];
    for (const file of files) {
        try {
            const fact = loadFact(join(dir, file));
            facts.push(fact);
        }
        catch {
            // Skip malformed fact files - do not crash the caller
        }
    }
    return facts;
}
export function loadProjectFacts(projectId, baseDir = getBaseDir()) {
    const dir = getProjectFactsDir(projectId, "personal", baseDir);
    return listFactsCached(dir);
}
export function loadGlobalFacts(baseDir = getBaseDir()) {
    const dir = getGlobalFactsDir("personal", baseDir);
    return listFactsCached(dir);
}
//# sourceMappingURL=fact-store.js.map