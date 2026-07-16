import { expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { runBoundedBugFixFixture } from "../../evaluation/run-bounded-bug-fix-fixture";

function createOutputDir(): { parentPath: string; outputDir: string } {
  const parentPath = mkdtempSync(join(tmpdir(), "extremely-hardcore-action-fixture-"));

  return { parentPath, outputDir: join(parentPath, "artifacts") };
}

function createPassingExecutor() {
  return () => undefined;
}

test("runs the bounded bug-fix fixture through fresh evidence and completion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: createPassingExecutor(),
    });

    expect(result.status).toBe("passed");
    expect(result.stages).toEqual([
      expect.objectContaining({ stage: "fix", status: "passed" }),
      expect.objectContaining({ stage: "resume", status: "passed" }),
    ]);
    expect(result.transitionCount).toBe(1);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});
