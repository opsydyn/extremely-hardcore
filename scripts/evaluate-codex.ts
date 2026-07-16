#!/usr/bin/env bun

import { runCodexAdapter } from "../evaluation/run-codex-adapter";
import type { AdapterMode } from "../evaluation/types";

try {
  const options = parseArguments(process.argv.slice(2));
  console.log(JSON.stringify(runCodexAdapter(options), null, 2));
} catch (error) {
  console.error(`Codex evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}

function parseArguments(args: string[]): {
  outputDir: string;
  workspace: string;
  mode: AdapterMode;
  model: string;
} {
  let outputDir: string | undefined;
  let workspace = process.cwd();
  let mode: AdapterMode | undefined;
  let model: string | undefined;
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === "--output-dir") {
      outputDir = args[++index];
    } else if (value === "--workspace") {
      workspace = args[++index] ?? "";
    } else if (value === "--mode") {
      const candidate = args[++index];
      if (candidate === "without-extremely-hardcore" || candidate === "with-extremely-hardcore") {
        mode = candidate;
      } else {
        throw new Error("--mode must be without-extremely-hardcore or with-extremely-hardcore");
      }
    } else if (value === "--model") {
      model = args[++index];
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
  if (!mode) {
    throw new Error("--mode is required");
  }
  if (!model) {
    throw new Error("--model is required");
  }
  return { outputDir, workspace, mode, model };
}
