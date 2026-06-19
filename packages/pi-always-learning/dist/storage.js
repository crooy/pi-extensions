/**
 * Storage layout creation for pi-always-learning.
 * Creates the directory structure under ~/.pi/continuous-learning/
 * on first use, and maintains the projects.json registry.
 */
import { homedir } from "node:os";
import { join } from "node:path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
export function getBaseDir() {
    return join(homedir(), ".pi", "continuous-learning");
}
export function getProjectDir(projectId, baseDir = getBaseDir()) {
    return join(baseDir, "projects", projectId);
}
export function getObservationsPath(projectId, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "observations.jsonl");
}
export function getArchiveDir(projectId, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "observations.archive");
}
export function getProjectInstinctsDir(projectId, source, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "instincts", source);
}
export function getGlobalInstinctsDir(source, baseDir = getBaseDir()) {
    return join(baseDir, "instincts", source);
}
export function getProjectFactsDir(projectId, source, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "facts", source);
}
export function getGlobalFactsDir(source, baseDir = getBaseDir()) {
    return join(baseDir, "facts", source);
}
export function getProjectsRegistryPath(baseDir = getBaseDir()) {
    return join(baseDir, "projects.json");
}
export function getGlobalSummaryPath(baseDir = getBaseDir()) {
    return join(baseDir, "INSTINCT_SUMMARY.md");
}
export function getProjectSummaryPath(projectId, baseDir = getBaseDir()) {
    return join(getProjectDir(projectId, baseDir), "INSTINCT_SUMMARY.md");
}
function ensureDir(dir) {
    mkdirSync(dir, { recursive: true });
}
function readProjectsRegistry(registryPath) {
    if (!existsSync(registryPath)) {
        return {};
    }
    try {
        return JSON.parse(readFileSync(registryPath, "utf-8"));
    }
    catch {
        return {};
    }
}
/**
 * Ensures the full storage directory layout exists.
 * Idempotent - safe to call multiple times.
 *
 * @param project - Project entry with metadata
 * @param baseDir - Base directory (defaults to ~/.pi/continuous-learning/)
 */
export function ensureStorageLayout(project, baseDir = getBaseDir()) {
    // Global instinct directories
    ensureDir(join(baseDir, "instincts", "personal"));
    ensureDir(join(baseDir, "instincts", "inherited"));
    ensureDir(join(baseDir, "facts", "personal"));
    // Project-scoped directories
    const projectDir = getProjectDir(project.id, baseDir);
    ensureDir(join(projectDir, "instincts", "personal"));
    ensureDir(join(projectDir, "instincts", "inherited"));
    ensureDir(join(projectDir, "facts", "personal"));
    ensureDir(join(projectDir, "observations.archive"));
    // Write project.json only if it does not yet exist
    const projectJsonPath = join(projectDir, "project.json");
    if (!existsSync(projectJsonPath)) {
        writeFileSync(projectJsonPath, JSON.stringify(project, null, 2), "utf-8");
    }
    // Update projects.json registry (always updates the entry)
    const registryPath = getProjectsRegistryPath(baseDir);
    const registry = readProjectsRegistry(registryPath);
    const updated = { ...registry, [project.id]: project };
    writeFileSync(registryPath, JSON.stringify(updated, null, 2), "utf-8");
}
//# sourceMappingURL=storage.js.map