interface ServerEntry {
    command?: string;
    args?: string[];
    env?: Record<string, string>;
    cwd?: string;
    url?: string;
    headers?: Record<string, string>;
    auth?: "oauth" | "bearer" | false;
    bearerToken?: string;
    bearerTokenEnv?: string;
    exposeResources?: boolean;
    excludeTools?: string[];
    directTools?: boolean | string[];
}
export declare function resolveMcpDirectToolNames(mcpDirectTools: string[] | undefined, cwd?: string): string[];
export declare function computeMcpServerHash(definition: ServerEntry): string;
export {};
//# sourceMappingURL=mcp-direct-tool-allowlist.d.ts.map