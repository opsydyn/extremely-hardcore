#!/usr/bin/env bun

import { captureEvidence } from "../protocol/evidence";
import { transitionToComplete } from "../protocol/transition";
import type { ValidationResult } from "../protocol/types";
import { validateCompletion } from "../protocol/validate-run";
import { computeWorkspaceFingerprint } from "../protocol/workspace-fingerprint";

const USAGE = `usage:
  eh evidence <run-path> <criterion-id> -- <command> [args...]
  eh validate <run-path>
  eh transition <run-path> complete`;

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

    throw new Error(USAGE);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`error: ${message}`);
    return 1;
  }
}

async function evidenceCommand(args: string[]): Promise<number> {
  const separator = args.indexOf("--");
  if (separator !== 2 || args.length < 4) {
    throw new Error(USAGE);
  }

  const [runPath, criterionId] = args;
  if (!runPath || !criterionId) {
    throw new Error(USAGE);
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
    throw new Error(USAGE);
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
  const [runPath, target] = args;
  if (!runPath || target !== "complete" || args.length !== 2) {
    throw new Error(USAGE);
  }

  const result = transitionToComplete(runPath, {
    workspaceFingerprint: computeWorkspaceFingerprint(runPath),
  });
  if (!result.ok || !result.event) {
    printErrors(result);
    return 1;
  }

  console.log(`${result.event.from} -> ${result.event.to} (${result.event.transitionId})`);
  return 0;
}

function printErrors(result: ValidationResult): void {
  for (const error of result.errors) {
    console.error(`${error.code}: ${error.message}`);
  }
}

if (import.meta.main) {
  process.exitCode = await main(Bun.argv.slice(2));
}
