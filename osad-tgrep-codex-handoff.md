# Osąd + tgrep — Codex handoff

Status: implementation handoff  
Date: 2026-09-19

## Goal

Extend the Osąd product/technical vision with **tgrep as the repository evidence layer**.

Do **not** turn Osąd into a code-search tool and do **not** vendor or wrap tgrep into Osąd core.

The intended stack is:

```text
repository
   ↓
tgrep
fast exact evidence retrieval
   ↓
EvidenceBundle
small, bounded, source-linked context
   ↓
Effect Decision
   ↓
DecisionModel
   ↓
TypeSafe / Jev
typed probabilistic judgment
   ↓
Osąd policy
pass | review | block
   ↓
Codex / Claude / CI / application
```

The design thesis:

> **tgrep finds concrete evidence. Jev judges ambiguous evidence. Osąd turns that judgment into deterministic policy. Frontier agents reason or edit only when the cheaper layers cannot close the loop.**

This is a composition of separate tools, not a monolith.

---

# Why tgrep belongs in the stack

`tgrep` is a trigram-indexed grep designed for fast repeated codebase search.

Current upstream facts relevant to this integration:

- `tgrep` maintains an on-disk trigram index.
- `tgrep serve .` keeps a live in-memory overlay and watches file changes.
- normal searches automatically use the server, local index, or full scan as available.
- `--no-index` forces a fresh filesystem scan when exact freshness matters.
- it supports common ripgrep-style search flags.
- `-l` is useful for broad file discovery.
- `-C N` is useful for bounded context.
- `-q` provides cheap yes/no existence checks.
- search exit codes follow grep semantics:
  - `0`: match
  - `1`: no match
  - `2`: error
- v1.0.9 added one-command Codex/pi integration with MCP search and startup hooks.
- upstream explicitly recommends broad file discovery followed by narrow contextual searches for coding agents.

The key product fit is that tgrep reduces the amount of repository text that reaches Jev or a frontier model.

---

# Hard boundary

## tgrep owns

```text
exact repository search
regex / literal matching
file discovery
bounded surrounding context
freshness / index semantics
```

## Osąd owns

```text
decision programs
typed probabilistic evaluation
deterministic policy
stable result contracts
CLI / MCP
audit data
```

## Codex / Claude own

```text
query planning when search intent is not yet concrete
multi-step reasoning
code edits
human-facing explanation
```

## Future semantic/code graph tooling may own

```text
symbol relationships
call graph
type relationships
concept discovery
cross-file semantic navigation
```

Do not make tgrep pretend to be semantic search.

---

# Product model

There are three useful operating modes.

## 1. Unix composition — MVP

No Osąd integration code is needed.

```bash
tgrep -C 3 -- "OldPublicApi" . |
  osad decide .osad/api-migration.yaml
```

or:

```bash
{
  printf '%s\n' '--- git diff ---'
  git diff --cached

  printf '%s\n' '--- repo references ---'
  tgrep -C 3 -- "OldPublicApi" .
} |
  osad gate .osad/api-migration.yaml
```

This should work before we add any dedicated tgrep adapter.

## 2. Agent composition

Codex or Claude has both tools:

```text
tgrep.search
osad.decide
osad.gate
```

Typical flow:

```text
agent
  ↓
tgrep -l broad search
  ↓
tgrep -C 2 / -C 3 against likely files
  ↓
small evidence set
  ↓
osad.decide / osad.gate
```

The agent should not send the whole repository or giant search result sets into Osąd.

## 3. Evidence-aware workflow — later

Osąd workflow definitions may declare retrieval steps.

Example:

```yaml
evidence:
  public-api-usage:
    source: tgrep
    pattern: OldPublicApi
    mode: literal
    paths:
      - src
      - packages
    context: 3
```

Then:

```text
workflow
   ↓
tgrep actor
   ↓
EvidenceBundle
   ↓
Decision actor
   ↓
policy
   ↓
next state
```

This belongs in future `osad run`, not v0.1 core.

---

# Design principle: evidence is data

The most useful new Osąd concept is not `TgrepService`.

It is a small **portable evidence wire type**.

We want to preserve:

- where evidence came from
- which search produced it
- which file / line it came from
- whether the search was indexed or forced fresh if known
- bounded text content
- stderr warnings where relevant
- search exit status

But the core must not depend on tgrep-specific runtime types.

Conceptual type:

```ts
export interface EvidenceItem {
  readonly source: string
  readonly uri: string
  readonly line?: number
  readonly column?: number
  readonly text: string
}

export interface EvidenceQuery {
  readonly tool: string
  readonly query: string
  readonly scope?: ReadonlyArray<string>
}

export interface EvidenceBundle {
  readonly query: EvidenceQuery
  readonly items: ReadonlyArray<EvidenceItem>
  readonly diagnostics?: ReadonlyArray<string>
}
```

For tgrep:

```ts
{
  source: "tgrep",
  uri: "src/foo.ts",
  line: 42,
  column: 7,
  text: "OldPublicApi(...)"
}
```

Do not over-model tgrep internals in Osąd.

---

# Prefer tgrep JSON when available

For an adapter, prefer machine-readable output over parsing human text.

`tgrep` is compatible with `rg --json` output shape for normal UTF-8 text, which is useful for structured parsing.

Codex should inspect the current CLI before implementing the adapter and verify the exact JSON invocation supported by the installed tgrep version.

Do not assume flags from memory.

If JSON is not practical for a specific command, `--vimgrep` is a simple fallback:

```text
file:line:column:text
```

but JSON is preferred because paths and match context remain structured.

---

# Search strategy for agents

Encode this guidance in docs / examples, not in a complex planner.

## Broad discovery

Use filenames only:

```bash
tgrep -l -F -- "OldPublicApi" .
```

This bounds output.

## Narrow search

Then search specific directories / files:

```bash
tgrep -F -C 3 -- "OldPublicApi" src packages
```

## Regex only when needed

Literal symbols should use:

```bash
-F
```

Avoid regex escaping mistakes.

## Search current edited contents when correctness depends on freshness

Use:

```bash
--no-index
```

after the agent has made edits and needs to verify the result immediately.

Why:

- a server normally tracks file changes
- a watcher event can be delayed or missed
- an on-disk index without a live server may be stale
- `--no-index` is the explicit correctness path

Do not use `--no-index` for every search; it throws away the main performance benefit.

## Presence-only checks

Use:

```bash
-q
```

when the result is only yes/no.

Interpret:

```text
0 = present
1 = absent
2 = error
```

Do not turn code `1` into an exception.

---

# Primary integrated use case: code-change review

Create a first-class example:

```text
examples/code-review-with-evidence.yaml
```

The pipeline:

```text
git diff --cached
        │
        ├─────────────┐
        │             │
        ▼             ▼
 changed symbols    tgrep
        │         repo usages
        └──────┬──────┘
               ▼
         EvidenceBundle
               ↓
         Effect Decision
               ↓
             Jev
               ↓
          Osąd policy
```

Questions:

```text
breaking API?
data loss risk?
security concern?
migration incomplete?
tests likely missing?
overall risk?
```

Important:

Osąd is not asked to infer repository facts that tgrep can cheaply establish.

Bad:

```text
"Does this repository still reference OldPublicApi?"
```

when we can run:

```bash
tgrep -q -F -- "OldPublicApi" .
```

Good:

```text
"Given these remaining references and this diff, does removing OldPublicApi
appear to break supported callers?"
```

Use deterministic search for deterministic facts; use Jev for fuzzy judgment.

---

# Proposed agent loop

```text
1. understand task
      ↓
2. identify concrete symbols / terms
      ↓
3. tgrep broad search
      ↓
4. narrow evidence
      ↓
5. Osąd batch decision
      ↓
6. policy result
   ┌──────┼───────┐
 pass   review   block
   │       │        │
   │       │        └→ escalate / stop
   │       └─────────→ frontier reasoning / human
   └─────────────────→ continue / finish
```

This is the key efficiency play.

The expensive model should not be used to answer:

```text
"does symbol X exist?"
```

and it should not read 200 files when tgrep can return 8 relevant snippets.

---

# Osąd core changes

Minimal.

Do **not** add tgrep as a mandatory dependency.

Add only the concept needed to carry evidence across process boundaries.

Suggested module:

```text
src/domain/Evidence.ts
```

Potential schemas:

```ts
import { Schema } from "effect"

export const EvidenceItem = Schema.Struct({
  source: Schema.String,
  uri: Schema.String,
  line: Schema.optional(Schema.Number),
  column: Schema.optional(Schema.Number),
  text: Schema.String
})

export type EvidenceItem = typeof EvidenceItem.Type

export const EvidenceQuery = Schema.Struct({
  tool: Schema.String,
  query: Schema.String,
  scope: Schema.optional(Schema.Array(Schema.String))
})

export type EvidenceQuery = typeof EvidenceQuery.Type

export const EvidenceBundle = Schema.Struct({
  query: EvidenceQuery,
  items: Schema.Array(EvidenceItem),
  diagnostics: Schema.optional(Schema.Array(Schema.String))
})

export type EvidenceBundle = typeof EvidenceBundle.Type
```

This is a wire/domain shape, not a repository-search abstraction.

---

# Input model

Osąd currently treats MVP input as text.

Keep that working.

Add a later structured input path:

```ts
type DecisionInput =
  | {
      readonly _tag: "Text"
      readonly text: string
    }
  | {
      readonly _tag: "Evidence"
      readonly subject: string
      readonly evidence: ReadonlyArray<EvidenceBundle>
    }
```

Do not implement this until the simple pipe path is proven.

The first integration should simply serialize evidence text into Osąd stdin.

---

# tgrep adapter — optional phase

If dogfood proves value, add:

```text
src/evidence/tgrep/
  Tgrep.ts
  Parser.ts
  Command.ts
```

But do not expose it as a core service unless needed.

Possible Effect service:

```ts
class Tgrep extends Context.Service<Tgrep>()(
  "Osad/Tgrep",
  {
    effect: Effect.gen(function* () {
      const command = yield* ChildProcessSpawner

      const search = (
        request: TgrepSearch
      ): Effect.Effect<
        EvidenceBundle,
        TgrepError
      > => {
        // execute tgrep
        // parse structured output
        // retain stderr diagnostics
      }

      return { search } as const
    })
  }
) {}
```

This belongs in an adapter layer.

Core policy / decision modules must not require `Tgrep`.

---

# Do not shell unsafely

If Osąd invokes tgrep directly:

- do not build one interpolated shell string
- pass executable + args separately
- canonicalize requested paths beneath the configured repo root
- reject path traversal outside the repo
- allowlist supported search flags
- always insert `--` before the pattern
- keep the search root explicit

Upstream tgrep specifically recommends putting `--` before the pattern because words such as `index`, `serve`, `status`, and `help` can otherwise be parsed as subcommands.

Conceptual invocation:

```ts
[
  "tgrep",
  ...safeFlags,
  "--",
  request.pattern,
  request.path
]
```

---

# Freshness policy

This matters for coding agents.

Define three conceptual freshness modes if we build an adapter:

```ts
type SearchFreshness =
  | "fast"
  | "fresh"
  | "auto"
```

Semantics:

```text
fast
  normal indexed / server-backed tgrep search

fresh
  force --no-index

auto
  normal search unless the workflow has edited relevant files
  since the last evidence query
```

Do not implement `auto` until a stateful workflow can track edits.

For v0.1 adapter experimentation:

```text
fast  → default
fresh → --no-index
```

---

# Evidence budgets

A core concern is preventing retrieval from becoming the new context bomb.

Recommended defaults for any future adapter:

```text
max files:     20
max snippets:  50
context lines: 3
max bytes:     bounded
```

Do not silently truncate without metadata.

Return:

```ts
{
  truncated: true,
  reason: "max-snippets"
}
```

if we later add these fields.

The exact values can change after dogfood.

---

# Decision programs should reference evidence intent, not tool mechanics

Bad manifest:

```yaml
decisions:
  breaking:
    probability:
      instructions: >
        Run tgrep -F -C 3 ...
```

Good:

```yaml
decisions:
  breaking:
    probability:
      instructions: >
        Given the code change and supplied repository usage evidence,
        estimate whether this breaks a supported public API.
```

The decision stays portable.

Retrieval mechanics stay outside the decision definition.

---

# MCP composition

Do not duplicate tgrep's MCP tool inside Osąd.

The agent may have:

```text
tgrep.search
osad.decide
osad.gate
```

That is a feature.

Separate tools preserve clean ownership.

If we later build `osad.run`, a workflow can call the local tgrep executable internally, but that should not replace the direct tgrep MCP tool for ad-hoc exploration.

---

# Extremely Hardcore Skills fit

EHS can use this stack without taking a hard dependency on Osąd.

A skill can teach the agent:

```text
discover
  ↓
tgrep exact evidence
  ↓
Osąd decision / gate where ambiguity exists
  ↓
frontier critique only when needed
  ↓
evidence ledger
```

