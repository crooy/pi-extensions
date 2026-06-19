import { describe, it, expect, afterAll } from "vitest";
import { writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  validateCwd,
  validateEnv,
  validateTask,
  extractSummary,
} from "../src/loop.js";

describe("validateCwd", () => {
  it("returns error for empty CWD", () => {
    expect(validateCwd("")).toBe("CWD is empty");
  });

  it("returns error for nonexistent path", () => {
    expect(validateCwd("/nonexistent/path/12345")).toContain("does not exist");
  });

  it("returns error for file instead of directory", () => {
    const tmpFile = join(tmpdir(), `slq-test-${Date.now()}.txt`);
    writeFileSync(tmpFile, "test");
    try {
      expect(validateCwd(tmpFile)).toContain("not a directory");
    } finally {
      try { rmSync(tmpFile); } catch { /* ok */ }
    }
  });

  it("returns null for valid directory", () => {
    expect(validateCwd("/tmp")).toBeNull();
  });
});

describe("validateTask", () => {
  it("returns error for missing ID", () => {
    expect(
      validateTask({ id: "", skill: "tdd", cwd: "/tmp", goal: "test" }),
    ).toContain("missing task ID");
  });

  it("returns error for missing skill", () => {
    expect(
      validateTask({ id: "t1", skill: "", cwd: "/tmp", goal: "test" }),
    ).toContain("missing skill");
  });

  it("returns error for missing CWD", () => {
    expect(
      validateTask({ id: "t1", skill: "tdd", cwd: "", goal: "test" }),
    ).toContain("missing CWD");
  });

  it("returns error for missing goal", () => {
    expect(
      validateTask({ id: "t1", skill: "tdd", cwd: "/tmp", goal: "" }),
    ).toContain("missing goal");
  });

  it("returns null for valid task", () => {
    expect(
      validateTask({ id: "t1", skill: "tdd", cwd: "/tmp", goal: "test" }),
    ).toBeNull();
  });
});

describe("extractSummary", () => {
  it("returns fallback when no JSONL match", () => {
    expect(extractSummary("plain text output")).toBe("plain text output");
  });

  it("extracts assistant text from JSONL message_end event", () => {
    const jsonl = [
      JSON.stringify({ type: "message_start" }),
      JSON.stringify({
        type: "message_end",
        message: {
          role: "assistant",
          content: [{ type: "text", text: "Task completed successfully" }],
        },
      }),
    ].join("\n");
    expect(extractSummary(jsonl)).toBe("Task completed successfully");
  });

  it("skips non-assistant message_end events", () => {
    const jsonl = [
      JSON.stringify({
        type: "message_end",
        message: { role: "user", content: [{ type: "text", text: "hello" }] },
      }),
      JSON.stringify({
        type: "message_end",
        message: {
          role: "assistant",
          content: [{ type: "text", text: "real summary" }],
        },
      }),
    ].join("\n");
    expect(extractSummary(jsonl)).toBe("real summary");
  });

  it("returns fallback for malformed JSON lines", () => {
    expect(extractSummary("not json\nat all")).toBe("not json\nat all");
  });
});

describe("validateEnv", () => {
  const origPiBin = process.env.PI_BIN;
  const origSlqBin = process.env.SLQ_BIN;

  it("warns when PI_BIN absolute path does not exist", () => {
    process.env.PI_BIN = "/nonexistent/pi/binary";
    const warnings = validateEnv();
    expect(warnings.some((w) => w.includes("PI_BIN"))).toBe(true);
  });

  it("warns when SLQ_BIN path does not exist", () => {
    process.env.SLQ_BIN = "/nonexistent/slq";
    const warnings = validateEnv();
    expect(warnings.some((w) => w.includes("SLQ_BIN"))).toBe(true);
  });

  it("no warn for valid PI_BIN in PATH (no slash)", () => {
    process.env.PI_BIN = "pi";
    const warnings = validateEnv();
    expect(warnings.filter((w) => w.includes("PI_BIN"))).toHaveLength(0);
  });

  // Restore
  afterAll(() => {
    if (origPiBin) process.env.PI_BIN = origPiBin;
    else delete process.env.PI_BIN;
    if (origSlqBin) process.env.SLQ_BIN = origSlqBin;
    else delete process.env.SLQ_BIN;
  });
});
