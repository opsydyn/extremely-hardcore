# implementation plan: provider onboarding and status reconciliation

## behaviour to protect

New users can discover the correct host command, distinguish package discovery
from skill loading and engineering adherence, and see an accurate roadmap and
dogfood status. No existing protocol or provider-evaluation behaviour changes.

## first failing test

This is a documentation and packaging change, so a code-level red test is not
practical. The pre-change inspection is the failing acceptance condition:
`ROADMAP.md` still says ten real runs are open, and the user guide has no
concrete Pi command. The corrected content search and host metadata validators
are the corresponding green checks.

## smallest implementation

Add the Claude plugin and local marketplace metadata, add one provider
onboarding page, replace vague host instructions with links and copyable
commands, correct roadmap/dogfood status, and record the observed smoke matrix.
Do not add an installer, provider abstraction, or new evaluator.

## refactor step

No refactor is planned. Keep the existing user guide and evaluation reference
as the canonical protocol/evaluation documents, with provider onboarding as the
host-loading document.

## checks to run

- `claude plugin validate .claude-plugin/plugin.json`
- `claude plugin validate .`
- Codex local marketplace add/list/install in isolated temporary `CODEX_HOME`
- Pi explicit loading smoke with no tools and no session
- `bun run check`
- `bun run test`
- `bunx tsc --noEmit`
- `git diff --check`
- Search for stale ten-run roadmap statements and broken documentation links.

## rollback plan

Revert the documentation, governance records, and two Claude metadata files as
one bounded change. No runtime state, database migration, or compatibility shim
is involved.

## notes

The available environment authenticated Pi only. Claude is installed but not
authenticated, and Codex model execution is blocked by the local network
boundary. These are recorded as smoke limitations, not converted into passes.
