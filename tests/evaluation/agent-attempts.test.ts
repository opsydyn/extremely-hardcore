import { expect, test } from "bun:test";
import { assessAgentAttempt } from "../../evaluation/assess-agent-attempt";
import { AGENT_ATTEMPT_SCENARIOS } from "../../evaluation/core-scenarios";

test.each(["scope.drift", "unknown.code"])("rejects surplus observation %s", (extra) => {
  expect(assessAgentAttempt({
    schemaVersion: 1,
    scenarioId: "core.stale-evidence",
    agent: { id: "fixture", harness: "no-model" },
    observedErrorCodes: ["evidence.stale", extra],
    durationMs: 0,
  })).toMatchObject({ status: "failed", missingErrorCodes: [] });
});

test("repeated expected observations do not change the classification", () => {
  expect(assessAgentAttempt({
    schemaVersion: 1,
    scenarioId: "core.stale-evidence",
    agent: { id: "fixture", harness: "no-model" },
    observedErrorCodes: ["evidence.stale", "evidence.stale"],
    durationMs: 0,
  }).status).toBe("passed");
});

test.each(AGENT_ATTEMPT_SCENARIOS)("discriminates exact from all-code answers: $scenarioId", (scenario) => {
  const attempt = {
    schemaVersion: 1 as const,
    scenarioId: scenario.scenarioId,
    agent: { id: "fixture", harness: "no-model" },
    durationMs: 0,
  };
  expect(assessAgentAttempt({
    ...attempt, observedErrorCodes: scenario.expectedErrorCodes,
  }).status).toBe("passed");
  expect(assessAgentAttempt({
    ...attempt,
    observedErrorCodes: [...new Set(AGENT_ATTEMPT_SCENARIOS.flatMap((entry) => entry.expectedErrorCodes))],
  }).status).toBe("failed");
});

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
