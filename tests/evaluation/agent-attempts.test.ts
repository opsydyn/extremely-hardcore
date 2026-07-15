import { expect, test } from "bun:test";
import { assessAgentAttempt } from "../../evaluation/assess-agent-attempt";

test("assesses structured agent attempts against the core scenario manifest", () => {
  const passing = assessAgentAttempt({
    schemaVersion: 1,
    scenarioId: "core.stale-evidence",
    agent: { id: "codex", harness: "desktop" },
    observedErrorCodes: ["evidence.stale"],
    durationMs: 1200,
  });
  expect(passing).toMatchObject({
    status: "passed",
    scenarioId: "core.stale-evidence",
    expectedErrorCodes: ["evidence.stale"],
    missingErrorCodes: [],
  });

  const missing = assessAgentAttempt({
    schemaVersion: 1,
    scenarioId: "core.open-blocker",
    agent: { id: "claude", harness: "cli" },
    observedErrorCodes: [],
    durationMs: 800,
  });
  expect(missing).toMatchObject({
    status: "failed",
    missingErrorCodes: ["blocker.open"],
  });

  const unknown = assessAgentAttempt({
    schemaVersion: 1,
    scenarioId: "core.unknown",
    agent: { id: "codex", harness: "desktop" },
    observedErrorCodes: [],
    durationMs: 1,
  });
  expect(unknown).toEqual({
    status: "invalid",
    scenarioId: "core.unknown",
    reason: "unknown scenario: core.unknown",
  });
});
