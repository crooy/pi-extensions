/**
 * Replaces relative date references in evidence strings with absolute ISO dates
 * so they remain meaningful after the session that created them.
 *
 * Applied only at write time — existing evidence is left untouched.
 */
export declare function normalizeRelativeDates(text: string, now?: Date): string;
//# sourceMappingURL=text-utils.d.ts.map