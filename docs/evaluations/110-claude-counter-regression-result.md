# Claude Counter Regression Result

Date: 2026-10-13. Approved offline correction following
[review 109](109-claude-turn-counter-semantics-review.md).
No Claude process or provider task launched. Historical 108 is not rescored.

- result: complete
- claim: A fresh private observer validates normal-success user-message metadata without comparing it to the native query-loop budget. Native error rejection and existing scope/deadline checks remain intact; this is not a hard-budget enforcement qualification.
- evidence: New tests against the original observer produce 17 passes/four failures, reproducing the count-11 false rejection and acceptance of zero/negative/fractional metadata. After one predicate correction, 21 local fake-child/guard tests and 77 assertions pass. All 55 historical 108 artefact pins still match; guards and copied fixture bytes remain unchanged.
- remaining uncertainty: Local subprocess tests exercise the observer, not Claude's live at-limit behaviour, instruction delivery or containment. No new host-adherence observation or standalone release gate is cleared.
- next: needs review; review/commit the accumulated preparation, observation and correction records, then assess the remaining standalone method-acceptance gaps. Do not rerun the provider merely to obtain green from the corrected observer.

## Contract And Scope

Reuse 109's approved decision challenge and pinned counter interpretation.
Make the smallest private correction and demonstrate meaningful red/green
through the actual capture function using local Bun child processes that emit
synthetic native-shaped events. Mock only the external CLI, not the observer's
parsing, scoped-tool predicate, result handling or closure path.

The fresh private root copies capture/guards/tests and disposable inputs from
108; its artefacts and original rejection remain immutable. Existing guards
and ten tests are unchanged except the disposable workspace path. This work
does not install new machinery, change a permanent evaluator, edit EHS skills,
alter the native profile, or touch auth/cache. No new ADR is required: no
architecture, public contract, adapter or operational boundary changes.

## Red And Minimal Correction

The positive regression sends seven scoped tool requests/results and three
synthetic skill-text injections, followed by a successful result reporting
num_turns 11. The original capture path falsely stops at its <=8 check.
Separate metadata cases also expose accepted zero, negative and fractional
success counts. Missing/null/string/unsafe-integer metadata, native errors and
the original ten checks already reject or pass as expected.

Only the numeric result predicate changes: require a positive safe integer for
this pinned normal-success path, preserve its reported value, and do not compare
it with the query-loop limit. A short comment names the unit distinction. The
only other capture-file difference is rebinding the private root, not its
dispatch profile or budget. No threshold is raised to 11 and no assistant
message/ID counter is substituted. Native --max-turns 8 remains the reviewed
request; its enforcement remains platform-owned and not independently proven.

The existing native-error branch still rejects error_max_turns, other failure
subtypes and permission errors. Scalar metadata validity does not attest actual
message counts, hidden provider attempts or budget enforcement.

## Green And Verification Boundaries

Fresh green: **21 tests, zero failures, 77 assertions**. These exercise:

- The count-11 scoped success and preservation of native reported metadata.
- Missing, null, string, zero, negative, fractional and unsafe-integer counts.
- Native max-turn terminal status, including a low reported count that must not
  bypass the error branch; API-cost/execution/structured-output errors.
- Permission-denial metadata and duplicate final results.
- Unchanged startup/tool/catalogue/path guards, malformed JSON, split UTF-8,
  missing result and local child deadline closure from the original ten tests.

All child processes are local synthetic emitters; none runs Claude, invokes a
real EHS skill, edits the fixture, executes its implementation or contacts a
provider. The copied workspace remains unchanged. No ready gate, model prompt,
native profile, authentication record or dispatch marker is prepared in the new
root. The reviewed eight-turn profile retained in 108 is unchanged.

The original 108 output is not replayed into a favourable acceptance result.
Its parent-verified source fix and original observer rejection remain separate
facts; 109 diagnoses the unit defect and this record tests its prospective
private correction. Full method adherence, worker verification, comparisons,
Pi writable execution and release acceptance remain outside this slice.

## Retention And Repository Checks

Private root: `/private/tmp/ehs-claude-110.2CGjtO`. Twenty-eight regular,
symlink-free files are pinned; files mode 0600, directories 0700. Retention
includes the private corrected capture/tests, unchanged guards/fixture, red and
green command output, source diff and integrity checks. No provider transcript
or private reasoning is generated. Temporary retention may expire.

- Manifest: `a148e59350d21f1deace14b8a3ed129b402a20e0b124a43e16cbeeb17fd28c84`.
- Capture: `7da44a5fd14dec37698350a9b61787f4067daaf69233ea8caf655b716537c677`.
- Tests: `0d2650c3ea6f514651367da994a79f28b41c00e87727cd3de56d44b4d7bff44d`.
- Red: `cf420cb78d017ca0824040ffed4857fed9c3663e21d1dab4aa4bb1af896c48f0`.
- Green: `616e94346fe45b156c839a8bf75578ec6af9ac9873a3f0ba9dedfa274c5beb4c`.

Scaffold validation, local documentation links, retained hashes and whitespace
checks pass. Full product tests were not rerun for this private-tooling and
documentation slice. No product code, skill, adapter, CI, auth/cache, commit or
publication changed.
