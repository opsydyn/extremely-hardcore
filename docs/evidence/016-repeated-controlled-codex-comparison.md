# evidence ledger: repeated controlled Codex comparison

## summary

Ran three declared baseline and three declared skill-assisted Codex evaluations at one commit and requested model. Every completed report passed all 13 strict classifications and all retained artifact digests. The result is stable but non-discriminative constrained classification evidence.

## changed files

- Operational issue, change contract, domain map, boundary review, implementation plan, evaluation summary, evidence ledger, roadmap, and run 016 protocol records.
- No adapter, scenario, assessor, prompt, schema, or production source file changed.

## commands run

- Verified Codex authentication, CLI version, target commit, and baseline deletion-only workspace diff.
- Ran six sequential adapter evaluations in a balanced declared-mode order with `--model gpt-5.6-sol`.
- Independently verified report counts, requested-model provenance, SHA-256 digests, and a conservative raw-artifact secret-pattern scan.
- Ran repository validation, full tests, and completion-gate validation after recording the redacted summary.

## passing checks

Every report has 13 attempts, 13 assessments, 13 provenance entries, 66 artifact records, zero digest mismatches, and requested-model provenance consistent with every invocation. The three strict pass counts are 13/13 in both declared modes. The baseline clone differed only by the documented instruction asset deletions.

## failing checks

An initial integrity read raced the final `skill-3` report write and found no aggregate report. A subsequent report-based verification found all 13 scenario artifact sets and a valid `skill-3` report. No campaign run failed. No obvious secret-pattern match was found, but this is not full redaction verification.

## architecture impact

No architecture or runtime change. This operational run exercises the existing experimental adapter under ADRs 0009, 0010, and 0011.

## public contract impact

None. The documented outcome uses the existing declared-mode and requested-model contract.

## risks left open

The corpus cannot distinguish declared modes at its current classification level. It does not prove skills were loaded, provider routing, or action-level protocol compliance.

## human review needed

Yes. Confirm that the next slice should build discriminative action-level fixtures rather than expand this non-discriminative corpus across providers.

## final recommendation

needs follow-up. Do not publish a skills-effect claim or create a CI threshold from these results; build action-level fixtures next.
