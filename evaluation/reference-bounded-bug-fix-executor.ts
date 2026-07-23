import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ActionFixtureExecutor } from "./types";

export function createReferenceBoundedBugFixExecutor(): ActionFixtureExecutor {
  return async (request) => {
    if (request.stage === "fix") {
      writeFileSync(
        join(request.workspace, "src", "release-label.ts"),
        [
          "export function releaseLabel(name: string): string {",
          "  return `release:${name.trim()}`;",
          "}",
          "",
        ].join("\n"),
      );
    }

    runFixtureProtocolCommand(request.workspace, ["evidence", "--stage", request.stage]);

    if (request.stage === "resume") {
      runFixtureProtocolCommand(request.workspace, ["complete", "--stage", "resume"]);
    }
  };
}

function runFixtureProtocolCommand(workspace: string, args: string[]): void {
  execFileSync("bun", ["fixture-protocol.ts", ...args], {
    cwd: workspace,
    stdio: "pipe",
  });
}
