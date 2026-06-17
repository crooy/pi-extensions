import type { Theme } from "@earendil-works/pi-coding-agent";
export declare function fuzzyFilter<T extends {
    name: string;
    description: string;
    model?: string;
}>(items: T[], query: string): T[];
export declare function pad(s: string, len: number): string;
export declare function row(content: string, width: number, theme: Theme): string;
export declare function renderHeader(text: string, width: number, theme: Theme): string;
export declare function formatPath(filePath: string): string;
export declare function formatScrollInfo(above: number, below: number): string;
export declare function renderFooter(text: string, width: number, theme: Theme): string;
//# sourceMappingURL=render-helpers.d.ts.map