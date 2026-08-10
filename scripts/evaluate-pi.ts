#!/usr/bin/env bun

import { runPiAdapter } from "../evaluation/run-pi-adapter";

try {
  const options = parseArguments(process.argv.slice(2));
  const report = await runPiAdapter(options);
  console.log(JSON.stringify(report, null, 2));
  if (report.status !== "passed") {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`Pi evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function parseArguments(args: string[]): {
  outputDir: string;
  workspace: string;
  model: string;
  piPath?: string;
} {
  let outputDir: string | undefined;
  let workspace = process.cwd();
  let model: string | undefined;
  let piPath: string | undefined;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--output-dir") {
      outputDir = args[++index];
    } else if (value === "--workspace") {
      workspace = args[++index] ?? "";
    } else if (value === "--model") {
      model = args[++index];
    } else if (value === "--pi-path") {
      piPath = args[++index];
    } else {
      throw new Error(`unknown argument: ${value}`);
    }
  }
  if (!outputDir) {
    throw new Error("--output-dir is required");
  }
  if (!workspace) {
    throw new Error("--workspace requires a value");
  }
  if (!model) {
    throw new Error("--model is required");
  }
  return { outputDir, workspace, model, piPath };
}
