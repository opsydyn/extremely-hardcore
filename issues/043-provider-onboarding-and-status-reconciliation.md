# issue: provider onboarding and status reconciliation

## intent

Make EHS usable and accurately described for Codex, Claude Code, and Pi users
from a local checkout, while reconciling the roadmap with the completed ten-run
real operator campaign.

## scope

- Add concrete checkout loading commands for Codex, Claude Code, and Pi.
- Add minimal Claude plugin and local marketplace metadata.
- Verify Codex package installation, Claude metadata validation, and Pi's
  explicit skill loading path.
- Record provider and authentication/network limitations honestly.
- Update roadmap and dogfood navigation/status.

## completion criteria

- A new user can find one documented loading path for each host.
- Package discovery, skill loading, and engineering adherence are clearly
  distinguished.
- Ten real operator records are represented as complete, with aggregate review
  still explicitly open.
- The existing provider evaluation warning states that Pi evaluation disables
  skills and is not EHS-loading evidence.
- Documentation, manifest, structural, test, typecheck, and diff checks pass.

## non-goals

- No protocol, schema, evaluator, or provider-adapter implementation changes.
- No writable provider execution, benchmark, comparison, containment, or
  network-isolation claim.
- No credential or raw transcript retention.
- No persistent host configuration mutation during verification.
- No persistent Pi package mechanism.
