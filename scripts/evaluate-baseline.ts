#!/usr/bin/env bun

import { readFileSync } from "node:fs";
import { assessDeclaredBaseline } from "../evaluation/run-declared-baseline";
import type { DeclaredBaselineInput } from "../evaluation/types";

const inputPath = process.argv[2];

try {
  if (!inputPath) {
    throw new Error("usage: bun run evaluate:baseline -- <input-path>");
  }
  const input = parseDeclaredBaseline(readFileSync(inputPath, "utf8"));
  console.log(JSON.stringify(assessDeclaredBaseline(input), null, 2));
} catch (error) {
  console.error(`baseline evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function parseDeclaredBaseline(source: string): DeclaredBaselineInput {
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    throw new Error("input must be valid JSON");
  }
  if (!isRecord(value) || value.schemaVersion !== 1) {
    throw new Error("input schemaVersion must be 1");
  }
  if (!isRecord(value.baseline)) {
    throw new Error("input baseline must be an object");
  }
  if (
    typeof value.baseline.id !== "string" ||
    value.baseline.kind !== "without-extremely-hardcore" ||
    typeof value.baseline.harness !== "string"
  ) {
    throw new Error("input baseline must declare id, without-extremely-hardcore, and harness");
  }
  if (!Array.isArray(value.attempts)) {
    throw new Error("input attempts must be an array");
  }
  for (const attempt of value.attempts) {
    if (!isAgentAttempt(attempt)) {
      throw new Error("each input attempt must be a valid structured agent attempt");
    }
  }
  return value as DeclaredBaselineInput;
}

function isAgentAttempt(value: unknown): boolean {
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
