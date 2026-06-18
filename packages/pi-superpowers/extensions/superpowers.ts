/**
 * pi-superpowers — caveman-ified superpowers extension
 *
 * Writes caveman brainstorms/plans to `docs/<date>-<title>.md`.
 * Monorepo aware: nests under `docs/<package>/`.
 * Respects user doc path (via `/caveman-superpowers docs <path>`).
 *
 * Forked from obra/superpowers, converted to 🪨 speak.
 */

import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// ── Config ─────────────────────────────────────────────────────────────
interface SuperpowersConfig {
	docPath: string;
}

const CONFIG_PATH = resolve(homedir(), ".pi", "agent", "superpowers.json");

function loadConfig(): SuperpowersConfig {
	try {
		return JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
	} catch {
		return { docPath: resolve(process.cwd(), "docs") };
	}
}

function saveConfig(c: SuperpowersConfig): void {
	mkdirSync(dirname(CONFIG_PATH), { recursive: true });
	writeFileSync(CONFIG_PATH, JSON.stringify(c, null, 2) + "\n", "utf8");
}

// ── Monorepo detection ──────────────────────────────────────────────────
function detectMonorepoProjects(cwd: string): string[] {
	try {
		const pkg = resolve(cwd, "package.json");
		const parsed = JSON.parse(readFileSync(pkg, "utf8"));
		const workspaces = parsed.workspaces;
		if (Array.isArray(workspaces)) {
			const projects: string[] = [];
			for (const w of workspaces) {
				const expanded = expandWorkspaceGlob(w, dirname(pkg));
				projects.push(...expanded.map((p) => basename(p)));
			}
			return projects;
		}
	} catch {
		// no-op
	}
	return [];
}

function expandWorkspaceGlob(pattern: string, base: string): string[] {
	if (pattern.endsWith("*")) {
		try {
			const prefix = pattern.replace("/*", "").replace(/\/\*$/, "");
			const dir = resolve(base, prefix || "");
			return readdirSync(dir, { withFileTypes: true })
				.filter((e) => e.isDirectory())
				.map((e) => resolve(dir, e.name));
		} catch {
			return [];
		}
	}
	return [resolve(base, pattern)];
}

// ── Bootstrap markers ──────────────────────────────────────────────────
const EXTREMELY_IMPORTANT_MARKER = "<EXTREMELY_IMPORTANT>";
const BOOTSTRAP_MARKER = "superpowers:caveman-superpowers bootstrap for pi";

function buildBootstrap(docPath: string): string {
	const projects = detectMonorepoProjects(process.cwd());
	const monorepoLine =
		projects.length > 1
			? `- **Monorepo detected:** ${projects.join(", ")} → docs/\`<pkg>\`/caveman/\`<type>\`/\`<date>-<title>.md\``
			: "";

	return `# 🪨 Caveman Superpowers

You have superpowers — speak like caveman.

**Rules:**
- Drop articles (a/an/the). Drop filler (just/really/basically/actually/simply).
- Fragments OK. Short synonyms. Technical terms exact.
- Code blocks unchanged. Errors quoted exact.
- Pattern: [thing] [action] [reason]. [next step].
- Emoji, symbols, 🇳🇱/🇫🇷/🇩🇪 words welcome to shorten.
- "stop caveman" or "normal mode" reverts.

**Doc output:** Write ALL specs/plans to \`${docPath}\` in caveman style.
- Filename: \`YYYY-MM-DD-<title>.md\`
- Use \`/caveman-superpowers docs <path>\` to set custom path.
- Type subdirs: \`specs/\` for designs, \`plans/\` for implementations.
${monorepoLine}

**Skills loaded.** Use them. Do NOT skip workflows.`;
}

// ── Extension ──────────────────────────────────────────────────────────
let docPathRef = "docs";

export default function superpowersCaveman(pi: ExtensionAPI) {
	const skillsDir = resolve(fileURLToPath(import.meta.url), "../..", "skills");
	let injectBootstrap = true;

	pi.on("resources_discover", async () => ({
		skillPaths: [skillsDir],
	}));

	pi.on("session_start", async () => {
		injectBootstrap = true;
		const cfg = loadConfig();
		docPathRef = cfg.docPath;
	});

	pi.on("session_compact", async () => {
		injectBootstrap = true;
	});

	pi.on("agent_end", async () => {
		injectBootstrap = false;
	});

	pi.on("context", async (event) => {
		if (!injectBootstrap) return;
		if (event.messages.some((m) => contentIncludes(m, BOOTSTRAP_MARKER))) return;

		const insertAt = firstNonCompactionIndex(event.messages);
		return {
			messages: [
				...event.messages.slice(0, insertAt),
				{
					role: "user" as const,
					content: [
						{
							type: "text" as const,
							text: `${EXTREMELY_IMPORTANT_MARKER}\n${BOOTSTRAP_MARKER}\n\n${buildBootstrap(docPathRef)}`,
						},
					],
					timestamp: Date.now(),
				},
				...event.messages.slice(insertAt),
			],
		};
	});

	// ── /caveman-superpowers command ─────────────────────────────────────
	pi.registerCommand("caveman-superpowers", {
		description: "Caveman Superpowers: docs <path> | help | status",
		handler: async (args, ctx) => {
			const arg = args?.trim();
			if (!arg || arg === "help" || arg === "status") {
				const cfg = loadConfig();
				const projects = detectMonorepoProjects(process.cwd());
				let msg = `🪨 Caveman Superpowers. Docs: ${cfg.docPath}. Skills: ${skillsDir}.`;
				if (projects.length > 1) msg += ` Monorepo projects: ${projects.join(", ")}`;
				ctx.ui.notify(msg, "info");
				return;
			}

			if (arg.startsWith("docs ")) {
				const path = arg.slice(5).trim();
				saveConfig({ docPath: path });
				docPathRef = path;
				ctx.ui.notify(`🪨 Doc path → ${path}`, "info");
				return;
			}

			ctx.ui.notify(`Unknown: ${arg}. Use: "docs <path>" or "help"`, "error");
		},
	});
}

function contentIncludes(m: unknown, marker: string): boolean {
	const content = (m as { content?: unknown }).content;
	if (typeof content === "string") return content.includes(marker);
	if (Array.isArray(content))
		return content.some((part) => (part as { text?: string }).text?.includes(marker));
	return false;
}

function firstNonCompactionIndex(msgs: unknown[]): number {
	let i = 0;
	while ((msgs[i] as { role?: string })?.role === "compactionSummary") i++;
	return i;
}
