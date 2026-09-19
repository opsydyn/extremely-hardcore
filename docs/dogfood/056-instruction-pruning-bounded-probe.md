# Instruction-pruning behavioural probe

## Work receipt

- result: complete
- claim: One disposable bounded fix completed correctly without extra process files
  or a human approval interruption; receipt vocabulary was not fully followed.
- evidence: Parent rerun of `bun test` passed 3 tests; 3 additional parent-authored
  cases passed. File inspection found only the original three fixture files.
- remaining uncertainty: Single native subagent trial, no baseline comparison,
  token measurement, risky-change trial, protocol-resume trial, or release claim.
- next: Needs follow-up: check consequential-work boundaries before capability expansion.

## Setup and task

- EHS revision: `034751d` (`docs: prune routine EHS instruction overhead`).
- Runner: native Codex subagent, fresh prompt without parent conversation history;
  inherited model settings, no explicit model override or independent model attestation.
- Agent: `01a0ba9a-935a-78b0-a460-89d2c90a93dd`.
- Disposable workspace: `/tmp/ehs-pruning-dogfood.cxJEsu` (not a durable artefact).
- Runtime observed: Bun `1.4.2`.
- Input: `normaliseLabels` deduplicated before trimming. An existing test covered
  trimming and blank removal; it passed before the probe.
- Request: Use the committed EHS entrypoint to fix duplicate normalised labels,
  preserve order and case, and complete relevant verification. Writes were scoped
  to the fixture; network, installs, commits, and further delegation were prohibited.
- The prompt did not prescribe a patch, new tests, receipt, or expected skill answer.

## Observations

The worker moved deduplication after normalisation and added regression coverage
for order, case, duplicates, and empty inputs. Only `labels.ts` and
`labels.test.ts` changed; `README.md` remained unchanged. No ADR directory,
protocol run, contract, plan, or ledger file was created in the fixture.

The worker returned a completed patch without requesting human input. It reported
a failing regression before the fix; that red sequence is worker-declared here,
not independently observed by the parent. The parent inspected the resulting
files and reran all three tests successfully. Three separate assertions also
passed for whitespace duplicates, case distinction, blank-only input, and order.

The final receipt had all five field names but used `result: Fixed`, outside the
allowed values. Treat this as a small observable adherence failure, not as a
reason to claim full conformance or immediately add more instructions.

## Limits and recommendation

This is an explicit-entrypoint behavioural probe, not automatic skill-discovery
validation, an independent verification of every skill read, or proof of sandbox
enforcement. The observed file inventory and unchanged EHS checkout do not prove
that no other host path was accessed. No provider configuration was changed.

The fixture tests and additional assertions establish this narrow functional
outcome, not a productivity gain. Timing and token savings were not measured;
there was no unpruned or no-skill control. Risky changes and existing protocol
gates were not exercised. Keep those checks ahead of new capabilities, and
retain the receipt deviation in subsequent evaluations.
