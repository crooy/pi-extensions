/** Secret scrubbing - replaces sensitive values with [REDACTED] before writing to disk */
export declare const REDACTED = "[REDACTED]";
/**
 * Scrub secrets from arbitrary text.
 * Replaces all matched secret patterns with [REDACTED].
 * Non-secret text is returned unchanged.
 */
export declare function scrubSecrets(text: string): string;
//# sourceMappingURL=scrubber.d.ts.map