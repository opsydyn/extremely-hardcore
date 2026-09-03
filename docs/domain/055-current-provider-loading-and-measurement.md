# Domain map: current provider loading and measurement

## domain terms

- **package discovery:** a host finds the EHS checkout and metadata.
- **skill loading:** a host answers a harmless marker prompt using the EHS
  skill path.
- **readiness/authentication:** the host can start or authenticate a model
  session; it is not loading proof by itself.
- **engineering adherence:** a provider follows EHS during real work; not
  measured by this slice.
- **command wall time:** elapsed host time for a fixed CLI invocation.
- **active operator time:** human attention and editing time; not measured by
  command wall time.
- **environment block:** an auth, network, version, or host condition that
  prevents a loading smoke from reaching a trustworthy marker.

## candidate bounded contexts

- **provider onboarding:** owns host commands, versions, discovery, loading,
  and claim limits.
- **protocol receipt:** owns local status and summary commands used for the
  timing probe; it remains the source of run state.
- **measurement record:** owns the small command-wall-time observation and its
  limitations; it is not a benchmark or evaluator.
- **dogfood governance:** owns release status and the distinction between
  loading, adherence, and comparison.

## aggregates/entities/value objects

No runtime aggregate or schema changes. The measurement record contains only
repetition, step, duration, exit state, and summary statistics.

## commands

- Read current host versions and discovery state.
- Run read-only loading smoke wrappers for Codex and Claude.
- Repeat `eh status` and `eh summary` three times for command-wall-time
  measurement.
- Record and validate Run 055.

## events

- Run 055 records the fresh host observations and timing boundary.
- No provider comparison, adherence, or release event is emitted.

## policies/rules

- A package/discovery pass is not a loading pass.
- A loading pass is not engineering adherence.
- An auth/environment block is reported as blocked, not as skill failure.
- Command wall time is not active operator time.
- Three repetitions are descriptive evidence only; no performance threshold or
  provider ranking is inferred.
- Raw provider output and credentials are not retained.

## invariants

- Provider-specific flags and parsers remain outside protocol modules.
- Current results do not rewrite historical records.
- Release, comparison, adherence, and writable execution remain separate gates.
- The EHS installed skill surface remains unchanged.

## external systems

Codex CLI and Claude Code may contact their configured providers for the
harmless loading prompts. The commands are read-only by request; no external
service output is retained. Local Bun and EHS CLI commands are used for timing.

## integration points

The provider guide consumes current host observations. The dogfood decision and
roadmap consume the classified results. No new runtime integration point is
introduced.

## ambiguity

The current host may not have valid provider authentication, and the loading
smoke may therefore remain pending. The timing probe cannot answer whether EHS
improves productivity or adherence; those require a separately designed study.

## recommended next questions

- Can Codex and Claude loading be rerun in a user-authorized authenticated
  environment without persisting session state?
- What active-time capture method would be acceptable for real operators?
- Which adherence task should follow loading before any provider comparison?
