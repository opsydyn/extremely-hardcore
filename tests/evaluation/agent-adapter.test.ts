import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { AGENT_ATTEMPT_SCENARIOS } from "../../evaluation/core-scenarios";
import {
  CAPABILITY_KEYS,
  runAgentAdapter,
  type AgentAdapter,
  type CapabilityDescriptor,
} from "../../evaluation/agent-adapter";
import type { AgentAttempt, ArtifactDigest } from "../../evaluation/types";

const capabilities: CapabilityDescriptor = {
  schemaVersion: 1,
  claims: Object.fromEntries(
    CAPABILITY_KEYS.map((key) => [key, { level: key === "read-only-execution" ? "observed" : "unknown", note: "test claim" }]),
  ) as CapabilityDescriptor["claims"],
};

function createRoot(): { root: string; workspace: string; outputDir: string } {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-agent-adapter-"));
  const workspace = join(root, "workspace");
  const outputDir = join(root, "output");
  mkdirSync(workspace);
  return { root, workspace, outputDir };
}

function digest(outputDir: string, path: string): ArtifactDigest {
  const source = readFileSync(join(outputDir, path));
  return { path, sha256: createHash("sha256").update(source).digest("hex"), bytes: source.byteLength };
}

function fakeAdapter(
  outputDir: string,
  options: {
    missing?: boolean;
    wrongCode?: boolean;
    mutated?: boolean;
    outside?: boolean;
    missingArtifact?: boolean;
    symlink?: boolean;
  } = {},
): AgentAdapter & { requests: Array<Record<string, unknown>> } {
  const requests: Array<Record<string, unknown>> = [];
  return {
    identity: { id: "fake-provider", version: "0.1.0", runtime: { name: "fake", version: "test" } },
    capabilities,
    requests,
    executeReadOnly(request) {
      requests.push(request);
      const scenario = AGENT_ATTEMPT_SCENARIOS.find((candidate) => candidate.scenarioId === request.scenarioId)!;
      const artifactPath = options.outside
        ? "../outside.txt"
        : `scenarios/${request.scenarioId}/provider-output.txt`;
      if (!options.outside && !options.missingArtifact) {
        const artifactFile = join(outputDir, artifactPath);
        mkdirSync(join(artifactFile, ".."), { recursive: true });
        if (options.symlink) {
          const target = join(outputDir, "target.txt");
          writeFileSync(target, `output for ${request.scenarioId}\n`);
          symlinkSync(target, artifactFile);
        } else {
          writeFileSync(artifactFile, `output for ${request.scenarioId}\n`);
        }
      }
      const attempt: AgentAttempt = {
        schemaVersion: 1,
        scenarioId: options.missing ? AGENT_ATTEMPT_SCENARIOS[0]!.scenarioId : request.scenarioId,
        agent: { id: "fake-provider", harness: "fake" },
        observedErrorCodes: options.wrongCode ? ["wrong.code"] : scenario.expectedErrorCodes,
        durationMs: 1,
      };
      const artifact: ArtifactDigest = options.outside || options.missingArtifact
        ? { path: artifactPath, sha256: "0".repeat(64), bytes: 1 }
        : digest(outputDir, artifactPath);
      if (options.mutated && !options.outside && !options.symlink) {
        writeFileSync(join(outputDir, artifactPath), "mutated\n");
      }
      return { attempt, artifacts: [artifact] };
    },
  };
}

test("runs complete read-only coverage through one shared scorer without expected answers", async () => {
  const { root, workspace, outputDir } = createRoot();
  const adapter = fakeAdapter(outputDir);
  const report = await runAgentAdapter({ adapter, workspace, outputDir });

  expect(report.status).toBe("passed");
  expect(report.attempts).toHaveLength(13);
  expect(report.assessments.every((assessment) => assessment.status === "passed")).toBe(true);
  expect(report.provenance.status).toBe("complete");
  expect(adapter.requests).toHaveLength(13);
  expect(adapter.requests.every((request) => !("expectedErrorCode" in request))).toBe(true);
  expect(report.capabilities.claims["read-only-execution"].level).toBe("observed");
  rmSync(root, { recursive: true, force: true });
});

test("keeps the evaluator as scorer when an adapter returns a wrong observation", async () => {
  const { root, workspace, outputDir } = createRoot();
  const report = await runAgentAdapter({ adapter: fakeAdapter(outputDir, { wrongCode: true }), workspace, outputDir });

  expect(report.status).toBe("failed");
  expect(report.provenance.status).toBe("complete");
  expect(report.assessments.some((assessment) => assessment.status === "failed")).toBe(true);
  rmSync(root, { recursive: true, force: true });
});

test("fails closed for incomplete coverage and unsafe or changed artefacts", async () => {
  for (const options of [
    { missing: true },
    { outside: true },
    { missingArtifact: true },
    { symlink: true },
    { mutated: true },
  ] as const) {
    const { root, workspace, outputDir } = createRoot();
    const report = await runAgentAdapter({ adapter: fakeAdapter(outputDir, options), workspace, outputDir });

    expect(report.status).toBe("invalid");
    expect(report.provenance.status).toBe("invalid");
    expect(report.provenance.failures.length).toBeGreaterThan(0);
    rmSync(root, { recursive: true, force: true });
  }
});

test("fails closed when a leaf adapter returns a malformed result", async () => {
  const { root, workspace, outputDir } = createRoot();
  const adapter = fakeAdapter(outputDir);
  adapter.executeReadOnly = () => ({ attempt: undefined, artifacts: undefined }) as never;
  const report = await runAgentAdapter({ adapter, workspace, outputDir });

  expect(report.status).toBe("invalid");
  expect(report.provenance.failures.some((failure) => failure.includes("malformed attempt result"))).toBe(true);
  rmSync(root, { recursive: true, force: true });
});

test("preserves capability evidence levels without converting them to support booleans", async () => {
  const { root, workspace, outputDir } = createRoot();
  const descriptor: CapabilityDescriptor = {
    schemaVersion: 1,
    claims: Object.fromEntries(
      CAPABILITY_KEYS.map((key) => [key, { level: key === "containment" ? "attested" : "unsupported", note: key }]),
    ) as CapabilityDescriptor["claims"],
  };
  const adapter = fakeAdapter(outputDir);
  adapter.capabilities = descriptor;
  const report = await runAgentAdapter({ adapter, workspace, outputDir });

  expect(report.capabilities).toEqual(descriptor);
  expect(report.capabilities.claims.containment.level).toBe("attested");
  expect(report.capabilities.claims["workspace-write"].level).toBe("unsupported");
  rmSync(root, { recursive: true, force: true });
});