This is a strong fit for an evidence-driven methodology:

```text
deterministic fact
  → shell / tgrep / compiler / tests

ambiguous judgment
  → Osąd / Jev

complex reasoning
  → Codex / Claude

workflow lifecycle
  → XState + Effect later
```

The key rule:

> **Use the cheapest trustworthy mechanism that can answer the question.**

---

# Example: feature-flag removal

Goal:

```text
remove feature flag `old-checkout`
```

Agent flow:

```bash
tgrep -l -F -- "old-checkout" .
```

Then:

```bash
tgrep -F -C 3 -- "old-checkout" src packages test
```

After edits:

```bash
tgrep --no-index -q -F -- "old-checkout" .
```

If exit code:

```text
0 → references remain
1 → no references found
2 → search failed
```

Only if the remaining evidence is ambiguous do we invoke Osąd:

```bash
{
  git diff
  tgrep --no-index -C 3 -F -- "old-checkout" .
} |
  osad gate .osad/feature-flag-removal.yaml
```

Possible decisions:

```text
is the removal complete?
do remaining references represent dead docs/tests/generated code?
is behavior preserved?
does this need manual review?
```

This is better than sending the whole repository to an LLM.

---

# Example: API migration

Search:

```bash
tgrep -l -F -- "LegacyClient" .
```

Narrow:

```bash
tgrep -F -C 3 -- "LegacyClient" packages/app packages/api
```

Decision manifest:

```yaml
version: 1

decisions:
  migrationComplete:
    probability:
      instructions: >
        Given the current diff and the supplied repository evidence,
        is the migration away from LegacyClient complete?
      false: Important supported callers still depend on LegacyClient.
      true: Supported callers have been migrated.

  risk:
    rate:
      instructions: Rate the migration risk.
      criteria:
        - low
        - medium
        - high
        - critical

policy:
  default: pass

  rules:
    - id: incomplete-migration
      when:
        decision: migrationComplete
        field: probability
        lt: 0.90
      outcome: review

    - id: high-risk
      when:
        decision: risk
        field: label
        eq: high
      outcome: review

    - id: critical-risk
      when:
        decision: risk
        field: label
        eq: critical
      outcome: block
```

---

# Future: search → decide workflow

Only after core Osąd is stable.

Potential workflow:

```yaml
version: 1

workflow:
  initial: gather

  states:
    gather:
      evidence:
        tool: tgrep
        query:
          pattern: LegacyClient
          literal: true
          context: 3
      on:
        success: assess
        failure: failed

    assess:
      decide: api-migration
      on:
        pass: verify
        review: human
        block: blocked

    human:
      await: approval
      on:
        approve: verify
        retry: gather
        reject: blocked

    verify:
      evidence:
        tool: tgrep
        freshness: fresh
        query:
          pattern: LegacyClient
          literal: true
          quiet: true
      on:
        absent: done
        present: gather

    done:
      final: true

    blocked:
      final: true

    failed:
      final: true
```

Possible implementation later:

```text
XState
  lifecycle
   ↓
fromEffect(tgrep search)
   ↓
fromEffect(DecisionModel.decide)
   ↓
Osąd policy
```

Do not build this now.

---

# Observability

If an adapter is built, trace evidence retrieval separately:

```text
osad.evidence.search
  tool = tgrep
  mode = indexed | fresh
  result_count = N
  exit_code = 0 | 1 | 2
  truncated = true | false
```

Do not put match text into span attributes by default.

Do not log source contents.

Use file counts and byte counts where useful.

---

# Testing

## tgrep adapter tests

If implemented:

- use a temporary repo fixture
- initialize files
- build an index or run with `--no-index`
- literal search
- regex search
- file-only search
- no match returns a normal empty result
- exit code `2` becomes `TgrepError`
- stderr warning is preserved
- paths outside repo root are rejected
- `--` is always inserted before pattern
- edited-file fresh search uses current disk content

Do not make the full unit suite require a running tgrep server.

## Integration test

Fixture:

```text
repo/
  src/new.ts
  src/legacy.ts
```

1. search `LegacyClient`
2. convert result to evidence
3. feed evidence to fake `DecisionModel`
4. evaluate policy
5. assert final `review`
6. remove legacy reference
7. search with fresh mode
8. assert absence
9. assert final `pass`

No network.

---

# Benchmarks

Measure the pipeline, not just tgrep.

