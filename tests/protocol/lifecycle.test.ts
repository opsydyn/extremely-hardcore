import { expect, test } from "bun:test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { captureEvidence } from "../../protocol/evidence";
import { recordApproval } from "../../protocol/approvals";
import { transitionTo, transitionToComplete } from "../../protocol/transition";
import type { RunDefinition } from "../../protocol/types";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import { createGitWorkspace } from "./support";

function createRun(risk: RunDefinition["risk"]): { root: string; runPath: string } {
  const root = createGitWorkspace("extremely-hardcore lifecycle ");
  const runPath = join(root, ".extremely-hardcore", "runs", "lifecycle");
  mkdirSync(runPath, { recursive: true });
  writeFileSync(
    join(runPath, "run.json"),
    JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "lifecycle",
        initialState: "implemented",
        risk,
        acceptanceCriteria: [{ id: "checks-pass", description: "Checks pass.", evidenceIds: [] }],
        blockers: [],
      },
      null,
      2,
    ) + "\n",
  );
  return { root, runPath };
}

test("allows a blocked run to resume after its blocker is resolved", () => {
  const { root, runPath } = createRun("standard");
  const fingerprint = computeWorkspaceFingerprint(root);

  const initialRun = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
  initialRun.blockers = [{ id: "review", description: "Review is pending.", status: "open" }];
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(initialRun, null, 2)}\n`);

  const blocked = transitionTo(runPath, "blocked", {
    workspaceFingerprint: fingerprint,
    reason: "waiting for review",
  });
  expect(blocked.ok).toBe(true);

  const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
  run.blockers = [{ id: "review", description: "Review is pending.", status: "resolved" }];
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);

  const resumed = transitionTo(runPath, "implemented", {
    workspaceFingerprint: fingerprint,
    reason: "review is complete",
  });
  expect(resumed.ok).toBe(true);
});

test("requires a fresh approval before a high-risk run can complete", async () => {
  const { root, runPath } = createRun("high");
  await captureEvidence({
    runPath,
    criterionId: "checks-pass",
    command: ["bun", "-e", "process.exit(0)"],
  });
  const fingerprint = computeWorkspaceFingerprint(root);

  const missing = transitionToComplete(runPath, { workspaceFingerprint: fingerprint });
  expect(missing.ok).toBe(false);
  expect(missing.errors.map(({ code }) => code)).toContain("approval.required");

  recordApproval(runPath, {
    approver: "human-reviewer",
    decision: "approved",
    gate: "complete",
    workspaceFingerprint: fingerprint,
    reason: "high-risk change reviewed",
  });
  const completed = transitionToComplete(runPath, { workspaceFingerprint: fingerprint });
  expect(completed.ok).toBe(true);
});

test("invalidates a high-risk approval after a tracked workspace change", async () => {
  const { root, runPath } = createRun("high");
  await captureEvidence({
    runPath,
    criterionId: "checks-pass",
    command: ["bun", "-e", "process.exit(0)"],
  });
  const before = computeWorkspaceFingerprint(root);
  recordApproval(runPath, {
    approver: "human-reviewer",
    decision: "approved",
    gate: "complete",
    workspaceFingerprint: before,
    reason: "reviewed before the change",
  });
  writeFileSync(join(root, "tracked.txt"), "changed after approval\n");

  const result = transitionToComplete(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(root),
  });
  expect(result.ok).toBe(false);
  expect(result.errors.map(({ code }) => code)).toContain("approval.stale");
});

test("rejects a terminal-state escape and a blocked transition without a blocker", () => {
  const { root, runPath } = createRun("standard");
  const fingerprint = computeWorkspaceFingerprint(root);
  const noBlocker = transitionTo(runPath, "blocked", {
    workspaceFingerprint: fingerprint,
    reason: "there is no recorded blocker",
  });
  expect(noBlocker.ok).toBe(false);
  expect(noBlocker.errors.map(({ code }) => code)).toContain("blocker.required");
});

test("does not resume a blocked run while its blocker is still open", () => {
  const { root, runPath } = createRun("standard");
  const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8")) as RunDefinition;
  run.blockers = [{ id: "review", description: "Review is pending.", status: "open" }];
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
  const fingerprint = computeWorkspaceFingerprint(root);
  expect(transitionTo(runPath, "blocked", { workspaceFingerprint: fingerprint, reason: "review pending" }).ok).toBe(true);

  const resumed = transitionTo(runPath, "implemented", {
    workspaceFingerprint: fingerprint,
    reason: "try to resume too early",
  });
  expect(resumed.ok).toBe(false);
  expect(resumed.errors.map(({ code }) => code)).toContain("blocker.open");
});
