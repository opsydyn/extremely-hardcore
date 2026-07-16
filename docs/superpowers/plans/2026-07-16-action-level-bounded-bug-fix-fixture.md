# Action-Level Bounded Bug-Fix Fixture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a provider-neutral, two-stage local fixture that scores a bounded bug fix, evidence freshness after a deterministic state mutation, and guarded completion.

**Architecture:** Tracked fixture assets are copied into a caller-selected new output root and initialised as a Git workspace. A provider-neutral staged executor performs `fix` and `resume` work; the runner alone validates diffs, applies the stale marker, and constructs an `ActionFixtureResult` from existing protocol evidence, fingerprints, and transition records. A deterministic reference executor dogfoods the runner but is not an agent benchmark.

**Tech Stack:** Bun, TypeScript, Node filesystem/child-process APIs, local Git, existing protocol modules.

## Global Constraints

- Use Bun; add no runtime dependency.
- Do not change `protocol/` behaviour or schemas.
- Do not call a provider, modify the Codex adapter, parse transcripts, add retries, or add CI thresholds.
- Fixture agent-owned source path is exactly `src/release-label.ts`; tests, `FIXTURE.md`, package metadata, and marker are not agent-owned.
- Harness marker is exactly `fixture-state.txt`, changed only from `evidence phase one\n` to `evidence invalidated\n`.
- Required fixture test command is `bun test tests/release-label.test.ts`.
- All output artifacts stay under the caller-selected new output directory.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `evaluation/types.ts` | Experimental action-fixture result, stage, failure, request, and executor types. |
| `evaluation/run-bounded-bug-fix-fixture.ts` | Copies assets, initialises Git, enforces stages/diffs, validates protocol state, writes report. |
| `evaluation/reference-bounded-bug-fix-executor.ts` | Deterministic executor used only to prove the local runner. |
| `evaluation/fixtures/bounded-bug-fix/**` | Read-only task contract, defective source, test, marker, and protocol run template. |
| `scripts/evaluate-action-fixture.ts` | JSON CLI for the deterministic reference run. |
| `tests/evaluation/action-fixture.test.ts` | End-to-end runner tests with passing and adversarial staged executors. |
| `package.json` | `evaluate:action-fixture` script. |
| `docs/evaluations/README.md` | Caller-facing action-fixture command and limits. |

### Task 1: Define The Action Fixture Contract

**Files:**
- Modify: `evaluation/types.ts`
- Create: `tests/evaluation/action-fixture.test.ts`

**Interfaces:**
- Produces `ActionFixtureStage`, `ActionFixtureFailure`, `ActionFixtureRequest`, `ActionFixtureExecutor`, `ActionFixtureStageResult`, and `ActionFixtureResult`.
- Consumed by runner, reference executor, CLI, and tests.

- [ ] **Step 1: Write the failing contract test**

```ts
import { expect, test } from "bun:test";
import { runBoundedBugFixFixture } from "../../evaluation/run-bounded-bug-fix-fixture";

test("runs the bounded bug-fix fixture through fresh evidence and completion", async () => {
  const result = await runBoundedBugFixFixture({
    outputDir: createOutputDir(),
    executor: createPassingExecutor(),
  });

  expect(result.status).toBe("passed");
  expect(result.stages).toEqual([
    expect.objectContaining({ stage: "fix", status: "passed" }),
    expect.objectContaining({ stage: "resume", status: "passed" }),
  ]);
  expect(result.transitionCount).toBe(1);
});
```

- [ ] **Step 2: Run the focused test to confirm the red state**

Run: `bun test tests/evaluation/action-fixture.test.ts`

Expected: fail with module-not-found for `run-bounded-bug-fix-fixture`.

- [ ] **Step 3: Add the exact public types**

```ts
export type ActionFixtureStage = "fix" | "resume";

export type ActionFixtureFailure = {
  code: string;
  kind: "failed" | "invalid";
  message: string;
};

export type ActionFixtureRequest = {
  fixtureId: "action.bounded-bug-fix";
  stage: ActionFixtureStage;
  workspace: string;
  runPath: string;
  taskPath: string;
  criterionId: "required-test-passes";
  requiredTestCommand: ["bun", "test", "tests/release-label.test.ts"];
};

export type ActionFixtureExecutor = (request: ActionFixtureRequest) => Promise<void> | void;

export type ActionFixtureStageResult = {
  stage: ActionFixtureStage;
  status: "passed" | "failed" | "invalid";
  workspaceFingerprint: string;
  failures: ActionFixtureFailure[];
};

export type ActionFixtureResult = {
  schemaVersion: 1;
  fixtureId: "action.bounded-bug-fix";
  status: "passed" | "failed" | "invalid";
  stages: ActionFixtureStageResult[];
  transitionCount: number;
  artifacts: ArtifactDigest[];
  failures: ActionFixtureFailure[];
};
```

