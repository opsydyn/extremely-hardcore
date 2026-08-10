import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { isAbsolute, join, normalize, relative, resolve, sep } from "node:path";
import { AGENT_ATTEMPT_SCENARIOS } from "./core-scenarios";
import { assessAgentAttempt } from "./assess-agent-attempt";
import type {
  AgentAttempt,
  AgentAttemptAssessment,
  ArtifactDigest,
} from "./types";

export const CAPABILITY_KEYS = [
  "read-only-execution",
  "workspace-write",
  "structured-output",
  "resume",
  "network-control",
  "containment",
] as const;

export type CapabilityKey = (typeof CAPABILITY_KEYS)[number];
export type CapabilityEvidenceLevel = "unknown" | "unsupported" | "declared" | "observed" | "attested";

export type CapabilityClaim = {
  level: CapabilityEvidenceLevel;
  note: string;
};

export type CapabilityDescriptor = {
  schemaVersion: 1;
  claims: Record<CapabilityKey, CapabilityClaim>;
};

export type AgentAdapterIdentity = {
  id: string;
  version: string;
  runtime: {
    name: string;
    version: string;
  };
};

export type ReadOnlyScenarioRequest = {
  scenarioId: string;
  pressure: string;
  workspace: string;
  outputDir: string;
  artifactDir: string;
};

export type AdapterAttemptResult = {
  attempt: AgentAttempt;
  artifacts: ArtifactDigest[];
};

export type AgentAdapter = {
  identity: AgentAdapterIdentity;
  capabilities: CapabilityDescriptor;
  executeReadOnly: (
    request: ReadOnlyScenarioRequest,
  ) => Promise<AdapterAttemptResult> | AdapterAttemptResult;
};

export type ProviderNeutralAdapterReport = {
  schemaVersion: 1;
  status: "passed" | "failed" | "invalid";
  adapter: AgentAdapterIdentity;
  capabilities: CapabilityDescriptor;
  attempts: AgentAttempt[];
  assessments: AgentAttemptAssessment[];
  artifacts: ArtifactDigest[];
  provenance: {
    status: "complete" | "invalid";
    failures: string[];
  };
  claimLimits: string[];
};

export type AgentAdapterRunnerOptions = {
  adapter: AgentAdapter;
  workspace: string;
  outputDir: string;
};

