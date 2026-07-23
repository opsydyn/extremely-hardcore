#!/usr/bin/env bun

import { runCodexActionFixtureAdapter } from "../evaluation/run-codex-action-fixture-adapter";

try {
  const options = parseArguments(process.argv.slice(2));
  const report = await runCodexActionFixtureAdapter(options);
  console.log(JSON.stringify(report, null, 2));
  process.exitCode =
    report.fixture.status === "passed" && report.provenance.status === "complete" ? 0 : 1;
} catch (error) {
  console.error(
    `Codex action-fixture evaluation failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}

function parseArguments(args: string[]): { outputDir: string; model: string } {
  let outputDir: string | undefined;
  let model: string | undefined;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--output-dir") {
      outputDir = args[++index];
    } else if (value === "--model") {
      model = args[++index];
    } else {
      throw new Error(`unknown argument: ${value}`);
    }
  }
  if (!outputDir) {
    throw new Error("--output-dir is required");
  }
  if (!model) {
    throw new Error("--model is required");
  }
  return { outputDir, model };
}
