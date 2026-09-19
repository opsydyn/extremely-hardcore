import { expect, test } from "bun:test";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { captureEvidence } from "../../protocol/evidence";
import { recordApproval } from "../../protocol/approvals";
import type { RunDefinition } from "../../protocol/types";
import { createAttestation } from "../../protocol/attestation";
import { readRunStatus } from "../../protocol/status";
import { transitionTo, transitionToComplete } from "../../protocol/transition";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import { createGitWorkspace } from "./support";

async function createCompletedRun(): Promise<{ root: string; runPath: string }> {
  const root = createGitWorkspace("extremely-hardcore status ");
  const runPath = join(root, ".extremely-hardcore", "runs", "status");
  await Bun.write(
    join(runPath, "run.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "status",
        initialState: "implemented",
        risk: "standard",
        acceptanceCriteria: [{ id: "checks-pass", description: "Checks pass.", evidenceIds: [] }],
        blockers: [],
      },
      null,
      2,
    )}\n`,
  );
  await captureEvidence({
    runPath,
    criterionId: "checks-pass",
    command: ["bun", "-e", "process.exit(0)"],
  });
  const workspaceFingerprint = computeWorkspaceFingerprint(root);
  const transition = transitionToComplete(runPath, { workspaceFingerprint });
  if (!transition.ok) {
    throw new Error(transition.errors.map(({ code }) => code).join(", "));
  }
  return { root, runPath };
}

async function createBlockedRun(): Promise<{ root: string; runPath: string }> {
  const root = createGitWorkspace("extremely-hardcore blocked status ");
  const runPath = join(root, ".extremely-hardcore", "runs", "status");
  await Bun.write(
    join(runPath, "run.json"),
    `${JSON.stringify(
      {
        schemaVersion: 1,
        changeId: "status",
        initialState: "implemented",
        risk: "standard",
        acceptanceCriteria: [{ id: "checks-pass", description: "Checks pass.", evidenceIds: [] }],
        blockers: [{ id: "review", description: "Review is pending.", status: "open" }],
      },
      null,
      2,
    )}\n`,
  );
  const transition = transitionTo(runPath, "blocked", {
    workspaceFingerprint: computeWorkspaceFingerprint(root),
    reason: "waiting for review",
  });
  if (!transition.ok) {
    throw new Error(transition.errors.map(({ code }) => code).join(", "));
  }
  return { root, runPath };
}

test("reports a concise completed status with no next action", async () => {
  const { root, runPath } = await createCompletedRun();
  const status = readRunStatus(runPath, { workspaceFingerprint: computeWorkspaceFingerprint(root) });

  expect(status.state).toBe("complete");
  expect(status.validation.ok).toBe(true);
  expect(status.criteria).toEqual({ total: 1, covered: 1 });
  expect(status.nextAction).toBe("review the attestation and hand off the completed run");
});

test("directs a stale completed run to start a fresh run", async () => {
  const { root, runPath } = await createCompletedRun();
  writeFileSync(join(root, "tracked.txt"), "changed after completion\n");

  const status = readRunStatus(runPath, { workspaceFingerprint: computeWorkspaceFingerprint(root) });

  expect(status.state).toBe("complete");
  expect(status.validation.ok).toBe(false);
  expect(status.nextAction).toBe("start a new run; completed run validation is invalid");
});

test("directs a resolved blocked run to resume or abandon", async () => {
  const { root, runPath } = await createBlockedRun();
  const fingerprint = computeWorkspaceFingerprint(root);
  const openStatus = readRunStatus(runPath, { workspaceFingerprint: fingerprint });

  expect(openStatus.state).toBe("blocked");
  expect(openStatus.blockers).toEqual({ open: 1, resolved: 0 });
  expect(openStatus.nextAction).toBe("resolve the open blocker, then resume or abandon the run");

  const run = await Bun.file(join(runPath, "run.json")).json() as {
    blockers: Array<{ id: string; description: string; status: "open" | "resolved" }>;
  };
  const blocker = run.blockers[0];
  if (!blocker) {
    throw new Error("expected a blocker");
  }
  blocker.status = "resolved";
  await Bun.write(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);

  const resolvedStatus = readRunStatus(runPath, { workspaceFingerprint: fingerprint });
  expect(resolvedStatus.state).toBe("blocked");
  expect(resolvedStatus.blockers).toEqual({ open: 0, resolved: 1 });
  expect(resolvedStatus.nextAction).toBe("resume the run now that blockers are resolved, or abandon it");

  const resumed = transitionTo(runPath, "implemented", {
    workspaceFingerprint: fingerprint,
    reason: "review is complete",
  });
  expect(resumed.ok).toBe(true);
});

test("creates a digest-linked attestation without changing the run", async () => {
  const { root, runPath } = await createCompletedRun();
  const attestation = createAttestation(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(root),
  });

  expect(attestation.kind).toBe("extremely-hardcore.run-attestation");
  expect(attestation.valid).toBe(true);
  expect(attestation.artifacts.some(({ path }) => path === "run.json")).toBe(true);
  expect(attestation.artifacts.every(({ sha256 }) => /^[a-f0-9]{64}$/.test(sha256))).toBe(true);
});

test.each([
  { scenario: "approved", risk: "high", decision: "approved", error: undefined },
  { scenario: "missing approval", risk: "high", decision: undefined, error: "approval.required" },
  { scenario: "rejected approval", risk: "high", decision: "rejected", error: "approval.rejected" },
  { scenario: "stale approval", risk: "high", decision: "approved", error: "approval.stale" },
  { scenario: "failed evidence", risk: "high", decision: "approved", error: "evidence.failed" },
  { scenario: "open blocker", risk: "high", decision: "approved", error: "blocker.open" },
  { scenario: "standard pending decision", risk: "standard", decision: undefined, error: undefined },
] as const)("human-decision status: $scenario", async ({ scenario, risk, decision, error }) => {
  const root = createGitWorkspace("extremely-hardcore decision status ");
  const runPath = join(root, ".extremely-hardcore", "runs", "decision");
  const run: RunDefinition = {
    schemaVersion: 1,
    changeId: "decision",
    initialState: "implemented",
    risk,
    acceptanceCriteria: [{ id: "checks-pass", description: "Checks pass.", evidenceIds: [] }],
    blockers: scenario === "open blocker"
      ? [{ id: "review", description: "Review pending.", status: "open" }]
      : [],
  };
  await Bun.write(join(runPath, "run.json"), JSON.stringify(run));
  await captureEvidence({
    runPath,
    criterionId: "checks-pass",
    command: ["bun", "-e", scenario === "failed evidence" ? "process.exit(1)" : "process.exit(0)"],
  });
  const workspaceFingerprint = computeWorkspaceFingerprint(root);
  expect(transitionTo(runPath, "needs-human-decision", {
    workspaceFingerprint,
    reason: "Human decision pending.",
  }).ok).toBe(true);
  if (decision) {
    recordApproval(runPath, {
      approver: "fixture reviewer",
      decision,
      gate: "complete",
      workspaceFingerprint: scenario === "stale approval" ? "previous-workspace" : workspaceFingerprint,
      reason: "Fixture review decision.",
    });
  }

  const status = readRunStatus(runPath, { workspaceFingerprint });
  expect(status.state).toBe("needs-human-decision");
  expect(status.validation.errors.map(({ code }) => code)).toEqual(error ? [error] : []);
  expect(status.nextAction).toBe(scenario === "approved"
    ? "request the guarded completion transition"
    : "record the required human decision or abandon the run");
});
