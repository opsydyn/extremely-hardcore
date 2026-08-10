import { expect, test } from "bun:test";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AGENT_ATTEMPT_SCENARIOS } from "../../evaluation/core-scenarios";
import {
  runPiAdapter,
  type PiExecutor,
} from "../../evaluation/run-pi-adapter";

function createRoot(): { root: string; outputDir: string } {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-pi-adapter-"));
  return { root, outputDir: join(root, "artifacts") };
}

function jsonEventStream(
  code: string,
  options: { splitText?: boolean; responseText?: string } = {},
): string {
  const response = options.responseText ?? JSON.stringify({ observedErrorCodes: [code], summary: "fixture" });
  const content = options.splitText
    ? [{ type: "text", text: response.slice(0, Math.ceil(response.length / 2)) }, { type: "text", text: response.slice(Math.ceil(response.length / 2)) }]
    : [{ type: "text", text: response }];
  return [
    { type: "session", version: 3, id: "fixture-session", timestamp: "2026-01-01T00:00:00.000Z", cwd: "/tmp" },
    { type: "message_end", message: { role: "assistant", content } },
    { type: "agent_end", messages: [] },
  ].map((event) => JSON.stringify(event)).join("\n") + "\n";
}

function successfulExecutor(options: { splitText?: boolean } = {}): {
  executor: PiExecutor;
  requests: Parameters<PiExecutor>[0][];
} {
  const requests: Parameters<PiExecutor>[0][] = [];
  let index = 0;
  return {
    requests,
    executor: (request) => {
      requests.push(request);
      const code = AGENT_ATTEMPT_SCENARIOS[index]!.expectedErrorCodes[0]!;
      index += 1;
      return {
        exitCode: 0,
        stdout: jsonEventStream(code, options),
        stderr: "",
        durationMs: 5,
      };
    },
  };
}

test("constructs constrained Pi argv and parses the final JSON event through the shared runner", async () => {
  const { root, outputDir } = createRoot();
  const { executor, requests } = successfulExecutor();
  try {
    const report = await runPiAdapter({
      outputDir,
      workspace: root,
      model: "anthropic/claude-sonnet-fixture",
      piVersion: "0.84.1 fixture",
      executor,
    });

    expect(requests).toHaveLength(13);
    expect(requests.every((request) => JSON.stringify(Object.keys(request).sort()) === JSON.stringify(["args", "cwd"]))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--mode") && args[args.indexOf("--mode") + 1] === "json")).toBe(true);
    expect(requests.every(({ args }) => args.includes("--print"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-session"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-tools"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-extensions"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-skills"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-prompt-templates"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-themes"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-context-files"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--no-approve"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--offline"))).toBe(true);
    expect(requests.every(({ args }) => args.includes("--model"))).toBe(true);
    expect(requests.every(({ args }) => args.at(-1)?.includes("Scenario ID:"))).toBe(true);
    expect(report.status).toBe("passed");
    expect(report.adapter).toMatchObject({ id: "pi-cli", version: "0.84.1 fixture" });
    expect(report.attempts).toHaveLength(13);
    expect(report.assessments.every((assessment) => assessment.status === "passed")).toBe(true);
    expect(report.capabilities.claims["read-only-execution"].level).toBe("declared");
    expect(report.capabilities.claims["workspace-write"].level).toBe("unsupported");
    expect(report.provenance.status).toBe("complete");
    expect(existsSync(join(outputDir, "adapter-report.json"))).toBe(true);
    expect(readFileSync(join(outputDir, "scenarios", "pressure.scope-drift-out-of-contract", "stdout.jsonl"), "utf8")).toContain("message_end");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("joins final assistant text blocks without accepting free-form output", async () => {
  const { root, outputDir } = createRoot();
  const { executor } = successfulExecutor({ splitText: true });
  try {
    const report = await runPiAdapter({
      outputDir,
      workspace: root,
      model: "pi-fixture",
      piVersion: "fixture",
      executor,
    });
    expect(report.status).toBe("passed");
    expect(report.artifacts.some(({ path }) => path.endsWith("/prompt.txt"))).toBe(true);
    expect(report.artifacts.some(({ path }) => path.endsWith("/normalized-response.json"))).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("fails closed for malformed JSONL, code fences, and non-zero Pi exit while retaining failure files", async () => {
  const { root, outputDir } = createRoot();
  try {
    const malformed = await runPiAdapter({
      outputDir,
      workspace: root,
      model: "pi-fixture",
      piVersion: "fixture",
      executor: () => ({ exitCode: 0, stdout: "not json\n", stderr: "fixture stderr", durationMs: 1 }),
    });
    expect(malformed.status).toBe("invalid");
    expect(malformed.provenance.failures.some((failure) => failure.includes("Pi"))).toBe(true);
    expect(readFileSync(join(outputDir, "scenarios", "pressure.scope-drift-out-of-contract", "stderr.log"), "utf8")).toBe("fixture stderr");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }

  const fenced = createRoot();
  try {
    const report = await runPiAdapter({
      outputDir: fenced.outputDir,
      workspace: fenced.root,
      model: "pi-fixture",
      piVersion: "fixture",
      executor: () => ({
        exitCode: 0,
        stdout: jsonEventStream("scope.drift", { responseText: "```json\n{\"observedErrorCodes\":[\"scope.drift\"],\"summary\":\"fixture\"}\n```" }),
        stderr: "",
        durationMs: 1,
      }),
    });
    expect(report.status).toBe("invalid");
    expect(report.provenance.failures.some((failure) => failure.includes("structured response"))).toBe(true);
  } finally {
    rmSync(fenced.root, { recursive: true, force: true });
  }

  const second = createRoot();
  try {
    const failed = await runPiAdapter({
      outputDir: second.outputDir,
      workspace: second.root,
      model: "pi-fixture",
      piVersion: "fixture",
      executor: () => ({ exitCode: 2, stdout: "{}\n", stderr: "failed", durationMs: 1 }),
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
      runPiAdapter({
        outputDir,
        workspace: root,
        model: "",
        piVersion: "fixture",
        executor: () => ({ exitCode: 0, stdout: "", stderr: "", durationMs: 0 }),
      }),
    ).rejects.toThrow("Pi model is required");
    await expect(
      runPiAdapter({
        outputDir: root,
        workspace: root,
        model: "fixture",
        piVersion: "fixture",
        executor: () => ({ exitCode: 0, stdout: "", stderr: "", durationMs: 0 }),
      }),
    ).rejects.toThrow("output directory already exists");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
