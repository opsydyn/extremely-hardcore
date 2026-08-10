import { expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AGENT_ATTEMPT_SCENARIOS } from "../../evaluation/core-scenarios";
import {
  runClaudeAdapter,
  type ClaudeExecutor,
} from "../../evaluation/run-claude-adapter";

function createRoot(): { root: string; outputDir: string } {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-claude-adapter-"));
  return { root, outputDir: join(root, "artifacts") };
}

function successEnvelope(code: string, resultField = false): string {
  const structured = { observedErrorCodes: [code], summary: "fixture" };
  return JSON.stringify({
    type: "result",
    subtype: "success",
    is_error: false,
    ...(resultField ? { result: JSON.stringify(structured) } : { structured_output: structured }),
  });
}

function successfulExecutor(options: { resultField?: boolean } = {}): {
  executor: ClaudeExecutor;
  requests: Parameters<ClaudeExecutor>[0][];
} {
  const requests: Parameters<ClaudeExecutor>[0][] = [];
  let index = 0;
  return {
    requests,
    executor: (request) => {
      requests.push(request);
      const code = AGENT_ATTEMPT_SCENARIOS[index]!.expectedErrorCodes[0]!;
      const resultField = options.resultField && index === 0;
      index += 1;
      return { exitCode: 0, stdout: successEnvelope(code, resultField), stderr: "", durationMs: 4 };
    },
  };
}

test("constructs constrained Claude argv and parses structured output through the shared runner", async () => {
  const { root, outputDir } = createRoot();
  const { executor, requests } = successfulExecutor();
  try {
    const report = await runClaudeAdapter({
      outputDir,
      workspace: root,
      model: "claude-sonnet-fixture",
      claudeVersion: "2.1.224 fixture",
      executor,
    });

    expect(requests).toHaveLength(13);
    expect(requests.every(({ args }) => args.includes("--print"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--output-format") && args.includes("json"))).toBe(true);
    expect(requests.every(({ args }) => {
      const schema = args[args.indexOf("--json-schema") + 1];
      return typeof schema === "string" && JSON.parse(schema).required.includes("observedErrorCodes");
    })).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-session-persistence"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--permission-mode") && args.includes("plan"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--tools") && args[args.indexOf("--tools") + 1] === "")).toBe(true);
    expect(requests.every(({ args }) => args.includes("--model"))).toBe(true);
    expect(report.status).toBe("passed");
    expect(report.adapter).toMatchObject({ id: "claude-code-cli", version: "2.1.224 fixture" });
    expect(report.attempts).toHaveLength(13);
    expect(report.assessments.every((assessment) => assessment.status === "passed")).toBe(true);
    expect(report.capabilities.claims["read-only-execution"].level).toBe("declared");
    expect(report.capabilities.claims["workspace-write"].level).toBe("unsupported");
    expect(report.provenance.status).toBe("complete");
    expect(existsSync(join(outputDir, "adapter-report.json"))).toBe(true);
    expect(readFileSync(join(outputDir, "scenarios", "pressure.scope-drift-out-of-contract", "stdout.json"), "utf8")).toContain("structured_output");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("parses a JSON-encoded Claude result field and retains provider artefacts", async () => {
  const { root, outputDir } = createRoot();
  const { executor, requests } = successfulExecutor({ resultField: true });
  try {
    const report = await runClaudeAdapter({
      outputDir,
      workspace: root,
      model: "claude-sonnet-fixture",
      claudeVersion: "fixture",
      executor,
    });
    expect(requests[0]?.args.at(-1)).toContain("pressure.scope-drift-out-of-contract");
    expect(report.status).toBe("passed");
    expect(report.artifacts.some(({ path }) => path.endsWith("/prompt.txt"))).toBe(true);
    expect(report.artifacts.some(({ path }) => path.endsWith("/invocation.json"))).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("fails closed for malformed output and non-zero Claude exit while retaining failure files", async () => {
  const { root, outputDir } = createRoot();
  try {
    const malformed = await runClaudeAdapter({
      outputDir,
      workspace: root,
      model: "claude-fixture",
      claudeVersion: "fixture",
      executor: () => ({ exitCode: 0, stdout: "not json\n", stderr: "fixture stderr", durationMs: 1 }),
    });
    expect(malformed.status).toBe("invalid");
    expect(malformed.provenance.failures.some((failure) => failure.includes("Claude"))).toBe(true);
    expect(readFileSync(join(outputDir, "scenarios", "pressure.scope-drift-out-of-contract", "stderr.log"), "utf8")).toBe("fixture stderr");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }

  const second = createRoot();
  try {
    const failed = await runClaudeAdapter({
      outputDir: second.outputDir,
      workspace: second.root,
      model: "claude-fixture",
      claudeVersion: "fixture",
      executor: () => ({ exitCode: 2, stdout: "{}", stderr: "failed", durationMs: 1 }),
    });
    expect(failed.status).toBe("invalid");
    expect(failed.provenance.failures.some((failure) => failure.includes("exited 2"))).toBe(true);
  } finally {
    rmSync(second.root, { recursive: true, force: true });
  }
});

test("requires model and a new output directory before invocation", async () => {
  const { root, outputDir } = createRoot();
  try {
    await expect(
      runClaudeAdapter({
        outputDir,
        workspace: root,
        model: "",
        claudeVersion: "fixture",
        executor: () => ({ exitCode: 0, stdout: "", stderr: "", durationMs: 0 }),
      }),
    ).rejects.toThrow("Claude model is required");
    await expect(
      runClaudeAdapter({
        outputDir: root,
        workspace: root,
        model: "fixture",
        claudeVersion: "fixture",
        executor: () => ({ exitCode: 0, stdout: "", stderr: "", durationMs: 0 }),
      }),
    ).rejects.toThrow("output directory already exists");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
