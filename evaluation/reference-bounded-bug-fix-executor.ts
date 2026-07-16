import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { captureEvidence } from "../protocol/evidence";
import { transitionToComplete } from "../protocol/transition";
import { computeWorkspaceFingerprint } from "../protocol/workspace-fingerprint";
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

    await captureEvidence({
      runPath: request.runPath,
      criterionId: request.criterionId,
      command: request.requiredTestCommand,
    });

    if (request.stage === "resume") {
      const transition = transitionToComplete(request.runPath, {
        workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
      });
      if (!transition.ok) {
        throw new Error(transition.errors.map((error) => error.code).join(", "));
      }
    }
  };
}