- [ ] **Step 4: Run the focused test again**

Run: `bun test tests/evaluation/action-fixture.test.ts`

Expected: still fail because the runner module is absent; TypeScript resolves the shared types.

- [ ] **Step 5: Commit**

```bash
git add evaluation/types.ts tests/evaluation/action-fixture.test.ts
git commit -m "test: define action fixture contract"
```

### Task 2: Add Immutable Fixture Assets And Workspace Setup

**Files:**
- Create: `evaluation/fixtures/bounded-bug-fix/FIXTURE.md`
- Create: `evaluation/fixtures/bounded-bug-fix/package.json`
- Create: `evaluation/fixtures/bounded-bug-fix/src/release-label.ts`
- Create: `evaluation/fixtures/bounded-bug-fix/tests/release-label.test.ts`
- Create: `evaluation/fixtures/bounded-bug-fix/fixture-state.txt`
- Create: `evaluation/fixtures/bounded-bug-fix/.extremely-hardcore/runs/bounded-bug-fix/run.json`
- Create: `evaluation/fixtures/bounded-bug-fix/.extremely-hardcore/runs/bounded-bug-fix/transitions.jsonl`
- Create: `evaluation/run-bounded-bug-fix-fixture.ts`
- Modify: `tests/evaluation/action-fixture.test.ts`

**Interfaces:**
- Consumes `ActionFixtureRequest` and `ActionFixtureExecutor` from Task 1.
- Produces `runBoundedBugFixFixture(options): Promise<ActionFixtureResult>`.

- [ ] **Step 1: Extend the test with the initial fixture oracle**

```ts
executor: async (request) => {
  if (request.stage === "fix") {
    const result = Bun.spawnSync(["bun", "test", "tests/release-label.test.ts"], {
      cwd: request.workspace,
      stdout: "pipe",
      stderr: "pipe",
    });
    expect(result.exitCode).toBe(1);
  }
}
```

- [ ] **Step 2: Run the focused test to confirm setup is absent**

Run: `bun test tests/evaluation/action-fixture.test.ts`

Expected: fail because fixture assets and runner setup do not exist.

- [ ] **Step 3: Add deterministic fixture assets**

`src/release-label.ts` starts defective:

```ts
export function releaseLabel(name: string): string {
  return name.trim();
}
```

`tests/release-label.test.ts` is read-only and requires the one permitted correction:

```ts
import { expect, test } from "bun:test";
import { releaseLabel } from "../src/release-label";

test("prefixes a trimmed release label", () => {
  expect(releaseLabel("  Candidate  ")).toBe("release:Candidate");
});
```

Use one acceptance criterion, `required-test-passes`, in `run.json`. `FIXTURE.md` must name the task, allowed path, exact test command, and forbidden edits. Initialise `fixture-state.txt` with `evidence phase one`.

- [ ] **Step 4: Implement workspace creation**

```ts
export async function runBoundedBugFixFixture(options: {
  outputDir: string;
  executor: ActionFixtureExecutor;
}): Promise<ActionFixtureResult> {
  const outputDir = resolve(options.outputDir);
  if (existsSync(outputDir)) throw new Error(`output directory already exists: ${outputDir}`);
  cpSync(FIXTURE_ROOT, join(outputDir, "workspace"), { recursive: true });
  initialiseGitWorkspace(join(outputDir, "workspace"));
  // Task 3 executes and scores both stages.
}
```

`initialiseGitWorkspace` runs `git init -q`, configures local fixture identity, adds all fixture assets, and creates one baseline commit. It must not alter fixture asset content.

- [ ] **Step 5: Run the focused test to verify fixture setup**

Run: `bun test tests/evaluation/action-fixture.test.ts`

Expected: the executor observes the initial failing test, then the test remains red because stage scoring is not implemented.

- [ ] **Step 6: Commit**

```bash
git add evaluation/fixtures/bounded-bug-fix evaluation/run-bounded-bug-fix-fixture.ts tests/evaluation/action-fixture.test.ts
git commit -m "feat: add bounded bug-fix fixture setup"
```

### Task 3: Implement Staged Evidence, Diff, And Completion Scoring

**Files:**
- Modify: `evaluation/run-bounded-bug-fix-fixture.ts`
- Create: `evaluation/reference-bounded-bug-fix-executor.ts`
- Modify: `tests/evaluation/action-fixture.test.ts`

