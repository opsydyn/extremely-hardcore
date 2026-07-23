import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  runCodexActionFixtureAdapter,
  type CodexActionFixtureExecutor,
} from "../../evaluation/run-codex-action-fixture-adapter";

const FIXED_SOURCE = [
  "export function releaseLabel(name: string): string {",
  "  return `release:${name.trim()}`;",
  "}",
  "",
].join("\n");

function createOutputRoot(): { root: string; outputDir: string } {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-codex-action-fixture-"));
  return { root, outputDir: join(root, "artifacts") };
}

function successfulExecutor(): {
  executor: CodexActionFixtureExecutor;
  requests: Parameters<CodexActionFixtureExecutor>[0][];
} {
  const requests: Parameters<CodexActionFixtureExecutor>[0][] = [];
  return {
    requests,
    executor: (request) => {
      requests.push(request);
      if (request.stage === "fix") {
        writeFileSync(join(request.cwd, "src", "release-label.ts"), FIXED_SOURCE);
      }
      const command =
        request.stage === "fix"
          ? ["fixture-protocol.ts", "evidence", "--stage", "fix"]
          : [
              "fixture-protocol.ts",
              "evidence",
              "--stage",
              "resume",
            ];
      const evidence = spawnSync("bun", command, { cwd: request.cwd, encoding: "utf8" });
      if (evidence.status !== 0) {
        throw new Error(evidence.stderr);
      }
      if (request.stage === "resume") {
        const completion = spawnSync(
          "bun",
          ["fixture-protocol.ts", "complete", "--stage", "resume"],
          { cwd: request.cwd, encoding: "utf8" },
        );
        if (completion.status !== 0) {
          throw new Error(completion.stderr);
        }
      }
      writeFileSync(request.finalMessagePath, `fake ${request.stage} final message\n`);
      return {
        exitCode: 0,
        stdout: JSON.stringify({ type: "fake", stage: request.stage }) + "\n",
        stderr: `fake ${request.stage} stderr\n`,
        durationMs: 7,
      };
    },
  };
}

