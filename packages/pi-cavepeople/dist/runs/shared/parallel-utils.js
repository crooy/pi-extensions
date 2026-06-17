export function isParallelGroup(step) {
    return "parallel" in step && Array.isArray(step.parallel);
}
export function isDynamicRunnerGroup(step) {
    return "expand" in step && "collect" in step && "parallel" in step && !Array.isArray(step.parallel);
}
export function flattenSteps(steps) {
    const flat = [];
    for (const step of steps) {
        if (isParallelGroup(step)) {
            for (const task of step.parallel)
                flat.push(task);
        }
        else if (isDynamicRunnerGroup(step)) {
            continue;
        }
        else {
            flat.push(step);
        }
    }
    return flat;
}
export async function mapConcurrent(items, limit, fn) {
    const safeLimit = Math.max(1, Math.floor(limit) || 1);
    const results = new Array(items.length);
    let next = 0;
    async function worker(_workerIndex) {
        while (next < items.length) {
            const i = next++;
            results[i] = await fn(items[i], i);
        }
    }
    await Promise.all(Array.from({ length: Math.min(safeLimit, items.length) }, (_, wi) => worker(wi)));
    return results;
}
export function aggregateParallelOutputs(results, headerFormat = (i, agent) => `=== Parallel Task ${i + 1} (${agent}) ===`) {
    return results
        .map((r, i) => {
        const header = headerFormat(r.taskIndex ?? i, r.agent);
        const hasOutput = Boolean(r.output?.trim());
        const status = r.exitCode === -1
            ? "SKIPPED"
            : r.exitCode !== 0 && r.exitCode !== null
                ? `FAILED (exit code ${r.exitCode})${r.error ? `: ${r.error}` : ""}`
                : r.error
                    ? `WARNING: ${r.error}`
                    : !hasOutput && r.outputTargetPath && r.outputTargetExists === false
                        ? `EMPTY OUTPUT (expected output file missing: ${r.outputTargetPath})`
                        : !hasOutput && !r.outputTargetPath
                            ? "EMPTY OUTPUT (no textual response returned)"
                            : "";
        const body = status ? (hasOutput ? `${status}\n${r.output}` : status) : r.output;
        return `${header}\n${body}`;
    })
        .join("\n\n");
}
export const MAX_PARALLEL_CONCURRENCY = 4;
//# sourceMappingURL=parallel-utils.js.map