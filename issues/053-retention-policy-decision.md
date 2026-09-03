# Issue: record retention policy decision

## intent

Record the approved human decision on the historical projection gap and set a
forward requirement for durable release evidence without implementing storage.

## scope

- Accept the missing Runs 033 through 035 projections as a documented
  limitation.
- Prohibit historical backfill or relabelling.
- Require durable attestation and CI projections for future release evidence.
- Align the dogfood decision, template, index, and roadmap.
- Validate and complete a documentation-only Run 053.

## completion criteria

- The policy is recorded with its no-backfill and release-separation limits.
- The future template says missing durable projections make release evidence
  incomplete.
- The roadmap names current provider loading and measurement as the next slice.
- Run 053 has complete evidence, zero blockers, and valid local projections.

## non-goals

- No historical backfill, archive, persistence, schema, CI, provider, network,
  sandbox, writable execution, comparison, or measurement implementation.
- No release approval, provider-performance claim, or file-reading resume.
