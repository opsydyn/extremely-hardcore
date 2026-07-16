import { expect, test } from "bun:test";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  runCodexAdapter,
  type CodexExecutor,
} from "../../evaluation/run-codex-adapter";

function createOutputRoot(): { root: string; outputDir: string } {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-codex-adapter-"));
  return { root, outputDir: join(root, "artifacts") };
}

function successfulExecutor(): { executor: CodexExecutor; requests: Parameters<CodexExecutor>[0][] } {
  const requests: Parameters<CodexExecutor>[0][] = [];
  return {
    requests,
    executor: (request) => {
      requests.push(request);
      writeFileSync(
        request.finalResponsePath,
        `${JSON.stringify({ observedErrorCodes: [request.expectedErrorCode], summary: "fixture" })}\n`,
      );
      return { exitCode: 0, stderr: "", durationMs: 3 };
    },
  };
}

test("runs Codex with constrained arguments and records a complete provenance report", () => {
  const { root, outputDir } = createOutputRoot();
  const { executor, requests } = successfulExecutor();
  try {
    const report = runCodexAdapter({
      outputDir,
      workspace: root,
      mode: "without-extremely-hardcore",
      codexVersion: "codex-cli fixture",
      executor,
    });

    expect(requests).toHaveLength(13);
    expect(requests.every((request) => request.args.includes("--sandbox"))).toBe(true);
    expect(requests.every((request) => request.args.includes("read-only"))).toBe(true);
    expect(requests.every((request) => request.args.includes("--ephemeral"))).toBe(true);
    expect(requests.every((request) => request.args.includes("--output-schema"))).toBe(true);
    expect(report.adapter).toMatchObject({
      id: "codex-cli",
      version: "codex-cli fixture",
      mode: "without-extremely-hardcore",
      sandbox: "read-only",
    });
    expect(report.attempts).toHaveLength(13);
    expect(report.assessments.every((assessment) => assessment.status === "passed")).toBe(true);
    expect(report.sharedArtifacts).toEqual([
      expect.objectContaining({ path: "response-schema.json", sha256: expect.any(String) }),
    ]);
    expect(report.provenance).toHaveLength(13);
    expect(report.provenance[0]?.artifacts.every((artifact) => artifact.sha256.length === 64)).toBe(true);
    expect(readFileSync(join(outputDir, "report.json"), "utf8")).toContain("codex-cli");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("retains failure artifacts but does not write a report for invalid Codex output", () => {
  const { root, outputDir } = createOutputRoot();
  try {
    expect(() =>
      runCodexAdapter({
        outputDir,
        workspace: root,
        mode: "with-extremely-hardcore",
        codexVersion: "codex-cli fixture",
        executor: (request) => {
          writeFileSync(request.finalResponsePath, '{"summary":"missing codes"}\n');
          return { exitCode: 0, stderr: "fixture stderr", durationMs: 1 };
        },
      }),
    ).toThrow("invalid Codex final response");
    expect(readFileSync(join(outputDir, "scenarios", "pressure.scope-drift-out-of-contract", "stderr.log"), "utf8")).toBe(
      "fixture stderr",
    );
    expect(() => readFileSync(join(outputDir, "report.json"), "utf8")).toThrow();
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
