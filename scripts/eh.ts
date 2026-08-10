#!/usr/bin/env bun

import { captureEvidence } from "../protocol/evidence";
import { recordApproval } from "../protocol/approvals";
import { createAttestation } from "../protocol/attestation";
import { transitionTo, transitionToComplete } from "../protocol/transition";
import { readRunStatus, type RunStatus } from "../protocol/status";
import type { RunState, ValidationResult } from "../protocol/types";
import { validateCompletion } from "../protocol/validate-run";
import { computeWorkspaceFingerprint } from "../protocol/workspace-fingerprint";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const USAGE = `usage:
  eh evidence <run-path> <criterion-id> -- <command> [args...]
  eh validate <run-path>
  eh status <run-path>
  eh approve <run-path> --approver <name> --decision approved|rejected --reason <text>
  eh transition <run-path> <target> [--reason <text>]
  eh summary <run-path>
  eh attest <run-path> [output-path]
  eh ci <run-path> [output-directory]`;

class UsageError extends Error {}

export async function main(args: string[]): Promise<number> {
  try {
    const [command, ...rest] = args;
    if (command === "evidence") {
      return await evidenceCommand(rest);
    }
    if (command === "validate") {
      return validateCommand(rest);
    }
    if (command === "transition") {
      return transitionCommand(rest);
    }
    if (command === "status") {
      return statusCommand(rest);
    }
    if (command === "approve") {
      return approveCommand(rest);
    }
    if (command === "summary") {
      return summaryCommand(rest);
    }
    if (command === "attest") {
      return attestCommand(rest);
    }
    if (command === "ci") {
      return ciCommand(rest);
    }

    throw new UsageError(USAGE);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(error instanceof UsageError ? message : `error: ${message}`);
    return error instanceof UsageError ? 2 : 1;
  }
}

async function evidenceCommand(args: string[]): Promise<number> {
  const separator = args.indexOf("--");
  if (separator !== 2 || args.length < 4) {
    throw new UsageError(USAGE);
  }

  const [runPath, criterionId] = args;
  if (!runPath || !criterionId) {
    throw new UsageError(USAGE);
  }

  const evidence = await captureEvidence({
    runPath,
    criterionId,
    command: args.slice(separator + 1),
  });
  console.log(
    `${evidence.evidenceId}: ${criterionId} exited ${evidence.exitCode} (${evidence.durationMs}ms)`,
  );
  return evidence.exitCode;
}

function validateCommand(args: string[]): number {
  const [runPath] = args;
  if (!runPath || args.length !== 1) {
    throw new UsageError(USAGE);
  }

  const result = validateCompletion(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
  });
  if (!result.ok) {
    printErrors(result);
    return 1;
  }

  console.log("completion gate valid");
  return 0;
}

function transitionCommand(args: string[]): number {
  const [runPath, target, ...flags] = args;
  if (!runPath || !isRunState(target) || flags.length > 2 || flags.length === 1 ||
    (flags.length > 0 && flags[0] !== "--reason")) {
    throw new UsageError(USAGE);
  }
  const reason = flags.length === 2 ? flags[1] : undefined;
  if (flags.length === 2 && !reason) {
    throw new UsageError(USAGE);
  }

  const result = target === "complete"
    ? transitionToComplete(runPath, {
        workspaceFingerprint: computeWorkspaceFingerprint(runPath),
        ...(reason ? { reason } : {}),
      })
    : transitionTo(runPath, target, {
        workspaceFingerprint: computeWorkspaceFingerprint(runPath),
        reason,
      });
  if (!result.ok || !result.event) {
    printErrors(result);
    return 1;
  }

  console.log(`${result.event.from} -> ${result.event.to} (${result.event.transitionId})`);
  return 0;
}

function statusCommand(args: string[]): number {
  const [runPath] = args;
  if (!runPath || args.length !== 1) {
    throw new UsageError(USAGE);
  }
  const status = readRunStatus(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
  });
  console.log(JSON.stringify(status, null, 2));
  return 0;
}

function approveCommand(args: string[]): number {
  const [runPath, ...flags] = args;
  if (!runPath) {
    throw new UsageError(USAGE);
  }
  const values = parseFlags(flags, ["--approver", "--decision", "--reason"]);
  const decision = values.get("--decision");
  const approver = values.get("--approver");
  const reason = values.get("--reason");
  if (
    !approver ||
    !reason ||
    (decision !== "approved" && decision !== "rejected")
  ) {
    throw new UsageError(USAGE);
  }
  const approval = recordApproval(runPath, {
    approver,
    decision,
    gate: "complete",
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
    reason,
  });
  console.log(`${approval.decision} approval recorded (${approval.approvalId})`);
  return 0;
}

function summaryCommand(args: string[]): number {
  const [runPath] = args;
  if (!runPath || args.length !== 1) {
    throw new UsageError(USAGE);
  }
  const status = getStatus(runPath);
  console.log(formatSummary(status));
  return status.validation.ok && status.state === "complete" ? 0 : 1;
}

function attestCommand(args: string[]): number {
  const [runPath, outputPath] = args;
  if (!runPath || args.length > 2) {
    throw new UsageError(USAGE);
  }
  const attestation = createAttestation(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
  });
  if (outputPath) {
    mkdirSync(dirname(resolve(outputPath)), { recursive: true });
    writeFileSync(resolve(outputPath), `${JSON.stringify(attestation, null, 2)}\n`);
    console.log(resolve(outputPath));
  } else {
    console.log(JSON.stringify(attestation, null, 2));
  }
  return attestation.valid ? 0 : 1;
}

function ciCommand(args: string[]): number {
  const [runPath, outputDirectory] = args;
  if (!runPath || args.length > 2) {
    throw new UsageError(USAGE);
  }
  const directory = resolve(outputDirectory ?? join(runPath, "ci"));
  mkdirSync(directory, { recursive: true });
  const status = getStatus(runPath);
  const attestation = createAttestation(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
  });
  writeFileSync(join(directory, "summary.txt"), `${formatSummary(status)}\n`);
  writeFileSync(join(directory, "attestation.json"), `${JSON.stringify(attestation, null, 2)}\n`);
  console.log(formatSummary(status));
  console.log(`attestation: ${join(directory, "attestation.json")}`);
  return attestation.valid ? 0 : 1;
}

function getStatus(runPath: string): RunStatus {
  return readRunStatus(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
  });
}

function formatSummary(status: RunStatus): string {
  return [
    `change: ${status.changeId}`,
    `state: ${status.state}`,
    `risk: ${status.risk}`,
    `criteria: ${status.criteria.covered}/${status.criteria.total} covered`,
    `blockers: ${status.blockers.open} open`,
    `validation: ${status.validation.ok ? "valid" : "invalid"}`,
    `next: ${status.nextAction}`,
  ].join("\n");
}

function parseFlags(flags: string[], allowed: string[]): Map<string, string> {
  const values = new Map<string, string>();
  for (let index = 0; index < flags.length; index += 2) {
    const flag = flags[index];
    const value = flags[index + 1];
    if (!flag || !allowed.includes(flag) || !value || values.has(flag)) {
      throw new UsageError(USAGE);
    }
    values.set(flag, value);
  }
  return values;
}

function isRunState(value: string | undefined): value is RunState {
  return value === "implemented" || value === "blocked" || value === "needs-human-decision" ||
    value === "abandoned" || value === "complete";
}

function printErrors(result: ValidationResult): void {
  for (const error of result.errors) {
    console.error(`${error.code}: ${error.message}`);
  }
}

if (import.meta.main) {
  process.exitCode = await main(Bun.argv.slice(2));
}
