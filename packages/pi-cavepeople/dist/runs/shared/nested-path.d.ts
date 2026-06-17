export declare const MAX_NESTED_PATH_ENTRIES = 4;
export type NestedPathEntry = {
    runId: string;
    stepIndex?: number;
    agent?: string;
};
export declare function isSafeNestedPathId(value: unknown): value is string;
export declare function sanitizeNestedPath(value: unknown): NestedPathEntry[];
export declare function parseNestedPathEnv(value: string | undefined): NestedPathEntry[];
export declare function encodeNestedPathEnv(value: NestedPathEntry[]): string;
//# sourceMappingURL=nested-path.d.ts.map