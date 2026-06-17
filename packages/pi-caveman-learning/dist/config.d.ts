/**
 * Configuration module for pi-caveman-learning.
 * Loads user settings from ~/.pi/continuous-learning/config.json with defaults.
 */
import type { Config } from "./types.js";
/**
 * Maps instinct domain names to human-readable purposes.
 * Used by findSkillShadows() to detect when an instinct is covered by an installed Pi skill.
 */
export declare const SKILL_DOMAINS: Record<string, string>;
export declare const CONFIG_PATH: string;
/** Minimum age in days before an instinct is eligible for graduation. */
export declare const GRADUATION_MIN_AGE_DAYS = 7;
/** Minimum confidence to qualify for graduation. */
export declare const GRADUATION_MIN_CONFIDENCE = 0.75;
/** Minimum confirmed_count to qualify for graduation. */
export declare const GRADUATION_MIN_CONFIRMED = 3;
/** Maximum contradicted_count allowed for graduation. */
export declare const GRADUATION_MAX_CONTRADICTED = 1;
/** Minimum related instincts in same domain to propose a skill scaffold. */
export declare const GRADUATION_SKILL_CLUSTER_SIZE = 3;
/** Minimum related instincts in same domain to propose a command scaffold. */
export declare const GRADUATION_COMMAND_CLUSTER_SIZE = 3;
/** Maximum instinct age in days before TTL cull (aggressive decay / deletion). */
export declare const GRADUATION_TTL_MAX_DAYS = 28;
/** Confidence threshold below which TTL-expired instincts are deleted outright. */
export declare const GRADUATION_TTL_CULL_CONFIDENCE = 0.3;
export declare const DEFAULT_CONFIG: Config;
/**
 * Loads config from ~/.pi/continuous-learning/config.json.
 * Returns defaults when file is absent or contains invalid JSON.
 * Merges partial overrides with defaults (overrides win).
 */
export declare function loadConfig(): Config;
//# sourceMappingURL=config.d.ts.map