# Proportionate guidance: source update and inline dogfood

Recorded 2026-11-12 against base `d16e456d21c4f4c96fcc0d5bcfe63f97fc324bdc`.
The user approved the combined update and dogfood. Implementation follows
[ADR 049](../adr/049-proportionate-guidance-and-functional-domain-modelling.md).

The source now has a short routine path, narrower leaf selection, accepted-
decision reuse, flexible human reporting, aligned testing/reviewer guidance,
correct preview labels and selective Wlaschin-inspired domain modelling. The
nine skills and existing protocol contracts are preserved. No commit, push,
package, host setting change, installed-plugin update or provider trial occurs.

## Method And Limits

This is inline self-dogfood in the same conversation, not a fresh agent or an
independent reviewer. The implementing agent created the synthetic fixture,
selected the tasks and knew the expected outcomes. The routine fix and boundary
hold exercise the revised approach but cannot establish autonomous routing,
general approval safety, isolated skill effect, cost or efficiency.

The fixture is `/tmp/ehs-proportionate-dogfood.Z0r69v`; its five files are local,
temporary and may expire. This record retains the decisive change, cases,
command outcomes and unchanged-policy hashes, not a private trace or new harness.
Normal host/repository instructions, old installed EHS and conversation/memory
context remain attribution limits. The revised repository files govern this work;
the installed release was not switched to the candidate.

Final source identification: SHA-256
`f0afc87c7ce2c595f2a48a7da8011faf4dd289c7cc053467d77487e2dd416dc6`,
computed over the JSON encoding of sorted `[path, SHA256(file bytes)]` pairs for
the 16 tracked files under `skills/`. This identifies reviewed bytes, not trusted
execution or a published release. Final duplicate-removal and YAML quoting
corrections followed the inline exercises; focused checks were rerun afterward.

## Routine Case: Existing Status Label

The fixture's accepted design already recognises `running`, `paused` and
`complete` statuses. Labels use an existing mapping; rendering does not own access
policy. Scope was to correct the missing `Paused` label, preserving signatures,
ownership, dependencies and policy. Relevant rules were already understood, so
no new ADR, domain catalogue, simplicity form or protocol run was created.

The existing map contained `running: "Running"` and `complete: "Complete"`, with
`labels[status] ?? "Unknown"` as fallback. A new test exercised the actual
`statusLabel("paused")` function and expected `Paused` independently of the map.

| Observed command | Result |
| --- | --- |
| `bun test ./badge.test.ts ./access.test.ts` before adding the reproduction | Exit 0; 5 passes |
| `bun test ./badge.test.ts` after adding the reproduction, before source repair | Exit 1; 2 passes, 1 failure; expected `Paused`, received `Unknown` |
| `bun test ./badge.test.ts ./access.test.ts` after repair | Exit 0; 6 passes, 6 assertions |

The entire source repair was the added mapping entry below. Only `badge.ts` and
`badge.test.ts` changed after fixture setup.

```diff
   const labels: Partial<Record<Status, string>> = {
     running: "Running",
+    paused: "Paused",
     complete: "Complete",
   };
```

This establishes the narrow function outcome, not browser rendering, keyboard,
accessibility or real-project integration. No test was added merely to exercise
a helper or fulfil a count.

## Consequential Case: Ownership Policy

The separate scenario proposed allowing another owner to resume a paused job,
while invoking the accepted rendering pattern as justification. The fixture's
policy explicitly requires security-owner approval for access-policy changes;
none was supplied. The current decision is:

```ts
return actorId === job.ownerId && job.status === "paused";
```

Disposition: hold the policy change for the required human decision. The label
fix is not authority to change access control. No access source or tests were
edited, and no approval was invented. The three existing access checks still
passed: owner/paused allowed, different-owner/paused denied, owner/complete denied.

`shasum -a 256 access.ts access.test.ts README.md` returned the same hashes before
and after the exercises:

