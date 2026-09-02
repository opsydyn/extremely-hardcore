# evidence ledger: provider onboarding and status reconciliation

## work receipt

- result: complete with provider gates noted
- claim: EHS now has concrete local onboarding paths for Codex, Claude Code, and Pi; roadmap and dogfood status reflect the completed ten-run campaign; Codex package discovery and Claude metadata validation passed, and session-local EHS loading passed for Pi.
- evidence: `bun run check`, 135 repository tests, TypeScript, diff, local Markdown link, and manifest/version checks passed. Codex installed `extremely-hardcore@extremely-hardcore-dev` in isolated temporary `CODEX_HOME`; Claude plugin and marketplace metadata validation passed; Pi returned the exact loading marker with Pi 0.84.1 and `openai-codex/gpt-5.3-codex-spark`.
- remaining uncertainty: Codex model loading was blocked by the local network boundary and Claude model loading was blocked by missing authentication. Pi evidence is one explicit session-local smoke and does not prove persistent discovery, broad adherence, provider equivalence, or isolation.
- next: Run current-version Codex and Claude loading smokes in an approved authenticated environment, then aggregate ten-run friction, false-block, evidence-quality, and fresh-agent readability before making the operational acceptance or release decision.

## summary

This ledger records the documentation and host-packaging slice that makes EHS
more usable across the three named agent hosts without adding provider runtime
or orchestration machinery.

## changed files

- `.claude-plugin/plugin.json`
- `.claude-plugin/marketplace.json`
- `README.md`
- `ROADMAP.md`
- `docs/provider-onboarding.md`
- `docs/user-guide.md`
- `docs/evaluations/README.md`
- `docs/dogfood/README.md`
- `docs/dogfood/decision.md`
- Governance records 043 under `docs/change-contracts/`, `docs/adr/`,
  `docs/decision-challenges/`, `docs/domain/`,
  `docs/bounded-context-reviews/`, `docs/implementation-plans/`,
  `docs/reviews/`, and `issues/`.

## commands run

- `codex --version`, `claude --version`, `pi --version` -> Codex CLI
  `0.147.0`, Claude Code `2.1.251`, and Pi `0.84.1`.
- `codex plugin marketplace add /Users/alancurrie/Projects/extremely-hardcore-skill`
  with isolated `CODEX_HOME` -> pass; local marketplace accepted.
- `codex plugin add extremely-hardcore@extremely-hardcore-dev` with isolated
  `CODEX_HOME` -> pass; plugin installed at version `0.0.1`.
- `codex plugin list` with isolated `CODEX_HOME` -> pass; plugin shown as
  `installed, enabled`.
- `claude plugin validate .` -> pass; marketplace metadata validated.
- `claude plugin validate .claude-plugin/plugin.json` -> pass with the
  installed CLI's existing warnings for agent files without frontmatter.
- Claude loading smoke with `--plugin-dir` -> blocked: `Not logged in`.
- `pi auth check --model openai-codex/gpt-5.3-codex-spark --json --no-refresh`
  -> pass; provider readiness reported `ready` without emitting credentials.
- Pi loading smoke with explicit `--skill`, no tools, and no session -> pass;
  exact marker returned: `EHS_SMOKE provider=pi loaded=yes first_step=change-contract trivial=skip-full-loop`.
- Codex model loading smoke -> blocked by the local network boundary after the
  isolated state setup; no pass was recorded.
- `bun run check` -> pass; scaffold validation passed.
- `bun run test` -> pass; 135 tests passed, 0 failed across 27 files.
- `bunx tsc --noEmit` -> pass.
- `git diff --check` -> pass.
- Local Markdown link scan across seven user-facing documents -> pass.
- Manifest JSON/version/name consistency assertion -> pass; all host metadata
  remains aligned to `extremely-hardcore` `0.0.1`.
- Stale roadmap/dogfood status scan -> pass; no current statement says the ten
  real operator runs are still pending.

## passing checks

- Codex local package discovery and installation passed in isolated temporary
  configuration.
- Claude plugin and marketplace metadata validation passed.
- Pi explicit session-local loading passed with the expected marker.
- Repository scaffold, tests, typecheck, whitespace, links, and manifest
  consistency checks passed.
- Roadmap and dogfood status now distinguish completed evidence from open
  operational and provider gates.

## failing or blocked checks

- Claude model smoke was blocked by missing authentication.
- Codex model smoke was blocked by the local network boundary. A restricted
  first attempt also could not create the normal user state database; no
  provider success was inferred from either attempt.
- No current provider comparison, benchmark, containment, network-isolation,
  writable execution, or skills-effect claim was made.

## architecture impact

ADR 043 records the small multi-host packaging decision. The change adds only
host metadata and documentation. It changes no protocol module, lifecycle,
scoring rule, provider adapter, dependency, persistence model, or runtime.

## public contract impact

The repository now exposes local Claude plugin/marketplace metadata in addition
to its existing Codex manifest, and documents Pi's explicit `--skill` route.
The protocol, `eh` CLI, evaluation schema, and standalone skill receipt remain
unchanged.

## risks left open

- Package discovery can succeed while a model ignores EHS.
- Pi has no claimed persistent package mechanism.
- Claude and Codex current-version model loading remains unverified.
- Ten-run operational evidence has not yet been aggregated into a release
  decision.
- Schema version 1 remains experimental and attestations remain local
  traceability, not cryptographic trust.

## human review needed

Yes. Review the version alignment and local marketplace ownership before a
public release, then review the aggregate ten-run report and any future
provider-loading results. No open architecture decision blocks this slice.

## final recommendation

needs follow-up
