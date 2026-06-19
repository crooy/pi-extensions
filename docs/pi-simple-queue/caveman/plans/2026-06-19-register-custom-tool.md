# 🪨 pi-simple-queue Register custom tool Plan

> GOAL: Register custom tool in pi-simple-queue extension. Make LLM-callable tool with Typebox schema. Provide sample usage. Keep existing behavior intact. Tests pass.

## Architecture
- Extension TS module registers tool via pi.registerTool.
- Tool parameters defined with Type.Object schema.
- Tool execute returns content to display; supports simple status/details.

## Global Constraints
- No breaking changes to existing queue APIs.
- TS types align with pi-coding-agent Tool API.
- Run existing tests after changes.
- Caveman style. terse. no fluff.

---

### Task 1: Add new tool module
**Files:**
- Create: `packages/pi-simple-queue/src/tools/slqTool.ts`

**Interfaces:**
- Tool name: `slq_tool`
- Label: `SLQ Tool`
- Description: `Interact with pi-slq queue from LLM`
- Parameters: `Type.Object({ action: Type.String({ description: "Action to perform" }), data: Type.Optional(Type.String()) })`
- Execute signature: `async execute(toolCallId, params, signal, onUpdate, ctx) { ... }`

**Step 1: Write skeleton**
```ts
import { Type } from "typebox";

export default function (pi: any) {
  pi.registerTool({
    name: "slq_tool",
    label: "SLQ Tool",
    description: "Interact with pi-slq queue",
    parameters: Type.Object({
      action: Type.String({ description: "Action to perform" }),
      data: Type.Optional(Type.String()),
    }),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      return {
        content: [{ type: "text", text: `Action ${params.action} executed.` }],
        details: {},
      };
    },
  });
}
```

**Next:** Task 2. Wire into extension initialization.

---

### Task 2: Wire tool into extension initialization
**Files touched:**
- `packages/pi-simple-queue/src/index.ts` (or equivalent entry)

**Step 1: Import & register**
```ts
import registerSlqTool from "./tools/slqTool";

export default function (pi: ExtensionAPI) {
  // existing registrations...
  registerSlqTool(pi);
}
```

**Step 2: Idempotence guard (optional)**
```ts
let slqToolRegistered = false;
export default function (pi: ExtensionAPI) {
  if (slqToolRegistered) return;
  slqToolRegistered = true;
  registerSlqTool(pi);
}
```

**Next:** Task 3. Type alias for input.

---

### Task 3: Add type-safe tool input alias
**Files touched:**
- `packages/pi-simple-queue/src/tools/slqTool.ts` (or dedicated types module)

**Step 1: Export input type with schema alias**
```ts
import { Static, Type } from "typebox";

const SlqToolParams = Type.Object({
  action: Type.String({ description: "Action to perform" }),
  data: Type.Optional(Type.String()),
});

export type SlqToolInput = Static<typeof SlqToolParams>;
```

**Step 2: Use type alias in execute signature (optional)**
```ts
async execute(toolCallId, params: SlqToolInput, signal, onUpdate, ctx) {
  // implement using typed params
}
```

**Next:** Task 4. Add tests for registration.

---

### Task 4: Add tests for registration
**Files touched:**
- `packages/pi-simple-queue/tests/slqTool.test.ts` (new)

**Step 1: Write failing test (template)**
```ts
import { describe, it, expect } from "vitest";
import { createMockPi } from "./test-utils"; // adjust to project

describe("slq_tool registration", () => {
  it("registers slq_tool with correct schema", () => {
    const pi = createMockPi();
    require("../src/tools/slqTool").default(pi);
    const tool = pi.getRegisteredTool?.("slq_tool");
    expect(tool).toBeDefined();
    expect(tool?.name).toBe("slq_tool");
  });
});
```

**Step 2: Run tests → fix imports/paths as needed**

**Next:** Task 5. Documentation and examples.

---

### Task 5: Documentation and examples
**Files touched:**
- `docs/pi-simple-queue/caveman/plans/2026-06-19-register-custom-tool.md` (new plan entry)

**Step 1: Add plan content**
```markdown
# 🪨 pi-simple-queue Register custom tool Plan

> GOAL: Register custom tool in pi-simple-queue extension. Make LLM-callable tool with Typebox schema. Provide sample usage. Keep existing behavior intact. Tests pass.

## Architecture
- Extension module registers tool via `pi.registerTool`.
- Tool parameters defined with `Type.Object` schema.
- Tool `execute` returns `content`/`details`.

## Global Constraints
- No breaking changes. TS types align with Tool API.
- Run tests after changes.
- Caveman style. terse.

---

### Task 1: Add new tool module
**Files:** `packages/pi-simple-queue/src/tools/slqTool.ts`

**Step 1: Skeleton code** (see Task 1 code block above)

---

### Task 2: Wire into extension initialization
**Files:** `packages/pi-simple-queue/src/index.ts`

**Step 1:** Import & register (Task 2 Step 1 code)

**Step 2:** Guard against double registration (Task 2 Step 2)

---

### Task 3: Add type alias
**Files:** `packages/pi-simple-queue/src/tools/slqTool.ts`

**Step 1:** Export `SlqToolInput` via `Static<typeof SlqToolParams>`

---

### Task 4: Add tests
**Files:** `packages/pi-simple-queue/tests/slqTool.test.ts`

**Step 1:** Write test skeleton (Task 4 Step 1)

---

### Task 5: Docs
**Files:** `docs/pi-simple-queue/caveman/plans/2026-06-19-register-custom-tool.md` (current plan)

**Step 1:** Add plan content (this file)

---

### Task 6: Verification
- Run tests, lint, build for pi-simple-queue
- Ensure no regressions

---

### Task 7: Commit
- Commit message: feat(pi-simple-queue): register slq_tool custom tool

---

### Handoff
- Plan saved at docs/pi-simple-queue/caveman/plans/2026-06-19-register-custom-tool.md
- Follow-up: implement real queue logic in SLQ Tool, expand tests, add example in README
```
