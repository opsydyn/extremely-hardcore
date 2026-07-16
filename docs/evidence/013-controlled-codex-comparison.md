# evidence ledger: controlled Codex comparison

## summary

Ran one controlled declared no-skill and one controlled declared skill-assisted Codex evaluation against commit `e4c0c3c`. Both produced complete reports and valid artifact digests. The strict results were 4/13 and 9/13 respectively, but canonical-code mismatch makes the difference non-interpretable as behavioural compliance.

## changed files

Operational documents and run record only; raw artifacts remain outside the repository.

## commands run

- Verified Codex authentication with `codex login status`.
- Created two fresh local clones at `e4c0c3c`; removed only `AGENTS.md` and `skills/` from the declared baseline workspace.
- Ran the existing Codex adapter once per mode with read-only, ephemeral execution and separate temporary artifact directories.
- Verified report shape and all 66 artifact digests per report.
- Reviewed all 26 final structured summaries and ran a conservative secret-pattern scan over raw artifacts.
- Recorded report SHA-256 values in the comparison record.

## passing checks

- Both reports contain 13 attempts, 13 assessments, and 66 digest-addressed artifacts with zero mismatches.
- The workspace control held: baseline removes only `AGENTS.md` and `skills/`; skill-assisted workspace has no diff.
- All 26 final response summaries semantically describe the intended policy issue.
- No obvious credential or private-key pattern was found by the limited scan.

## failing checks

The strict assessor accepted only 4/13 baseline and 9/13 skill-assisted outputs because Codex frequently used semantically plausible but non-canonical error identifiers. This is an adapter vocabulary design flaw, not evidence of behavioural non-compliance.

## architecture impact

No architecture or code change. The evaluation operates under ADR 0009.

## public contract impact

None. Existing experimental adapter contracts are exercised only.

## risks left open

One run per declared mode is not a benchmark and does not independently verify skill loading or adherence. The adapter prompt does not provide canonical observation codes, so strict outcomes conflate protocol recognition with identifier formatting. Raw artifacts remain locally retained and require human review before sharing.

## human review needed

Yes. Raw artifact inspection and redaction are required before any external sharing.

## final recommendation

needs follow-up. Fix the canonical response-vocabulary contract and repeat controlled runs before comparing outcomes.
