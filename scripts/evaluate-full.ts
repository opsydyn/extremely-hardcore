#!/usr/bin/env bun

import { readFileSync } from "node:fs";
import { buildFullEvaluation } from "../evaluation/full-evaluation";
import type { AgentAttempt } from "../evaluation/types";

const DEFAULT_ATTEMPTS_PATH = "tests/evaluation/fixtures/declared-baseline.json";

try {
  const options = parseArguments(process.argv.slice(2));
  const attempts = readAttempts(options.attemptsPath);
  const report = buildFullEvaluation(attempts, options.repetitions);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.status === "passed" ? 0 : 1;
} catch (error) {
  console.error(`full evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function parseArguments(args: string[]): { attemptsPath: string; repetitions: number } {
  let attemptsPath = DEFAULT_ATTEMPTS_PATH;
  let repetitions = 3;
  for (let index = 0; index < args.length; index += 1) {
    const flag = args[index];
    const value = args[index + 1];
    if (flag === "--attempts" && value) {
      attemptsPath = value;
      index += 1;
    } else if (flag === "--repetitions" && value) {
      repetitions = Number(value);
      index += 1;
    } else {
      throw new Error("usage: bun run evaluate:full -- [--attempts <path>] [--repetitions <count>]");
    }
  }
  if (!Number.isInteger(repetitions) || repetitions < 1) {
    throw new Error("--repetitions must be a positive integer");
  }
  return { attemptsPath, repetitions };
}

function readAttempts(path: string): AgentAttempt[] {
  const value: unknown = JSON.parse(readFileSync(path, "utf8"));
  if (!isRecord(value) || !Array.isArray(value.attempts)) {
    throw new Error("attempts input must contain an attempts array");
  }
  if (!value.attempts.every(isAgentAttempt)) {
    throw new Error("attempts input contains an invalid structured agent attempt");
  }
  return value.attempts;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
