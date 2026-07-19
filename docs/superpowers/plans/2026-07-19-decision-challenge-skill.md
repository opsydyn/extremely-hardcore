# Decision Challenge Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable, validated decision-challenge skill and dogfood it against the held live Codex action-fixture adapter proposal.

**Architecture:** The skill is a documentation-only governance boundary. It is added to the validated scaffold with a structured record template, then dogfooded as a durable `hold` record. It reads contracts and architecture evidence but has no runtime imports, provider calls, or authority over fixture scoring.

**Tech Stack:** Markdown skills/templates, Bun test, existing scaffold validator, existing Extremely Hardcore evidence ledger CLI.

## Global Constraints

- Trigger only for external writable-agent execution, architecture/security/isolation boundaries, public contracts, product differentiation claims, or benchmark/provider-comparison claims.
- Output exactly one verdict: `proceed`, `hold`, or `needs-human-decision`.
- Every record must name claims, existing-platform ownership, the strongest counterargument, evidence gaps, a minimum credible slice, and falsifiable stop conditions.
- The skill is read-only with respect to runtime code, provider calls, fixture scoring, and protocol completion semantics.
- Do not make a network-isolation claim solely from Codex sandbox configuration.
- Keep the live Codex adapter held; this plan does not redesign the fixture or implement a provider adapter.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `skills/decision-challenge/SKILL.md` | Defines trigger, inputs, bounded procedure, verdict semantics, and failure modes. |
| `skills/decision-challenge/templates/decision-challenge.md` | Provides the durable decision-record shape. |
| `scripts/validate.ts` | Makes the skill and template required scaffold assets. |
| `scripts/validate.test.ts` | Proves a repository missing the new skill is invalid. |
| `issues/019-decision-challenge-skill.md` | Records the implementation intent, exclusions, and acceptance checks. |
| `docs/implementation-plans/019-decision-challenge-skill.md` | Provides the project-native implementation summary and rollback boundary. |
| `docs/evidence/019-decision-challenge-skill.md` | Records delivered files, commands, risks, and final recommendation. |
| `docs/decision-challenges/019-live-codex-action-fixture.md` | Dogfooded `hold` verdict for the live adapter proposal. |
| `.extremely-hardcore/runs/019-decision-challenge-skill/` | Fresh proof-carrying evidence for this slice. |

### Task 1: Validate The Decision-Challenge Scaffold Contract

**Files:**
- Modify: `scripts/validate.ts`
- Modify: `scripts/validate.test.ts`

**Interfaces:**
- Consumes: `skillFiles`, `templateFiles`, and `requiredFiles` exported by `scripts/validate.ts`.
- Produces: validation errors naming missing `skills/decision-challenge/SKILL.md` and `skills/decision-challenge/templates/decision-challenge.md`.

- [ ] **Step 1: Write the failing validator test**

Add this test inside `describe("validateProject", ...)` after the missing-files case:

```ts
test("requires the decision challenge skill and record template", () => {
  const root = tempRepo();
  writeMinimalRequiredFiles(root);
  rmSync(join(root, "skills", "decision-challenge"), { recursive: true, force: true });

  const result = validateProject(root);

  expect(result.ok).toBe(false);
  expect(result.errors).toContain(
    "missing required file: skills/decision-challenge/SKILL.md",
  );
  expect(result.errors).toContain(
    "missing required file: skills/decision-challenge/templates/decision-challenge.md",
  );
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```bash
bun test scripts/validate.test.ts
```

Expected: FAIL because `writeMinimalRequiredFiles` does not yet create either decision-challenge path.

- [ ] **Step 3: Make the skill and template part of the required scaffold**

Add these exact entries after the `bounded-context-review` entries so the validator owns the new public scaffold contract:

```ts
export const skillFiles = [
  "skills/using-extremely-hardcore/SKILL.md",
  "skills/change-contract/SKILL.md",
  "skills/architecture-decision/SKILL.md",
  "skills/domain-discovery/SKILL.md",
  "skills/bounded-context-review/SKILL.md",
  "skills/decision-challenge/SKILL.md",
  "skills/test-first-implementation/SKILL.md",
  "skills/evidence-ledger/SKILL.md",
];