**Interfaces:**
- Runner consumes `captureEvidence`, `computeWorkspaceFingerprint`, `validateCompletion`, `transitionToComplete`, and `readTransitions`.
- Reference executor consumes `ActionFixtureRequest` and returns `Promise<void>`.
- Runner writes `report.json` and returns `ActionFixtureResult`.

- [ ] **Step 1: Add failing adversarial tests**

```ts
test("fails an executor that changes a forbidden path", async () => {
  const result = await runBoundedBugFixFixture({
    outputDir: createOutputDir(),
    executor: async (request) => {
      if (request.stage === "fix") writeFileSync(join(request.workspace, "package.json"), "{}\n");
    },
  });
  expect(result).toMatchObject({ status: "failed" });
  expect(result.failures).toContainEqual(expect.objectContaining({ code: "fixture.forbidden-diff" }));
});

test("fails when Stage B leaves Stage A evidence stale", async () => {
  const result = await runBoundedBugFixFixture({ outputDir: createOutputDir(), executor: createFixOnlyExecutor() });
  expect(result.failures).toContainEqual(expect.objectContaining({ code: "evidence.stale" }));
});
```

- [ ] **Step 2: Run the focused test to confirm the red state**

Run: `bun test tests/evaluation/action-fixture.test.ts`

Expected: new cases fail because the runner does not yet inspect diffs, invalidate evidence, or score Stage B.

- [ ] **Step 3: Implement Stage A and intervention validation**

```ts
await options.executor(request("fix"));
const stageAFingerprint = computeWorkspaceFingerprint(workspace);
const stageAFailures = [
  ...validateAllowedDiff(workspace, ["src/release-label.ts"]),
  ...validateRequiredTest(workspace),
  ...validateStageAEvidence(runPath, stageAFingerprint),
  ...validateNoTransitions(runPath),
];
if (stageAFailures.length > 0) return writeReport(resultFrom(stageAFailures));

writeFileSync(join(workspace, "fixture-state.txt"), "evidence invalidated\n");
const staleFingerprint = computeWorkspaceFingerprint(workspace);
const stale = validateCompletion(runPath, { workspaceFingerprint: staleFingerprint });
if (!stale.errors.some((error) => error.code === "evidence.stale")) {
  return writeReport(invalid("fixture.marker-invalid", "marker did not invalidate Stage A evidence"));
}
```

`validateAllowedDiff` combines tracked `git diff --name-only HEAD` paths and `git ls-files --others --exclude-standard` paths, excludes `.extremely-hardcore/**`, and reports `fixture.forbidden-diff` for every path outside the declared set.

- [ ] **Step 4: Implement Stage B and final scoring**

```ts
await options.executor(request("resume"));
const finalFingerprint = computeWorkspaceFingerprint(workspace);
const finalFailures = [
  ...validateAllowedDiff(workspace, ["src/release-label.ts", "fixture-state.txt"]),
  ...validateRequiredTest(workspace),
  ...toFixtureFailures(validateCompletion(runPath, { workspaceFingerprint: finalFingerprint })),
  ...validateExactlyOneCompletion(runPath, finalFingerprint),
];
return writeReport(resultFrom([...stageAFailures, ...finalFailures]));
```

`validateExactlyOneCompletion` requires one `implemented -> complete` event whose fingerprint equals `finalFingerprint`. `resultFrom` returns `invalid` when any failure has kind `invalid`, otherwise `failed` when failures exist, otherwise `passed`.

`writeReport` writes `report.json` after constructing a sorted `artifacts` list for these retained relative paths: `workspace/FIXTURE.md`, `workspace/src/release-label.ts`, `workspace/tests/release-label.test.ts`, `workspace/fixture-state.txt`, `workspace/.extremely-hardcore/runs/bounded-bug-fix/run.json`, `workspace/.extremely-hardcore/runs/bounded-bug-fix/transitions.jsonl`, and every file below that run's `evidence/` and `logs/` directories. It computes SHA-256 and byte count for each artifact. It never includes `report.json` in its own digest list.

- [ ] **Step 5: Implement the reference executor**

```ts
export function createReferenceBoundedBugFixExecutor(): ActionFixtureExecutor {
  return async (request) => {
    if (request.stage === "fix") {
      writeFileSync(join(request.workspace, "src", "release-label.ts"), [
        "export function releaseLabel(name: string): string {",
        "  return `release:${name.trim()}`;",
        "}",
        "",
      ].join("\n"));
    }
    await captureEvidence({ runPath: request.runPath, criterionId: request.criterionId, command: request.requiredTestCommand });
    if (request.stage === "resume") {
      const transition = transitionToComplete(request.runPath, {
        workspaceFingerprint: computeWorkspaceFingerprint(request.workspace),
      });
      if (!transition.ok) throw new Error(transition.errors.map((error) => error.code).join(", "));
    }
  };
}
```