test("retains one constrained Codex provenance bundle per scored fixture stage", async () => {
  const { root, outputDir } = createOutputRoot();
  const { executor, requests } = successfulExecutor();
  try {
    const report = await runCodexActionFixtureAdapter({
      outputDir,
      model: "gpt-5.6-sol",
      codexVersion: "codex-cli fixture",
      executor,
    });

    expect(report.fixture).toMatchObject({ status: "passed", transitionCount: 1 });
    expect(report.provenance).toEqual({ status: "complete", failures: [] });
    expect(requests.map((request) => request.stage)).toEqual(["fix", "resume"]);
    expect(requests.every((request) => request.args.includes("--sandbox"))).toBe(true);
    expect(
      requests.every(
        (request) => request.args[request.args.indexOf("--sandbox") + 1] === "workspace-write",
      ),
    ).toBe(true);
    expect(requests.every((request) => request.args.includes("--json"))).toBe(true);
    expect(requests.every((request) => request.args.includes("--ephemeral"))).toBe(true);
    expect(requests.every((request) => request.args.includes("--cd"))).toBe(true);
    expect(
      requests.every((request) => request.args[request.args.indexOf("--model") + 1] === "gpt-5.6-sol"),
    ).toBe(true);
    expect(report.adapter).toMatchObject({
      id: "codex-cli-action-fixture",
      version: "codex-cli fixture",
      model: "gpt-5.6-sol",
      sandbox: "workspace-write",
      rawEventCapture: "stdout-json",
    });
    expect(report.stages).toHaveLength(2);
    expect(report.stages.map((stage) => stage.stage)).toEqual(["fix", "resume"]);
    for (const stage of report.stages) {
      expect(stage.artifacts.map((artifact) => artifact.path)).toEqual([
        `provider/${stage.stage}/prompt.txt`,
        `provider/${stage.stage}/invocation.json`,
        `provider/${stage.stage}/events.jsonl`,
        `provider/${stage.stage}/stderr.log`,
        `provider/${stage.stage}/last-message.txt`,
      ]);
      expect(stage.artifacts.every((artifact) => artifact.sha256.length === 64)).toBe(true);
      expect(stage.artifacts.every((artifact) => artifact.bytes > 0)).toBe(true);
    }
    expect(report.fixtureReport).toMatchObject({ path: "report.json", sha256: expect.any(String) });
    expect(readFileSync(join(outputDir, "provider", "fix", "events.jsonl"), "utf8")).toContain(
      '"stage":"fix"',
    );
    expect(readFileSync(join(outputDir, "provider", "resume", "last-message.txt"), "utf8")).toBe(
      "fake resume final message\n",
    );
    expect(JSON.parse(readFileSync(join(outputDir, "codex-action-fixture-report.json"), "utf8"))).toEqual(
      report,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("retains failed provider-stage process artefacts without interpreting them as fixture evidence", async () => {
  const { root, outputDir } = createOutputRoot();
  try {
    const report = await runCodexActionFixtureAdapter({
      outputDir,
      model: "gpt-5.6-sol",
      codexVersion: "codex-cli fixture",
      executor: (request) => ({
        exitCode: 42,
        stdout: "unparsed provider event\n",
        stderr: "provider failed\n",
        durationMs: 5,
      }),
    });

    expect(report.fixture.status).toBe("invalid");
    expect(report.provenance).toEqual({ status: "complete", failures: [] });
    expect(report.stages).toHaveLength(1);
    expect(report.stages[0]).toMatchObject({ stage: "fix", exitCode: 42 });
    expect(existsSync(join(outputDir, "provider", "fix", "events.jsonl"))).toBe(true);
    expect(readFileSync(join(outputDir, "provider", "fix", "stderr.log"), "utf8")).toBe(
      "provider failed\n",
    );
    expect(
      report.fixture.failures.some(
        (failure) => failure.code === "fixture.protocol-invocations-missing",
      ),
    ).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("marks provenance invalid when a later stage mutates an earlier provider artefact", async () => {
  const { root, outputDir } = createOutputRoot();
  const { executor } = successfulExecutor();
  try {
    const report = await runCodexActionFixtureAdapter({
      outputDir,
      model: "gpt-5.6-sol",
      codexVersion: "codex-cli fixture",
      executor: (request) => {
        if (request.stage === "resume") {
          writeFileSync(join(outputDir, "provider", "fix", "events.jsonl"), "mutated after capture\n");
        }
        return executor(request);
      },
    });

    expect(report.fixture.status).toBe("passed");
    expect(report.provenance.status).toBe("invalid");
    expect(report.provenance.failures).toContain(
      "retained provider artifact changed after capture: provider/fix/events.jsonl",
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects a provider stage directory redirected through a symlink", async () => {
  const { root, outputDir } = createOutputRoot();
  const { executor } = successfulExecutor();
  const outsidePath = join(root, "outside.txt");
  try {
    writeFileSync(outsidePath, "outside\n");
    const report = await runCodexActionFixtureAdapter({
      outputDir,
      model: "gpt-5.6-sol",
      codexVersion: "codex-cli fixture",
      executor: (request) => {
        const result = executor(request);
        if (request.stage === "fix") {
          symlinkSync(outsidePath, join(outputDir, "provider", "resume"));
        }
        return result;
      },
    });

    expect(report.fixture.status).toBe("invalid");
    expect(report.stages[1]).toMatchObject({ stage: "resume", exitCode: 127, artifacts: [] });
    expect(report.provenance.status).toBe("invalid");
    expect(report.provenance.failures[0]).toContain("provider artifact path rejected");
    expect(readFileSync(outsidePath, "utf8")).toBe("outside\n");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("retains an invalid report when a provider executor throws before launch", async () => {
  const { root, outputDir } = createOutputRoot();
  try {
    const report = await runCodexActionFixtureAdapter({
      outputDir,
      model: "gpt-5.6-sol",
      codexVersion: "codex-cli fixture",
      executor: () => {
        throw new Error("launch failed");
      },
    });

    expect(report.fixture.status).toBe("invalid");
    expect(report.stages[0]).toMatchObject({
      stage: "fix",
      exitCode: 127,
      failure: "provider executor failed: launch failed",
    });
    expect(report.stages[0]?.artifacts.map((artifact) => artifact.path)).toEqual([
      "provider/fix/prompt.txt",
      "provider/fix/invocation.json",
      "provider/fix/events.jsonl",
      "provider/fix/stderr.log",
    ]);
    expect(report.provenance).toEqual({
      status: "invalid",
      failures: ["provider executor failed: launch failed"],
    });
    expect(readFileSync(join(outputDir, "provider", "fix", "stderr.log"), "utf8")).toContain(
      "launch failed",
    );
    expect(existsSync(join(outputDir, "codex-action-fixture-report.json"))).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("rejects an existing output directory before querying or invoking Codex", async () => {
  const { root, outputDir } = createOutputRoot();
  try {
    mkdirSync(outputDir);
    await expect(
      runCodexActionFixtureAdapter({
        outputDir,
        model: "gpt-5.6-sol",
        codexPath: "intentionally-unavailable-codex",
      }),
    ).rejects.toThrow(`output directory already exists: ${outputDir}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
