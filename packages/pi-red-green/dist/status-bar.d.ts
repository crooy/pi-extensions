import type { TddState } from "./types.js";
interface UiContext {
    ui: {
        setStatus?: (key: string, text: string | undefined) => void;
    };
}
export declare function formatStatusText(state: TddState): string;
export declare function updateStatusBar(ctx: UiContext, state: TddState): void;
export declare function clearStatusBar(ctx: UiContext): void;
export {};
//# sourceMappingURL=status-bar.d.ts.map