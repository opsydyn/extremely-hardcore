# Claude Implementation Boundary Review

Date: 2026-10-13. Authorised no-model preparation after local commit `cd7a596`.
This is not consent to a new Anthropic request or writable adapter execution.

Execution follow-up: the user later explicitly consented to the limited payload
and observation. [Pre-dispatch stop 105](105-claude-implementation-auth-stop.md)
records failed fresh authentication checks and zero model launches. The original
review disposition below remains historical; no permission expansion followed.

- result: complete
- claim: The no-model permission review identifies a source-edit-only candidate using native Claude Read/Skill/Edit, with independent parent verification and no worker shell.
- evidence: Installed CLI remains 2.1.289. Staged metadata validation, session plugin list and component details pass: nine skills, zero bundled agents/hooks/MCPs/LSPs. Seventeen staged files match the repository and remain unchanged; candidate arguments parse without a model session.
- remaining uncertainty: Runtime tool/permission enforcement, current auth/configuration and model availability were not checked. This candidate cannot observe Claude executing tests; it does not clear full standalone acceptance or containment.
- next: needs review; approve the narrower payload/observation below or hold for a separate command-execution boundary review. No model, adapter change, skill edit or commit follows from preparation alone.

## Contract And Architecture Applicability

Minimum complete authorised work: inspect installed controls and existing
decisions, run no-model plugin diagnostics, and record the least-powerful
useful implementation candidate. Repository writes are limited to this review
and roadmap/index links. No provider task, authentication check, persistent
settings change, dependency, adapter, skill, CI or distribution work.

[ADR 0021](../adr/0021-claude-read-only-leaf-adapter.md) keeps the classification
adapter read-only and does not load EHS for engineering tasks. Do not add writes
or alter its capability claims. The candidate would instead observe the native
Claude CLI directly, as planning trial
[090](090-claude-completion-routing-result.md) did, with a newly approved tool
profile. [ADR 0017](../adr/0017-dedicated-colima-docker-containment-probe.md)
does not authorise provider execution inside its container or credential copying.

No new ADR is needed for this local review: no operational permission or EHS
architecture changes. A new execution/isolation mechanism, persistent policy or
writable adapter would need a separate decision; none is proposed here.

## Authority Distinction

The installed CLI advertises restricted mode, explicit tool lists, scoped allow
rules, dontAsk, no permission-prompt responder, process-only settings, empty
strict MCP and no session persistence. These are available controls, not proof
of an effective runtime inventory or denial behaviour.

