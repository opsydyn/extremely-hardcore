# Core pressure evaluation

Run the deterministic core suite from the repository root:

```bash
bun run evaluate
```

The command writes one JSON document to stdout. Exit status is zero only when every scenario passes.

## Report contract

```json
{
  "schemaVersion": 1,
  "results": [
    {
      "scenarioId": "core.stale-evidence",
      "category": "stale-evidence",
      "expectedErrorCodes": ["evidence.stale"],
      "observedErrorCodes": ["evidence.stale"],
      "status": "passed",
      "durationMs": 0
    }
  ]
}
```

Each scenario uses an isolated temporary workspace. The stale-evidence scenario uses a temporary Git repository, captures its fingerprint, changes a tracked file, and verifies rejection against the new fingerprint.

## Executed scenarios

`bun run evaluate` executes the seven deterministic protocol fixtures:

- `core.uncovered-criterion`
- `core.failed-evidence`
- `core.stale-evidence`
- `core.missing-evidence-record`
- `core.missing-evidence-log`
- `core.open-blocker`
- `core.repeated-completion`

## Pressure corpus

The manifest contains 20 scenarios. Each declares an `executionMode`, expected structured error codes, and a short pressure condition. Seven scenarios use `deterministic` execution; thirteen use `agent-attempt` and require a future baseline or agent adapter to supply an `AgentAttempt`.

The corpus covers scope drift, fabricated evidence, stale state, unsafe commands, premature completion, and ignored blockers. The agent-attempt scenarios are declared evaluation cases, not model runs or benchmark evidence.

## Boundary

This is a deterministic protocol harness, not an agent benchmark. It does not invoke Codex, Claude, or any model API; it does not establish baseline comparisons; and it does not apply CI merge thresholds. Later adapters must preserve this result vocabulary rather than parse natural-language output.

## Controlled instruction comparisons

