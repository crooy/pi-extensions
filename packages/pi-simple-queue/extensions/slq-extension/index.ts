import { Static, Type } from "typebox";
import { spawn } from "node:child_process";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const SlqBinParams = Type.Object({
  args: Type.Optional(Type.Array(Type.String())),
});

export type SlqBinInput = Static<typeof SlqBinParams>;

export default function (pi: ExtensionAPI) { // Gebruik ExtensionAPI type
  pi.registerTool({
    name: "slq", // Naam van de binary tool
    label: "SLQ CLI",
    description: "Executes the local 'slq' CLI binary to manage the queue.",
    parameters: SlqBinParams,
    async execute(_toolCallId: string, params: SlqBinInput, _signal: any, _onUpdate: any, _ctx: any) {
      // Gebruik SLQ_BIN_PATH env var of zoek in PATH
      const binPath = process.env.SLQ_BIN_PATH || "slq";
      const args = Array.isArray(params.args) ? params.args : [];

      return await new Promise((resolve) => {
        // Gebruik 'pipe' om stdout en stderr te vangen
        const child = spawn(binPath, args, { stdio: ["ignore", "pipe", "pipe"] });
        let stdout = "";
        let stderr = "";

        if (child.stdout) child.stdout.on("data", (d) => (stdout += d.toString()));
        if (child.stderr) child.stderr.on("data", (d) => (stderr += d.toString()));

        child.on("close", (code) => {
          // Retourneer stdout als content, stderr als detail
          resolve({
            content: [{ type: "text", text: stdout.trim() }],
            details: { exitCode: code ?? 0, stderr: stderr.trim() },
          });
        });
      });
    },
  });
}