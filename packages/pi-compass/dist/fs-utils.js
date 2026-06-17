import { readFileSync } from "node:fs";
export function readTextFile(path) {
    try {
        return readFileSync(path, "utf-8");
    }
    catch {
        return null;
    }
}
export function readJsonFile(path) {
    const text = readTextFile(path);
    if (text === null)
        return null;
    try {
        return JSON.parse(text);
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=fs-utils.js.map