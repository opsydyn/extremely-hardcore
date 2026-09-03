# Bounded-context review: current provider loading and measurement

## proposed change

Refresh current Codex and Claude read-only loading evidence and record three
repetitions of a fixed EHS status/summary command path, then align public
onboarding and roadmap documentation.

## affected contexts

- Provider onboarding and host-status claims.
- Local protocol receipt commands used as the timing subject.
- Dogfood governance and release-gate documentation.

## allowed dependencies

- Existing provider onboarding commands and claim boundaries.
- Existing Codex/Claude CLIs and configured host sessions.
- Existing `eh status` and `eh summary` commands.

## suspicious dependencies

- Provider credentials, raw model output, session state, or hidden context.
- New provider adapters, benchmark collectors, comparison scoring, or
  writable execution.
- Treating process success as loading or command latency as productivity.

## data ownership

Codex and Claude own provider output; the operator owns transient command
results; EHS documentation owns only the classified summary and limits. No
provider output or credentials are retained.

## integration events

None in the repository. Existing CLIs are invoked for read-only checks; no CI,
network-isolation, persistence, or runtime integration is added.

## anti-corruption needs

Keep package discovery, metadata validation, loading, readiness, adherence,
command wall time, active operator time, comparison, and release as separate
claims. Do not let a blocked smoke contaminate the skill verdict or a timing
sample become a benchmark.

## verdict

safe with noted risk

## follow-up

If loading clears, design one separately approved real engineering adherence
task. If timing is valuable, define an active-time capture method and baseline
before using any threshold or productivity language.
