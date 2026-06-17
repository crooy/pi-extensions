/**
 * Core execution logic for running subagents
 */
import type { AgentConfig } from "../../agents/agents.ts";
import { type RunSyncOptions, type SingleResult } from "../../shared/types.ts";
/**
 * Run a subagent synchronously (blocking until complete)
 */
export declare function runSync(runtimeCwd: string, agents: AgentConfig[], agentName: string, task: string, options: RunSyncOptions): Promise<SingleResult>;
//# sourceMappingURL=execution.d.ts.map