export const templateFiles = [
  "skills/change-contract/templates/change-contract.md",
  "skills/architecture-decision/templates/adr.md",
  "skills/domain-discovery/templates/domain-map.md",
  "skills/bounded-context-review/templates/bounded-context-review.md",
  "skills/decision-challenge/templates/decision-challenge.md",
  "skills/test-first-implementation/templates/implementation-plan.md",
  "skills/evidence-ledger/templates/evidence-ledger.md",
];
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run:

```bash
bun test scripts/validate.test.ts
```

Expected: PASS. The minimal fixture now includes both new paths through `requiredFiles`, and deleting their directory produces both precise validation errors.

- [ ] **Step 5: Commit the validated scaffold change**

```bash
git add scripts/validate.ts scripts/validate.test.ts
git commit -m "test: require decision challenge scaffold"
```

### Task 2: Add The Decision-Challenge Skill And Record Template

**Files:**
- Create: `skills/decision-challenge/SKILL.md`
- Create: `skills/decision-challenge/templates/decision-challenge.md`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: a completed change contract, relevant ADRs/reviews, repository/tool capability evidence, and the stated proposal.
- Produces: a Markdown decision record using one verdict from `proceed`, `hold`, or `needs-human-decision`.
- Integration: `AGENTS.md` instructs agents to run the skill before planning a triggered high-consequence proposal.

- [ ] **Step 1: Write the first failing scaffold check**

Do not create the new skill files yet. Run:

```bash
bun run check
```

Expected: FAIL with both missing required paths from Task 1:

```text
missing required file: skills/decision-challenge/SKILL.md
missing required file: skills/decision-challenge/templates/decision-challenge.md
```

- [ ] **Step 2: Create the record template**

Create `skills/decision-challenge/templates/decision-challenge.md` with exactly these sections:

```md
# decision challenge: <proposal>

## trigger

## proposal and claims

## existing-platform ownership

## strongest counterargument

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |

## minimum credible slice

## stop conditions

## verdict

proceed | hold | needs-human-decision

## rationale
```

- [ ] **Step 3: Create the skill**

Create `skills/decision-challenge/SKILL.md` with the standard frontmatter and required headings. Its procedure must require these exact checks:

```md
1. Check the trigger rubric; skip the skill for ordinary local changes.
2. Read the change contract, relevant ADRs/reviews, code boundaries, and local tool capability evidence.
3. State every product, isolation, evaluation, or architecture claim the proposal makes.
4. State what an existing platform already owns and the durable value left for this repository.
5. State the strongest reason not to build the proposal.
6. Build a claim-to-evidence map that distinguishes observed facts, assumptions, and gaps.
7. Name the minimum credible slice and falsifiable stop conditions.
8. Choose exactly one verdict: proceed, hold, or needs-human-decision.
9. Write the record from templates/decision-challenge.md.
10. When verdict is hold or needs-human-decision, stop before implementation planning.
```

Its failure modes must explicitly prohibit ceremony for trivial changes, provider execution during review, treating declared sandbox settings as proof of isolation, changing runtime code, and letting the challenger redefine fixture scoring.

- [ ] **Step 4: Add the repository routing rule**

Insert this rule after the architecture-decision rule in `AGENTS.md`:

```md
- Use `decision-challenge` before planning a proposal that introduces external writable-agent execution, changes an architecture/security/isolation boundary or public contract, or makes a product-differentiation or benchmark claim.
```

- [ ] **Step 5: Run scaffold validation and inspect the skill**

Run:

```bash
bun run check
sed -n '1,260p' skills/decision-challenge/SKILL.md
sed -n '1,160p' skills/decision-challenge/templates/decision-challenge.md
```

Expected: `validation passed: extremely-hardcore scaffold is complete`; the skill contains every standard heading and the template contains all required record sections.

- [ ] **Step 6: Commit the skill**

```bash
git add AGENTS.md skills/decision-challenge/SKILL.md skills/decision-challenge/templates/decision-challenge.md
git commit -m "feat: add decision challenge skill"
```

### Task 3: Dogfood The Skill And Close The Documentation Slice

**Files:**
- Create: `docs/decision-challenges/019-live-codex-action-fixture.md`
- Create: `issues/019-decision-challenge-skill.md`
- Create: `docs/implementation-plans/019-decision-challenge-skill.md`
- Create: `docs/evidence/019-decision-challenge-skill.md`
- Modify: `ROADMAP.md`
- Create: `.extremely-hardcore/runs/019-decision-challenge-skill/run.json`
- Create: `.extremely-hardcore/runs/019-decision-challenge-skill/evidence/*.json`
- Create: `.extremely-hardcore/runs/019-decision-challenge-skill/logs/*.log`
- Create: `.extremely-hardcore/runs/019-decision-challenge-skill/transitions.jsonl`

