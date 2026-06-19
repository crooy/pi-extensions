import { homedir } from "node:os";
import { join } from "node:path";
import { getBaseDir } from "./storage.js";
import { readAgentsMd } from "./agents-md.js";
import { loadProjectInstincts, loadGlobalInstincts } from "./instinct-store.js";
import { filterInstincts } from "./instinct-loader.js";
import { buildEvolvePrompt } from "./prompts/evolve-prompt.js";
const MAX_EVOLVE_INSTINCTS = 100;
export const COMMAND_NAME = "instinct-evolve";
export async function handleInstinctEvolve(_args, ctx, pi, projectId, baseDir, projectRoot, installedSkills) {
    const effectiveBase = baseDir ?? getBaseDir();
    const projectInstincts = projectId
        ? loadProjectInstincts(projectId, effectiveBase)
        : [];
    const globalInstincts = loadGlobalInstincts(effectiveBase);
    const allInstincts = filterInstincts([...projectInstincts, ...globalInstincts], 0.1, MAX_EVOLVE_INSTINCTS);
    if (allInstincts.length === 0) {
        ctx.ui.notify("No instincts to analyze. Keep using pi to accumulate instincts first.", "info");
        return;
    }
    const agentsMdProject = projectRoot != null ? readAgentsMd(join(projectRoot, "AGENTS.md")) : null;
    const agentsMdGlobal = readAgentsMd(join(homedir(), ".pi", "agent", "AGENTS.md"));
    const prompt = buildEvolvePrompt(allInstincts, agentsMdProject, agentsMdGlobal, installedSkills);
    pi.sendUserMessage(prompt, { deliverAs: "followUp" });
}
//# sourceMappingURL=instinct-evolve.js.map