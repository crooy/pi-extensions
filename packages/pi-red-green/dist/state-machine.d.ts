import type { TddState, PhaseTransitionTrigger, PhaseTransitionResult } from "./types.js";
export declare function createInitialState(task: string, sessionId: string, projectId: string): TddState;
export declare function createIdleState(sessionId: string, projectId: string): TddState;
export declare function advancePhase(state: TddState, trigger: PhaseTransitionTrigger): PhaseTransitionResult;
//# sourceMappingURL=state-machine.d.ts.map