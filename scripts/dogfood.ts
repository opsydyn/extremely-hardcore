#!/usr/bin/env bun

import { runDogfood } from "../evaluation/run-dogfood";

try {
  const report = await runDogfood();
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.summary.failed === 0 ? 0 : 1;
} catch (error) {
  console.error(`dogfood failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
