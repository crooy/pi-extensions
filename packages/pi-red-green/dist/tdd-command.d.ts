import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
import type { TddState, TddConfig } from "./types.js";
export declare const COMMAND_NAME = "tdd";
export interface StateRef {
    get: () => TddState | null;
    set: (s: TddState) => void;
    getConfig: () => TddConfig | null;
}
export declare function handleTddCommand(args: string, ctx: ExtensionCommandContext, stateRef: StateRef, pi?: ExtensionAPI): Promise<void>;
export declare function recordCycle(state: TddState): void;
//# sourceMappingURL=tdd-command.d.ts.map