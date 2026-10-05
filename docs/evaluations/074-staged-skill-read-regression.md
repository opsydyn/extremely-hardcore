# Staged skill read regression

Date: 2026-09-26. Offline follow-up to the
[interrupted planning attempt](073-codex-standalone-planning-attempt.md).
No model, app-server, authentication, network, or retry was invoked.

- result: complete
- claim: The capture predicate recognises the observed literal shell-wrapped multi-file read without trusting best-effort action labels.
- evidence: Red regression reproduced the false rejection; seven focused tests pass; both retained started/completed events are accepted offline; full suite passes 186 tests with 700 assertions; validation and TypeScript checks pass.
- remaining uncertainty: No fresh host trial or final planning response exists. This predicate observes commands after dispatch; it does not enforce containment or qualify agent behaviour.
- next: needs follow-up; propose a separately approved fresh planning attempt with fixed budget and refreshed host gates. Distribution remains last.

## Scope And Boundaries

The minimum change is a local command-capture helper and regression tests.
The temporary driver imports the helper; no EHS skill text, scoring criteria,
saved settings, sandbox policy, provider adapter, public API or CI changed.
The immutable plan and historical attempt record remain unchanged.

Dependency direction is driver/test -> evaluation helper -> Node filesystem
and path APIs. No model workspace imports this helper; no new dependency or
shared runtime is introduced. Boundary review: safe with noted risk, because
filesystem observations can race and cannot attest execution containment.
No ADR is required: host permissions and architectural boundaries are unchanged.

The strongest objection is accepting arbitrary `unknown` actions to get a green
trial. The implementation instead examines only raw commands matching literal
`cat` or `/bin/cat`, optionally inside the observed `/bin/zsh -lc '...'`
wrapper. It is not a general shell parser. Other syntax stays rejected, even
when harmless. Action classifications do not authorise the command.

## Regression Evidence

The extracted previous predicate reproduced two failures: rejection of the
observed wrapped read and acceptance of an internal `..` traversal. After the
fix, tests cover direct and wrapped reads, absolute staged paths, literal
quotes, shell operators and expansion, forged read metadata, line breaks,
unexpected cwd, missing files, directories, sibling prefixes, traversal, and
symlinks to inside/outside files. Tests create only disposable local fixtures;
they never execute candidate commands.

The helper resolves the expected cwd and skill root, rejects traversal and
symlink components below that root, and checks regular files remain beneath
it. It deliberately supports only a restricted path alphabet and wrapper;
unrecognised syntax still stops the driver. This is capture classification,
not a security or prevention claim.

Offline replay used the private capture cited in record 073. Both retained
`item/started` and `item/completed` command events returned true. The original
capture/report were not rewritten, nor was the temporary driver executed.
Its syntax check passed after replacing its inline predicate with the helper.
The driver remains temporary; only the helper/tests are repository artefacts.

Checks:

- `bun test tests/evaluation/staged-skill-read.test.ts`: 7 pass, 46 assertions.
- `bun run test`: 186 pass, 0 fail, 700 assertions across 30 files.
- `bun run validate`: pass.
- Root TypeScript `--noEmit`: pass.
- Explicit strict TypeScript check of the helper and its tests: pass.
- `node --check /tmp/ehs-acceptance-072.mjs`: pass; syntax only, no execution.

These results fix the observed local predicate defect. They do not change
record 073's blocked result, complete the standalone acceptance gate, support
comparative effectiveness claims, or authorise another model attempt.
