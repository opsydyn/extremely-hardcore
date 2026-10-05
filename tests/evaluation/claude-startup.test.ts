import { expect, test } from "bun:test";
import { acceptsClaudeStartupInventory } from "../../evaluation/claude-startup";

// Relevant fields projected from trial 084; identity, host paths and sessions omitted.
const workspace = "/fixture/workspace";
const pluginPath = `${workspace}/plugin`;
const captured = {
  type: "system", subtype: "init", cwd: workspace, claude_code_version: "2.1.289",
  model: "claude-sonnet-5-5", permissionMode: "dontAsk", tools: ["Read", "Skill"], mcp_servers: [],
  plugins: [
    { name: "extremely-hardcore", path: pluginPath, source: "extremely-hardcore@inline", version: "0.0.1" },
    { name: "cc-plugin-agents-md", path: "builtin", source: "cc-plugin-agents-md@builtin" },
    { name: "cc-plugin-telemetry", path: "builtin", source: "cc-plugin-telemetry@builtin" },
    { name: "cc-plugin-plugin-authoring", path: "builtin", source: "cc-plugin-plugin-authoring@builtin" },
  ],
  skills: [
    "extremely-hardcore:architecture-decision", "extremely-hardcore:bounded-context-review",
    "extremely-hardcore:change-contract", "extremely-hardcore:decision-challenge",
    "extremely-hardcore:domain-discovery", "extremely-hardcore:evidence-ledger",
    "extremely-hardcore:simple-made-easy", "extremely-hardcore:test-first-implementation",
    "extremely-hardcore:using-extremely-hardcore", "design", "design-sync", "dataviz", "update-config",
    "verify", "debug", "code-review", "simplify", "batch", "fewer-permission-prompts", "doctor", "loop",
    "schedule", "claude-api", "run", "run-skill-generator", "plugin-authoring",
  ],
};
const accepts = (value: unknown) => acceptsClaudeStartupInventory(value, workspace, pluginPath);
const copy = () => structuredClone(captured);

test("accepts the retained startup catalogue without changing expected tools", () => {
  expect(accepts(captured)).toBe(true);
});

test("accepts ordering differences but not different catalogue membership", () => {
  const event = copy(); event.plugins.reverse(); event.skills.reverse(); event.tools.reverse();
  expect(accepts(event)).toBe(true);
});

test("rejects extra plugins even when they claim to be built-in", () => {
  const event = copy();
  event.plugins.push({ name: "unreviewed", path: "builtin", source: "unreviewed@builtin" });
  expect(accepts(event)).toBe(false);
});

test("rejects missing or duplicate plugins", () => {
  for (const index of [0, 1, 2, 3]) {
    const missing = copy(); missing.plugins.splice(index, 1); expect(accepts(missing)).toBe(false);
    const duplicate = copy(); duplicate.plugins[index] = structuredClone(duplicate.plugins[(index + 1) % 4]!);
    expect(accepts(duplicate)).toBe(false);
  }
});

test("rejects changed EHS identity, path, source and version", () => {
  for (const patch of [{ name: "other" }, { path: "/elsewhere/plugin" }, { source: "extremely-hardcore@installed" }, { version: "0.0.2" }]) {
    const event = copy(); Object.assign(event.plugins[0]!, patch); expect(accepts(event)).toBe(false);
  }
});

test("rejects built-in labels with external paths or changed sources", () => {
  for (const index of [1, 2, 3]) for (const patch of [{ path: "/installed/plugin" }, { source: "other@builtin" }]) {
    const event = copy(); Object.assign(event.plugins[index]!, patch); expect(accepts(event)).toBe(false);
  }
});

test("requires review when built-ins acquire a version field", () => {
  for (const index of [1, 2, 3]) {
    const event = copy(); Object.assign(event.plugins[index]!, { version: "new" });
    expect(accepts(event)).toBe(false);
  }
});

test("rejects malformed catalogue members instead of coercing their identities", () => {
  for (const key of ["tools", "skills", "plugins", "mcp_servers"]) {
    for (const value of ["Read,Skill", {}, 1]) expect(accepts({ ...captured, [key]: value })).toBe(false);
  }
  expect(accepts({ ...captured, tools: ["Read", 1] })).toBe(false);
  expect(accepts({ ...captured, plugins: [[], ...captured.plugins.slice(1)] })).toBe(false);
});

test("rejects unexpected, missing or duplicate skill names", () => {
  const extra = copy(); extra.skills.push("unreviewed"); expect(accepts(extra)).toBe(false);
  for (const index of [0, 8, 9, 25]) {
    const missing = copy(); missing.skills.splice(index, 1); expect(accepts(missing)).toBe(false);
    const duplicate = copy(); duplicate.skills[index] = duplicate.skills[(index + 1) % duplicate.skills.length]!;
    expect(accepts(duplicate)).toBe(false);
  }
});

test("rejects extra, missing or duplicate tools and active MCP entries", () => {
  for (const tools of [["Read", "Skill", "Bash"], ["Read"], ["Read", "Read"]]) expect(accepts({ ...captured, tools })).toBe(false);
  expect(accepts({ ...captured, mcp_servers: [{ name: "extra", status: "connected" }] })).toBe(false);
});

test("rejects version, model, permission, cwd and event-type drift", () => {
  for (const patch of [{ claude_code_version: "2.1.290" }, { model: "claude-opus-5" }, { model: "sonnet" },
    { permissionMode: "plan" }, { permissionMode: "bypassPermissions" }, { cwd: "/other/workspace" },
    { type: "assistant" }, { subtype: "other" }]) expect(accepts({ ...captured, ...patch })).toBe(false);
});

test("rejects malformed or missing required projection fields without throwing", () => {
  for (const input of [null, [], {}, "init", { ...captured, plugins: [null, ...captured.plugins.slice(1)] }]) expect(accepts(input)).toBe(false);
  for (const key of Object.keys(captured)) {
    const event: Record<string, unknown> = copy(); delete event[key]; expect(accepts(event)).toBe(false);
    expect(accepts({ ...captured, [key]: null })).toBe(false);
  }
});

test("rejects mismatched expected staging paths", () => {
  expect(acceptsClaudeStartupInventory(captured, "/other/workspace", pluginPath)).toBe(false);
  expect(acceptsClaudeStartupInventory(captured, workspace, "/other/plugin")).toBe(false);
  expect(acceptsClaudeStartupInventory(captured, workspace, `${pluginPath}/`)).toBe(false);
});