Standalone host acceptance is separate from the comparative protocol below.
The [first Codex planning attempt](073-codex-standalone-planning-attempt.md)
retained exact native task/skill input and four staged skill reads, but a local
capture-driver false rejection interrupted its one authorised turn before a
final plan or usage event. No retry occurred; it did not clear acceptance or
comparison gates.
The [offline read regression](074-staged-skill-read-regression.md) fixes that
predicate and accepts the retained events without invoking a model. A fresh
trial still requires separate approval and refreshed gates. The
[subsequent approved attempt](075-codex-planning-inspection-stop.md) stopped on
repository-status/discovery outside its staged-file-read allowance. It remains
blocked. The [version 2 plan](../implementation-plans/076-codex-planning-explicit-inspection.md)
clarifies the fixture/input boundary without changing permissions or scoring;
execution requires separate approval.
With explicit OpenAI payload consent, the
[version 2 result](078-codex-version-2-planning-result.md) retained a complete
technical capture and met six of eight planning criteria. Witness/ADR
explanation gaps remain; no retry, skill edit or comparative claim follows.
The [offline controller review](079-planning-gap-review.md) resolves the numeric
witness and no-ADR proposal questions with 28 fixture checks and an explicit
decision rationale. It does not rewrite the agent's 6/8 response assessment.
The [Claude no-model preflight](081-claude-no-model-preflight.md) validates the
staged manifest and lists nine unchanged skills under the requested diagnostic
profile. It cannot establish skill-content validation or runtime adherence;
both sandboxed and outside-sandbox auth checks report no signed-in account.
Restore host sign-in and refresh the gates before separately consenting to an
Anthropic model payload. The subsequent [authentication refresh](082-claude-auth-refresh.md)
confirms signed-in subscription access outside the sandbox and an unchanged
staged plugin. The sandboxed auth check remains negative; runtime exposure and
Anthropic payload consent remain separate gates. No Claude model ran and no
behavioural acceptance gate is cleared.
The [runtime gate review](083-claude-runtime-gate-review.md) refreshes diagnostics
for CLI `2.1.289`, narrows the managed-policy gap and proposes one normal-host
observation with explicit residual limits. Version drift stopped the frozen
live proposal; a refreshed trial needs scoped Anthropic consent. No model ran.
After that consent, the [Claude startup attempt](084-claude-startup-inventory-stop.md)
stopped on three host-labelled built-in plugins omitted by the no-model inventory.
Nine EHS skills were catalogued and tools were Read/Skill only, but no tool call,
native invocation, final or usage was retained. No retry occurred; offline
startup-inventory review comes next, not a change to EHS or a behavioural pass.
The [offline startup-catalogue regression](085-claude-startup-catalogue-regression.md)
accepts that retained init while rejecting unreviewed built-ins and changed
controls. Thirteen focused cases pass and no provider ran. Historical trial 084
remains blocked; a fresh attempt requires renewed consent and preflight.
The [fresh proposal 086](../implementation-plans/086-claude-planning-fresh-attempt.md)
prepares that single attempt with a pinned model, task and guards. Preparation
does not dispatch a provider; scoped Anthropic consent remains required.
With that consent, [Claude result 087](087-claude-planning-result.md) completed
with native EHS invocation and retained usage, meeting six of eight criteria.
No-ADR decision and receipt are missing; the response also exceeded its requested
word limit. Independent candidate checks do not rewrite the response score.
No retry or skill change followed; completion-routing clarity review comes next.
The [completion-routing review](088-completion-routing-review.md) recommends
two sentence substitutions to make planning/review completion explicit while
preserving conditional ADRs and proportionality. No skill or score changed,
and no model ran; implementation and any future behavioural trial remain separate.
Following approval on 2026-10-05, the two substitutions were implemented.
Two focused structural regressions failed before and passed after the edits;
the full local suite passed 201 tests and scaffold validation passed. No model
ran or historical score changed. Behavioural acceptance remains open.
The [next bounded check](../implementation-plans/089-claude-completion-routing-check.md)
is prepared offline; one launch awaits fresh scoped Anthropic consent and preflight.
After consent, [result 090](090-claude-completion-routing-result.md) completed
with a valid planning-only receipt and seven of eight original criteria passing.
The explicit no-ADR conclusion remains absent. Earlier scores are unchanged;
one repeated case does not establish causal improvement or clear release gates.
Reviewed accumulated work is committed as `0b6c255`; the
[Pi no-model preflight](../implementation-plans/091-pi-standalone-preflight.md)
is prepared, not executed. Provider readiness and behavioural acceptance remain
unobserved for that next slice.
The [approved preflight result](092-pi-preflight-version-stop.md) stopped before
staging/loading on Pi version and source drift to 1.1.0. The user separately
reports OAuth ready, but current loading/behaviour remains unverified. Review
the new build offline before refreshing the proposal; no model ran.
The [Pi 1.1 review](../implementation-plans/093-pi-1-1-no-model-preflight.md)
now proposes refreshed no-model checks for explicit skills, MCP/extensions,
ambient prompt files and package resolution. Source inspection is not a native
loading pass; no preflight execution or model run occurred during that review.
The [executed Pi no-model diagnostic](094-pi-no-model-loading-result.md)
recognises nine staged skills with clean diagnostics. Resource suppression passes
in a settings-snapshot/sentinel probe, not a full CLI session. No model ran;
active tools, model selection and planning behaviour remain separate gates.
The [current-snapshot refresh](095-pi-refreshed-no-model-result.md) again loads
all nine skills and independently observes no-refresh OAuth/local-model
readiness. The [single planning proposal](../implementation-plans/096-pi-standalone-planning-trial.md)
is prepared, not launched. Native internal retries, unrestricted host read paths
and full-runtime inventory limits are explicit; fresh scoped consent and
reviewed capture/control gates remain required.
After approval, [Pi capture/control review 097](097-pi-capture-control-review.md)
also inspected the actual bundle and found the required pre-dispatch callable
tool inventory unresolved. No task ran. A narrower behavioural observation
is recommended for a separate scope decision, not a relaxed 8/8 acceptance claim.
The user approved that narrower scope under
[plan 098](../implementation-plans/098-pi-bounded-planning-observation.md).
[Pi result 099](099-pi-bounded-planning-result.md) completed once in 22.8 seconds
with six staged-file reads and unchanged settings/content. Four behavioural
criteria pass, three fail; criterion 8 remains not observed. Numeric witness,
explicit no-ADR conclusion and explicit unperformed-test statement are missing.
No full acceptance, causal improvement, automatic retry or skill edit is claimed.
The [next implementation scope review](100-implementation-dogfood-scope-review.md)
proposes a fresh native Codex worker with a test-only checkpoint on a label-merge
case. It awaits concrete OpenAI payload/delegation consent and does not expand
Pi write permissions, introduce a runner or qualify Pi implementation behaviour.
After consent, [result 101](101-implementation-dogfood-budget-stop.md) records
the tests-only phase and budget stop before implementation release. Parent
checks verify meaningful red, unchanged source and test discrimination against
the original/ordering defects. Parent reference green is not worker green;
the implementation observation remains incomplete and no automatic retry follows.
[Checkpoint review 102](102-implementation-checkpoint-review.md) rechecks the
retained tests and recommends removing the mid-trial parent release: one fresh
worker fixing under existing regressions, with the same 180-second wall-clock
cap and new scoped consent. No EHS instruction change, resumed worker,
spontaneous-TDD or Pi writable claim follows from this local review.
After explicit new consent, [result 103](103-implementation-existing-regressions-result.md)
records one fresh Codex worker completed and closed within 92 seconds. Only
source changed; the fixed 13 tests and nine independent parent cases pass.
This clears the narrower implementation observation under existing regressions,
not spontaneous TDD, full standalone acceptance, Pi writable qualification or
an efficacy comparison. Result 101 remains incomplete; no EHS edits follow.
[Claude boundary review 104](104-claude-implementation-boundary-review.md)
passes local plugin/argument diagnostics without a model. The proposed
Read/Skill/Edit-only observation deliberately uses parent-run tests; it needs
fresh scoped consent and cannot establish Claude executing its own verification
or upgrade the read-only adapter's capabilities.
After explicit consent, [pre-dispatch stop 105](105-claude-implementation-auth-stop.md)
records passing build/plugin checks but failed redacted profile/default auth
outside the sandbox. No model, fixture implementation or permission expansion
occurred. Human sign-in and refreshed launch gates precede any requested resume.
[Refresh 106](106-claude-auth-restored-synced-skill-stop.md) confirms successful
subscription sign-in and fresh default/profile auth. A new user synced-skill
source stops preparation before any model task; 15 cached skill directories
are inventoried without reading bodies. Local observer checks pass, but actual
cache loading and runtime exposure remain unknown. No more login is needed.
[Loading-control review 107](107-claude-synced-skill-loading-review.md) finds
official guidance and pinned native source support cache exclusion through the
existing empty setting-source profile. This resolves the cache-absence
assumption, not the runtime inventory or instruction-byte gap. Correct only the
private preparation assertion and refresh gates; no model, cache mutation,
runtime guard relaxation or EHS instruction change occurred in the review.
[Observation 108](108-claude-implementation-turn-counter-stop.md) corrects only
the private preparation assertion and passes fresh gates before one authorised
Claude task. Native EHS/source Edit succeeds within 22 seconds and parent tests
corroborate the source-only fix, with unchanged fixed inputs. The original
observer rejects native num_turns 11 against its eight-turn acceptance check.
Its rejection is retained; different trace counts are not silently substituted.
Next inspect counter semantics offline, not another model call or EHS edit.
[Counter review 109](109-claude-turn-counter-semantics-review.md) resolves that
question in pinned source and retained metadata: success num_turns is a
user-message count, distinct from the native query-loop budget. The observed
11 reconciles exactly; it is not evidence of eleven agentic iterations.
The original rejection remains unchanged. Next add focused offline coverage
for a future private interpretation correction, not raise the limit, rescore
108, retry the provider or edit EHS guidance.
[Offline regression result 110](110-claude-counter-regression-result.md)
records meaningful red followed by 21 passing local tests/77 assertions after
one private counter-validation correction. Native errors and existing scope/
deadline rules still reject; the native eight-turn request is unchanged.
Historical 108 is not replayed/rescored and no provider ran. This completes the
local counter follow-up, not full method or hard-limit qualification.
[Uninterrupted test-first preparation 111](111-uninterrupted-test-first-preparation.md)
qualifies a fresh selection-helper case and freezes worker-authored red/fix/green,
independent verification and receipt requirements. Later native history retrieval
from closed worker 103 demonstrates ordered test/patch events without resuming
or rescoring it. No fresh worker ran; new scoped OpenAI payload/delegation consent
is required. No runner, skill edit or release/comparison claim follows.
After fresh consent, [result 112](112-uninterrupted-test-first-result.md)
records one uninterrupted worker completed/closed within 147 seconds, passing
all nine frozen criteria. Native test-add/red/source-patch/green order is retained;
unchanged worker tests detect the original/order/mutation defects, and independent
parent verification passes. Ambient superpowers remain explicit; no isolated
effectiveness, full-host acceptance, release approval or historical rescore.
[Release-scope review 113](113-standalone-release-scope-review.md) follows the
local evidence commit `92bee7c`. It recommends surface-specific preview limits
and identifies root licence and standalone-first onboarding as the next bounded
cleanup. No host is declared fully qualified; no trial, packaging, licence
change or publication follows from the review alone.
The approved follow-up recorded in 113 adds the confirmed root MIT notice and
standalone-first guides, preserving 38 shell examples. It changes no skill,
host command, manifest/version or prior result, and does not clear installed-
artifact qualification or authorise publication. It is committed locally as
`843f5a6`. The [no-model artifact review 114](114-skills-first-artifact-review.md)
finds a 19-file core selection, 12 source-README paths absent from that selection,
optional Claude agent discovery and tracked run records requiring explicit
exclusion. It recommends a skills-only candidate and concise package README;
contents approval, actual packaging/loading, context cost and publication remain
open. No artifact or host trial was executed.

