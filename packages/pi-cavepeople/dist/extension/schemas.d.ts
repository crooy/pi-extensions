/**
 * TypeBox schemas for subagent tool parameters
 */
import { Type } from "typebox";
export declare const SubagentParams: Type.TObject<{
    agent: Type.TOptional<Type.TString>;
    task: Type.TOptional<Type.TString>;
    action: Type.TOptional<Type.TString>;
    id: Type.TOptional<Type.TString>;
    runId: Type.TOptional<Type.TString>;
    dir: Type.TOptional<Type.TString>;
    index: Type.TOptional<Type.TInteger>;
    message: Type.TOptional<Type.TString>;
    chainName: Type.TOptional<Type.TString>;
    config: Type.TOptional<Type.TUnsafe<unknown>>;
    tasks: Type.TOptional<Type.TArray<Type.TObject<{
        agent: Type.TString;
        task: Type.TString;
        cwd: Type.TOptional<Type.TString>;
        count: Type.TOptional<Type.TInteger>;
        output: Type.TOptional<Type.TUnsafe<unknown>>;
        outputMode: Type.TOptional<Type.TString>;
        reads: Type.TOptional<Type.TUnsafe<unknown>>;
        progress: Type.TOptional<Type.TBoolean>;
        model: Type.TOptional<Type.TString>;
        skill: Type.TOptional<Type.TUnsafe<unknown>>;
        acceptance: Type.TOptional<Type.TUnsafe<unknown>>;
    }>>>;
    concurrency: Type.TOptional<Type.TInteger>;
    worktree: Type.TOptional<Type.TBoolean>;
    chain: Type.TOptional<Type.TArray<Type.TObject<{
        agent: Type.TOptional<Type.TString>;
        task: Type.TOptional<Type.TString>;
        phase: Type.TOptional<Type.TString>;
        label: Type.TOptional<Type.TString>;
        as: Type.TOptional<Type.TString>;
        outputSchema: Type.TOptional<Type.TUnsafe<unknown>>;
        cwd: Type.TOptional<Type.TString>;
        output: Type.TOptional<Type.TUnsafe<unknown>>;
        outputMode: Type.TOptional<Type.TString>;
        reads: Type.TOptional<Type.TUnsafe<unknown>>;
        progress: Type.TOptional<Type.TBoolean>;
        skill: Type.TOptional<Type.TUnsafe<unknown>>;
        model: Type.TOptional<Type.TString>;
        acceptance: Type.TOptional<Type.TUnsafe<unknown>>;
        parallel: Type.TOptional<Type.TUnsafe<unknown>>;
        expand: Type.TOptional<Type.TObject<{
            from: Type.TObject<{
                output: Type.TString;
                path: Type.TString;
            }>;
            item: Type.TOptional<Type.TString>;
            key: Type.TOptional<Type.TString>;
            maxItems: Type.TOptional<Type.TInteger>;
            onEmpty: Type.TOptional<Type.TString>;
        }>>;
        collect: Type.TOptional<Type.TObject<{
            as: Type.TString;
            outputSchema: Type.TOptional<Type.TUnsafe<unknown>>;
        }>>;
        concurrency: Type.TOptional<Type.TNumber>;
        failFast: Type.TOptional<Type.TBoolean>;
        worktree: Type.TOptional<Type.TBoolean>;
    }>>>;
    context: Type.TOptional<Type.TString>;
    chainDir: Type.TOptional<Type.TString>;
    async: Type.TOptional<Type.TBoolean>;
    agentScope: Type.TOptional<Type.TString>;
    cwd: Type.TOptional<Type.TString>;
    artifacts: Type.TOptional<Type.TBoolean>;
    includeProgress: Type.TOptional<Type.TBoolean>;
    share: Type.TOptional<Type.TBoolean>;
    sessionDir: Type.TOptional<Type.TString>;
    clarify: Type.TOptional<Type.TBoolean>;
    control: Type.TOptional<Type.TObject<{
        enabled: Type.TOptional<Type.TBoolean>;
        needsAttentionAfterMs: Type.TOptional<Type.TInteger>;
        activeNoticeAfterMs: Type.TOptional<Type.TInteger>;
        activeNoticeAfterTurns: Type.TOptional<Type.TInteger>;
        activeNoticeAfterTokens: Type.TOptional<Type.TInteger>;
        failedToolAttemptsBeforeAttention: Type.TOptional<Type.TInteger>;
        notifyOn: Type.TOptional<Type.TArray<Type.TString>>;
        notifyChannels: Type.TOptional<Type.TArray<Type.TString>>;
    }>>;
    output: Type.TOptional<Type.TUnsafe<unknown>>;
    outputMode: Type.TOptional<Type.TString>;
    skill: Type.TOptional<Type.TUnsafe<unknown>>;
    model: Type.TOptional<Type.TString>;
    acceptance: Type.TOptional<Type.TUnsafe<unknown>>;
}>;
//# sourceMappingURL=schemas.d.ts.map