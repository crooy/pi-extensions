import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type, type Static } from "@earendil-works/pi-ai";
import type { Instinct } from "./types.js";
declare const ListParams: Type.TObject<{
    scope: Type.TOptional<Type.TUnsafe<"project" | "global" | "all">>;
    domain: Type.TOptional<Type.TString>;
}>;
declare const ReadParams: Type.TObject<{
    id: Type.TString;
}>;
declare const WriteParams: Type.TObject<{
    id: Type.TString;
    title: Type.TString;
    trigger: Type.TString;
    action: Type.TString;
    confidence: Type.TNumber;
    domain: Type.TString;
    scope: Type.TUnsafe<"project" | "global">;
    observation_count: Type.TOptional<Type.TNumber>;
    confirmed_count: Type.TOptional<Type.TNumber>;
    contradicted_count: Type.TOptional<Type.TNumber>;
    inactive_count: Type.TOptional<Type.TNumber>;
    evidence: Type.TOptional<Type.TArray<Type.TString>>;
}>;
declare const DeleteParams: Type.TObject<{
    id: Type.TString;
    scope: Type.TOptional<Type.TUnsafe<"project" | "global">>;
}>;
declare const MergeParams: Type.TObject<{
    merged: Type.TObject<{
        id: Type.TString;
        title: Type.TString;
        trigger: Type.TString;
        action: Type.TString;
        confidence: Type.TNumber;
        domain: Type.TString;
        scope: Type.TUnsafe<"project" | "global">;
        evidence: Type.TOptional<Type.TArray<Type.TString>>;
    }>;
    delete_ids: Type.TArray<Type.TString>;
    delete_scoped_ids: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TString;
        scope: Type.TUnsafe<"project" | "global">;
    }>>>;
}>;
export type InstinctListInput = Static<typeof ListParams>;
export type InstinctReadInput = Static<typeof ReadParams>;
export type InstinctWriteInput = Static<typeof WriteParams>;
export type InstinctDeleteInput = Static<typeof DeleteParams>;
export type InstinctMergeInput = Static<typeof MergeParams>;
export declare function createInstinctWriteTool(projectId: string | null, projectName: string | null, baseDir?: string): {
    name: "instinct_write";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        id: Type.TString;
        title: Type.TString;
        trigger: Type.TString;
        action: Type.TString;
        confidence: Type.TNumber;
        domain: Type.TString;
        scope: Type.TUnsafe<"project" | "global">;
        observation_count: Type.TOptional<Type.TNumber>;
        confirmed_count: Type.TOptional<Type.TNumber>;
        contradicted_count: Type.TOptional<Type.TNumber>;
        inactive_count: Type.TOptional<Type.TNumber>;
        evidence: Type.TOptional<Type.TArray<Type.TString>>;
    }>;
    execute(_toolCallId: string, params: InstinctWriteInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: {
            id: string;
            action: string;
        };
    }>;
};
export declare function createInstinctReadTool(projectId: string | null, baseDir?: string): {
    name: "instinct_read";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        id: Type.TString;
    }>;
    execute(_toolCallId: string, params: InstinctReadInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: Instinct;
    }>;
};
export declare function createInstinctListTool(projectId: string | null, baseDir?: string): {
    name: "instinct_list";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        scope: Type.TOptional<Type.TUnsafe<"project" | "global" | "all">>;
        domain: Type.TOptional<Type.TString>;
    }>;
    execute(_toolCallId: string, params: InstinctListInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: {
            count: number;
        };
    }>;
};
export declare function createInstinctDeleteTool(projectId: string | null, baseDir?: string): {
    name: "instinct_delete";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        id: Type.TString;
        scope: Type.TOptional<Type.TUnsafe<"project" | "global">>;
    }>;
    execute(_toolCallId: string, params: InstinctDeleteInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: {
            id: string;
            scope: "project" | "global";
        };
    }>;
};
export declare function createInstinctMergeTool(projectId: string | null, projectName: string | null, baseDir?: string): {
    name: "instinct_merge";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        merged: Type.TObject<{
            id: Type.TString;
            title: Type.TString;
            trigger: Type.TString;
            action: Type.TString;
            confidence: Type.TNumber;
            domain: Type.TString;
            scope: Type.TUnsafe<"project" | "global">;
            evidence: Type.TOptional<Type.TArray<Type.TString>>;
        }>;
        delete_ids: Type.TArray<Type.TString>;
        delete_scoped_ids: Type.TOptional<Type.TArray<Type.TObject<{
            id: Type.TString;
            scope: Type.TUnsafe<"project" | "global">;
        }>>>;
    }>;
    execute(_toolCallId: string, params: InstinctMergeInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: {
            mergedId: string;
            deleted: string[];
        };
    }>;
};
export declare function registerAllTools(pi: ExtensionAPI, projectId: string | null, projectName: string | null, baseDir?: string): void;
export {};
//# sourceMappingURL=instinct-tools.d.ts.map