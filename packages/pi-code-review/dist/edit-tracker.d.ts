import type { TurnEdits } from "./types.js";
export interface EditTracker {
    trackEdit(toolName: string, result: unknown): void;
    onTurnEnd(turnIndex: number): void;
    getLastTurnEdits(): TurnEdits | null;
    clearLastTurnEdits(): void;
}
export declare function createEditTracker(): EditTracker;
//# sourceMappingURL=edit-tracker.d.ts.map