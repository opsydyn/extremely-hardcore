#!/usr/bin/env bun

import { runClaudeAdapter } from "../evaluation/run-claude-adapter";

try {
  const options = parseArguments(process.argv.slice(2));
  const report = await runClaudeAdapter(options);
  console.log(JSON.stringify(report, null, 2));
  if (report.status !== "passed") {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`Claude evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function parseArguments(args: string[]): {
  outputDir: string;
  workspace: string;
  model: string;
  claudePath?: string;
} {
  let outputDir: string | undefined;
  let workspace = process.cwd();
  let model: string | undefined;
  let claudePath: string | undefined;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--output-dir") {
      outputDir = args[++index];
    } else if (value === "--workspace") {
      workspace = args[++index] ?? "";
    } else if (value === "--model") {
      model = args[++index];
    } else if (value === "--claude-path") {
      claudePath = args[++index];
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
  return { outputDir, workspace, model, claudePath };
}
