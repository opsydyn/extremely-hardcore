import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { REVIEW_OUTPUT_SCHEMA } from "./review-fixture";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const taskPath = join(repoRoot, "evaluation/fixtures/review-pagination/task.md");
const fixturePath = join(repoRoot, "evaluation/fixtures/review-pagination/src/pagination.ts");
const ehsNames = [
  "architecture-decision", "bounded-context-review", "change-contract",
  "decision-challenge", "domain-discovery", "evidence-ledger",
  "simple-made-easy", "test-first-implementation", "using-extremely-hardcore",
];
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasKeys(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).sort().join("|") === [...keys].sort().join("|");
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function digest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function stringSet(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(nonempty) && new Set(value).size === value.length;
}

function skills(value: unknown): value is { name: string; path: string; enabled: boolean }[] {
  return Array.isArray(value) && value.every((entry) => record(entry) &&
    hasKeys(entry, ["name", "path", "enabled"]) && nonempty(entry.name) &&
    nonempty(entry.path) && typeof entry.enabled === "boolean") &&
    new Set(value.map((entry) => entry.name)).size === value.length;
}

function arm(value: unknown, treatment: boolean): value is Record<string, unknown> {
  const keys = ["taskSha256", "outputSchemaSha256", "model", "permissions", "tools", "hooks", "mcpServers", "instructionSources", "trace", "skills", "invocation"];
  if (treatment) keys.push("skillRoot");
  if (!record(value) || !hasKeys(value, keys) || !digest(value.taskSha256) ||
      !digest(value.outputSchemaSha256) || !nonempty(value.model) ||
      !record(value.permissions) || !hasKeys(value.permissions, ["sandbox", "approval", "network"]) ||
      ![value.permissions.sandbox, value.permissions.approval, value.permissions.network].every(nonempty) ||
      !stringSet(value.tools) || !stringSet(value.hooks) || !stringSet(value.mcpServers) ||
      !stringSet(value.instructionSources) || !record(value.trace) ||
      !hasKeys(value.trace, ["events", "final", "usage", "toolCalls"]) ||
      !Object.values(value.trace).every((item) => typeof item === "boolean") ||
      !skills(value.skills) || !record(value.invocation)) return false;
  if (treatment) {
    return nonempty(value.skillRoot) && isAbsolute(value.skillRoot) &&
      hasKeys(value.invocation, ["kind", "path"]) && value.invocation.kind === "native-skill" &&
      nonempty(value.invocation.path);
  }
  return hasKeys(value.invocation, ["kind"]) && value.invocation.kind === "none";
}

export function hashSkillSnapshot(root: string): string {
  if (readdirSync(root).sort().join("|") !== ehsNames.join("|")) {
    throw new Error("skill root must contain exactly the nine EHS skill directories");
  }
  for (const name of ehsNames) {
    if (!lstatSync(join(root, name)).isDirectory() ||
        !lstatSync(join(root, name, "SKILL.md")).isFile()) {
      throw new Error(`invalid staged skill: ${name}`);
    }
  }
  const entries: string[] = [];
  function walk(path: string): void {
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) throw new Error(`symlink in skill snapshot: ${path}`);
    if (stat.isFile()) {
      entries.push(`${relative(root, path)}\0${sha(readFileSync(path))}`);
    } else if (stat.isDirectory()) {
      for (const name of readdirSync(path).sort()) walk(join(path, name));
    } else {
      throw new Error(`unsupported skill snapshot entry: ${path}`);
    }
  }
  walk(root);
  if (entries.length === 0) throw new Error("empty skill snapshot");
  return sha(entries.sort().join("\n"));
}

export function reviewPins(skillRoot: string): {
  taskSha256: string; fixtureSha256: string; outputSchemaSha256: string;
  skillSnapshotSha256: string; invocationSha256: string;
} {
  const canonicalRoot = realpathSync(skillRoot);
  return {
    taskSha256: sha(readFileSync(taskPath)),
    fixtureSha256: sha(readFileSync(fixturePath)),
    outputSchemaSha256: sha(JSON.stringify(REVIEW_OUTPUT_SCHEMA)),
    skillSnapshotSha256: hashSkillSnapshot(canonicalRoot),
    invocationSha256: sha(JSON.stringify({
      kind: "native-skill",
      path: join(canonicalRoot, "using-extremely-hardcore", "SKILL.md"),
    })),
  };
}