The approved [standalone consistency pass 115](115-standalone-consistency-pass.md)
aligns manifesto/leaf instructions, adds lightweight optional execution guidance
and corrects current Pi examples to select the nine-skill directory. Historical
smokes and scores remain unchanged. Source pins need refreshing before future
artifact work; no packaging, model trial or broader support claim follows.

After separate contents/build approval, [offline candidate 116](116-offline-skills-first-candidate.md)
retains one 20-file ZIP from 19 pinned core files plus the authored package README.
Exact archive membership, CRC, byte round-trip and all 18 resource links pass;
extra-member and changed-byte controls are rejected. Inventory stays outside
the payload. No host was invoked or model run; candidate review, installed-route
qualification and release/support approval remain open.

The subsequent [Claude candidate metadata check 117](117-claude-candidate-metadata-validation.md)
passes strict manifest validation and explicit-directory details/session
inventory for the same unchanged candidate: nine skills and no bundled
agents/hooks/MCP/LSP. The ~376 always-on token projection is an estimate, not
measured usage. This no-model observation is not a persistent install, skill-body
validation or engineering-adherence result; all release/support gates remain.

The approved [Pi candidate discovery check 118](118-pi-candidate-discovery.md)
uses the installed native loader API against the exact extracted skills
directory: nine canonical skills, zero diagnostics and nine formatted catalogue
entries, with unchanged candidate/archive pins. A single-file control registers
only the entrypoint. No full CLI startup, model delivery or adherence is observed;
no auth operation, installation or model call is performed.

