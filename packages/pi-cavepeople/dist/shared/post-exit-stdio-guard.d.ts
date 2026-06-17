import type { ChildProcess } from "node:child_process";
interface PostExitStdioGuardOptions {
    idleMs: number;
    hardMs: number;
}
interface ChildWithPipedStdio {
    stdout: ChildProcess["stdout"];
    stderr: ChildProcess["stderr"];
    on: ChildProcess["on"];
}
interface ChildWithKill {
    kill(signal?: NodeJS.Signals | number): boolean;
}
export declare function trySignalChild(child: ChildWithKill, signal: NodeJS.Signals): boolean;
export declare function attachPostExitStdioGuard(child: ChildWithPipedStdio, options: PostExitStdioGuardOptions): () => void;
export {};
//# sourceMappingURL=post-exit-stdio-guard.d.ts.map