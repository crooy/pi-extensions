import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
export declare const SUBAGENT_INTERCOM_SESSION_NAME_ENV = "PI_SUBAGENT_INTERCOM_SESSION_NAME";
export declare const CHILD_SUBAGENT_BOUNDARY_INSTRUCTIONS: string;
export declare const CHILD_FANOUT_BOUNDARY_INSTRUCTIONS: string;
export declare function stripProjectContext(prompt: string): string;
export declare function stripInheritedSkills(prompt: string): string;
export declare function stripSubagentOrchestrationSkill(prompt: string): string;
export declare function rewriteSubagentPrompt(prompt: string, options: {
    inheritProjectContext: boolean;
    inheritSkills: boolean;
    fanoutChild?: boolean;
}): string;
export declare function stripParentOnlySubagentMessages(messages: unknown[]): unknown[];
export default function registerSubagentPromptRuntime(pi: ExtensionAPI): void;
//# sourceMappingURL=subagent-prompt-runtime.d.ts.map