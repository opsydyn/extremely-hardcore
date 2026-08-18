# implementation plan: real operator dogfood roadmap Pi status

## behaviour to protect

The protocol must reject completion without fresh passing evidence, and the roadmap must not claim more than the retained Pi evidence supports.

## first failing test

No code test is applicable: this is a documentation-only change. The first failing acceptance check is the roadmap-content evidence command run against the pre-change text, which must not find the authenticated Pi status.

## smallest implementation

1. Create the real standard-risk run definition before editing.
2. Update only the stale Pi status and next-gate paragraphs in `ROADMAP.md`.
3. Run the roadmap-content check, scaffold validation, full tests, and TypeScript check through `eh evidence`.
4. Validate and complete the run, then generate summary, attestation, and CI artifacts.
5. Record operational friction and fresh-agent readability.

## checks

- `bun run eh evidence <run> roadmap-pi-live-evidence -- bun -e <roadmap assertion>`
- `bun run eh evidence <run> repository-validation -- bun run check`
- `bun run eh evidence <run> repository-tests -- bun run test`
- `bun run eh evidence <run> repository-typecheck -- bunx tsc --noEmit`
- `bun run eh validate <run>`
- `bun run eh transition <run> complete`
- `bun run eh summary <run>`
- `bun run eh attest <run> <path>`
- `bun run eh ci <run> <directory>`
- `git diff --check`

## rollback

Revert only the `ROADMAP.md` wording and this run's tracked documentation records if review rejects the status correction. Ignored run artifacts may be retained for audit; no runtime rollback is needed.
