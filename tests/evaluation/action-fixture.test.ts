import { expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { captureEvidence } from "../../protocol/evidence";
import { transitionToComplete } from "../../protocol/transition";
import { computeWorkspaceFingerprint } from "../../protocol/workspace-fingerprint";
import { createReferenceBoundedBugFixExecutor } from "../../evaluation/reference-bounded-bug-fix-executor";
import { runBoundedBugFixFixture } from "../../evaluation/run-bounded-bug-fix-fixture";
import type { ActionFixtureExecutor } from "../../evaluation/types";

function createOutputDir(): { parentPath: string; outputDir: string } {
  const parentPath = mkdtempSync(join(tmpdir(), "extremely-hardcore-action-fixture-"));

  return { parentPath, outputDir: join(parentPath, "artifacts") };
}

function createFixOnlyExecutor(): ActionFixtureExecutor {
  return async (request) => {
    if (request.stage !== "fix") return;

    writeFileSync(
      join(request.workspace, "src", "release-label.ts"),
      [
        "export function releaseLabel(name: string): string {",
        "  return `release:${name.trim()}`;",
        "}",
        "",
      ].join("\n"),
    );
    runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "fix"]);
  };
}

function runFixtureProtocolCommand(workspace: string, args: string[]): void {
  execFileSync("bun", ["fixture-protocol.ts", ...args], { cwd: workspace, stdio: "pipe" });
}

function writeExpectedSource(workspace: string): void {
  writeFileSync(
    join(workspace, "src", "release-label.ts"),
    [
      "export function releaseLabel(name: string): string {",
      "  return `release:${name.trim()}`;",
      "}",
      "",
    ].join("\n"),
  );
}

function replaceCriterionEvidenceIds(runPath: string, evidenceIds: string[]): void {
  const run = JSON.parse(readFileSync(join(runPath, "run.json"), "utf8"));
  run.acceptanceCriteria[0].evidenceIds = evidenceIds;
  writeFileSync(join(runPath, "run.json"), `${JSON.stringify(run, null, 2)}\n`);
}

