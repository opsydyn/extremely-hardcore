import { expect, test } from "bun:test";
import { acceptsControlMcpStatus } from "../../evaluation/control-mcp-status";

const names = ["computer-use", "djcd_observation", "node_repl", "openaiDeveloperDocs", "osad"];
const catalog = { name: "codex_apps", runtimeStatus: "starting", tools: { "example.read": { name: "read" } } };
const disabled = (name: string) => ({ name, runtimeStatus: "disabled", tools: {} });
const capturedProjection = () => ({ data: [catalog, ...names.map(disabled)], nextCursor: null });

test("accepts the captured projection with known disabled MCP entries", () => {
  expect(acceptsControlMcpStatus(capturedProjection(), names)).toBe(true);
});

test("accepts hosts that omit disabled entries and an empty complete inventory", () => {
  expect(acceptsControlMcpStatus({ data: [catalog], nextCursor: null }, names)).toBe(true);
  expect(acceptsControlMcpStatus({ data: [], nextCursor: null }, names)).toBe(true);
  expect(acceptsControlMcpStatus({ data: [disabled("codex_apps")], nextCursor: null }, names)).toBe(true);
  expect(acceptsControlMcpStatus({ data: [{ ...catalog, runtimeStatus: "connected" }], nextCursor: null }, names)).toBe(true);
});

test("rejects active, indeterminate, or tool-bearing configured servers", () => {
  for (const runtimeStatus of ["connected", "starting", "notStarted", "authenticationRequired", "failed", "cancelled", null, "futureStatus"]) {
    expect(acceptsControlMcpStatus({ data: [catalog, { ...disabled("osad"), runtimeStatus }], nextCursor: null }, names)).toBe(false);
  }
  for (const runtimeStatus of [null, "failed", "cancelled", "authenticationRequired", "futureStatus"]) {
    expect(acceptsControlMcpStatus({ data: [{ ...catalog, runtimeStatus }], nextCursor: null }, names)).toBe(false);
  }
  expect(acceptsControlMcpStatus({ data: [{ ...disabled("osad"), tools: { read: {} } }], nextCursor: null }, names)).toBe(false);
});

test("rejects unknown names, duplicates, and unexamined pages", () => {
  expect(acceptsControlMcpStatus({ data: [disabled("unknown")], nextCursor: null }, names)).toBe(false);
  expect(acceptsControlMcpStatus({ data: [catalog, catalog], nextCursor: null }, names)).toBe(false);
  expect(acceptsControlMcpStatus({ data: [disabled("osad"), disabled("osad")], nextCursor: null }, names)).toBe(false);
  for (const nextCursor of ["page2", "", undefined, 0]) {
    expect(acceptsControlMcpStatus({ data: [catalog], nextCursor }, names)).toBe(false);
  }
});

test("rejects malformed projections and ambiguous configured inventories without throwing", () => {
  for (const value of [null, {}, [], { data: null, nextCursor: null }, { data: [null], nextCursor: null },
    { data: [{ name: "osad", runtimeStatus: "disabled" }], nextCursor: null },
    { data: [{ ...disabled("osad"), tools: [] }], nextCursor: null },
    { data: [{ ...catalog, runtimeStatus: null }], nextCursor: null },
    { data: [{ ...catalog, runtimeStatus: "disabled" }], nextCursor: null }]) {
    expect(acceptsControlMcpStatus(value, names)).toBe(false);
  }
  expect(acceptsControlMcpStatus(capturedProjection(), [...names, "osad"])).toBe(false);
  expect(acceptsControlMcpStatus(capturedProjection(), ["", ...names])).toBe(false);
  expect(acceptsControlMcpStatus(capturedProjection(), ["codex_apps", ...names])).toBe(false);
});
