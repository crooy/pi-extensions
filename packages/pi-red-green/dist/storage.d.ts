import type { TddState, TddCycleRecord } from "./types.js";
export declare function getBaseDir(): string;
export declare function getStatePath(baseDir?: string): string;
export declare function getHistoryPath(baseDir?: string): string;
export declare function ensureStorageLayout(baseDir?: string): void;
export declare function loadState(baseDir?: string): TddState | null;
export declare function saveState(state: TddState, baseDir?: string): void;
export declare function clearState(baseDir?: string): void;
export declare function appendCycleRecord(record: TddCycleRecord, baseDir?: string): void;
//# sourceMappingURL=storage.d.ts.map