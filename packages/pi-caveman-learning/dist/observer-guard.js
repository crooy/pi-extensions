import { homedir } from "node:os";
import { join } from "node:path";
const LEARNING_BASE_DIR = join(homedir(), ".pi", "continuous-learning");
const LEARNING_BASE_DIR_PREFIX = LEARNING_BASE_DIR + "/";
export function shouldSkipPath(filePath) {
    return (filePath === LEARNING_BASE_DIR ||
        filePath.startsWith(LEARNING_BASE_DIR_PREFIX));
}
export function shouldSkipObservation(filePath) {
    if (filePath !== undefined && shouldSkipPath(filePath))
        return true;
    return false;
}
//# sourceMappingURL=observer-guard.js.map