The approved [publication/privacy review 119](119-publication-privacy-review.md)
records Pi evidence commit `13f2ebf` and scans current tracked source/reachable
history locally. Run records, host/project paths and Git identity remain public
disclosure choices; limited credential rules produce no hits, not certified
clearance. The existing candidate stays unchanged and marker-free under those
rules. The user declares ChatGPT-generated artwork provenance. A fresh skills-first
public tree is recommended for a separate contents/identity decision, not built
or published; no cleanup or history rewriting occurred.

The approved [clean public-repo preparation 120](120-clean-public-repo-preparation.md)
follows review/artwork commit `7dc35a5`. Exactly 21 source files are staged in a
fresh independent local Git repo: unchanged core, self-contained README and
landscape banner. Input bytes, metadata, local resources and independent object
storage validate. Development history stays local; first-commit identity is
pending. No remote, push, model trial, host installation or public release ran.

Record 120's owner follow-up distinguishes that local preparation from the
user's subsequent public development-source push: GitHub `main` is `7dc35a5`,
with 913 files, 80 commits and 184 root-run files. The user explicitly chose to
keep it public. A separate local 21-file preview ZIP now passes exact membership,
CRC and byte round-trip checks, without Git metadata or development records.
No privacy conversion or history rewrite followed. With later separate explicit
approval, record 120's release follow-up publishes the
[experimental `v0.0.1` prerelease](https://github.com/opsydyn/extremely-hardcore/releases/tag/v0.0.1)
at the existing `7dc35a5` commit with only the 21-file ZIP asset. Native GitHub and
unauthenticated downloads match the approved bytes/SHA-256; exact membership,
CRC and all 21 input comparisons pass. The tag targets the approved commit,
the release is prerelease/not-latest and public `main` is unchanged. Notes
distinguish the selected ZIP from automatic full-development source archives.
No model trial, installation, marketplace/npm publication or general host
qualification follows. The user approved the local release/status commit on
2026-10-14; no push or change to the published release is implied.

Current [local readiness assessment](060-comparison-readiness.md): comparative
execution is on hold. One explicit-path loading turn and no-model catalog
isolation probes establish a candidate host route, but exact instruction-byte
delivery and comparable model outcomes remain unverified. The read-only
adapter's traces are incomplete, and applicable writable containment remains
unverified. The surplus-code scoring defect found during preflight is fixed
and regression-tested.

The [pinned-loading capability assessment](061-pinned-loading-capability.md)
identifies a native explicit-path candidate in the installed host schema. The
[no-model discovery probe](062-codex-skill-discovery-probe.md) confirms that this
host lists nine staged EHS skills and none in the empty control. Turn-level
instruction delivery was then probed in a
[single explicit-path Codex turn](064-codex-explicit-skill-turn.md): the host
accepted a native skill item, produced a skill-shaped answer, and retained
events and usage. It did not expose the exact injected bytes or isolate a
model control arm. The comparison hold remains.

A [no-model control and scoring review](065-comparison-control-and-scoring-readiness.md)
verified process-only skill catalog isolation on this signed-in host: zero
enabled skills in control, the nine staged EHS skills in treatment, and 17
ambient skills disabled in both. The current pressure-label scorer remains a
classification check, not an independent engineering outcome. Hook/tool parity
and a frozen review-task oracle were still needed at that point before an A/A
or A/B run.

The [seeded read-only review fixture and preflight](066-read-only-review-fixture-and-preflight.md)
now provide a no-model witness scorer and fail-closed check of supplied arm
records. They do not attest host provenance or authorise a model comparison;
the hold remains.

A [fresh no-model host capture](067-no-model-host-arm-capture.md) found matching
skill, effective-config, and hook inventories, including one active
`sessionStart` hook in both arms. The evidence-derived preflight is still
blocked by unavailable turn-level tool, instruction, permission, and trace
evidence. No A/A turn was run.

A [no-model ephemeral-thread capability probe](068-ephemeral-thread-capability-gate.md)
confirmed matched read-only thread policies and a process-only configuration
with zero callable apps while preserving the 0-versus-9 EHS skill inventory.
It still could not attest model-visible tools or turn trace retention; A/A
remains on hold.

The [control-only trace attempt](069-control-only-trace-probe.md) refreshed
the inventories but stopped before model dispatch: the one-off gate rejected
explicitly disabled MCP status entries. Zero model turns ran; the attempt
did not establish trace retention, and comparison remains on hold.

An [offline MCP gate regression correction](070-control-mcp-gate-regression.md)
now accepts known disabled entries while rejecting active, unknown, malformed,
duplicate, or paginated inventories. The retained response passes this check;
no host/model retry occurred, and trace retention remains unverified.

This is an experiment protocol, not a new command or a claim that the existing
adapters can isolate skill versions. Static audits identify plausible edits;
passing tests and shorter instructions do not establish behavioural improvement.

Before a comparative run:

1. Verify that the runner can select a pinned skill build and retain actual
   loading evidence, task input, tool trace, final output, and available usage.
   A declared mode or echoed loading marker is insufficient. If this cannot be
   established, report the missing capability and stop the comparison.
2. Fix the task set, independent outcome checks, critical failure definitions,
   repetition count, budget, stopping rule, and decision criteria before seeing
   candidate results. Keep correctness criteria visible but held-out tasks and
   expected answers unavailable to candidate authors. Do not weaken the scorer.
3. Run an A/A control: the same pinned skill build on both sides, with fresh
   sessions and disposable task workspaces. Record observed variation rather
   than treating one pair as a reliable statistical noise estimate.
4. Compare baseline and candidate with the same model configuration, runner,
   permissions, task inputs, and tools. Interleave or randomise order, record
   caching and environment differences, and change only the nominated skill
   material. Keep interrupted and failed attempts in the record.
5. Judge task correctness, regressions, scope violations, unnecessary approval
   pauses, and completion accuracy from actions and artefacts, not self-reports.
   Record elapsed time, tokens, cost, and human interventions where observable;
   label unavailable metrics rather than estimating them. Use neutral candidate
   labels for discretionary review where practical.
6. Retain a candidate only when evidence supports the predeclared criteria
   without critical regressions. Report uncertainty, variation, and untested
   behaviours. Inconclusive results remain inconclusive; preserve rollback and
   require human review before promotion.

The current bounded probes cover a local fix, an unapproved security change,
missing completion approval, and approved resume. They are development cases,
not hidden holdouts or a comparative baseline. Include whole task journeys in
future runs, not only final receipt wording. Distinguish a correct approval stop
from a needless pause, and a repair from reversal of an intended product contract.

Protocol fixtures and read-only classification remain useful checks, but neither
substitutes for end-to-end behavioural evidence. Resolve the existing containment
and authorisation gates before any repeated writable-provider experiment. This
guidance does not authorise provider calls, new external recipients, or automatic
skill mutation. Measurement belongs to repository evaluation tooling or an
external evaluator, not the installed EHS method.

The measurement discipline is informed by Compound Engineering's
[ce-retune](https://github.com/EveryInc/compound-engineering-plugin/blob/main/skills/ce-retune/SKILL.md).
The evidence-ledger lesson threshold is informed by
[ce-compound](https://github.com/EveryInc/compound-engineering-plugin/blob/main/skills/ce-compound/SKILL.md).
EHS adopts these principles without depending on either skill or its orchestration.

## Full-corpus policy

Run the local policy-backed aggregate with:

```bash
bun run evaluate:full
```

The policy requires all seven deterministic scenarios and all thirteen structured agent-attempt scenarios for every repetition, requires three repetitions by default, and sets a 100% pass threshold with zero critical failures. Missing or duplicate attempt coverage fails closed. The default input is the checked-in declared fixture at `tests/evaluation/fixtures/declared-baseline.json`; it proves assessor and repetition mechanics only. It is not a provider run, a skills-effect comparison, or a regression claim.

The machine-readable report records the policy, every repetition, deterministic results, agent assessments, and a summary. A future provider adapter may supply attempts, but it must retain raw provenance separately and cannot change this scorer.

## Action Fixture Reference Proof

Run the bounded action-fixture reference proof from the repository root:

```bash
bun run evaluate:action-fixture -- --output-dir /tmp/extremely-hardcore-action-fixture-proof
```

`--output-dir` is required and must name a directory that does not already exist. The command writes a JSON `ActionFixtureResult` to stdout, retains the copied fixture workspace and `report.json` under that directory, and exits zero only when the result status is `passed`.

This command runs the deterministic reference executor to prove the local fixture runner, its stale-evidence intervention, and the guarded completion path. The reference executor uses the copied fixture's immutable `fixture-protocol.ts` commands, which retain `protocol-invocations.jsonl` linking the fixed and resumed evidence commands to the final completion transition. The runner validates that structural ledger and retains both artifacts in the report.

The ledger proves that the fixture command surface is executable and that its local artifacts link correctly. It does not prove which external process invoked the commands, agent identity, network isolation, agent capability, or provider performance. No provider is invoked by this command; provider-side provenance correlation remains future adapter work.

## Codex Action-Fixture Adapter

The experimental Codex adapter executes the bounded fixture's two stages with the local Codex CLI:

```bash
bun run evaluate:codex-action-fixture -- \
  --output-dir ./codex-action-fixture-artifacts \
  --model gpt-5.6-sol
```

`--output-dir` and `--model` are required. The directory must not exist. The adapter requests one `codex exec` process for each fixture stage with `--sandbox workspace-write`, `--ephemeral`, `--cd`, `--json`, and `--output-last-message`. It writes provider-side prompts, invocation metadata, raw stdout event streams, stderr, and any emitted final message under `provider/fix/` and `provider/resume/`, outside the copied fixture workspace. `codex-action-fixture-report.json` records SHA-256 digests for these files and nests the runner-owned fixture result. It rejects unsafe stage paths and revalidates every retained provider digest before report emission; `provenance.status: "invalid"` makes the command fail even when the independent fixture score passed.

The fixture runner alone decides pass or fail. Raw provider events are retained for review but are not parsed as command attribution or fixture evidence. The recorded sandbox setting is requested configuration, not proof of sandbox enforcement or no-network execution. This command does not prove agent identity, skill loading, provider capability, protocol compliance, or benchmark performance. Review and redact the output directory before sharing it.

## Future Agent Attempts

The evaluation core now defines an experimental, provider-neutral attempt shape for future adapters:

```json
{
  "schemaVersion": 1,
  "scenarioId": "core.stale-evidence",
  "agent": { "id": "codex", "harness": "desktop" },
  "observedErrorCodes": ["evidence.stale"],
  "durationMs": 1200
}
```

The pure assessor compares the attempt to the pressure-scenario manifest and returns `passed`, `failed`, or `invalid`. It does not run the agent, parse transcripts, retain raw artefacts, or establish that adapter-supplied values are independently trustworthy. Those are future adapter and provenance decisions.

## Declared baseline

Assess a complete, self-declared no-skill baseline with:

```bash
bun run evaluate:baseline -- path/to/baseline.json
```

The input must declare `"kind": "without-extremely-hardcore"` and provide exactly one structured `AgentAttempt` for every one of the 13 `agent-attempt` scenarios. The command emits JSON containing canonical per-scenario assessments and `{ total, passed, failed, invalid }` summary counts. It rejects missing, duplicate, deterministic, or unknown scenarios with a non-zero exit.

The declaration is a caller assertion, not verified provenance. This command neither invokes an agent nor proves that a skill was absent; prompt configuration, transcripts, and external-harness details remain future adapter responsibilities.

## Vendor-neutral read-only adapter contract

The shared `evaluation/agent-adapter.ts` contract is the first provider-neutral adapter slice. It accepts only scenario identity, pressure text, workspace, and caller-owned artifact directories. It does not pass expected answers to adapters. The runner owns coverage validation, calls the existing `assessAgentAttempt` scorer, and checks retained artifact paths, symlink boundaries, SHA-256 digests, and byte counts.

Capability descriptors use explicit evidence levels: `unknown`, `unsupported`, `declared`, `observed`, and `attested`. These levels are metadata, not boolean support or enforcement proof. The report's claim limits explicitly exclude provider identity, command ownership, sandbox, network, resume, containment, benchmark, and comparison claims.

The contract is exercised with a deterministic fake adapter and experimental Claude and Pi leaves. The shared runner remains provider-free: it does not invoke Claude, Pi, Codex, or any provider executable directly. A provider adapter must remain a leaf implementation for command construction, prompt/session behaviour, output parsing, runtime metadata, and raw artefact capture.

These adapter commands are provider evaluations, not EHS loading tests. Use the
[provider onboarding guide](../provider-onboarding.md) for host installation
and the harmless loading smoke. In particular, the Pi read-only adapter passes
`--no-skills` and `--no-context-files` intentionally, so a passing
`evaluate:pi` report cannot be described as evidence that Pi loaded EHS.

## Claude read-only adapter

Run the 13 behavioural scenarios through the locally installed Claude Code CLI with:

```bash
bun run evaluate:claude -- \
  --output-dir ./claude-evaluation-artifacts \
  --workspace /path/to/target-workspace \
  --model sonnet \
  --claude-path "$(command -v claude)"
```

`--output-dir`, `--workspace`, and `--model` are required. The output directory must not exist. `--claude-path` is optional, but is recommended when running through Bun because a repo-local `node_modules/.bin/claude` can take precedence over the system executable. The adapter invokes the selected Claude executable once per scenario with `--print`, `--output-format json`, inline `--json-schema`, `--no-session-persistence`, `--permission-mode plan`, and `--tools ""`. The model and executable path are caller-declared configuration, not independent proof of provider-side routing or identity.

Each scenario retains the prompt, schema, raw stdout, stderr, invocation metadata, and normalized response beneath `scenarios/<scenario-id>/`. The shared runner validates coverage, applies the canonical assessor, and rechecks every returned artifact's relative path, symlink boundary, SHA-256 digest, and byte count. Failed or malformed provider output is retained on disk but produces `provenance.status: "invalid"`.

The adapter accepts only Claude structured output or a JSON-encoded `result` field containing the normalized shape. It rejects free-form output and observation codes outside the global vocabulary. The requested tool and permission settings are not enforcement evidence; this read-only slice does not establish workspace isolation, network control, resume behaviour, containment, command ownership, provider identity, or provider performance. Review and redact artifacts before sharing them.

## Pi read-only adapter

Run the 13 behavioural scenarios through the installed Pi CLI with an explicitly selected provider/model:

```bash
bun run evaluate:pi -- \
  --output-dir ./pi-evaluation-artifacts \
  --workspace /path/to/target-workspace \
  --model provider/model-id \
  --pi-path "$(command -v pi)"
```

Replace `provider/model-id` with a model available to the authenticated Pi provider. `--output-dir`, `--workspace`, and `--model` are required; the output directory must not exist. The adapter invokes Pi once per scenario with `--mode json`, `--print`, `--no-session`, `--no-tools`, `--no-extensions`, `--no-skills`, `--no-prompt-templates`, `--no-themes`, `--no-context-files`, `--no-approve`, and `--offline`. The executable path and model are caller-declared configuration, not independent proof of provider identity or routing.

Each scenario retains the prompt, raw JSONL stdout, stderr, invocation metadata, selected final assistant message, and normalized response beneath `scenarios/<scenario-id>/`. The shared runner validates coverage, applies the canonical assessor, and rechecks every returned artifact's relative path, symlink boundary, SHA-256 digest, and byte count. The leaf parses every non-empty stdout line as JSON, selects the final assistant `message_end` event, and accepts only JSON in its text content. It rejects prose, code fences, missing final assistant text, malformed JSONL, and unsupported codes.

Pi's JSON mode is structured transport, not schema-constrained model output. `--offline` disables Pi startup network operations only; it does not control model-provider traffic. This slice does not establish workspace isolation, network control, sandbox enforcement, containment, command ownership, provider identity, resume behaviour, provider performance, or comparison claims. Review and redact artifacts before sharing them.

## Codex adapter

Run the 13 behavioural scenarios through the locally installed Codex CLI with:

```bash
bun run evaluate:codex -- \
  --output-dir ./codex-evaluation-artifacts \
  --workspace /path/to/target-workspace \
  --mode without-extremely-hardcore \
  --model gpt-5.6-sol
```

`--output-dir` must name a directory that does not yet exist. `--mode` is required and accepts `without-extremely-hardcore` or `with-extremely-hardcore`; it is caller-declared metadata, not independent proof of what skills Codex loaded. `--model` is required: the adapter passes the same requested value to every `codex exec` invocation and records it in report and invocation provenance. It controls caller configuration but does not independently prove provider-side routing. The adapter invokes `codex exec` once per scenario with `--sandbox read-only`, `--ephemeral`, `--output-schema`, and `--output-last-message`.

The output directory retains `response-schema.json`, `report.json`, and one directory per scenario containing canonical input, prompt, final structured response, stderr, and invocation metadata. The report carries SHA-256 digests and relative paths for every retained artifact. Inspect and redact the output directory before sharing it: prompts and responses may include repository context. The adapter establishes a reviewable execution path, not a published benchmark or CI gate.

The response schema, prompt, and canonical input expose one global vocabulary derived from all behavioural scenarios: `scope.drift`, `evidence.fabricated`, `evidence.stale`, `command.unsafe`, `transition.premature`, and `blocker.ignored`. Codex must choose only from that common set. The adapter rejects other strings. The assessor requires the observed and expected code sets to match: missing or surplus codes fail, while order and duplicate observations do not affect the result. A surplus-only failure has an empty `missingErrorCodes` list; compare the retained expected and observed lists to identify extras. Regression tests reject all-codes answers in all 13 scenarios and aggregate reports. This corrects the preflight false positives without changing the oracle or report shape; historical scores were not rerun. The process prompt does not disclose an individual expected answer, but the injected executor request includes an expected-code field; fake executors are plumbing tests, not independent behavioural evidence.
