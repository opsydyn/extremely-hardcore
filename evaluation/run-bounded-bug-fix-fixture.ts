import { execFileSync } from "node:child_process";
import { cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";
import type { ActionFixtureExecutor, ActionFixtureResult } from "./types";

const FIXTURE_ROOT = fileURLToPath(new URL("./fixtures/bounded-bug-fix", import.meta.url));

export async function runBoundedBugFixFixture(options: {
  outputDir: string;
  executor: ActionFixtureExecutor;
}): Promise<ActionFixtureResult> {
  const outputDir = resolve(options.outputDir);
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }

  const workspace = join(outputDir, "workspace");
  cpSync(FIXTURE_ROOT, workspace, { recursive: true });
  initialiseGitWorkspace(workspace);

  await options.executor({
    fixtureId: "action.bounded-bug-fix",
    stage: "fix",
    workspace,
    runPath: join(workspace, ".extremely-hardcore", "runs", "bounded-bug-fix"),
    taskPath: join(workspace, "FIXTURE.md"),
    criterionId: "required-test-passes",
    requiredTestCommand: ["bun", "test", "tests/release-label.test.ts"],
  });

  throw new Error("Task 3 stage scoring is not implemented.");
}

function initialiseGitWorkspace(workspace: string): void {
  execFileSync("git", ["init", "-q"], { cwd: workspace });
  execFileSync("git", ["config", "user.email", "fixture@example.com"], { cwd: workspace });
  execFileSync("git", ["config", "user.name", "Fixture"], { cwd: workspace });
  execFileSync("git", ["add", "--all"], { cwd: workspace });
  execFileSync("git", ["commit", "-qm", "baseline"], { cwd: workspace });
}
