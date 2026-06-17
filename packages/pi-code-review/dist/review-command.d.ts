import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";
export declare const COMMAND_NAME = "review";
interface ReviewOptions {
    readonly files: readonly string[];
    readonly ref: string;
    readonly staged: boolean;
}
export declare function parseArgs(args: string): ReviewOptions;
export declare function handleReviewCommand(args: string, ctx: ExtensionCommandContext, pi: ExtensionAPI): Promise<void>;
export {};
//# sourceMappingURL=review-command.d.ts.map