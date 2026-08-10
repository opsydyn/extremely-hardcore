import { expect, test } from "bun:test";
import { join } from "node:path";
import { captureEvidence } from "../../protocol/evidence";
import { createAttestation } from "../../protocol/attestation";
import { readRunStatus } from "../../protocol/status";
import { transitionToComplete } from "../../protocol/transition";
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

test("reports a concise completed status with no next action", async () => {
  const { root, runPath } = await createCompletedRun();
  const status = readRunStatus(runPath, { workspaceFingerprint: computeWorkspaceFingerprint(root) });

  expect(status.state).toBe("complete");
  expect(status.validation.ok).toBe(true);
  expect(status.criteria).toEqual({ total: 1, covered: 1 });
  expect(status.nextAction).toBe("review the attestation and hand off the completed run");
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
