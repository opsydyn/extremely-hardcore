#!/usr/bin/env bun

import { createReferenceBoundedBugFixExecutor } from "../evaluation/reference-bounded-bug-fix-executor";
import { runBoundedBugFixFixture } from "../evaluation/run-bounded-bug-fix-fixture";

try {
  const outputDir = parseOutputDir(process.argv.slice(2));
  const result = await runBoundedBugFixFixture({
    outputDir,
    executor: createReferenceBoundedBugFixExecutor(),
  });
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.status === "passed" ? 0 : 1;
} catch (error) {
  console.error(
    `action fixture evaluation failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}

function parseOutputDir(args: string[]): string {
  if (args.length === 0) {
    throw new Error("--output-dir is required");
  }
  if (args.length !== 2 || args[0] !== "--output-dir") {
    throw new Error("usage: bun run evaluate:action-fixture -- --output-dir <new-dir>");
  }
  if (!args[1]) {
    throw new Error("--output-dir requires a value");
  }
  return args[1];
}
