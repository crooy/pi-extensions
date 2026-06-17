export declare const PI_CODING_AGENT_PACKAGE = "@earendil-works/pi-coding-agent";
export declare function findPiPackageRootFromEntry(entryPoint: string): string | undefined;
export declare function resolveInstalledPiPackageRoot(): string | undefined;
export declare function resolvePiPackageRoot(): string | undefined;
export interface PiSpawnDeps {
    platform?: NodeJS.Platform;
    execPath?: string;
    argv1?: string;
    existsSync?: (filePath: string) => boolean;
    readFileSync?: (filePath: string, encoding: "utf-8") => string;
    resolvePackageJson?: () => string;
    resolvePackageEntry?: () => string;
    piPackageRoot?: string;
}
interface PiSpawnCommand {
    command: string;
    args: string[];
}
export declare function resolveWindowsPiCliScript(deps?: PiSpawnDeps): string | undefined;
export declare function getPiSpawnCommand(args: string[], deps?: PiSpawnDeps): PiSpawnCommand;
export {};
//# sourceMappingURL=pi-spawn.d.ts.map