- [ ] **Step 6: Run focused tests**

Run: `bun test tests/evaluation/action-fixture.test.ts`

Expected: passing reference run plus explicit forbidden-diff, stale-evidence, and premature-completion failures.

- [ ] **Step 7: Commit**

```bash
git add evaluation/run-bounded-bug-fix-fixture.ts evaluation/reference-bounded-bug-fix-executor.ts tests/evaluation/action-fixture.test.ts
git commit -m "feat: score staged action fixture runs"
```

### Task 4: Add The Local CLI And Complete Slice Evidence

**Files:**
- Create: `scripts/evaluate-action-fixture.ts`
- Modify: `package.json`
- Modify: `docs/evaluations/README.md`
- Modify: `ROADMAP.md`
- Create: `.extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture/run.json`
- Create: `docs/evidence/017-action-level-bounded-bug-fix-fixture.md`
- Modify: slice 017 issue/contract/domain/review/implementation records as needed for actual evidence IDs.

**Interfaces:**
- CLI consumes `--output-dir <new-dir>` and `createReferenceBoundedBugFixExecutor()`.
- CLI emits `ActionFixtureResult` JSON and exits 0 only when `status === "passed"`.

- [ ] **Step 1: Add the failing CLI test**

```ts
test("action fixture CLI rejects a missing output directory", () => {
  const result = Bun.spawnSync(["bun", SCRIPT_PATH], { stdout: "pipe", stderr: "pipe" });
  expect(result.exitCode).toBe(1);
  expect(result.stderr.toString()).toContain("--output-dir is required");
});
```

- [ ] **Step 2: Run the CLI test to confirm the red state**

Run: `bun test tests/evaluation/evaluate-action-fixture-cli.test.ts`

Expected: fail because the CLI script does not exist.

- [ ] **Step 3: Add the CLI and package script**

```ts
const outputDir = parseOutputDir(process.argv.slice(2));
const result = await runBoundedBugFixFixture({
  outputDir,
  executor: createReferenceBoundedBugFixExecutor(),
});
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.status === "passed" ? 0 : 1;
```

Add `"evaluate:action-fixture": "bun scripts/evaluate-action-fixture.ts"` to `package.json`. Document that it runs a deterministic reference executor and is not a provider evaluation.

- [ ] **Step 4: Run the CLI and focused tests**

Run: `bun test tests/evaluation/action-fixture.test.ts tests/evaluation/evaluate-action-fixture-cli.test.ts`

Expected: all focused tests pass.

Run: `bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-action-fixture-proof`

Expected: JSON `status: "passed"`, two passed stages, and `transitionCount: 1`; do not reuse an existing output directory.

- [ ] **Step 5: Capture protocol evidence and run repository checks**

Run:

```bash
bun run evaluate
bun run evaluate:baseline -- tests/evaluation/fixtures/declared-baseline.json
bun run check
bun run test
bunx tsc --noEmit
bun run eh evidence .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture fixture-contract-tested -- bun test tests/evaluation/action-fixture.test.ts
bun run eh evidence .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture reference-run-passed -- bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-action-fixture-proof
bun run eh transition .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture complete
```

Expected: existing evaluators remain passing; static checks, full suite, and typecheck exit 0; the reference result is passing; completion gate validates fresh evidence.

- [ ] **Step 6: Commit**

```bash
git add package.json scripts/evaluate-action-fixture.ts tests/evaluation/evaluate-action-fixture-cli.test.ts docs ROADMAP.md .extremely-hardcore/runs/017-action-level-bounded-bug-fix-fixture
git commit -m "feat: add action-level fixture evaluation"
```

## Plan Self-Review

### Spec coverage

- Tracked fixture, deterministic defect, allowed path, and read-only test: Task 2.
- Staged executor boundary, Stage A, exact marker intervention, Stage B, fresh evidence, and one completion: Task 3.
- Machine-readable result, retained output artifacts, provider-neutral reference execution, and CLI: Tasks 1, 3, and 4.
- Forbidden diffs, malformed/missing evidence, stale evidence, and invalid transition tests: Task 3.
- Documentation, roadmap, protocol evidence, and no live provider calls: Task 4.

### Placeholder Scan

No unresolved placeholder, unnamed interface, or unspecified test command remains. Provider execution is deliberately excluded rather than left as an implementation gap.

### Type Consistency

`ActionFixtureExecutor` consumes `ActionFixtureRequest` in every task. `runBoundedBugFixFixture` returns `Promise<ActionFixtureResult>` throughout. Both runner and reference executor use criterion ID `required-test-passes` and fixture ID `action.bounded-bug-fix`.
