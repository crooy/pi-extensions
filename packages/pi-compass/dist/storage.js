import { mkdirSync, readFileSync, writeFileSync, } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
export function getBaseDir() {
    return join(homedir(), ".pi", "compass");
}
export function getProjectDir(projectId, baseDir = getBaseDir()) {
    return join(baseDir, "projects", projectId);
}
export function getCodemapPath(projectId, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "codemap.json");
}
export function getToursDir(projectId, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "tours");
}
export function getTourPath(projectId, topic, baseDir = getBaseDir()) {
    return join(getToursDir(projectId, baseDir), `${topic}.json`);
}
export function ensureStorageLayout(projectId, baseDir = getBaseDir()) {
    mkdirSync(getToursDir(projectId, baseDir), { recursive: true });
}
export function loadCachedCodemap(projectId, baseDir = getBaseDir()) {
    try {
        const raw = readFileSync(getCodemapPath(projectId, baseDir), "utf-8");
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function saveCachedCodemap(projectId, entry, baseDir = getBaseDir()) {
    writeFileSync(getCodemapPath(projectId, baseDir), JSON.stringify(entry, null, 2), "utf-8");
}
export function loadCachedTour(projectId, topic, baseDir = getBaseDir()) {
    try {
        const raw = readFileSync(getTourPath(projectId, topic, baseDir), "utf-8");
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function saveCachedTour(projectId, topic, entry, baseDir = getBaseDir()) {
    writeFileSync(getTourPath(projectId, topic, baseDir), JSON.stringify(entry, null, 2), "utf-8");
}
//# sourceMappingURL=storage.js.map