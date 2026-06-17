import { mkdirSync, readFileSync, writeFileSync, appendFileSync, unlinkSync, } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
export function getBaseDir() {
    return join(homedir(), ".pi", "red-green");
}
export function getStatePath(baseDir = getBaseDir()) {
    return join(baseDir, "state.json");
}
export function getHistoryPath(baseDir = getBaseDir()) {
    return join(baseDir, "history.jsonl");
}
export function ensureStorageLayout(baseDir = getBaseDir()) {
    mkdirSync(baseDir, { recursive: true });
}
export function loadState(baseDir = getBaseDir()) {
    const statePath = getStatePath(baseDir);
    try {
        const raw = readFileSync(statePath, "utf-8");
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function saveState(state, baseDir = getBaseDir()) {
    const statePath = getStatePath(baseDir);
    writeFileSync(statePath, JSON.stringify(state, null, 2), "utf-8");
}
export function clearState(baseDir = getBaseDir()) {
    const statePath = getStatePath(baseDir);
    try {
        unlinkSync(statePath);
    }
    catch {
        // Already absent
    }
}
export function appendCycleRecord(record, baseDir = getBaseDir()) {
    const historyPath = getHistoryPath(baseDir);
    appendFileSync(historyPath, JSON.stringify(record) + "\n", "utf-8");
}
//# sourceMappingURL=storage.js.map