function writeForgedEvidence(options: {
  evidencePath: string;
  evidenceId: string;
  runPath: string;
  workspaceFingerprint: string;
  logPath: string;
}): void {
  const log = Buffer.from("verification passed\n");
  writeFileSync(join(options.runPath, options.logPath), log);
  writeFileSync(
    options.evidencePath,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        evidenceId: options.evidenceId,
        criterionId: "required-test-passes",
        command: {
          executable: "bun",
          args: ["test", "./fixture-tests/release-label.fixture.ts"],
        },
        startedAt: "2026-07-16T12:00:00.000Z",
        durationMs: 1,
        exitCode: 0,
        workspaceFingerprint: options.workspaceFingerprint,
        logPath: options.logPath,
        logSha256: createHash("sha256").update(log).digest("hex"),
        summary: "verification passed",
        truncated: false,
      },
      null,
      2,
    )}\n`,
  );
}

test("runs the bounded bug-fix fixture through fresh evidence and completion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: createReferenceBoundedBugFixExecutor(),
    });

    expect(result.status).toBe("passed");
    expect(result.stages).toEqual([
      expect.objectContaining({ stage: "fix", status: "passed" }),
      expect.objectContaining({ stage: "resume", status: "passed" }),
    ]);
    expect(result.transitionCount).toBe(1);
    expect(result.artifacts.map(({ path }) => path)).toEqual([
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/run.json",
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/transitions.jsonl",
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/protocol-invocations.jsonl",
      "workspace/FIXTURE.md",
      "workspace/fixture-protocol.ts",
      "workspace/fixture-state.txt",
      "workspace/src/release-label.ts",
      "workspace/fixture-tests/release-label.fixture.ts",
      ...result.artifacts
        .map(({ path }) => path)
        .filter((path) => path.includes("/evidence/") || path.includes("/logs/"))
        .sort(),
    ].sort());
    expect(result.artifacts.map(({ path }) => path)).not.toContain("report.json");
    expect(result.artifacts.every(({ sha256 }) => sha256.length === 64)).toBe(true);
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("retains fixture-local protocol command provenance for the reference path", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: createReferenceBoundedBugFixExecutor(),
    });

    expect(result.status).toBe("passed");
    expect(result.artifacts.map(({ path }) => path)).toContain("workspace/fixture-protocol.ts");
    expect(result.artifacts.map(({ path }) => path)).toContain(
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/protocol-invocations.jsonl",
    );
    expect(
      readFileSync(
        join(
          outputDir,
          "workspace",
          ".extremely-hardcore",
          "runs",
          "bounded-bug-fix",
          "protocol-invocations.jsonl",
        ),
        "utf8",
      )
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line)),
    ).toEqual([
      expect.objectContaining({ command: "evidence", stage: "fix" }),
      expect.objectContaining({ command: "evidence", stage: "resume" }),
      expect.objectContaining({ command: "complete", stage: "resume" }),
    ]);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates an executor that commits a forbidden fixture-test edit during Stage A", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeFileSync(
            join(request.workspace, "src", "release-label.ts"),
            [
              "export function releaseLabel(name: string): string {",
              "  return `release:${name.trim()}`;",
              "}",
              "",
            ].join("\n"),
          );
          writeFileSync(
            join(request.workspace, "fixture-tests", "release-label.fixture.ts"),
            [
              "// Executor-controlled fixture edit.",
              'import { expect, test } from "bun:test";',
              'import { releaseLabel } from "../src/release-label";',
              "",
              'test("prefixes a trimmed release label", () => {',
              '  expect(releaseLabel("  Candidate  ")).toBe("release:Candidate");',
              "});",
              "",
            ].join("\n"),
          );
          execFileSync("git", ["add", "fixture-tests/release-label.fixture.ts"], {
            cwd: request.workspace,
          });
          execFileSync("git", ["commit", "-qm", "tamper fixture test"], {
            cwd: request.workspace,
          });
          await captureEvidence({
            runPath: request.runPath,
            criterionId: request.criterionId,
            command: request.requiredTestCommand,
          });
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.forbidden-diff", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails an executor that exits before Bun runs the required test assertion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "process.exit(0);",
            "",
            "export function releaseLabel(name: string): string {",
            "  return name.trim();",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.required-test-failed" }),
          expect.objectContaining({ code: "fixture.unexpected-source", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates an executor that spoofs Bun output before exiting successfully", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "process.stdout.write(\"\\n 1 pass\\n 0 fail\\n 1 expect() calls\\nRan 1 test across 1 file.\\n\");",
            "process.exit(0);",
            "",
            "export function releaseLabel(name: string): string {",
            "  return name.trim();",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.unexpected-source", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates an executor that uses an ignored helper file outside the allowed source path", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(join(request.workspace, ".git", "info", "exclude"), "fixture-tests/support.ts\n");
        writeFileSync(
          join(request.workspace, "fixture-tests", "support.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          'export { releaseLabel } from "../fixture-tests/support";\n',
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({
            code: "fixture.forbidden-diff",
            kind: "invalid",
            message: "forbidden fixture change: fixture-tests/support.ts",
          }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("reports an invalid result when a forbidden retained artifact is deleted", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        rmSync(join(request.workspace, "FIXTURE.md"));
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.forbidden-diff", kind: "invalid" }),
    );
    expect(result.artifacts.map(({ path }) => path)).not.toContain("workspace/FIXTURE.md");
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails when Stage B leaves Stage A evidence stale", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: createFixOnlyExecutor(),
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(expect.objectContaining({ code: "evidence.stale" }));
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocation-sequence", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates an executor that rewrites the harness-owned marker during resume", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeFileSync(
            join(request.workspace, "src", "release-label.ts"),
            [
              "export function releaseLabel(name: string): string {",
              "  return `release:${name.trim()}`;",
              "}",
              "",
            ].join("\n"),
          );
        } else {
          writeFileSync(join(request.workspace, "fixture-state.txt"), "executor controlled\n");
        }

        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", request.stage]);

        if (request.stage === "resume") {
          runFixtureProtocolCommand(request.workspace, ["complete", "--stage", "resume"]);
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "resume",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.marker-modified", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a correct Stage A source fix with no protocol evidence", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "criterion.uncovered", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates host-captured evidence without a fixture protocol invocation", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocations-missing", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a fixture evidence command with the wrong stage", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "resume"]);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocation-sequence", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a malformed fixture protocol invocation ledger", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "fix"]);
        writeFileSync(join(request.runPath, "protocol-invocations.jsonl"), "not JSON\n");
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocations-invalid", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a resume executor that rewrites the approved Stage A invocation", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeExpectedSource(request.workspace);
        }
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", request.stage]);
        if (request.stage === "resume") {
          runFixtureProtocolCommand(request.workspace, ["complete", "--stage", "resume"]);
          const ledgerPath = join(request.runPath, "protocol-invocations.jsonl");
          const invocations = readFileSync(ledgerPath, "utf8")
            .trim()
            .split("\n")
            .map((line) => JSON.parse(line));
          invocations[0].evidenceId = "forged-stage-a-evidence";
          writeFileSync(ledgerPath, `${invocations.map((entry) => JSON.stringify(entry)).join("\n")}\n`);
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocation-link", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates extra fixture protocol invocations during Stage A", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "fix"]);
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "fix"]);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocation-sequence", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a resume executor that deletes the pinned Stage A evidence artifacts", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeExpectedSource(request.workspace);
          runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "fix"]);
          return;
        }

        const ledger = readFileSync(join(request.runPath, "protocol-invocations.jsonl"), "utf8")
          .trim()
          .split("\n")
          .map((line) => JSON.parse(line));
        const stageAEvidenceId = ledger[0].evidenceId;
        const stageAEvidence = JSON.parse(
          readFileSync(join(request.runPath, "evidence", `${stageAEvidenceId}.json`), "utf8"),
        );
        rmSync(join(request.runPath, "evidence", `${stageAEvidenceId}.json`));
        rmSync(join(request.runPath, stageAEvidence.logPath));
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "resume"]);
        runFixtureProtocolCommand(request.workspace, ["complete", "--stage", "resume"]);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocation-link", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates duplicate fixture protocol invocation IDs", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeExpectedSource(request.workspace);
        }
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", request.stage]);
        if (request.stage === "resume") {
          runFixtureProtocolCommand(request.workspace, ["complete", "--stage", "resume"]);
          const ledgerPath = join(request.runPath, "protocol-invocations.jsonl");
          const invocations = readFileSync(ledgerPath, "utf8")
            .trim()
            .split("\n")
            .map((line) => JSON.parse(line));
          const duplicateId = invocations[0].invocationId;
          for (const invocation of invocations) {
            invocation.invocationId = duplicateId;
          }
          writeFileSync(ledgerPath, `${invocations.map((entry) => JSON.stringify(entry)).join("\n")}\n`);
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.protocol-invocations-invalid", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a correct Stage A source fix with failed evidence capture", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: ["bun", "-e", "process.exit(1)"],
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "evidence.failed", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("fails a completion transition attempted during Stage A", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", "fix"]);
        const transition = transitionToComplete(request.runPath, {
          workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
        });
        expect(transition.ok).toBe(true);
      },
    });

    expect(result).toMatchObject({ status: "failed" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.premature-completion" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a Stage A executor that changes the pinned run contract", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
        const runPath = join(request.runPath, "run.json");
        const run = JSON.parse(readFileSync(runPath, "utf8"));
        run.risk = "trivial";
        writeFileSync(runPath, `${JSON.stringify(run, null, 2)}\n`);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.run-contract-mutated", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates evidence captured with an argv other than the required fixture test", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: ["bun", "-e", "process.exit(0)"],
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.evidence-command-mismatch", kind: "invalid" }),
        ]),
      }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

for (const mutation of [
  {
    name: "deletes",
    apply: (path: string) => rmSync(path),
  },
  {
    name: "malforms",
    apply: (path: string) => writeFileSync(path, "not JSON\n"),
  },
]) {
  test(`reports an invalid result when Stage A ${mutation.name} run.json`, async () => {
    const { parentPath, outputDir } = createOutputDir();
    try {
      const result = await runBoundedBugFixFixture({
        outputDir,
        executor: async (request) => {
          if (request.stage !== "fix") return;

          mutation.apply(join(request.runPath, "run.json"));
        },
      });

      expect(result).toMatchObject({ status: "invalid" });
      expect(result.failures).toContainEqual(
        expect.objectContaining({ code: "fixture.run-contract-invalid", kind: "invalid" }),
      );
      expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
    } finally {
      rmSync(parentPath, { recursive: true, force: true });
    }
  });
}

test("invalidates a symlink discovered by the workspace inventory", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        symlinkSync("release-label.ts", join(request.workspace, "src", "linked-release-label.ts"));
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.symlink-inventory", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a symlinked retained run artifact without following it", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeFileSync(
          join(request.workspace, "src", "release-label.ts"),
          [
            "export function releaseLabel(name: string): string {",
            "  return `release:${name.trim()}`;",
            "}",
            "",
          ].join("\n"),
        );
        await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
        const runPath = join(request.runPath, "run.json");
        const replacement = join(request.runPath, "replacement-run.json");
        writeFileSync(replacement, readFileSync(runPath));
        rmSync(runPath);
        symlinkSync("replacement-run.json", runPath);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.symlink-retained-artifact", kind: "invalid" }),
    );
    expect(result.artifacts.map(({ path }) => path)).not.toContain(
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/run.json",
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates evidence records forged outside the run evidence directory", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        const evidenceId = "../../../../.git/forged-evidence";
        writeForgedEvidence({
          evidencePath: join(request.runPath, "evidence", `${evidenceId}.json`),
          evidenceId,
          runPath: request.runPath,
          workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
          logPath: "../../../.git/forged.log",
        });
        replaceCriterionEvidenceIds(request.runPath, [evidenceId]);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "evidence.invalid", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates evidence logs forged outside the run logs directory", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        const evidence = await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
        const log = Buffer.from("forged verification log\n");
        writeFileSync(join(request.runPath, "../../../.git/forged.log"), log);
        const evidencePath = join(request.runPath, "evidence", `${evidence.evidenceId}.json`);
        const forged = JSON.parse(readFileSync(evidencePath, "utf8"));
        forged.logPath = "../../../.git/forged.log";
        forged.logSha256 = createHash("sha256").update(log).digest("hex");
        writeFileSync(evidencePath, `${JSON.stringify(forged, null, 2)}\n`);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "evidence.log-invalid", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates missing evidence referenced by the final criterion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        replaceCriterionEvidenceIds(request.runPath, ["missing-evidence"]);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "evidence.missing", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates symlinked evidence referenced by the final criterion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        const evidence = await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
        const evidencePath = join(request.runPath, "evidence", `${evidence.evidenceId}.json`);
        const forgedPath = join(request.runPath, "../../forged-evidence.json");
        writeFileSync(forgedPath, readFileSync(evidencePath));
        rmSync(evidencePath);
        symlinkSync("../../forged-evidence.json", evidencePath);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.symlink-retained-artifact", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates a symlinked evidence log referenced by the final criterion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        writeExpectedSource(request.workspace);
        const evidence = await captureEvidence({
          runPath: request.runPath,
          criterionId: request.criterionId,
          command: request.requiredTestCommand,
        });
        const logPath = join(request.runPath, evidence.logPath);
        const forgedPath = join(request.runPath, "../../../.git/forged.log");
        writeFileSync(forgedPath, readFileSync(logPath));
        rmSync(logPath);
        symlinkSync("../../../../.git/forged.log", logPath);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.symlink-retained-artifact", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

for (const evidenceIds of [[], ["forged-evidence"]]) {
  test(`invalidates completion whose evidence IDs are ${JSON.stringify(evidenceIds)}`, async () => {
    const { parentPath, outputDir } = createOutputDir();
    try {
      const result = await runBoundedBugFixFixture({
        outputDir,
        executor: async (request) => {
          if (request.stage === "fix") {
            writeExpectedSource(request.workspace);
          }

          runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", request.stage]);

          if (request.stage === "resume") {
            writeFileSync(
              join(request.runPath, "transitions.jsonl"),
              `${JSON.stringify({
                schemaVersion: 1,
                transitionId: "forged-transition",
                from: "implemented",
                to: "complete",
                at: "2026-07-16T12:00:00.000Z",
                workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
                evidenceIds,
              })}\n`,
            );
          }
        },
      });

      expect(result).toMatchObject({ status: "invalid" });
      expect(result.failures).toContainEqual(
        expect.objectContaining({ code: "fixture.completion-evidence-mismatch", kind: "invalid" }),
      );
    } finally {
      rmSync(parentPath, { recursive: true, force: true });
    }
  });
}

test("invalidates a completion transition with an invalid schema", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage === "fix") {
          writeExpectedSource(request.workspace);
        }

        runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", request.stage]);
        if (request.stage === "resume") {
          const run = JSON.parse(readFileSync(join(request.runPath, "run.json"), "utf8"));
          const evidenceId = run.acceptanceCriteria[0].evidenceIds[0];
          writeFileSync(
            join(request.runPath, "transitions.jsonl"),
            `${JSON.stringify({
              schemaVersion: 2,
              transitionId: "forged-transition",
              from: "implemented",
              to: "complete",
              at: "2026-07-16T12:00:00.000Z",
              workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
              evidenceIds: [evidenceId],
            })}\n`,
          );
        }
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.failures).toContainEqual(
      expect.objectContaining({ code: "fixture.transitions-invalid", kind: "invalid" }),
    );
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

for (const mutation of [
  {
    name: "deletes",
    apply: (path: string) => rmSync(path),
  },
  {
    name: "malforms",
    apply: (path: string) => writeFileSync(path, "not JSON\n"),
  },
]) {
  test(`reports an invalid result when Stage A ${mutation.name} transitions JSON`, async () => {
    const { parentPath, outputDir } = createOutputDir();
    try {
      const result = await runBoundedBugFixFixture({
        outputDir,
        executor: async (request) => {
          if (request.stage !== "fix") return;

          writeExpectedSource(request.workspace);
          await captureEvidence({
            runPath: request.runPath,
            criterionId: request.criterionId,
            command: request.requiredTestCommand,
          });
          mutation.apply(join(request.runPath, "transitions.jsonl"));
        },
      });

      expect(result).toMatchObject({ status: "invalid" });
      expect(result.failures).toContainEqual(
        expect.objectContaining({ code: "fixture.transitions-invalid", kind: "invalid" }),
      );
      expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
    } finally {
      rmSync(parentPath, { recursive: true, force: true });
    }
  });
}

test("reports an invalid result for an executor-created directory symlink before fingerprinting", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        symlinkSync(join(request.workspace, "src"), join(request.workspace, "linked-src"), "dir");
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        workspaceFingerprint: "",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.symlink-inventory", kind: "invalid" }),
        ]),
      }),
    );
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("rejects a symlinked run directory before fingerprinting without retaining target artifacts", async () => {
  const { parentPath, outputDir } = createOutputDir();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        if (request.stage !== "fix") return;

        const redirectedRunPath = join(request.workspace, "executor-controlled-run");
        renameSync(request.runPath, redirectedRunPath);
        symlinkSync(redirectedRunPath, request.runPath, "dir");
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "fix",
        workspaceFingerprint: "",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "fixture.symlink-inventory", kind: "invalid" }),
        ]),
      }),
    );
    expect(result.artifacts.map(({ path }) => path)).not.toContain(
      "workspace/.extremely-hardcore/runs/bounded-bug-fix/run.json",
    );
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});

test("invalidates Stage B evidence when its fresh log becomes a directory after completion", async () => {
  const { parentPath, outputDir } = createOutputDir();
  const reference = createReferenceBoundedBugFixExecutor();
  try {
    const result = await runBoundedBugFixFixture({
      outputDir,
      executor: async (request) => {
        await reference(request);
        if (request.stage !== "resume") return;

        const run = JSON.parse(readFileSync(join(request.runPath, "run.json"), "utf8"));
        const evidenceId = run.acceptanceCriteria[0].evidenceIds[0];
        const logPath = join(request.runPath, "logs", `${evidenceId}.log`);
        rmSync(logPath);
        mkdirSync(logPath);
      },
    });

    expect(result).toMatchObject({ status: "invalid" });
    expect(result.stages).toContainEqual(
      expect.objectContaining({
        stage: "resume",
        status: "invalid",
        failures: expect.arrayContaining([
          expect.objectContaining({ code: "evidence.log-invalid", kind: "invalid" }),
        ]),
      }),
    );
    expect(JSON.parse(readFileSync(join(outputDir, "report.json"), "utf8"))).toEqual(result);
  } finally {
    rmSync(parentPath, { recursive: true, force: true });
  }
});
