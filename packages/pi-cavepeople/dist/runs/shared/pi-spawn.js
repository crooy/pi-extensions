import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
export const PI_CODING_AGENT_PACKAGE = "@earendil-works/pi-coding-agent";
export function findPiPackageRootFromEntry(entryPoint) {
    let dir = path.dirname(entryPoint);
    while (dir !== path.dirname(dir)) {
        const packageJsonPath = path.join(dir, "package.json");
        if (fs.existsSync(packageJsonPath)) {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
            if (pkg.name === PI_CODING_AGENT_PACKAGE)
                return dir;
        }
        dir = path.dirname(dir);
    }
    return undefined;
}
export function resolveInstalledPiPackageRoot() {
    return findPiPackageRootFromEntry(fileURLToPath(import.meta.resolve(PI_CODING_AGENT_PACKAGE)));
}
export function resolvePiPackageRoot() {
    try {
        const entry = process.argv[1];
        return entry ? findPiPackageRootFromEntry(fs.realpathSync(entry)) : undefined;
    }
    catch {
        // process.argv[1] probing is best-effort; callers can fall back to PATH/package resolution.
        return undefined;
    }
}
function isRunnableNodeScript(filePath, existsSync) {
    if (!existsSync(filePath))
        return false;
    return /\.(?:mjs|cjs|js)$/i.test(filePath);
}
function normalizePath(filePath) {
    return path.isAbsolute(filePath) ? filePath : path.resolve(filePath);
}
export function resolveWindowsPiCliScript(deps = {}) {
    const existsSync = deps.existsSync ?? fs.existsSync;
    const readFileSync = deps.readFileSync ?? ((filePath, encoding) => fs.readFileSync(filePath, encoding));
    const argv1 = deps.argv1 ?? process.argv[1];
    if (argv1) {
        const argvPath = normalizePath(argv1);
        if (isRunnableNodeScript(argvPath, existsSync)) {
            return argvPath;
        }
    }
    try {
        const resolvePackageJson = deps.resolvePackageJson ?? (() => {
            const root = deps.piPackageRoot ?? resolvePiPackageRoot();
            if (root)
                return path.join(root, "package.json");
            const packageRoot = deps.resolvePackageEntry
                ? findPiPackageRootFromEntry(deps.resolvePackageEntry())
                : resolveInstalledPiPackageRoot();
            if (!packageRoot)
                throw new Error(`Could not resolve ${PI_CODING_AGENT_PACKAGE} package root`);
            return path.join(packageRoot, "package.json");
        });
        const packageJsonPath = resolvePackageJson();
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
        const binField = packageJson.bin;
        const binPath = typeof binField === "string"
            ? binField
            : binField?.pi ?? Object.values(binField ?? {})[0];
        if (!binPath)
            return undefined;
        const candidate = path.resolve(path.dirname(packageJsonPath), binPath);
        if (isRunnableNodeScript(candidate, existsSync)) {
            return candidate;
        }
    }
    catch {
        // Windows CLI resolution is optional; falling back to `pi` lets PATH handle execution.
        return undefined;
    }
    return undefined;
}
export function getPiSpawnCommand(args, deps = {}) {
    const platform = deps.platform ?? process.platform;
    if (platform === "win32") {
        const piCliPath = resolveWindowsPiCliScript(deps);
        if (piCliPath) {
            return {
                command: deps.execPath ?? process.execPath,
                args: [piCliPath, ...args],
            };
        }
    }
    return { command: "pi", args };
}
//# sourceMappingURL=pi-spawn.js.map