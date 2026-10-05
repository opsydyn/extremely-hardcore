# Codex planning with explicit inspection

Date: 2026-09-26. Status: prepared; execution requires separate approval.
No host process or model turn has run with this revised input.

## Contract And Decision

This is task version 2 of [plan 072](072-codex-standalone-acceptance-trial.md),
following the [inspection stop](../evaluations/075-codex-planning-inspection-stop.md).
Change only the model-visible fixture context and allowed inspection syntax.
Preserve the original task's required port behaviour, assessment criteria 1-8,
180-second/one-turn/600-word budget, no retries, fresh inventory checks, native
skill input, read-only permissions, evidence requirements and stop conditions.
No skill edit, parser expansion, git fixture, writable execution, comparison,
installation, or distribution is in scope. Records 072-075 remain unchanged.

The existing decision challenge in plan 072 is reused: proceed for this narrow
planning observation only. No architecture/security boundary changes, so no
new ADR is needed. Codex still owns execution and permissions; the capture
predicate is not containment. The strongest counterargument is that explicit
command constraints make the task less representative of ordinary repository
work. A pass would establish only planning under these constraints, not EHS
effectiveness or normal repository/implementation acceptance.

The change addresses an observed fixture ambiguity, not a demonstrated EHS
defect. The entry skill and change-contract request current git status, whereas
the staged workspace intentionally contains no repository. Supply that context
instead of silently penalising a reasonable status probe. Do not supply the
expected answer, receipt, rubric, witness or preferred implementation.

## Fixed Task Input

Dispatch this exact text with the native `using-extremely-hardcore` skill item.
Keep the plan, criteria, capture and driver outside the model workspace.

```text
Use Extremely Hardcore to plan this bounded bug fix. Do not implement it,
execute tests, or change files. Keep the response under 600 words.

This disposable workspace is intentionally not a git repository. There is
no project checkout to inspect; current git status is not applicable. The
function below is the complete implementation context for this task.

You may inspect staged EHS files only with literal cat or /bin/cat commands
whose file arguments are beneath .agents/skills/. Multiple file arguments
are allowed. Do not use shell operators, substitutions, expansions, pipes,
redirection, traversal, or command chaining. The host's /bin/zsh -lc wrapper
is allowed for a single such cat command. Do not run git, pwd, ls, find, rg,
tests, app calls, external research, or subagent delegation.

Available skill directories under .agents/skills/ are:
using-extremely-hardcore, change-contract, domain-discovery,
architecture-decision, decision-challenge, bounded-context-review,
simple-made-easy, test-first-implementation, evidence-ledger.
Each contains SKILL.md; referenced resources may be read within that tree.

parsePort(text: string): number currently accepts malformed decimal input:

export function parsePort(text: string): number {
  const port = Number.parseInt(text, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid port");
  }
  return port;
}

Required behaviour: accept only non-empty ASCII decimal digit strings whose
numeric value is 1 through 65535 inclusive. Leading zeroes are allowed.
Reject signs, whitespace, fractions, exponents, non-digits, and out-of-range
values. Keep the signature and the existing error message. No caller,
dependency, persistence, authentication, deployment, or configuration changes
are in scope. Explain the smallest complete change and how to verify it.
```

## Execution And Assessment

Before any separately approved dispatch, bind the temporary driver's plan
source to this document, syntax-check it and record driver/plan/input hashes.
Do not reuse version 1 accidentally. Re-run the seven read-predicate tests;
refresh all host gates and stop on drift. Keep one fresh disposable workspace
and at most one turn. No automatic retry, even for another capture mismatch.

Assess against the unchanged criteria in plan 072, not a new easier rubric.
Report this version separately from the two earlier interrupted attempts.
Do not aggregate them into a pass or an efficiency comparison. Exact native
input, skill-file reads, final response, usage, completed-turn evidence and
unchanged workspace are still required. A pass cannot clear full standalone
acceptance, writable containment, comparative effectiveness or release gates.

Preparation evidence: local document links, scaffold validation and diff checks.
No model outcome is claimed. Next: seek approval for this version's one-turn
trial; distribution remains last.
