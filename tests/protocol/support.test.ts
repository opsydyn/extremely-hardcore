import { afterEach, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { createGitWorkspace } from "./support";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

test("createGitWorkspace creates a committed repository with a tracked file", () => {
  const root = createGitWorkspace("extremely-hardcore-support-");
  roots.push(root);

  expect(execFileSync("git", ["status", "--porcelain"], { cwd: root, encoding: "utf8" })).toBe("");
  expect(readFileSync(join(root, "tracked.txt"), "utf8")).toBe("protected work\n");
});