Suggested benchmark:

```text
large local repo
20 representative searches
```

Compare:

```text
rg full scan
tgrep cold local index
tgrep warm server
```

Then measure:

```text
raw search output bytes
after bounded evidence selection bytes
Jev input tokens
decision latency
end-to-end latency
```

The real win is not only grep latency.

It is:

> **less repository text reaching expensive models.**

---

# Installation / dogfood

Current tgrep upstream supports Homebrew:

```bash
brew install tgrep
```

Repo setup:

```bash
tgrep serve . &
tgrep status .
```

Do not commit:

```text
.tgrep/
```

Add to `.gitignore`.

Current upstream also ships an `install-agent.sh` flow for Codex/pi MCP search integration.

For Osąd dogfood, prefer both:

```text
direct tgrep CLI
Osąd compiled CLI
```

on `$PATH`.

This gives Codex a natural shell path even without MCP.

---

# Codex implementation task

## Phase A — composition only

Do this first.

Do **not** modify Osąd core yet.

1. install / verify `tgrep`
2. add `.tgrep/` to the fixture repo `.gitignore`
3. create:
   ```text
   examples/tgrep-code-review.sh
   ```
4. script must:
   - accept repo root
   - accept search pattern
   - run a broad `tgrep -l`
   - run a bounded `tgrep -C 3`
   - combine:
     - `git diff --cached`
     - relevant tgrep context
   - pipe the result into:
     ```text
     osad gate examples/code-review.yaml
     ```
5. handle tgrep exit code `1` as “no evidence found”, not failure
6. handle exit code `2` as failure
7. preserve diagnostics on stderr
8. demonstrate fresh verification with `--no-index`

Report:

- exact tgrep version
- exact commands used
- whether the server is active
- result size before/after narrowing
- Osąd input size
- end-to-end latency
- any UX pain

Do not build an adapter unless this composition proves useful.

## Phase B — evidence wire type

Only after Phase A.

Add:

```text
src/domain/Evidence.ts
```

with minimal schemas.

No tgrep dependency yet.

Add tests.

## Phase C — optional tgrep adapter

Only if direct composition is awkward enough to justify it.

Implement:

```text
src/evidence/tgrep/
```

Requirements:

- Effect process API
- no interpolated shell strings
- repo-root path guard
- safe flag allowlist
- structured output parsing
- preserve stderr
- exit code `1` = empty success
- exit code `2` = failure
- explicit fresh mode

## Phase D — agent docs

Add a short agent guide:

```text
docs/agents/tgrep-osad.md
```

Teach:

```text
-l first
-F for symbols
-C 2/3 for context
--no-index after edits when freshness is essential
-q for deterministic presence checks
Osąd only for ambiguous judgment
```

## Phase E — EHS experiment

Create one skill / recipe that demonstrates:

```text
search → evidence → judgment → policy
```

Do not make EHS depend on Osąd globally.

---

# Non-goals

Do not:

- fork tgrep
- reimplement tgrep indexing
- embed tgrep into the Osąd binary
- make tgrep a mandatory Osąd dependency
- treat tgrep as semantic search
- send every tgrep result to Jev
- ask Jev deterministic questions tgrep can answer exactly
- expose arbitrary shell execution through an Osąd manifest
- add XState for the simple search/decide pipeline
- duplicate tgrep MCP inside Osąd
- create a generic “retrieval framework” before dogfood proves the need

---

# Architecture checkpoint

The desired long-term stack is:

```text
                 ┌─────────────────┐
                 │ Codex / Claude  │
                 │ complex reason  │
                 └────────┬────────┘
                          │
                   only when needed
                          │
                 ┌────────▼────────┐
                 │      Osąd       │
                 │ policy/control  │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │ Effect Decision │
                 │ + Jev           │
                 │ fuzzy judgment  │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │     tgrep       │
                 │ exact evidence  │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │      repo       │
                 └─────────────────┘
```

And for deterministic checks:

```text
repo
 ↓
tgrep / compiler / tests
 ↓
known fact
```

Skip Jev entirely when uncertainty is zero.

---

# Final product statement

> **tgrep gives agents cheap evidence. Osąd gives them cheap judgment. Effect gives us typed execution. Jev supplies calibrated probabilistic decisions. Frontier models are reserved for the work that actually requires reasoning.**

The first goal is not more automation.

It is **less waste per agent step**.

Build the smallest composable path first.