Claude's [permission documentation](https://code.claude.com/docs/en/permissions)
distinguishes tool approval from
[OS-level command sandboxing](https://code.claude.com/docs/en/sandboxing).
Inference for this task: permitting a test command also permits executing the
edited module it imports. A narrow Bun command allow rule does not itself
restrict that module's filesystem/network effects. Do not label such an
invocation fixture-only or offline without separate enforcement evidence.

Options:

1. **Read/Skill/Edit only, parent-run tests.** Recommended minimum observation.
   Claude can inspect existing regressions and edit one source file without
   shell authority. It must state that tests were not executed by it. Parent
   inspects the diff before executing the unchanged tests and independent cases.
2. **Add Bash for worker-run verification.** Not qualified by this review.
   A command rule alone is insufficient evidence of child-process containment.
   Review the native command boundary separately; do not add a permission shim,
   credential transfer or EHS execution runtime to force this observation.
3. **Hold the implementation observation.** Appropriate if worker-executed
   tests are required for the immediate question. Do not mislabel option 1 as
   satisfying that requirement or repeatedly widen its permissions on failure.

The smaller candidate tests a useful fix and honest verification limits, not
the entire engineering loop. Parent verification is a deliberate acceptance
boundary, not agent-executed test evidence.

## Current No-Model Evidence

Fresh private workspace contains only the copied skills-first plugin; reports
and the temporary diagnostic helper are outside it. No fixture/source/test
payload or model prompt was created for this slice.

- CLI resolves to `/Users/alancurrie/.local/share/claude/versions/2.1.289`.
- Binary SHA-256: `03d66745e3bb69ec727d66023696f3820bc0a00a8a5ba725eb6706d0c67cbe69`.
- Native validation exits 0 without warnings; session plugin list contains only
  extremely-hardcore@inline, version 0.0.1, enabled at the staged path.
- Native details list all nine EHS skills and no bundled agents/hooks/MCPs/LSPs.
  The displayed ~376 always-on tokens are an estimate, not consumption or
  efficiency evidence. Ambient runtime built-ins were not inventoried here.
- Candidate requests Read/Skill/Edit, dontAsk, permission-prompts none, scoped
  source Edit and fixture/skill Reads. It explicitly denies Bash, Write, Agent,
  web tools and Edit on tests/README/plugin files. Restricted/settings/MCP,
  disabled hooks/memory and no-Chrome controls remain process-only requests.
- The pinned model name, effort high, eight-turn and USD 1.00 limits parse in
  plugin diagnostic commands. Print-mode semantics, model resolution and billing
  enforcement were not exercised. No --print or task prompt was used.
- Nine inspected provider/config override environment names are unset. No
  credential values were inspected or printed. Saved settings were hashed after
  diagnostics only; this is not a before/after host-state attestation.

## Decision Challenge

Trigger: a proposed new writable native-Claude observation and its permission,
verification and provenance boundaries. Native Claude owns permissions,
authentication and system context; EHS owns concise engineering guidance.
The durable value is independently checked engineering evidence, not a runner.

Strongest counterargument: a source-edit-only worker cannot demonstrate the
test-execution behaviour we ultimately want to qualify. Accept the narrower
claim explicitly or hold it; do not quietly relax full release acceptance.

| Claim | Evidence | Gap / required observation |
| --- | --- | --- |
| Current plugin components are identifiable | Native validation/list/details and byte equality | Native invocation and reads during a separately approved task |
| Candidate CLI controls parse | Successful no-model diagnostics | Effective startup inventory, tool events and permission behaviour |
| A source-only fix can be independently checked | Existing label-merge regressions and parent cases from 102/103 | New final source, unchanged tests and parent green |
| Claude runs its own tests | Not observed; candidate excludes shell | Separate authorised command-execution boundary |
| Existing adapter is now writable or contained | No evidence; no adapter changes | Keep unsupported/unknown claims unchanged |

### Minimum Credible Slice And Stop Conditions

Candidate only, pending decision and fresh scoped Anthropic consent: one native
Claude CLI process using the existing subscription route, not --bare, API-key
replacement or a copied credential. Reuse the synthetic label-merge requirements,
original source and fixed 13 tests from 102/103, plus nine current EHS
skills/resources. Only merge-labels.ts may change. No oracle, reference solution,
parent conversation, unrelated source, memories, captures or credentials are
deliberately staged. Normal host-owned system context remains unattested.

One uninterrupted task, 180-second wall-clock cap from spawn through closure,
at most eight agentic turns, requested API-cost cap USD 1.00, no retry, resume,
model fallback, reviewer agent or delegation. Candidate model is the previously
observed claude-sonnet-5-5; availability and auth require fresh checks. The cost
request is not subscription billing proof. No shell, worker tests, extra files,
installs, network tools, git or EHS edits. Provider traffic is necessary, not
an offline claim.

Before any launch: obtain explicit payload/destination consent, refresh source,
CLI/auth/configuration pins, qualify the fresh original red and review the
startup/tool checks for this new three-tool profile. The existing read-only
startup predicate must not be reused unchanged or weakened globally to admit
Edit. If required exposure cannot be reviewed, hold rather than invent a runtime.

Success would require native EHS invocation, bounded source-only change, fixed
input equality, meaningful receipt explicitly saying worker tests were not run,
and post-closure parent passes for 13 regressions and nine independent cases.
Inspect final source for out-of-contract code or side effects before executing
it. Unqualified code is not run merely because the worker reports success.
These are new observation criteria, not a retrospective rescore of trial 090.

Stop without repair or retry on missing consent, version/auth/config drift,
unexpected startup exposure, out-of-scope tool/action, test/input drift, denied
required Edit, missing native evidence, deadline or failed acceptance. Do not
enable Bash on denial. Detection is not prevention or a guarantee that unrelated
host content never reached a service.

Verdict: **needs-human-decision**. Local preparation is complete; choosing the
narrower verification boundary and consenting to its fresh payload precede any
implementation trial. No implementation controller or live task was prepared.

## Retention

Private root: `/private/tmp/ehs-claude-104.sjB7FW`. Twenty-three regular,
symlink-free mode-0600 files are pinned in controller/artifacts.json; directories
are mode 0700. Temporary retention can expire. Reports include exact diagnostic
argv/stdout/stderr, staged file hashes and the helper, not a provider transcript.

- Preflight SHA-256: `f334d5fd12a736fa6ccbc4c3fbb5912fd1a0910020228effcf6070986dac76c6`.
- Manifest SHA-256: `4e6a78fe21f61a5ced8ce0770144f27e75aa8a1fd272efb1f390520d9ecc86e9`.

No model task, new authentication operation, deliberate saved settings mutation,
product code/skill/adapter change, commit or publication occurred. Full product
tests were not rerun for this documentation and no-model diagnostic work.
Scaffold validation, 106 local links across the three changed documents,
retained-artifact hashes and whitespace/diff checks pass.
