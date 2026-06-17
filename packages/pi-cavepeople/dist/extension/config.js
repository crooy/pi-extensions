import * as fs from "node:fs";
import * as path from "node:path";
import { getAgentDir } from "../shared/utils.ts";
export function loadConfig() {
    const configPath = path.join(getAgentDir(), "extensions", "subagent", "config.json");
    try {
        if (fs.existsSync(configPath)) {
            return JSON.parse(fs.readFileSync(configPath, "utf-8"));
        }
    }
    catch (error) {
        console.error(`Failed to load subagent config from '${configPath}':`, error);
    }
    return {};
}
//# sourceMappingURL=config.js.map