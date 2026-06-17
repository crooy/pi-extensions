/**
 * Chain Clarification TUI Component
 *
 * Shows templates and resolved behaviors for each step in a chain.
 * Supports runtime editing of templates, output paths, reads lists, and progress toggle.
 */
import type { Theme } from "@earendil-works/pi-coding-agent";
import type { Component, TUI } from "@earendil-works/pi-tui";
import type { AgentConfig } from "../../agents/agents.ts";
import type { ResolvedStepBehavior } from "../../shared/settings.ts";
import { type ModelInfo } from "../../shared/model-info.ts";
type ClarifyMode = 'single' | 'parallel' | 'chain';
export interface BehaviorOverride {
    output?: string | false;
    reads?: string[] | false;
    progress?: boolean;
    model?: string;
    skills?: string[] | false;
}
export interface ChainClarifyResult {
    confirmed: boolean;
    templates: string[];
    behaviorOverrides: (BehaviorOverride | undefined)[];
    runInBackground?: boolean;
}
/**
 * TUI component for chain clarification.
 * Factory signature matches ctx.ui.custom: (tui, theme, kb, done) => Component
 */
export declare class ChainClarifyComponent implements Component {
    readonly width = 84;
    private selectedStep;
    private editingStep;
    private editMode;
    private editState;
    private readonly EDIT_VIEWPORT_HEIGHT;
    private behaviorOverrides;
    private modelSearchQuery;
    private modelSelectedIndex;
    private filteredModels;
    private readonly MODEL_SELECTOR_HEIGHT;
    private thinkingSelectedIndex;
    private skillSearchQuery;
    private skillSelectedNames;
    private skillCursorIndex;
    private filteredSkills;
    private noticeMessage;
    private noticeMessageTimer;
    /** Run in background (async) mode */
    private runInBackground;
    private tui;
    private theme;
    private agentConfigs;
    private templates;
    private originalTask;
    private chainDir;
    private resolvedBehaviors;
    private availableModels;
    private preferredProvider;
    private availableSkills;
    private done;
    private mode;
    constructor(tui: TUI, theme: Theme, agentConfigs: AgentConfig[], templates: string[], originalTask: string, chainDir: string | undefined, resolvedBehaviors: ResolvedStepBehavior[], availableModels: ModelInfo[], preferredProvider: string | undefined, availableSkills: Array<{
        name: string;
        source: string;
        description?: string;
    }>, done: (result: ChainClarifyResult) => void, mode?: ClarifyMode);
    /** Pad string to specified visible width */
    private pad;
    /** Create a row with border characters */
    private row;
    /** Render centered header line with border */
    private renderHeader;
    /** Render centered footer line with border */
    private renderFooter;
    /** Exit edit mode and reset state */
    private exitEditMode;
    /** Render the full-edit takeover view */
    private renderFullEditMode;
    /** Get effective behavior for a step (with user overrides applied) */
    private getEffectiveBehavior;
    /** Get the effective model for a step (override or agent default) */
    private getEffectiveModel;
    /** Resolve a model name to its full provider/model format */
    private resolveModelFullId;
    /** Update a behavior override for a step */
    private updateBehavior;
    private showNotice;
    handleInput(data: string): void;
    private enterEditMode;
    /** Enter model selector mode */
    private enterModelSelector;
    /** Filter models based on search query */
    private filterModels;
    private handleModelSelectorInput;
    private getAvailableThinkingLevels;
    /** Enter thinking level selector mode */
    private enterThinkingSelector;
    private handleThinkingSelectorInput;
    /** Apply thinking level to the current step's model */
    private applyThinkingLevel;
    private filterSkills;
    private handleSkillSelectorInput;
    private handleEditInput;
    private saveEdit;
    /**
     * When a step's output filename changes, update downstream steps that read from it.
     * This maintains the chain dependency automatically.
     */
    private propagateOutputChange;
    render(_width: number): string[];
    /** Render the model selector view */
    private renderModelSelector;
    /** Render the thinking level selector view */
    private renderThinkingSelector;
    private renderSkillSelector;
    private getFooterText;
    private appendNotice;
    private renderSingleMode;
    private renderParallelMode;
    private renderChainMode;
    invalidate(): void;
    dispose(): void;
}
export {};
//# sourceMappingURL=chain-clarify.d.ts.map