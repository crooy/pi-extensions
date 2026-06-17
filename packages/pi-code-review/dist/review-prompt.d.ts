import type { EditedFile } from "./types.js";
interface FileWithContent {
    readonly path: string;
    readonly content: string;
    readonly language: string | null;
}
export declare function buildReviewPrompt(files: readonly FileWithContent[]): string;
export declare function buildFallbackPrompt(files: readonly EditedFile[]): string;
export {};
//# sourceMappingURL=review-prompt.d.ts.map