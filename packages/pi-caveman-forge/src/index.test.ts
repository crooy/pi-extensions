import { describe, it, expect } from "vitest";

describe("pi-caveman-forge", () => {
  it("loads without error", () => {
    expect(() => import("./index.js")).not.toThrow();
  });
});
