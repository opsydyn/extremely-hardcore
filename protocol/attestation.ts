import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { deriveCurrentState, readTransitions } from "./transition";
import { readRun, validateCompletion } from "./validate-run";
import type { RunState, ValidationResult } from "./types";

export type AttestationArtifact = {
  path: string;
  sha256: string;
  bytes: number;
};

export type RunAttestation = {
  schemaVersion: 1;
  kind: "extremely-hardcore.run-attestation";
  generatedAt: string;
  changeId: string;
  state: RunState;
  risk: string;
  workspaceFingerprint: string;
  valid: boolean;
  validation: ValidationResult;
  artifacts: AttestationArtifact[];
  limitations: string[];
};

export type AttestationOptions = {
  workspaceFingerprint: string;
};

export function createAttestation(runPath: string, options: AttestationOptions): RunAttestation {
  const run = readRun(runPath);
  const state = deriveCurrentState(run.initialState, readTransitions(runPath));
  const validation = validateCompletion(runPath, options);
  const artifacts = ["run.json", "transitions.jsonl", "approvals.jsonl"]
    .filter((path) => existsSync(join(runPath, path)))
    .map((path) => digestArtifact(runPath, path));
  return {
    schemaVersion: 1,
    kind: "extremely-hardcore.run-attestation",
    generatedAt: new Date().toISOString(),
    changeId: run.changeId,
    state,
    risk: run.risk,
    workspaceFingerprint: options.workspaceFingerprint,
    valid: state === "complete" && validation.ok,
    validation,
    artifacts,
    limitations: [
      "local traceability only; this file is not a cryptographic signature",
      "derived from the current workspace and run directory",
      "agent identity, command ownership, sandbox enforcement, and provider compliance are not attested",
    ],
  };
}

function digestArtifact(runPath: string, relativePath: string): AttestationArtifact {
  const source = readFileSync(join(runPath, relativePath));
  return {
    path: relativePath,
    sha256: createHash("sha256").update(source).digest("hex"),
    bytes: statSync(join(runPath, relativePath)).size,
  };
}
