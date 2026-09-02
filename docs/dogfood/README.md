# Completion-gate dogfood

This directory records real use of the proof-carrying completion gate. A run counts only when it corresponds to a non-trivial repository change and preserves its `.extremely-hardcore/runs/<change-id>/` evidence directory.

Each record states the change type, risk, captured commands, gate behaviour, setup overhead, friction, fresh-agent readability, and any workaround. Failed or abandoned runs remain records; they are not erased to improve the headline result.

## Required sample

| Run | Required change type | Status |
| --- | --- | --- |
| 1 | Feature | Complete |
| 2 | Bug fix | Complete |
| 3 | Refactor or dependency change | Complete |
| 4 | Change made stale during verification | Complete |
| 5 | Real blocker or rejected completion | Abandoned with recorded blocker |

The initial five-record sample is complete. The current ten-run campaign index
is below; the original five-run decision remains a historical record in
`decision.md`.

## Current ten-run campaign

| Run | Record | Change type | Target |
| --- | --- | --- | --- |
| 1 | [roadmap Pi status](033-real-operator-dogfood-roadmap-pi-status.md) | Documentation/status correction | EHS repository |
| 2 | [stale completed status](034-status-stale-completed-next-action.md) | Protocol bug fix | EHS repository |
| 3 | [resolved blocked status](035-status-resolved-blocked-next-action.md) | Protocol bug fix | EHS repository |
| 4 | [minimum complete change](036-minimum-complete-change-heuristic.md) | Skill guidance | EHS repository |
| 5 | [Enhancement resource metadata](037-real-operator-dogfood-enhancement-resource-metadata.md) | Compiler hardening | `40k-builder` |
| 6 | [function name boundary](038-real-operator-dogfood-function-name-boundary.md) | Filesystem/public-boundary fix | `astro-azure-integration` |
| 7 | [trimmed radar tags](039-real-operator-dogfood-trimmed-radar-tags.md) | Frontend filtering fix | `tech-radar-web` |
| 8 | [postcode coordinate validation](040-real-operator-dogfood-coordinate-validation.md) | Public input validation | `postcodesio-effect-client` |
| 9 | [computed Effect boundary](041-real-operator-dogfood-computed-effect-boundary.md) | Lint-rule correctness fix | `effect-oxlint` |
| 10 | [Bun port validation](042-real-operator-dogfood-port-validation.md) | Runtime configuration fix | `elysia-azurefunc-adapter` |

All ten records exist. Runs 5 through 10 target external repositories; the
retained records state their exact worktrees, checks, limitations, and
attestations. The aggregate friction, false-block, and evidence-quality
decision is still open and is the next operational review.
