type SubagentExecutionContext = "fresh" | "fork";
interface ForkableSessionManager {
    getSessionFile(): string | undefined;
    getLeafId(): string | null;
    getSessionDir?(): string;
    openSession?: (path: string, sessionDir?: string) => {
        createBranchedSession(leafId: string): string | undefined;
    };
}
interface ForkContextResolverOptions {
    openSession?: (path: string, sessionDir?: string) => {
        createBranchedSession(leafId: string): string | undefined;
    };
}
interface ForkContextResolver {
    sessionFileForIndex(index?: number): string | undefined;
}
export declare function resolveSubagentContext(value: unknown): SubagentExecutionContext;
export declare function createForkContextResolver(sessionManager: ForkableSessionManager, requestedContext: unknown, options?: ForkContextResolverOptions): ForkContextResolver;
export {};
//# sourceMappingURL=fork-context.d.ts.map