import { expect, test } from "bun:test";
import { cpSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { scoreReview, REVIEW_OUTPUT_SCHEMA } from "../../evaluation/review-fixture";
import { preflightReviewComparison, hashSkillSnapshot, reviewPins } from "../../evaluation/review-preflight";

const root = resolve(import.meta.dir, "../..");
const taskPath = join(root, "evaluation/fixtures/review-pagination/task.md");
const sha = (value: string) => createHash("sha256").update(value).digest("hex");

function validFinding() {
  return {
    file: "src/pagination.ts",
    line: 4,
    failure: "A non-first page can be empty because the slice end ignores offset.",
    evidence: {
      items: ["a", "b", "c", "d"], offset: 2, limit: 2,
      expected: ["c", "d"], actual: [],
    },
    remainingUncertainty: "Other callers have not been inspected.",
  };
}

test("independent review witness passes, while missing, surplus, or false witnesses fail", () => {
  const answer = { schemaVersion: 1, findings: [validFinding()] };
  expect(scoreReview(answer).status).toBe("passed");
  expect(scoreReview({ ...answer, findings: [] }).status).toBe("failed");
  expect(scoreReview({ ...answer, findings: [validFinding(), { ...validFinding(), line: 5 }] }).status).toBe("failed");
  expect(scoreReview({ ...answer, findings: [{ ...validFinding(), line: 5 }] }).status).toBe("failed");
  expect(scoreReview({ ...answer, findings: [{ ...validFinding(), evidence: { ...validFinding().evidence, actual: ["c", "d"] } }] }).status).toBe("failed");
  expect(scoreReview({ ...answer, findings: [{ ...validFinding(), failure: " " }] }).status).toBe("invalid");
  expect(scoreReview({ ...answer, findings: [{ ...validFinding(), evidence: { ...validFinding().evidence, offset: 0 } }] }).status).toBe("failed");
});

test("task artifact does not contain the scorer oracle", () => {
  const task = readFileSync(taskPath, "utf8");
  expect(task).toContain("+  const end = size;");
  expect(task).not.toContain("review-oracle");
  expect(task).not.toContain("expected finding");
});

function validPreflight() {
  const names = [
    "architecture-decision", "bounded-context-review", "change-contract",
    "decision-challenge", "domain-discovery", "evidence-ledger",
    "simple-made-easy", "test-first-implementation", "using-extremely-hardcore",
  ];
  const common = {
    taskSha256: sha(readFileSync(taskPath, "utf8")),
    outputSchemaSha256: sha(JSON.stringify(REVIEW_OUTPUT_SCHEMA)),
    model: "same-model", permissions: { sandbox: "read-only", approval: "never", network: "disabled" },
    tools: ["read_file"], hooks: [], mcpServers: [], instructionSources: ["base"],
    trace: { events: true, final: true, usage: true, toolCalls: true },
  };
  const ambient = [{ name: "ambient", path: "/host/ambient/SKILL.md", enabled: false }];
  const invocation = { kind: "native-skill", path: join(root, "skills", "using-extremely-hardcore", "SKILL.md") };
  return {
    schemaVersion: 1,
    pin: { taskSha256: common.taskSha256, fixtureSha256: sha(readFileSync(join(root, "evaluation/fixtures/review-pagination/src/pagination.ts"), "utf8")), outputSchemaSha256: common.outputSchemaSha256, skillSnapshotSha256: hashSkillSnapshot(join(root, "skills")), invocationSha256: sha(JSON.stringify(invocation)) },
    control: { ...common, skills: ambient, invocation: { kind: "none" } },
    treatment: {
      ...common,
      skills: [...ambient, ...names.map((name) => ({ name, path: join(root, "skills", name, "SKILL.md"), enabled: true }))],
      invocation,
      skillRoot: join(root, "skills"),
    },
  };
}

test("preflight accepts a complete, pinned no-model arm pair", () => {
  expect(preflightReviewComparison(validPreflight()).status).toBe("ready");
});

test("preflight accepts host-canonical staged paths when the local temp root has an alias", () => {
  const dir = mkdtempSync(join(tmpdir(), "ehs-review-paths-"));
  try {
    const staged = join(dir, "skills");
    cpSync(join(root, "skills"), staged, { recursive: true });
    const canonical = realpathSync(staged);
    const input = validPreflight();
    input.pin = reviewPins(staged);
    input.treatment.skillRoot = staged;
    input.treatment.skills = input.treatment.skills.map((skill) =>
      skill.name === "ambient" ? skill : { ...skill, path: join(canonical, skill.name, "SKILL.md") });
    input.treatment.invocation.path = join(canonical, "using-extremely-hardcore", "SKILL.md");
    expect(preflightReviewComparison(input).status).toBe("ready");
    input.treatment.invocation.path = join(staged, "using-extremely-hardcore", "SKILL.md");
    expect(preflightReviewComparison(input).status).toBe("blocked");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("preflight fails closed on incomplete or unmatched arms", () => {
  const valid = validPreflight();
  const mutations = [
    { ...valid, control: { ...valid.control, model: "other-model" } },
    { ...valid, control: { ...valid.control, tools: ["shell"] } },
    { ...valid, treatment: { ...valid.treatment, hooks: ["hook"] } },
    { ...valid, treatment: { ...valid.treatment, mcpServers: ["mcp"] } },
    { ...valid, treatment: { ...valid.treatment, taskSha256: sha("other") } },
    { ...valid, treatment: { ...valid.treatment, outputSchemaSha256: sha("other") } },
    { ...valid, treatment: { ...valid.treatment, instructionSources: ["other"] } },
    { ...valid, treatment: { ...valid.treatment, trace: { ...valid.treatment.trace, usage: false } } },
    { ...valid, control: { ...valid.control, skills: [{ ...valid.control.skills[0]!, enabled: true }] } },
    { ...valid, treatment: { ...valid.treatment, skills: valid.treatment.skills.slice(0, -1) } },
    { ...valid, treatment: { ...valid.treatment, skills: [...valid.treatment.skills, valid.treatment.skills[1]] } },
    { ...valid, treatment: { ...valid.treatment, invocation: { kind: "none" } } },
    { ...valid, pin: { ...valid.pin, skillSnapshotSha256: sha("changed") } },
    { ...valid, pin: { ...valid.pin, fixtureSha256: sha("changed") } },
    { ...valid, control: { ...valid.control, permissions: { ...valid.control.permissions, network: "enabled" } } },
    { ...valid, treatment: { ...valid.treatment, skillRoot: "/missing/skill-root" } },
  ];
  for (const mutation of mutations) {
    expect(preflightReviewComparison(mutation).status).toBe("blocked");
  }
  expect(preflightReviewComparison({ ...valid, control: { ...valid.control, tools: undefined } }).status).toBe("blocked");
});

test("skill snapshot rejects symlinked material", () => {
  const dir = mkdtempSync(join(tmpdir(), "ehs-review-"));
  try {
    symlinkSync(join(root, "skills"), join(dir, "linked"));
    expect(() => hashSkillSnapshot(dir)).toThrow();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("review command scores and preflights JSON without a provider", () => {
  const dir = mkdtempSync(join(tmpdir(), "ehs-review-cli-"));
  const cli = join(root, "scripts/evaluate-review.ts");
  try {
    const answer = join(dir, "answer.json");
    const preflight = join(dir, "preflight.json");
    writeFileSync(answer, JSON.stringify({ schemaVersion: 1, findings: [validFinding()] }));
    writeFileSync(preflight, JSON.stringify(validPreflight()));
    const score = Bun.spawnSync(["bun", cli, "score", answer]);
    const check = Bun.spawnSync(["bun", cli, "preflight", preflight]);
    const pin = Bun.spawnSync(["bun", cli, "pin", join(root, "skills")]);
    expect(score.exitCode).toBe(0);
    expect(JSON.parse(score.stdout.toString()).status).toBe("passed");
    expect(check.exitCode).toBe(0);
    expect(JSON.parse(check.stdout.toString()).status).toBe("ready");
    expect(pin.exitCode).toBe(0);
    expect(JSON.parse(pin.stdout.toString())).toEqual(validPreflight().pin);
    writeFileSync(answer, JSON.stringify({ schemaVersion: 1, findings: [] }));
    expect(Bun.spawnSync(["bun", cli, "score", answer]).exitCode).toBe(1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
