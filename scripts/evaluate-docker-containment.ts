#!/usr/bin/env bun

import {
  parseContainmentArgs,
  runDockerContainmentProbe,
} from "../evaluation/run-docker-containment-probe";

try {
  const result = runDockerContainmentProbe(parseContainmentArgs(process.argv.slice(2)));
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.status === "passed" ? 0 : 1;
} catch (error) {
  console.error(
    `docker containment evaluation failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}

