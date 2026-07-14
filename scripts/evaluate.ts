#!/usr/bin/env bun

import { runCoreScenarios } from "../evaluation/run-core-scenarios";

const report = runCoreScenarios();
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.results.every((scenario) => scenario.status === "passed") ? 0 : 1;