export async function runAgentAdapter(
  options: AgentAdapterRunnerOptions,
): Promise<ProviderNeutralAdapterReport> {
  const outputDir = resolve(options.outputDir);
  const workspace = resolve(options.workspace);
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }
  if (!isDirectory(workspace)) {
    throw new Error(`workspace does not exist or is not a directory: ${workspace}`);
  }
  mkdirSync(outputDir, { recursive: true });

  const failures = [
    ...validateIdentity(options.adapter.identity),
    ...validateCapabilities(options.adapter.capabilities),
  ];
  const attempts: AgentAttempt[] = [];
  const artifacts: ArtifactDigest[] = [];

  for (const scenario of AGENT_ATTEMPT_SCENARIOS) {
    const artifactDir = join(outputDir, "scenarios", scenario.scenarioId);
    mkdirSync(artifactDir, { recursive: true });
    try {
      const result: unknown = await options.adapter.executeReadOnly({
        scenarioId: scenario.scenarioId,
        pressure: scenario.pressure,
        workspace,
        outputDir,
        artifactDir,
      });
      if (!isAdapterAttemptResult(result)) {
        failures.push(`${scenario.scenarioId}: adapter returned a malformed attempt result`);
        continue;
      }
      attempts.push(result.attempt);
      artifacts.push(...result.artifacts);
    } catch (error) {
      failures.push(
        `${scenario.scenarioId}: adapter execution failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  const coverageFailures = validateAttemptCoverage(attempts);
  const artifactFailures = validateArtifacts(outputDir, artifacts);
  failures.push(...coverageFailures, ...artifactFailures);
  const assessments = coverageFailures.length === 0
    ? AGENT_ATTEMPT_SCENARIOS.map((scenario) =>
        assessAgentAttempt(attempts.find((attempt) => attempt.scenarioId === scenario.scenarioId)!),
      )
    : [];
  const provenanceStatus = failures.length === 0 ? "complete" : "invalid";
  const status = provenanceStatus === "invalid"
    ? "invalid"
    : assessments.every((assessment) => assessment.status === "passed")
      ? "passed"
      : "failed";
  const report: ProviderNeutralAdapterReport = {
    schemaVersion: 1,
    status,
    adapter: options.adapter.identity,
    capabilities: options.adapter.capabilities,
    attempts,
    assessments,
    artifacts,
    provenance: { status: provenanceStatus, failures },
    claimLimits: [
      "capability levels describe evidence state; they are not automatic support or enforcement proof",
      "artifact digests prove retained-file integrity only, not provider identity or command ownership",
      "read-only request semantics do not establish sandbox, network, resume, or containment behaviour",
      "a passing report is not a provider comparison, benchmark, or skills-effect claim",
    ],
  };
  writeFileSync(join(outputDir, "adapter-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

function validateIdentity(identity: AgentAdapterIdentity): string[] {
  const failures: string[] = [];
  if (!isRecord(identity) || typeof identity.id !== "string" || !identity.id.trim()) {
    failures.push("adapter identity id is empty");
  }
  if (!isRecord(identity) || typeof identity.version !== "string" || !identity.version.trim()) {
    failures.push("adapter identity version is empty");
  }
  if (!isRecord(identity.runtime) || typeof identity.runtime.name !== "string" || !identity.runtime.name.trim()) {
    failures.push("adapter runtime name is empty");
  }
  if (!isRecord(identity.runtime) || typeof identity.runtime.version !== "string" || !identity.runtime.version.trim()) {
    failures.push("adapter runtime version is empty");
  }
  return failures;
}

function validateCapabilities(descriptor: CapabilityDescriptor): string[] {
  const failures: string[] = [];
  if (!isRecord(descriptor) || descriptor.schemaVersion !== 1) {
    failures.push("capability descriptor schemaVersion must be 1");
  }
  if (!isRecord(descriptor.claims)) {
    return [...failures, "capability descriptor claims must be an object"];
  }
  for (const key of CAPABILITY_KEYS) {
    const claim = descriptor.claims[key];
    if (!claim) {
      failures.push(`capability claim is missing: ${key}`);
      continue;
    }
    if (!["unknown", "unsupported", "declared", "observed", "attested"].includes(claim.level)) {
      failures.push(`capability claim has an invalid evidence level: ${key}`);
    }
    if (!claim.note.trim()) {
      failures.push(`capability claim note is empty: ${key}`);
    }
  }
  return failures;
}

function validateAttemptCoverage(attempts: AgentAttempt[]): string[] {
  const failures: string[] = [];
  const expected = new Set(AGENT_ATTEMPT_SCENARIOS.map((scenario) => scenario.scenarioId));
  const seen = new Set<string>();
  for (const attempt of attempts) {
    if (!expected.has(attempt.scenarioId)) {
      failures.push(`unknown attempt scenario: ${attempt.scenarioId}`);
    }
    if (seen.has(attempt.scenarioId)) {
      failures.push(`duplicate attempt scenario: ${attempt.scenarioId}`);
    }
    seen.add(attempt.scenarioId);
    if (attempt.schemaVersion !== 1 || !Array.isArray(attempt.observedErrorCodes)) {
      failures.push(`malformed attempt: ${attempt.scenarioId}`);
    }
  }
  for (const scenario of AGENT_ATTEMPT_SCENARIOS) {
    if (!seen.has(scenario.scenarioId)) {
      failures.push(`missing attempt scenario: ${scenario.scenarioId}`);
    }
  }
  return failures;
}

function validateArtifacts(outputDir: string, artifacts: ArtifactDigest[]): string[] {
  return artifacts.flatMap((artifact) => {
    if (!isSafeRelativePath(artifact.path)) {
      return [`artifact path is outside the output root: ${artifact.path}`];
    }
    const path = resolve(outputDir, artifact.path);
    if (!isContainedPath(outputDir, path) || hasSymlinkedAncestor(outputDir, path) || !isRegularFile(path)) {
      return [`artifact is missing, symlinked, or outside the output root: ${artifact.path}`];
    }
    const source = readFileSync(path);
    const sha256 = createHash("sha256").update(source).digest("hex");
    const bytes = statSync(path).size;
    if (sha256 !== artifact.sha256 || bytes !== artifact.bytes) {
      return [`artifact digest or byte count changed: ${artifact.path}`];
    }
    return [];
  });
}

function isSafeRelativePath(path: string): boolean {
  return (
    path.length > 0 &&
    !isAbsolute(path) &&
    !path.includes("\\") &&
    !path.includes("\0") &&
    normalize(path) === path &&
    path !== "." &&
    !path.startsWith("../")
  );
}

function isContainedPath(root: string, path: string): boolean {
  const relativePath = relative(root, path);
  return relativePath.length > 0 && relativePath !== ".." && !relativePath.startsWith(`..${sep}`);
}

function hasSymlinkedAncestor(root: string, path: string): boolean {
  if (!isContainedPath(root, path)) return true;
  let current = root;
  for (const segment of relative(root, path).split(sep)) {
    current = join(current, segment);
    try {
      if (lstatSync(current).isSymbolicLink()) return true;
    } catch {
      return true;
    }
  }
  return false;
}

function isRegularFile(path: string): boolean {
  try {
    return lstatSync(path).isFile();
  } catch {
    return false;
  }
}

function isAdapterAttemptResult(value: unknown): value is AdapterAttemptResult {
  return (
    isRecord(value) &&
    isAgentAttempt(value.attempt) &&
    Array.isArray(value.artifacts) &&
    value.artifacts.every(isArtifactDigest)
  );
}

function isAgentAttempt(value: unknown): value is AgentAttempt {
  return (
    isRecord(value) &&
    value.schemaVersion === 1 &&
    typeof value.scenarioId === "string" &&
    isRecord(value.agent) &&
    typeof value.agent.id === "string" &&
    typeof value.agent.harness === "string" &&
    Array.isArray(value.observedErrorCodes) &&
    value.observedErrorCodes.every((code) => typeof code === "string") &&
    typeof value.durationMs === "number"
  );
}

function isArtifactDigest(value: unknown): value is ArtifactDigest {
  return (
    isRecord(value) &&
    typeof value.path === "string" &&
    typeof value.sha256 === "string" &&
    /^[a-f0-9]{64}$/.test(value.sha256) &&
    typeof value.bytes === "number" &&
    Number.isInteger(value.bytes) &&
    value.bytes >= 0
  );
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDirectory(path: string): boolean {
  try {
    return lstatSync(path).isDirectory();
  } catch {
    return false;
  }
}
