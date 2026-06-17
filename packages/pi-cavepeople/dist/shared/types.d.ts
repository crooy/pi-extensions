/**
 * Type definitions for the subagent extension
 */
import type { Message } from "@earendil-works/pi-ai";
import type { FSWatcher } from "node:fs";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
export interface MaxOutputConfig {
    bytes?: number;
    lines?: number;
}
export type OutputMode = "inline" | "file-only";
export type JsonSchemaObject = Record<string, unknown>;
export interface ChainOutputMapEntry {
    text: string;
    structured?: unknown;
    agent: string;
    stepIndex: number;
}
export type ChainOutputMap = Record<string, ChainOutputMapEntry>;
export type WorkflowNodeStatus = "pending" | "running" | "completed" | "failed" | "paused" | "detached";
export interface WorkflowGraphNode {
    id: string;
    kind: "step" | "parallel-group" | "dynamic-parallel-group" | "agent";
    agent?: string;
    phase?: string;
    label: string;
    status: WorkflowNodeStatus;
    flatIndex?: number;
    stepIndex?: number;
    children?: WorkflowGraphNode[];
    dynamic?: {
        sourceOutput: string;
        sourcePath: string;
        itemName: string;
        maxItems?: number;
        collectAs?: string;
    };
    itemKey?: string;
    outputName?: string;
    structured?: boolean;
    acceptanceStatus?: AcceptanceLedgerStatus;
    error?: string;
}
export interface WorkflowGraphSnapshot {
    runId: string;
    mode: "chain" | "parallel" | "single";
    phases: Array<{
        title: string;
        nodeIds: string[];
    }>;
    nodes: WorkflowGraphNode[];
    currentNodeId?: string;
}
export interface SavedOutputReference {
    path: string;
    bytes: number;
    lines: number;
    message: string;
}
interface TruncationResult {
    text: string;
    truncated: boolean;
    originalBytes?: number;
    originalLines?: number;
    artifactPath?: string;
}
export interface Usage {
    input: number;
    output: number;
    cacheRead: number;
    cacheWrite: number;
    cost: number;
    turns: number;
}
export interface TokenUsage {
    input: number;
    output: number;
    total: number;
}
export type ActivityState = "active_long_running" | "needs_attention";
export type ControlEventType = "active_long_running" | "needs_attention";
export type ControlNotificationChannel = "event" | "async" | "intercom";
export interface ControlConfig {
    enabled?: boolean;
    needsAttentionAfterMs?: number;
    activeNoticeAfterMs?: number;
    activeNoticeAfterTurns?: number;
    activeNoticeAfterTokens?: number;
    failedToolAttemptsBeforeAttention?: number;
    notifyOn?: ControlEventType[];
    notifyChannels?: ControlNotificationChannel[];
}
export interface ResolvedControlConfig {
    enabled: boolean;
    needsAttentionAfterMs: number;
    activeNoticeAfterMs: number;
    activeNoticeAfterTurns?: number;
    activeNoticeAfterTokens?: number;
    failedToolAttemptsBeforeAttention: number;
    notifyOn: ControlEventType[];
    notifyChannels: ControlNotificationChannel[];
}
export interface ControlEvent {
    type: ControlEventType;
    from?: ActivityState;
    to: ActivityState;
    ts: number;
    agent: string;
    index?: number;
    runId: string;
    nestedRunId?: string;
    nestingPath?: NestedRunAddress["path"];
    message: string;
    reason?: "idle" | "completion_guard" | "active_long_running" | "tool_failures" | "time_threshold" | "turn_threshold" | "token_threshold";
    turns?: number;
    tokens?: number;
    toolCount?: number;
    currentTool?: string;
    currentToolDurationMs?: number;
    currentPath?: string;
    elapsedMs?: number;
    recentFailureSummary?: string;
}
export type SubagentResultStatus = "completed" | "failed" | "paused" | "detached";
export type SubagentRunMode = "single" | "parallel" | "chain";
export type PublicNestedStepSummary = Pick<NestedStepSummary, "agent" | "status" | "sessionFile" | "activityState" | "lastActivityAt" | "currentTool" | "currentToolStartedAt" | "currentPath" | "turnCount" | "toolCount" | "startedAt" | "endedAt" | "error"> & {
    children?: PublicNestedRunSummary[];
};
export type PublicNestedRunSummary = Pick<NestedRunSummary, "id" | "parentRunId" | "parentStepIndex" | "parentAgent" | "depth" | "path" | "asyncDir" | "sessionId" | "sessionFile" | "intercomTarget" | "ownerIntercomTarget" | "leafIntercomTarget" | "ownerState" | "mode" | "state" | "agent" | "agents" | "currentStep" | "chainStepCount" | "parallelGroups" | "activityState" | "lastActivityAt" | "currentTool" | "currentToolStartedAt" | "currentPath" | "turnCount" | "toolCount" | "totalTokens" | "startedAt" | "endedAt" | "lastUpdate" | "error"> & {
    steps?: PublicNestedStepSummary[];
    children?: PublicNestedRunSummary[];
};
export interface SubagentResultIntercomChild {
    agent: string;
    status: SubagentResultStatus;
    summary: string;
    index?: number;
    artifactPath?: string;
    sessionPath?: string;
    intercomTarget?: string;
    children?: PublicNestedRunSummary[];
}
export interface SubagentResultIntercomPayload {
    to: string;
    message: string;
    requestId?: string;
    runId: string;
    mode: SubagentRunMode;
    status: SubagentResultStatus;
    summary: string;
    source: "foreground" | "async";
    children: SubagentResultIntercomChild[];
    asyncId?: string;
    asyncDir?: string;
    chainSteps?: number;
    agent?: string;
    index?: number;
    artifactPath?: string;
    sessionPath?: string;
}
export interface AgentProgress {
    index: number;
    agent: string;
    status: "pending" | "running" | "completed" | "failed" | "detached";
    activityState?: ActivityState;
    task: string;
    skills?: string[];
    lastActivityAt?: number;
    currentTool?: string;
    currentToolArgs?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    recentTools: Array<{
        tool: string;
        args: string;
        endMs: number;
    }>;
    recentOutput: string[];
    toolCount: number;
    turnCount?: number;
    tokens: number;
    durationMs: number;
    error?: string;
    failedTool?: string;
}
export interface ToolCallSummary {
    text: string;
    expandedText: string;
}
interface ProgressSummary {
    toolCount: number;
    tokens: number;
    durationMs: number;
}
export interface ModelAttempt {
    model: string;
    success: boolean;
    exitCode?: number | null;
    error?: string;
    usage?: Usage;
}
export type AcceptanceLevel = "auto" | "none" | "attested" | "checked" | "verified" | "reviewed";
export type AcceptanceEvidenceKind = "changed-files" | "tests-added" | "commands-run" | "validation-output" | "residual-risks" | "no-staged-files" | "diff-summary" | "review-findings" | "manual-notes";
export interface AcceptanceGate {
    id: string;
    must: string;
    evidence?: AcceptanceEvidenceKind[];
    severity?: "required" | "recommended";
}
export interface AcceptanceVerifyCommand {
    id: string;
    command: string;
    timeoutMs?: number;
    cwd?: string;
    env?: Record<string, string>;
    allowFailure?: boolean;
}
export interface AcceptanceReviewGate {
    agent?: string;
    focus?: string;
    required?: boolean;
}
export interface AcceptanceConfig {
    level?: AcceptanceLevel;
    criteria?: Array<string | AcceptanceGate>;
    evidence?: AcceptanceEvidenceKind[];
    verify?: AcceptanceVerifyCommand[];
    review?: AcceptanceReviewGate | false;
    stopRules?: string[];
    reason?: string;
}
export type AcceptanceInput = AcceptanceLevel | false | AcceptanceConfig;
export interface ResolvedAcceptanceGate extends AcceptanceGate {
    id: string;
    must: string;
    evidence: AcceptanceEvidenceKind[];
    severity: "required" | "recommended";
}
export interface ResolvedAcceptanceConfig {
    level: Exclude<AcceptanceLevel, "auto">;
    explicit: boolean;
    inferredReason: string[];
    criteria: ResolvedAcceptanceGate[];
    evidence: AcceptanceEvidenceKind[];
    verify: AcceptanceVerifyCommand[];
    review?: AcceptanceReviewGate | false;
    stopRules: string[];
    reason?: string;
}
export interface AcceptanceReport {
    criteriaSatisfied?: Array<{
        id?: string;
        status: "satisfied" | "not-satisfied" | "not-applicable";
        evidence: string;
    }>;
    changedFiles?: string[];
    testsAddedOrUpdated?: string[];
    commandsRun?: Array<{
        command: string;
        result: "passed" | "failed" | "not-run";
        summary: string;
    }>;
    validationOutput?: string[];
    residualRisks?: string[];
    noStagedFiles?: boolean;
    diffSummary?: string;
    reviewFindings?: string[];
    manualNotes?: string;
    notes?: string;
}
export type AcceptanceRuntimeCheckStatus = "passed" | "failed" | "not-applicable";
export interface AcceptanceRuntimeCheck {
    id: string;
    status: AcceptanceRuntimeCheckStatus;
    message: string;
}
export interface AcceptanceVerifyResult {
    id: string;
    command: string;
    cwd?: string;
    exitCode: number | null;
    status: "passed" | "failed" | "timed-out" | "allowed-failure";
    stdout?: string;
    stderr?: string;
    durationMs: number;
}
export interface AcceptanceReviewResult {
    status: "no-blockers" | "blockers" | "needs-parent-decision";
    findings: Array<{
        severity: "blocker" | "non-blocking";
        file?: string;
        issue: string;
        rationale: string;
    }>;
}
export type AcceptanceLedgerStatus = "not-required" | "claimed" | "attested" | "checked" | "verified" | "reviewed" | "accepted" | "rejected";
export interface AcceptanceLedger {
    status: AcceptanceLedgerStatus;
    explicit: boolean;
    effectiveAcceptance: ResolvedAcceptanceConfig;
    inferredReason: string[];
    criteria: ResolvedAcceptanceGate[];
    childReport?: AcceptanceReport;
    childReportParseError?: string;
    runtimeChecks: AcceptanceRuntimeCheck[];
    verifyRuns: AcceptanceVerifyResult[];
    reviewResult?: AcceptanceReviewResult;
    parentDecision?: {
        status: "accepted" | "rejected";
        at: string;
        reason?: string;
    };
}
export interface SingleResult {
    agent: string;
    task: string;
    exitCode: number;
    detached?: boolean;
    detachedReason?: string;
    interrupted?: boolean;
    messages?: Message[];
    usage: Usage;
    model?: string;
    attemptedModels?: string[];
    modelAttempts?: ModelAttempt[];
    controlEvents?: ControlEvent[];
    error?: string;
    sessionFile?: string;
    skills?: string[];
    skillsWarning?: string;
    progress?: AgentProgress;
    progressSummary?: ProgressSummary;
    toolCalls?: ToolCallSummary[];
    artifactPaths?: ArtifactPaths;
    truncation?: TruncationResult;
    finalOutput?: string;
    outputMode?: OutputMode;
    savedOutputPath?: string;
    outputReference?: SavedOutputReference;
    outputSaveError?: string;
    structuredOutput?: unknown;
    structuredOutputPath?: string;
    structuredOutputSchemaPath?: string;
    acceptance?: AcceptanceLedger;
}
export interface Details {
    mode: SubagentRunMode | "management";
    runId?: string;
    context?: "fresh" | "fork";
    results: SingleResult[];
    controlEvents?: ControlEvent[];
    asyncId?: string;
    asyncDir?: string;
    progress?: AgentProgress[];
    progressSummary?: ProgressSummary;
    artifacts?: {
        dir: string;
        files: ArtifactPaths[];
    };
    truncation?: {
        truncated: boolean;
        originalBytes?: number;
        originalLines?: number;
        artifactPath?: string;
    };
    chainAgents?: string[];
    totalSteps?: number;
    currentStepIndex?: number;
    workflowGraph?: WorkflowGraphSnapshot;
    outputs?: ChainOutputMap;
}
export interface ArtifactPaths {
    inputPath: string;
    outputPath: string;
    jsonlPath: string;
    metadataPath: string;
}
export interface ArtifactConfig {
    enabled: boolean;
    includeInput: boolean;
    includeOutput: boolean;
    includeJsonl: boolean;
    includeMetadata: boolean;
    cleanupDays: number;
}
export interface AsyncParallelGroupStatus {
    start: number;
    count: number;
    stepIndex: number;
}
export type NestedRunState = "queued" | "running" | "complete" | "failed" | "paused";
export type NestedOwnerState = "live" | "gone" | "unknown";
export interface NestedRunAddress {
    id: string;
    parentRunId: string;
    parentStepIndex?: number;
    parentAgent?: string;
    depth: number;
    path: Array<{
        runId: string;
        stepIndex?: number;
        agent?: string;
    }>;
}
export interface NestedStepSummary {
    agent: string;
    status: "pending" | "running" | "complete" | "completed" | "failed" | "paused";
    sessionFile?: string;
    activityState?: ActivityState;
    lastActivityAt?: number;
    currentTool?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    turnCount?: number;
    toolCount?: number;
    startedAt?: number;
    endedAt?: number;
    error?: string;
    children?: NestedRunSummary[];
}
export interface NestedRunSummary extends NestedRunAddress {
    asyncDir?: string;
    pid?: number;
    sessionId?: string;
    sessionFile?: string;
    intercomTarget?: string;
    ownerIntercomTarget?: string;
    leafIntercomTarget?: string;
    ownerState?: NestedOwnerState;
    controlInbox?: string;
    capabilityToken?: string;
    mode?: SubagentRunMode;
    state: NestedRunState;
    agent?: string;
    agents?: string[];
    currentStep?: number;
    chainStepCount?: number;
    parallelGroups?: AsyncParallelGroupStatus[];
    steps?: NestedStepSummary[];
    children?: NestedRunSummary[];
    activityState?: ActivityState;
    lastActivityAt?: number;
    currentTool?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    turnCount?: number;
    toolCount?: number;
    totalTokens?: TokenUsage;
    startedAt?: number;
    endedAt?: number;
    lastUpdate?: number;
    error?: string;
}
export interface NestedRouteInfo {
    rootRunId: string;
    eventSink: string;
    controlInbox: string;
    capabilityToken: string;
}
export interface AsyncStartedEvent {
    id?: string;
    asyncDir?: string;
    pid?: number;
    sessionId?: string;
    mode?: SubagentRunMode;
    agent?: string;
    agents?: string[];
    chain?: string[];
    chainStepCount?: number;
    parallelGroups?: AsyncParallelGroupStatus[];
    workflowGraph?: WorkflowGraphSnapshot;
    nestedRoute?: NestedRouteInfo;
}
export interface AsyncStatus {
    runId: string;
    sessionId?: string;
    mode: SubagentRunMode;
    state: "queued" | "running" | "complete" | "failed" | "paused";
    activityState?: ActivityState;
    lastActivityAt?: number;
    currentTool?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    turnCount?: number;
    toolCount?: number;
    startedAt: number;
    endedAt?: number;
    lastUpdate?: number;
    pid?: number;
    cwd?: string;
    currentStep?: number;
    chainStepCount?: number;
    parallelGroups?: AsyncParallelGroupStatus[];
    workflowGraph?: WorkflowGraphSnapshot;
    steps?: Array<{
        agent: string;
        phase?: string;
        label?: string;
        outputName?: string;
        structured?: boolean;
        status: "pending" | "running" | "complete" | "completed" | "failed" | "paused";
        children?: NestedRunSummary[];
        sessionFile?: string;
        activityState?: ActivityState;
        lastActivityAt?: number;
        currentTool?: string;
        currentToolArgs?: string;
        currentToolStartedAt?: number;
        currentPath?: string;
        recentTools?: Array<{
            tool: string;
            args: string;
            endMs: number;
        }>;
        recentOutput?: string[];
        turnCount?: number;
        toolCount?: number;
        startedAt?: number;
        endedAt?: number;
        durationMs?: number;
        exitCode?: number | null;
        tokens?: TokenUsage;
        skills?: string[];
        model?: string;
        thinking?: string;
        attemptedModels?: string[];
        modelAttempts?: ModelAttempt[];
        error?: string;
        structuredOutput?: unknown;
        structuredOutputPath?: string;
        structuredOutputSchemaPath?: string;
        acceptance?: AcceptanceLedger;
    }>;
    sessionDir?: string;
    outputFile?: string;
    totalTokens?: TokenUsage;
    sessionFile?: string;
    outputs?: ChainOutputMap;
}
export type AsyncJobStep = NonNullable<AsyncStatus["steps"]>[number] & {
    index?: number;
};
export interface AsyncJobState {
    asyncId: string;
    asyncDir: string;
    status: "queued" | "running" | "complete" | "failed" | "paused";
    pid?: number;
    sessionId?: string;
    activityState?: ActivityState;
    lastActivityAt?: number;
    currentTool?: string;
    currentToolStartedAt?: number;
    currentPath?: string;
    turnCount?: number;
    toolCount?: number;
    mode?: SubagentRunMode;
    agents?: string[];
    currentStep?: number;
    chainStepCount?: number;
    parallelGroups?: AsyncParallelGroupStatus[];
    steps?: AsyncJobStep[];
    stepsTotal?: number;
    runningSteps?: number;
    completedSteps?: number;
    hasParallelGroups?: boolean;
    activeParallelGroup?: boolean;
    startedAt?: number;
    updatedAt?: number;
    sessionDir?: string;
    outputFile?: string;
    totalTokens?: TokenUsage;
    sessionFile?: string;
    controlEventCursor?: number;
    nestedRoute?: NestedRouteInfo;
    nestedChildren?: NestedRunSummary[];
}
export interface ForegroundResumeChild {
    agent: string;
    index: number;
    sessionFile?: string;
    status: SubagentResultStatus;
}
export interface ForegroundResumeRun {
    runId: string;
    mode: SubagentRunMode;
    cwd: string;
    updatedAt: number;
    children: ForegroundResumeChild[];
}
export interface SubagentState {
    baseCwd: string;
    currentSessionId: string | null;
    asyncJobs: Map<string, AsyncJobState>;
    foregroundRuns?: Map<string, ForegroundResumeRun>;
    foregroundControls: Map<string, {
        runId: string;
        mode: SubagentRunMode;
        startedAt: number;
        updatedAt: number;
        currentAgent?: string;
        currentIndex?: number;
        currentActivityState?: ActivityState;
        lastActivityAt?: number;
        currentTool?: string;
        currentToolStartedAt?: number;
        currentPath?: string;
        turnCount?: number;
        tokens?: number;
        toolCount?: number;
        nestedRoute?: NestedRouteInfo;
        nestedChildren?: NestedRunSummary[];
        interrupt?: () => boolean;
    }>;
    lastForegroundControlId: string | null;
    pendingForegroundControlNotices?: Map<string, ReturnType<typeof setTimeout>>;
    cleanupTimers: Map<string, ReturnType<typeof setTimeout>>;
    lastUiContext: ExtensionContext | null;
    poller: NodeJS.Timeout | null;
    completionSeen: Map<string, number>;
    watcher: FSWatcher | null;
    watcherRestartTimer: ReturnType<typeof setTimeout> | null;
    resultFileCoalescer: {
        schedule(file: string, delayMs?: number): boolean;
        clear(): void;
    };
}
export type DisplayItem = {
    type: "text";
    text: string;
} | {
    type: "tool";
    name: string;
    args: Record<string, unknown>;
};
export interface ErrorInfo {
    hasError: boolean;
    exitCode?: number;
    errorType?: string;
    details?: string;
}
export interface IntercomEventBus {
    on(channel: string, handler: (data: unknown) => void): () => void;
    emit(channel: string, data: unknown): void;
}
export declare const INTERCOM_DETACH_REQUEST_EVENT = "pi-intercom:detach-request";
export declare const INTERCOM_DETACH_RESPONSE_EVENT = "pi-intercom:detach-response";
export declare const SUBAGENT_ASYNC_STARTED_EVENT = "subagent:async-started";
export declare const SUBAGENT_ASYNC_COMPLETE_EVENT = "subagent:async-complete";
export declare const SUBAGENT_CONTROL_EVENT = "subagent:control-event";
export declare const SUBAGENT_CONTROL_INTERCOM_EVENT = "subagent:control-intercom";
export declare const SUBAGENT_RESULT_INTERCOM_EVENT = "subagent:result-intercom";
export declare const SUBAGENT_RESULT_INTERCOM_DELIVERY_EVENT = "subagent:result-intercom-delivery";
export interface RunSyncOptions {
    cwd?: string;
    signal?: AbortSignal;
    interruptSignal?: AbortSignal;
    allowIntercomDetach?: boolean;
    intercomEvents?: IntercomEventBus;
    onUpdate?: (r: import("@earendil-works/pi-agent-core").AgentToolResult<Details>) => void;
    onControlEvent?: (event: ControlEvent) => void;
    controlConfig?: ResolvedControlConfig;
    intercomSessionName?: string;
    orchestratorIntercomTarget?: string;
    maxOutput?: MaxOutputConfig;
    artifactsDir?: string;
    artifactConfig?: ArtifactConfig;
    runId: string;
    index?: number;
    sessionDir?: string;
    sessionFile?: string;
    share?: boolean;
    outputPath?: string;
    outputMode?: OutputMode;
    maxSubagentDepth?: number;
    nestedRoute?: NestedRouteInfo;
    /** Override the agent's default model (format: "provider/id" or just "id") */
    modelOverride?: string;
    /** Registry models available for heuristic bare-model resolution */
    availableModels?: Array<{
        provider: string;
        id: string;
        fullId: string;
    }>;
    /** Current parent-session provider to prefer for ambiguous bare model ids */
    preferredModelProvider?: string;
    /** Skills to inject (overrides agent default if provided) */
    skills?: string[];
    structuredOutput?: {
        schema: JsonSchemaObject;
        schemaPath: string;
        outputPath: string;
    };
    acceptance?: AcceptanceInput;
    acceptanceContext?: {
        mode?: SubagentRunMode;
        async?: boolean;
        dynamic?: boolean;
        dynamicGroup?: boolean;
    };
}
export type IntercomBridgeMode = "off" | "fork-only" | "always";
export interface IntercomBridgeConfig {
    mode?: IntercomBridgeMode;
    instructionFile?: string;
}
interface TopLevelParallelConfig {
    maxTasks?: number;
    concurrency?: number;
}
interface ExtensionChainConfig {
    dynamicFanout?: {
        maxItems?: number;
    };
}
export interface ExtensionConfig {
    asyncByDefault?: boolean;
    forceTopLevelAsync?: boolean;
    defaultSessionDir?: string;
    maxSubagentDepth?: number;
    control?: ControlConfig;
    parallel?: TopLevelParallelConfig;
    chain?: ExtensionChainConfig;
    worktreeSetupHook?: string;
    worktreeSetupHookTimeoutMs?: number;
    intercomBridge?: IntercomBridgeConfig;
}
export declare const DEFAULT_MAX_OUTPUT: Required<MaxOutputConfig>;
export declare const DEFAULT_ARTIFACT_CONFIG: ArtifactConfig;
export declare function resolveTempScopeId(options?: {
    env?: NodeJS.ProcessEnv;
    getuid?: (() => number) | undefined;
    userInfo?: (() => {
        username?: string | null;
    }) | undefined;
    homedir?: (() => string) | undefined;
}): string;
export declare const MAX_CONCURRENCY = 4;
export declare const TEMP_ROOT_DIR: string;
export declare const RESULTS_DIR: string;
export declare const ASYNC_DIR: string;
export declare const CHAIN_RUNS_DIR: string;
export declare const TEMP_ARTIFACTS_DIR: string;
export declare const WIDGET_KEY = "subagent-async";
export declare const SLASH_RESULT_TYPE = "subagent-slash-result";
export declare const SLASH_SUBAGENT_REQUEST_EVENT = "subagent:slash:request";
export declare const SLASH_SUBAGENT_STARTED_EVENT = "subagent:slash:started";
export declare const SLASH_SUBAGENT_RESPONSE_EVENT = "subagent:slash:response";
export declare const SLASH_SUBAGENT_UPDATE_EVENT = "subagent:slash:update";
export declare const SLASH_SUBAGENT_CANCEL_EVENT = "subagent:slash:cancel";
export declare const POLL_INTERVAL_MS = 250;
export declare const MAX_WIDGET_JOBS = 4;
export declare const DEFAULT_SUBAGENT_MAX_DEPTH = 2;
export declare const SUBAGENT_ACTIONS: readonly ["list", "get", "create", "update", "delete", "status", "interrupt", "resume", "doctor"];
export declare const DEFAULT_FORK_PREAMBLE: string;
export declare function resolveTopLevelParallelMaxTasks(value: unknown): number;
export declare function resolveTopLevelParallelConcurrency(override: unknown, configValue: unknown): number;
export declare function getAsyncConfigPath(suffix: string): string;
export declare function wrapForkTask(task: string, preamble?: string | false): string;
export declare function normalizeMaxSubagentDepth(value: unknown): number | undefined;
export declare function resolveCurrentMaxSubagentDepth(configMaxDepth?: number): number;
export declare function resolveChildMaxSubagentDepth(parentMaxDepth: number, agentMaxDepth?: number): number;
export declare function checkSubagentDepth(configMaxDepth?: number): {
    blocked: boolean;
    depth: number;
    maxDepth: number;
};
export declare function getSubagentDepthEnv(maxDepth?: number): Record<string, string>;
export declare function truncateOutput(output: string, config: Required<MaxOutputConfig>, artifactPath?: string): TruncationResult;
export {};
//# sourceMappingURL=types.d.ts.map