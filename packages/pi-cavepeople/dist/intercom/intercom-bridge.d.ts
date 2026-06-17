import type { AgentConfig } from "../agents/agents.ts";
import type { ExtensionConfig, IntercomBridgeMode } from "../shared/types.ts";
export declare const INTERCOM_BRIDGE_MARKER = "Intercom orchestration channel:";
export interface IntercomBridgeState {
    active: boolean;
    mode: IntercomBridgeMode;
    orchestratorTarget?: string;
    extensionDir: string;
    instruction: string;
}
export interface IntercomBridgeDiagnostic {
    active: boolean;
    mode: IntercomBridgeMode;
    wantsIntercom: boolean;
    piIntercomAvailable: boolean;
    extensionDir: string;
    configPath?: string;
    orchestratorTarget?: string;
    reason?: string;
    intercomConfigEnabled?: boolean;
    intercomConfigError?: string;
}
interface ResolveIntercomBridgeInput {
    config: ExtensionConfig["intercomBridge"];
    context: "fresh" | "fork" | undefined;
    orchestratorTarget?: string;
    extensionDir?: string;
    configPath?: string;
    settingsDir?: string;
    cwd?: string;
    agentDir?: string;
    globalNpmRoot?: string | null;
}
export declare function resolveIntercomSessionTarget(sessionName: string | undefined, sessionId: string): string;
export declare function resolveSubagentIntercomTarget(runId: string, agent: string, index?: number): string;
export declare function resolveIntercomBridgeMode(value: unknown): IntercomBridgeMode;
export declare function diagnoseIntercomBridge(input: ResolveIntercomBridgeInput): IntercomBridgeDiagnostic;
export declare function resolveIntercomBridge(input: ResolveIntercomBridgeInput): IntercomBridgeState;
export declare function applyIntercomBridgeToAgent(agent: AgentConfig, bridge: IntercomBridgeState): AgentConfig;
export {};
//# sourceMappingURL=intercom-bridge.d.ts.map