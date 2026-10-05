const ehsSkills = [
  "architecture-decision", "bounded-context-review", "change-contract", "decision-challenge",
  "domain-discovery", "evidence-ledger", "simple-made-easy", "test-first-implementation",
  "using-extremely-hardcore",
].map((name) => `extremely-hardcore:${name}`);

const builtinSkills = [
  "design", "design-sync", "dataviz", "update-config", "verify", "debug", "code-review",
  "simplify", "batch", "fewer-permission-prompts", "doctor", "loop", "schedule", "claude-api",
  "run", "run-skill-generator", "plugin-authoring",
];
const builtinPlugins = new Set(["cc-plugin-agents-md", "cc-plugin-telemetry", "cc-plugin-plugin-authoring"]);

function exactMembers(input: unknown, expected: string[]): boolean {
  return Array.isArray(input) && input.length === expected.length
    && input.every((value) => typeof value === "string" && expected.includes(value))
    && new Set(input).size === expected.length;
}

export function acceptsClaudeStartupInventory(input: unknown, workspace: string, pluginPath: string): boolean {
  if (!input || typeof input !== "object" || Array.isArray(input)) return false;
  const event = input as Record<string, unknown>;
  // A pinned host-projection check, not instruction attestation or tool enforcement.
  if (event.type !== "system" || event.subtype !== "init") return false;
  if (event.cwd !== workspace || event.claude_code_version !== "2.1.289"
    || event.model !== "claude-sonnet-5-5" || event.permissionMode !== "dontAsk") return false;
  if (!exactMembers(event.tools, ["Read", "Skill"])
    || !exactMembers(event.skills, [...ehsSkills, ...builtinSkills])
    || !Array.isArray(event.mcp_servers) || event.mcp_servers.length !== 0) return false;
  if (!Array.isArray(event.plugins) || event.plugins.length !== 4) return false;
  const seen = new Set<string>();
  for (const value of event.plugins) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const plugin = value as Record<string, unknown>;
    if (typeof plugin.name !== "string" || seen.has(plugin.name)) return false;
    seen.add(plugin.name);
    if (plugin.name === "extremely-hardcore") {
      if (plugin.path !== pluginPath || plugin.source !== "extremely-hardcore@inline" || plugin.version !== "0.0.1") return false;
    } else if (!builtinPlugins.has(plugin.name) || plugin.path !== "builtin"
      || plugin.source !== `${plugin.name}@builtin` || plugin.version !== undefined) return false;
  }
  return seen.has("extremely-hardcore") && [...builtinPlugins].every((name) => seen.has(name));
}
