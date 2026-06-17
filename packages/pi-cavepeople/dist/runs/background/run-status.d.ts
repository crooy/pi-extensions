import type { AgentToolResult } from "@earendil-works/pi-agent-core";
import { type Details, type SubagentState } from "../../shared/types.ts";
import { type NestedRunResolutionScope } from "../shared/nested-events.ts";
interface RunStatusParams {
    action?: "status";
    id?: string;
    runId?: string;
    dir?: string;
}
interface RunStatusDeps {
    asyncDirRoot?: string;
    resultsDir?: string;
    kill?: (pid: number, signal?: NodeJS.Signals | 0) => boolean;
    now?: () => number;
    state?: SubagentState;
    nested?: NestedRunResolutionScope;
}
export declare function inspectSubagentStatus(params: RunStatusParams, deps?: RunStatusDeps): AgentToolResult<Details>;
export {};
//# sourceMappingURL=run-status.d.ts.map