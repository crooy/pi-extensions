import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const IGNORED_DIRS = new Set([
    "node_modules", ".git", "dist", "build", ".next", ".nuxt",
    "__pycache__", ".tox", ".mypy_cache", ".pytest_cache",
    "target", ".gradle", ".idea", ".vscode",
    "vendor", "coverage", ".turbo", ".cache",
]);
export function buildDirectoryTree(cwd, depth = 2) {
    return scanDir(cwd, cwd, depth);
}
function scanDir(dir, root, remaining) {
    if (remaining <= 0)
        return [];
    let entries;
    try {
        entries = readdirSync(dir);
    }
    catch {
        return [];
    }
    const result = [];
    for (const name of entries.sort()) {
        if (name.startsWith(".") && name !== ".github")
            continue;
        if (IGNORED_DIRS.has(name))
            continue;
        const fullPath = join(dir, name);
        let stat;
        try {
            stat = statSync(fullPath);
        }
        catch {
            continue;
        }
        if (stat.isDirectory()) {
            const children = remaining > 1 ? scanDir(fullPath, root, remaining - 1) : undefined;
            result.push({ name, type: "dir", ...(children ? { children } : {}) });
        }
        else if (stat.isFile()) {
            result.push({ name, type: "file" });
        }
    }
    return result;
}
export function formatDirectoryTree(entries, indent = "") {
    const lines = [];
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const isLast = i === entries.length - 1;
        const prefix = isLast ? "└── " : "├── ";
        const childIndent = indent + (isLast ? "    " : "│   ");
        lines.push(`${indent}${prefix}${entry.name}${entry.type === "dir" ? "/" : ""}`);
        if (entry.children && entry.children.length > 0) {
            lines.push(formatDirectoryTree(entry.children, childIndent));
        }
    }
    return lines.join("\n");
}
//# sourceMappingURL=directory-tree.js.map