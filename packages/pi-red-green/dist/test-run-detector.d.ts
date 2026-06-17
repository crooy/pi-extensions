import type { TddConfig, TestRunResult } from "./types.js";
export declare function isTestRunCommand(command: string, config: TddConfig): boolean;
export declare function parseTestRunResult(stdout: string, stderr: string, exitCode: number): TestRunResult | null;
//# sourceMappingURL=test-run-detector.d.ts.map