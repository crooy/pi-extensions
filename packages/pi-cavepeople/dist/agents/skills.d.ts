/**
 * Skill resolution and caching for subagent extension
 */
export type SkillSource = "project" | "user" | "project-package" | "user-package" | "project-settings" | "user-settings" | "extension" | "builtin" | "unknown";
interface ResolvedSkill {
    name: string;
    path: string;
    content: string;
    source: SkillSource;
}
export declare function resolveSkillPath(skillName: string, cwd: string): {
    path: string;
    source: SkillSource;
} | undefined;
export declare function resolveSkills(skillNames: string[], cwd: string): {
    resolved: ResolvedSkill[];
    missing: string[];
};
export declare function resolveSkillsWithFallback(skillNames: string[], primaryCwd: string, fallbackCwd?: string): {
    resolved: ResolvedSkill[];
    missing: string[];
};
export declare function buildSkillInjection(skills: ResolvedSkill[]): string;
export declare function normalizeSkillInput(input: string | string[] | boolean | undefined): string[] | false | undefined;
export declare function discoverAvailableSkills(cwd: string): Array<{
    name: string;
    source: SkillSource;
    description?: string;
}>;
export declare function clearSkillCache(): void;
export {};
//# sourceMappingURL=skills.d.ts.map