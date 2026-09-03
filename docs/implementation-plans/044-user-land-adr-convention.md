# implementation plan: user-land ADR convention

## behaviour to protect

Installing EHS leaves a user's repository unchanged. During a real change, an
agent can determine where an ADR belongs without overwriting project policy,
and it does not create an ADR or directory when the architecture trigger list
does not apply.

## first failing test

This is a documentation-only public-contract change, so a code-level red test
is not practical. The pre-change content assertion
`rg -n "## repository ADR convention" skills/architecture-decision/SKILL.md`
exited 1 because the new contract heading was absent.

## smallest implementation

Add the repository ADR convention to the architecture skill, repeat the answer
in the README and user guide, and retain the change contract, ADR, challenge,
review, and evidence records. Do not add an installer, runtime write, command,
or path validator.

## refactor step

No refactor is planned. Keep the architecture trigger list and ADR template
unchanged; add only the missing storage and installation boundary guidance.

## checks to run

- Content assertions for convention discovery, lazy fallback, no empty folder,
  and install-time no mutation.
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- Local Markdown link and stale-contract review.

## rollback plan

Revert the documentation and governance records together. No runtime state,
database migration, installer, or compatibility shim is involved.

## notes

The decision is deliberately advisory: the user's repository remains the
authority for documentation layout. The only fallback is a proposed path,
not a new EHS filesystem contract.
