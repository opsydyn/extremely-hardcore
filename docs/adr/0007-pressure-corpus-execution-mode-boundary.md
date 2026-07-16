# adr: pressure corpus execution-mode boundary

## status

accepted

## context

The behavioural-evaluation roadmap requires 20 pressure scenarios, but the current core runner can truthfully execute only seven protocol fixtures. Expanding the runner with invented agent behaviour or treating declarative scenarios as executed would produce misleading benchmark evidence.

## decision

Use one scenario manifest with explicit execution modes. `deterministic` scenarios are executed by the local protocol runner. `agent-attempt` scenarios declare behavioural pressure and expected structured observations for a future adapter. The core report remains deterministic-only.

## consequences

- The corpus reaches the required shape without overstating execution coverage.
- Future baseline and agent adapters share stable IDs and expectations.
- The milestone exit criteria remain incomplete until repeated baseline and cross-agent runs exist.

## options considered

### Keep a separate behavioural manifest

Rejected because it would duplicate IDs and make comparison across runners harder.

### Make every scenario executable now

Rejected because agent behaviour cannot be simulated as a faithful provider evaluation without an adapter contract and raw artefacts.

### One manifest with execution modes

Accepted because it keeps evaluation vocabulary together while preserving evidence boundaries.

## trade-offs

Consumers must filter by execution mode. The corpus creates an experimental semantic surface that needs review before external benchmark publication.

## follow-up work

Design a baseline runner and define the portable provenance retained by the first Codex adapter.

## review date

Before adding the first baseline or external agent adapter.
