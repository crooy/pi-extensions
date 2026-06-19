/**
 * Generates human-readable INSTINCT_SUMMARY.md files for browsing instincts
 * outside of Pi sessions.
 *
 * Global summary: ~/.pi/continuous-learning/INSTINCT_SUMMARY.md
 * Per-project:    ~/.pi/continuous-learning/projects/<id>/INSTINCT_SUMMARY.md
 */
/**
 * Regenerates the global INSTINCT_SUMMARY.md covering all global instincts
 * and every registered project's instincts.
 */
export declare function generateGlobalSummary(baseDir?: string): void;
/**
 * Regenerates the per-project INSTINCT_SUMMARY.md for a single project.
 */
export declare function generateProjectSummary(projectId: string, baseDir?: string): void;
//# sourceMappingURL=instinct-summary.d.ts.map