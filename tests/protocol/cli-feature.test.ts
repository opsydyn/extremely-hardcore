import { expect, test } from "bun:test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { captureEvidence } from "../../protocol/evidence";
import { recordApproval } from "../../protocol/approvals";
import { transitionToComplete } from "../../protocol/transition";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import { createGitWorkspace } from "./support";

const CLI_PATH = join(import.meta.dir, "..", "..", "scripts", "eh.ts");

function createRun(risk: "standard" | "high"): { root: string; runPath: string } {
  const root = createGitWorkspace("extremely-hardcore cli feature ");
  const runPath = join(root, ".extremely-hardcore", "runs", "cli-feature");
  mkdirSync(runPath, { recursive: true });
  writeFileSync(
    join(runPath, "run.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "cli-feature",
        initialState: "implemented",
        risk,
        acceptanceCriteria: [{ id: "checks-pass", description: "Checks pass.", evidenceIds: [] }],
        blockers: [],
      },
      null,
      2,
    )}\n`,
  );
  return { root, runPath };
}

function runCli(root: string, args: string[]): ReturnType<typeof Bun.spawnSync> {
  return Bun.spawnSync(["bun", CLI_PATH, ...args], { cwd: root, stdout: "pipe", stderr: "pipe" });
}

test("prints durable status as JSON for a fresh agent", () => {
  const { root, runPath } = createRun("standard");
  const result = runCli(root, ["status", runPath]);

  expect(result.exitCode).toBe(0);
  expect(JSON.parse(result.stdout.toString()).nextAction).toBe("capture evidence for every uncovered criterion");
});

test("ci writes summary and attestation and fails before completion", async () => {
  const { root, runPath } = createRun("standard");
  await captureEvidence({
    runPath,
    criterionId: "checks-pass",
    command: ["bun", "-e", "process.exit(0)"],
  });
  const outputDir = join(root, "ci-output");
  const result = runCli(root, ["ci", runPath, outputDir]);

  expect(result.exitCode).toBe(1);
  expect(readFileSync(join(outputDir, "summary.txt"), "utf8")).toContain("state: implemented");
  expect(JSON.parse(readFileSync(join(outputDir, "attestation.json"), "utf8")).valid).toBe(false);
});

test("approval and ci complete a high-risk run", async () => {
  const { root, runPath } = createRun("high");
  await captureEvidence({
    runPath,
    criterionId: "checks-pass",
    command: ["bun", "-e", "process.exit(0)"],
  });
  const fingerprint = computeWorkspaceFingerprint(root);
  recordApproval(runPath, {
    approver: "test-reviewer",
    decision: "approved",
    gate: "complete",
    workspaceFingerprint: fingerprint,
    reason: "reviewed",
  });
  const transition = transitionToComplete(runPath, { workspaceFingerprint: fingerprint });
  expect(transition.ok).toBe(true);
  const outputDir = join(root, "ci-output");
  const result = runCli(root, ["ci", runPath, outputDir]);

  expect(result.exitCode).toBe(0);
  expect(JSON.parse(readFileSync(join(outputDir, "attestation.json"), "utf8")).valid).toBe(true);
});