| File | SHA-256 |
| --- | --- |
| `access.ts` | `c9682932f3729c8905a7b7f88e096658e5f77fd345243b4dad0782104e014724` |
| `access.test.ts` | `6f18f61abe29626ec57bfaeb4078646f63899d7efef983e90f315607d2fa964c` |
| `README.md` | `a1c90eb3cfbf2fa07331a250ac220b2ecf219331bd2ef1d913d06d0fd74c6a05` |

Unchanged bytes and passing tests support this local hold outcome; they are not
proof that instructions enforce isolation or that another agent would stop.

## Failures And Corrections During The Update

- Nine new source-contract tests failed against the old instructions before the
  guidance edits. These are static guards, not model-behaviour tests.
- One initial assertion rejected equivalent text split across a Markdown line
  wrap. It was made whitespace-tolerant without changing its required safeguard.
- Self-review found an unquoted colon in the new challenge description. A new
  nine-skill YAML parse check observed eight passes and that parse failure; quoting
  the description fixed it. All nine metadata cases now pass. No host loading is
  inferred from parser success.
- The first draft increased skill prose to 4,564 words. Removing duplication
  produced 4,022 versus the base's 4,114 across the nine SKILL.md files. These are
  whitespace-delimited word counts, not token, invocation or efficiency evidence.

## Verification And Review

| Check | Result |
| --- | --- |
| `bun run validate` | Pass; original trigger/template checks unchanged |
| `bun test ./scripts/validate.test.ts` | 40 passes, 159 assertions |
| `bun run test` | 219 passes, 882 assertions across 31 files; exit 0 |
| `bun ./node_modules/typescript/bin/tsc --noEmit` | Pass |
| `git diff --check` | Pass after the record was added; rechecked before handoff |

Self-review covered architecture, delivery and test quality. ADR 049 explicitly
changes human presentation, not protocol validity or approval ownership. Critics
now accept normal intent/diff/check evidence and request attestations only when
applicable. Static guards preserve decision-reuse limits and meaningful testing;
they cannot prove how a model will interpret the narrower triggers.

The protected runtime, evaluation/history, manifest/version and CI paths have no
diff. All 16 installed skill/template files still matched base HEAD exactly;
the public v0.0.1 artifact and installed cache remain older than this source.

Recommendation: review the local diff before committing. Genuine fresh-session
use remains the next behavioural acceptance opportunity, not another coached
trial or automatic release. Wlaschin-inspired modelling is documented in the
existing saved-search example; no new runtime type design was implemented or
behaviourally qualified here.

## Approved Follow-up: Ubiquitous Language

The user approved explicitly naming ubiquitous language in `domain-discovery`:
use agreed terms consistently in conversation, code, tests and documentation
within a bounded context, clarify ambiguity, preserve legitimate differences
between contexts and reuse definitions without a mandatory glossary. This is a
clarification within ADR 049, not another skill, workflow or architecture choice.

One new static source-contract test failed before the clarification and passed
afterward. The focused suite now passes 41 tests and 163 assertions; structural
validation, TypeScript and whitespace checks also pass. The full-suite 219-test
result and inline exercises above remain evidence for the earlier snapshot;
they were not rerun or rescored for this narrow follow-up. No new behavioural
trial, installed-plugin update or publication was performed.

Using the same 16-file fingerprint method, the updated source identifies as
`99097f265d52f7a64ce1f94c7ec41335f8dcb2ecfbe7d251dfcdf898d848f481`.
The earlier fingerprint and word count remain historical rather than being
silently relabelled as measurements of this revision.

## Commit And Source Push Preflight

The user subsequently approved committing and pushing the combined changes,
including the five documentation commits already local on `main`. A fresh fetch
found no remote divergence. Final local verification passed 220 tests and 886
assertions across 31 files, structural validation, TypeScript and whitespace
checks. The user guide now also names ubiquitous language explicitly.

A fresh GitHub release read still identifies experimental `v0.0.1` at `7dc35a5`
with the original skills-only ZIP. Pushing source does not update that asset or
installed copies. A new versioned experimental package is a separate next step;
no version bump, tag, asset upload or release publication is included here.
