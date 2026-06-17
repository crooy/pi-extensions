import type { AcceptanceConfig, AcceptanceInput, AcceptanceLedger, AcceptanceReport, AcceptanceReviewResult, ResolvedAcceptanceConfig, SingleResult, SubagentRunMode } from "../../shared/types.ts";
export declare function normalizeAcceptanceInput(input: AcceptanceInput | undefined): AcceptanceConfig;
export declare function validateAcceptanceInput(input: unknown, pathLabel?: string): string[];
export declare function resolveEffectiveAcceptance(input: {
    explicit?: AcceptanceInput;
    agentName: string;
    task?: string;
    mode?: SubagentRunMode;
    async?: boolean;
    dynamic?: boolean;
    dynamicGroup?: boolean;
}): ResolvedAcceptanceConfig;
export declare function formatAcceptancePrompt(acceptance: ResolvedAcceptanceConfig): string;
export declare function parseAcceptanceReport(output: string): {
    report?: AcceptanceReport;
    error?: string;
};
export declare function stripAcceptanceReport(output: string): string;
export declare function aggregateAcceptanceReport(input: {
    results: Array<Pick<SingleResult, "agent" | "acceptance" | "error" | "exitCode">>;
    notes?: string;
}): AcceptanceReport;
export declare function evaluateAcceptance(input: {
    acceptance: ResolvedAcceptanceConfig;
    output: string;
    cwd: string;
    report?: AcceptanceReport;
    reviewResult?: AcceptanceReviewResult;
}): Promise<AcceptanceLedger>;
export declare function acceptanceFailureMessage(ledger: AcceptanceLedger): string | undefined;
//# sourceMappingURL=acceptance.d.ts.map