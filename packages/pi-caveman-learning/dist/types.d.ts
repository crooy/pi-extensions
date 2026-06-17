/**
 * Shared TypeScript interfaces for pi-caveman-learning.
 * All modules import from this file for consistent data contracts.
 */
export type ObservationEvent = "tool_start" | "tool_complete" | "user_prompt" | "agent_end" | "turn_start" | "turn_end" | "user_bash" | "session_compact" | "model_select";
export interface Observation {
    timestamp: string;
    event: ObservationEvent;
    session: string;
    project_id: string;
    project_name: string;
    tool?: string;
    input?: string;
    output?: string;
    is_error?: boolean;
    active_instincts?: string[];
    turn_index?: number;
    tool_count?: number;
    error_count?: number;
    tokens_used?: number;
    command?: string;
    cwd?: string;
    from_extension?: boolean;
    model?: string;
    previous_model?: string;
    model_change_source?: string;
}
export type InstinctScope = "project" | "global";
export type InstinctSource = "personal" | "inherited";
export interface Instinct {
    id: string;
    title: string;
    trigger: string;
    action: string;
    confidence: number;
    domain: string;
    source: InstinctSource;
    scope: InstinctScope;
    project_id?: string;
    project_name?: string;
    created_at: string;
    updated_at: string;
    observation_count: number;
    confirmed_count: number;
    contradicted_count: number;
    inactive_count: number;
    evidence?: string[];
    flagged_for_removal?: boolean;
    graduated_to?: GraduationTarget;
    graduated_at?: string;
    last_confirmed_session?: string;
}
export type GraduationTarget = "agents-md" | "skill" | "command";
export type FactScope = "project" | "global";
export type FactSource = "personal";
export interface Fact {
    id: string;
    title: string;
    content: string;
    confidence: number;
    domain: string;
    source: FactSource;
    scope: FactScope;
    project_id?: string;
    project_name?: string;
    created_at: string;
    updated_at: string;
    observation_count: number;
    confirmed_count: number;
    contradicted_count: number;
    inactive_count: number;
    evidence?: string[];
    flagged_for_removal?: boolean;
}
export interface ProjectEntry {
    id: string;
    name: string;
    root: string;
    remote: string;
    created_at: string;
    last_seen: string;
}
export interface InstalledSkill {
    name: string;
    description: string;
}
export interface Config {
    run_interval_minutes: number;
    min_observations_to_analyze: number;
    min_confidence: number;
    max_instincts: number;
    max_injection_chars: number;
    model: string;
    provider: string;
    timeout_seconds: number;
    active_hours_start: number;
    active_hours_end: number;
    max_idle_seconds: number;
    log_path?: string;
    max_total_instincts_per_project: number;
    max_total_instincts_global: number;
    max_new_instincts_per_run: number;
    flagged_cleanup_days: number;
    instinct_ttl_days: number;
    dreaming_enabled: boolean;
    consolidation_interval_days: number;
    consolidation_min_sessions: number;
    recurring_prompt_min_sessions: number;
    recurring_prompt_score_boost: number;
    max_facts_per_project: number;
    max_facts_global: number;
    max_new_facts_per_run: number;
}
export interface PromptFrequencyEntry {
    readonly count: number;
    readonly sessions: readonly string[];
    readonly last_text: string;
    readonly first_seen: string;
    readonly last_seen: string;
}
export interface GlobalPromptFrequencyEntry extends PromptFrequencyEntry {
    readonly project_ids: readonly string[];
}
export type PromptFrequencyTable = Record<string, PromptFrequencyEntry>;
export type GlobalPromptFrequencyTable = Record<string, GlobalPromptFrequencyEntry>;
//# sourceMappingURL=types.d.ts.map