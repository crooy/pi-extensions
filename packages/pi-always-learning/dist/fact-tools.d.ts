import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type, type Static } from "@earendil-works/pi-ai";
import type { Fact } from "./types.js";
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
    content: Type.TString;
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
export type FactListInput = Static<typeof ListParams>;
export type FactReadInput = Static<typeof ReadParams>;
export type FactWriteInput = Static<typeof WriteParams>;
export type FactDeleteInput = Static<typeof DeleteParams>;
export declare function createFactWriteTool(projectId: string | null, projectName: string | null, baseDir?: string): {
    name: "fact_write";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        id: Type.TString;
        title: Type.TString;
        content: Type.TString;
        confidence: Type.TNumber;
        domain: Type.TString;
        scope: Type.TUnsafe<"project" | "global">;
        observation_count: Type.TOptional<Type.TNumber>;
        confirmed_count: Type.TOptional<Type.TNumber>;
        contradicted_count: Type.TOptional<Type.TNumber>;
        inactive_count: Type.TOptional<Type.TNumber>;
        evidence: Type.TOptional<Type.TArray<Type.TString>>;
    }>;
    execute(_toolCallId: string, params: FactWriteInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
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
export declare function createFactReadTool(projectId: string | null, baseDir?: string): {
    name: "fact_read";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        id: Type.TString;
    }>;
    execute(_toolCallId: string, params: FactReadInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: Fact;
    }>;
};
export declare function createFactListTool(projectId: string | null, baseDir?: string): {
    name: "fact_list";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        scope: Type.TOptional<Type.TUnsafe<"project" | "global" | "all">>;
        domain: Type.TOptional<Type.TString>;
    }>;
    execute(_toolCallId: string, params: FactListInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        details: {
            count: number;
        };
    }>;
};
export declare function createFactDeleteTool(projectId: string | null, baseDir?: string): {
    name: "fact_delete";
    label: string;
    description: string;
    promptSnippet: string;
    parameters: Type.TObject<{
        id: Type.TString;
        scope: Type.TOptional<Type.TUnsafe<"project" | "global">>;
    }>;
    execute(_toolCallId: string, params: FactDeleteInput, _signal: AbortSignal | undefined, _onUpdate: unknown, _ctx: unknown): Promise<{
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
export declare function registerAllFactTools(pi: ExtensionAPI, projectId: string | null, projectName: string | null, baseDir?: string): void;
export {};
//# sourceMappingURL=fact-tools.d.ts.map