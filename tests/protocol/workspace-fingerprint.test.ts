import { afterEach, describe, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import { createGitWorkspace } from "./support";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function createGitRepository(): string {
  const root = createGitWorkspace("extremely-hardcore-git-");
  roots.push(root);
  return root;
}

describe("computeWorkspaceFingerprint", () => {
  test("changes when a tracked file changes", () => {
    const root = createGitRepository();
    const before = computeWorkspaceFingerprint(root);

    writeFileSync(join(root, "tracked.txt"), "after\n");

    expect(computeWorkspaceFingerprint(root)).not.toBe(before);
  });

  test("changes when an untracked file is added", () => {
    const root = createGitRepository();
    const before = computeWorkspaceFingerprint(root);

    writeFileSync(join(root, "untracked.txt"), "new work\n");

    expect(computeWorkspaceFingerprint(root)).not.toBe(before);
  });

  test("ignores untracked protocol artefacts", () => {
    const root = createGitRepository();
    const before = computeWorkspaceFingerprint(root);

    mkdirSync(join(root, ".extremely-hardcore", "runs"), { recursive: true });
    writeFileSync(join(root, ".extremely-hardcore", "runs", "evidence.json"), "{}\n");

    expect(computeWorkspaceFingerprint(root)).toBe(before);
  });

  test("ignores changes to tracked protocol artefacts", () => {
    const root = createGitRepository();
    mkdirSync(join(root, ".extremely-hardcore"), { recursive: true });
    writeFileSync(join(root, ".extremely-hardcore", "run.json"), "{\"state\":\"implemented\"}\n");
    execFileSync("git", ["add", ".extremely-hardcore/run.json"], { cwd: root });
    execFileSync("git", ["commit", "-qm", "add run"], { cwd: root });
    const before = computeWorkspaceFingerprint(root);

    writeFileSync(join(root, ".extremely-hardcore", "run.json"), "{\"state\":\"complete\"}\n");

    expect(computeWorkspaceFingerprint(root)).toBe(before);
  });
});
