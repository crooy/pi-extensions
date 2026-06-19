import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { getBaseDir, getProjectDir } from "./storage.js";
// ---------------------------------------------------------------------------
// Normalization & hashing
// ---------------------------------------------------------------------------
const TRAILING_PUNCT = /[.,!?;:]+$/;
export function normalizePrompt(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ")
        .replace(TRAILING_PUNCT, "");
}
export function hashPrompt(normalized) {
    return createHash("sha256").update(normalized).digest("hex");
}
// ---------------------------------------------------------------------------
// Storage paths
// ---------------------------------------------------------------------------
export function getProjectFrequencyPath(projectId, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "prompt-frequency.json");
}
export function getGlobalFrequencyPath(baseDir = getBaseDir()) {
    return join(baseDir, "prompt-frequency.json");
}
// ---------------------------------------------------------------------------
// Load / save
// ---------------------------------------------------------------------------
export function loadProjectFrequencyTable(projectId, baseDir = getBaseDir()) {
    const p = getProjectFrequencyPath(projectId, baseDir);
    if (!existsSync(p))
        return {};
    try {
        return JSON.parse(readFileSync(p, "utf-8"));
    }
    catch {
        return {};
    }
}
export function saveProjectFrequencyTable(table, projectId, baseDir = getBaseDir()) {
    const p = getProjectFrequencyPath(projectId, baseDir);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(table, null, 2), "utf-8");
}
export function loadGlobalFrequencyTable(baseDir = getBaseDir()) {
    const p = getGlobalFrequencyPath(baseDir);
    if (!existsSync(p))
        return {};
    try {
        return JSON.parse(readFileSync(p, "utf-8"));
    }
    catch {
        return {};
    }
}
export function saveGlobalFrequencyTable(table, baseDir = getBaseDir()) {
    const p = getGlobalFrequencyPath(baseDir);
    mkdirSync(dirname(p), { recursive: true });
    writeFileSync(p, JSON.stringify(table, null, 2), "utf-8");
}
// ---------------------------------------------------------------------------
// Pure update functions (immutable)
// ---------------------------------------------------------------------------
export function updateFrequencyTable(table, text, sessionId, now = new Date()) {
    const normalized = normalizePrompt(text);
    if (!normalized)
        return table;
    const key = hashPrompt(normalized);
    const existing = table[key];
    const nowIso = now.toISOString();
    const entry = existing
        ? {
            count: existing.count + 1,
            sessions: Array.from(new Set([...existing.sessions, sessionId])),
            last_text: text,
            first_seen: existing.first_seen,
            last_seen: nowIso,
        }
        : {
            count: 1,
            sessions: [sessionId],
            last_text: text,
            first_seen: nowIso,
            last_seen: nowIso,
        };
    return { ...table, [key]: entry };
}
export function updateGlobalFrequencyTable(table, text, sessionId, projectId, now = new Date()) {
    const normalized = normalizePrompt(text);
    if (!normalized)
        return table;
    const key = hashPrompt(normalized);
    const existing = table[key];
    const nowIso = now.toISOString();
    const entry = existing
        ? {
            count: existing.count + 1,
            sessions: Array.from(new Set([...existing.sessions, sessionId])),
            project_ids: Array.from(new Set([...existing.project_ids, projectId])),
            last_text: text,
            first_seen: existing.first_seen,
            last_seen: nowIso,
        }
        : {
            count: 1,
            sessions: [sessionId],
            project_ids: [projectId],
            last_text: text,
            first_seen: nowIso,
            last_seen: nowIso,
        };
    return { ...table, [key]: entry };
}
// ---------------------------------------------------------------------------
// Batch update from observation lines
// ---------------------------------------------------------------------------
export function updateFrequencyTablesFromLines(lines, projectTable, globalTable, now = new Date()) {
    let project = projectTable;
    let global = globalTable;
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed)
            continue;
        let obs;
        try {
            obs = JSON.parse(trimmed);
        }
        catch {
            continue;
        }
        if (obs.event !== "user_prompt" || !obs.input)
            continue;
        const sessionId = obs.session ?? "unknown";
        const projectId = obs.project_id ?? "unknown";
        project = updateFrequencyTable(project, obs.input, sessionId, now);
        global = updateGlobalFrequencyTable(global, obs.input, sessionId, projectId, now);
    }
    return { project, global };
}
//# sourceMappingURL=prompt-frequency.js.map