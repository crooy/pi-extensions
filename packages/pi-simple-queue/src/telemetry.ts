import { appendFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

interface TelemetryEvent {
  event: string;
  timestamp: string;
  task_id?: string;
  skill?: string;
  plan_path?: string;
  duration_ms?: number;
  outcome?: string;
}

export function track(event: string, data: Partial<TelemetryEvent> = {}): void {
  try {
    const logDir = resolve(process.env.HOME || "~", ".pi", "siq");
    mkdirSync(logDir, { recursive: true });
    const telemetryPath = resolve(logDir, "telemetry.jsonl");
    const entry: TelemetryEvent = {
      event,
      timestamp: new Date().toISOString(),
      ...data,
    };
    appendFileSync(telemetryPath, JSON.stringify(entry) + "\n", "utf-8");
  } catch {
    // telemetry failure is non-critical
  }
}