type PreflightResult = {
  status: "ready" | "blocked";
  reasons: string[];
  digests?: ReturnType<typeof reviewPins>;
};

export function preflightReviewComparison(input: unknown): PreflightResult {
  const reasons: string[] = [];
  if (!record(input) || !hasKeys(input, ["schemaVersion", "pin", "control", "treatment"]) ||
      input.schemaVersion !== 1 || !record(input.pin) ||
      !hasKeys(input.pin, ["taskSha256", "fixtureSha256", "outputSchemaSha256", "skillSnapshotSha256", "invocationSha256"]) ||
      !Object.values(input.pin).every(digest) || !arm(input.control, false) || !arm(input.treatment, true)) {
    return { status: "blocked", reasons: ["incomplete or malformed preflight evidence"] };
  }
  const pin = input.pin;
  const control = input.control;
  const treatment = input.treatment;
  let digests: ReturnType<typeof reviewPins>;
  try { digests = reviewPins(treatment.skillRoot as string); }
  catch { return { status: "blocked", reasons: ["staged skill snapshot cannot be read safely"] }; }
  const canonicalRoot = realpathSync(treatment.skillRoot as string);
  const canonicalPath = (path: string): string => {
    try { return realpathSync(path); }
    catch { return ""; }
  };
  for (const [key, value] of Object.entries(digests)) {
    if (pin[key] !== value) reasons.push(`${key} does not match pinned material`);
  }
  for (const armValue of [control, treatment]) {
    if (armValue.taskSha256 !== digests.taskSha256 || armValue.outputSchemaSha256 !== digests.outputSchemaSha256) {
      reasons.push("arm task or output schema differs from pinned material");
    }
    const permission = armValue.permissions as Record<string, unknown>;
    if (permission.sandbox !== "read-only" || permission.network !== "disabled") {
      reasons.push("read-only/no-network request is required");
    }
    const trace = armValue.trace as Record<string, unknown>;
    if (Object.values(trace).some((value) => value !== true)) reasons.push("full trace retention is required");
  }
  for (const key of ["model", "permissions", "tools", "hooks", "mcpServers", "instructionSources"] as const) {
    const normalise = (value: unknown) => Array.isArray(value) ? [...value].sort() : value;
    if (JSON.stringify(normalise(control[key])) !== JSON.stringify(normalise(treatment[key]))) {
      reasons.push(`${key} differs between arms`);
    }
  }
  const controlSkills = control.skills as { name: string; path: string; enabled: boolean }[];
  const treatmentSkills = treatment.skills as { name: string; path: string; enabled: boolean }[];
  if (controlSkills.some((skill) => skill.enabled || ehsNames.includes(skill.name))) {
    reasons.push("control must have zero enabled skills and no staged EHS skills");
  }
  const ehs = treatmentSkills.filter((skill) => ehsNames.includes(skill.name));
  if (ehs.length !== ehsNames.length || ehs.some((skill) => !skill.enabled ||
      canonicalPath(skill.path) !== join(canonicalRoot, skill.name, "SKILL.md"))) {
    reasons.push("treatment must enable exactly the nine pinned EHS skill paths");
  }
  const ambient = treatmentSkills.filter((skill) => !ehsNames.includes(skill.name));
  if (ambient.some((skill) => skill.enabled) ||
      JSON.stringify(ambient.sort((a, b) => a.name.localeCompare(b.name))) !==
      JSON.stringify([...controlSkills].sort((a, b) => a.name.localeCompare(b.name)))) {
    reasons.push("ambient skill inventories differ or remain enabled");
  }
  const invocationPath = (treatment.invocation as Record<string, unknown>).path;
  if (typeof invocationPath !== "string" || canonicalPath(invocationPath) !==
      join(canonicalRoot, "using-extremely-hardcore", "SKILL.md") ||
      sha(JSON.stringify(treatment.invocation)) !== pin.invocationSha256) {
    reasons.push("explicit native invocation does not name the pinned EHS entrypoint");
  }
  return { status: reasons.length === 0 ? "ready" : "blocked", reasons, digests };
}
