import type { ChainConfig } from "./agents.ts";
export declare function parseChain(content: string, source: "user" | "project", filePath: string): ChainConfig;
export declare function parseJsonChain(content: string, source: "user" | "project", filePath: string): ChainConfig;
export declare function serializeJsonChain(config: ChainConfig): string;
export declare function serializeChain(config: ChainConfig): string;
//# sourceMappingURL=chain-serializer.d.ts.map