**Interfaces:**
- Consumes: `skills/decision-challenge/templates/decision-challenge.md`, ADR 0012, ADR 0013, the action fixture, reference executor, and local Codex CLI help.
- Produces: a dogfooded `hold` record; a closed implementation evidence ledger; a completed proof-carrying run.

- [ ] **Step 1: Write the dogfood decision record before implementation evidence**

Create `docs/decision-challenges/019-live-codex-action-fixture.md` from the template. It must contain this verdict and rationale:

```md
## verdict

hold

## rationale

The copied fixture workspace cannot create the protocol evidence and completion records currently created by the host reference executor. A workspace-confined writable Codex process can repair the known source file but cannot demonstrate Extremely Hardcore compliance without either a fixture-local immutable protocol CLI or a deliberately narrowed source-change-only claim. An adapter must not supply those agent-owned actions.
```

Its claim-to-evidence map must include the fixture package, `FIXTURE.md`, reference executor, action fixture runner, ADR 0012, ADR 0013, `codex exec --help`, and `codex sandbox --help`. It must name the no-network-attestation gap and the two valid redesign paths.

- [ ] **Step 2: Write project-native issue and implementation records**

Create `issues/019-decision-challenge-skill.md` with intent, accepted scope, exclusions, acceptance checks, and the held live-adapter follow-up. Create `docs/implementation-plans/019-decision-challenge-skill.md` with protected behavior, first failing check, smallest implementation, checks, rollback, and the explicit statement that live provider execution remains out of scope.

- [ ] **Step 3: Update the roadmap and write the evidence ledger**

Update the Behavioural Evaluation Harness status in `ROADMAP.md` to say that the live provider adapter is held pending fixture self-sufficiency, and that the decision-challenge gate is implemented. Do not change the stated provider-execution, comparison-policy, or threshold status.

Create `docs/evidence/019-decision-challenge-skill.md` with changed files, exact commands, passing and failing checks, architecture/public-contract impact, remaining risks, human-review status, and final recommendation `merge`. It must state that the dogfood verdict is `hold` for the live adapter, not `hold` for this skill slice.

- [ ] **Step 4: Commit all tracked documentation before capturing evidence**

```bash
git add ROADMAP.md docs/decision-challenges/019-live-codex-action-fixture.md issues/019-decision-challenge-skill.md docs/implementation-plans/019-decision-challenge-skill.md docs/evidence/019-decision-challenge-skill.md
git commit -m "docs: dogfood decision challenge skill"
```

The protocol run directory is ignored by `.gitignore`; do not stage it. This commit must happen before evidence capture so tracked documentation does not invalidate the workspace fingerprint.

- [ ] **Step 5: Run focused verification before capturing evidence**

Run:

```bash
bun test scripts/validate.test.ts
bun run check
bun run test
bunx tsc --noEmit
git diff --check
```

Expected: all commands exit 0. The focused validator test protects the new mandatory scaffold contract; full tests prove no existing protocol/evaluation regression.

- [ ] **Step 6: Create and complete the proof-carrying run**

Create a new run with criteria `decision-challenge-validated` and `documentation-complete`. Capture fresh evidence after all tracked implementation and documentation changes are committed except `.extremely-hardcore` artifacts, using:

```bash
bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill decision-challenge-validated -- bun run check
bun run eh evidence .extremely-hardcore/runs/019-decision-challenge-skill documentation-complete -- bun test scripts/validate.test.ts
bun run eh transition .extremely-hardcore/runs/019-decision-challenge-skill complete
bun run eh validate .extremely-hardcore/runs/019-decision-challenge-skill
```

Expected: the final command prints `completion gate valid`. The run artifacts remain ignored and local. If a tracked change is still required after capture, commit it, then recreate the run and recapture evidence before claiming completion.

- [ ] **Step 7: Re-run final verification**

Run:

```bash
bun run test
bun run check
bunx tsc --noEmit
bun run eh validate .extremely-hardcore/runs/019-decision-challenge-skill
git diff --check
git status --short
```

Expected: test, check, typecheck, completion gate, and diff checks pass. `git status --short` is empty.
