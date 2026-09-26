#!/usr/bin/env bun

import { readFileSync } from "node:fs";
import { scoreReview } from "../evaluation/review-fixture";
import { preflightReviewComparison, reviewPins } from "../evaluation/review-preflight";

const [mode, path] = process.argv.slice(2);

try {
  if ((mode !== "score" && mode !== "preflight" && mode !== "pin") || !path) {
    throw new Error("usage: bun run evaluate:review -- pin <skill-root> | score|preflight <json-path>");
  }
  if (mode === "pin") {
    console.log(JSON.stringify(reviewPins(path), null, 2));
    process.exit(0);
  }
  const input: unknown = JSON.parse(readFileSync(path, "utf8"));
  const result = mode === "score" ? scoreReview(input) : preflightReviewComparison(input);
  console.log(JSON.stringify(result, null, 2));
  if (result.status !== "passed" && result.status !== "ready") process.exitCode = 1;
} catch (error) {
  console.error(`review evaluation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
