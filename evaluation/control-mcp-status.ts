function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// Inventory projection only; callers must separately check app callability.
// codex_apps is the explicit host-catalog exception, not a tool-parity claim.
export function acceptsControlMcpStatus(input: unknown, configuredNames: readonly string[]): boolean {
  if (configuredNames.some((name) => typeof name !== "string" || !name.trim() || name === "codex_apps") ||
      new Set(configuredNames).size !== configuredNames.length ||
      !record(input) || input.nextCursor !== null || !Array.isArray(input.data)) return false;
  const seen = new Set<string>();
  return input.data.every((server: unknown) => {
    if (!record(server) || typeof server.name !== "string" || seen.has(server.name) || !record(server.tools)) return false;
    seen.add(server.name);
    if (server.runtimeStatus === "disabled") {
      return (configuredNames.includes(server.name) || server.name === "codex_apps") && Object.keys(server.tools).length === 0;
    }
    return server.name === "codex_apps" &&
      ["notStarted", "starting", "connected"].includes(server.runtimeStatus as string);
  });
}
