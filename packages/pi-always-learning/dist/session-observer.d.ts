import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import type { ProjectEntry } from "./types.js";
export interface TurnStartEvent {
    type: "turn_start";
    turnIndex: number;
    timestamp: number;
}
export interface TurnEndEvent {
    type: "turn_end";
    turnIndex: number;
    message: unknown;
    toolResults: unknown[];
}
export interface UserBashEvent {
    type: "user_bash";
    command: string;
    excludeFromContext: boolean;
    cwd: string;
}
export interface SessionCompactEvent {
    type: "session_compact";
    compactionEntry: unknown;
    fromExtension: boolean;
}
export interface ModelSelectEvent {
    type: "model_select";
    model: {
        id?: string;
        name?: string;
    };
    previousModel: {
        id?: string;
        name?: string;
    } | undefined;
    source: "set" | "cycle" | "restore";
}
export declare function handleTurnStart(event: TurnStartEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
export declare function handleTurnEnd(event: TurnEndEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
export declare function handleUserBash(event: UserBashEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
export declare function handleSessionCompact(event: SessionCompactEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
export declare function handleModelSelect(event: ModelSelectEvent, ctx: ExtensionContext, project: ProjectEntry, baseDir?: string): void;
//# sourceMappingURL=session-observer.d.ts.map