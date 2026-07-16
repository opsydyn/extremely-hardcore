# issue: run a controlled Codex comparison

## outcome

Produce one inspected, artifact-backed Codex run without repository agent instructions and one with the `extremely-hardcore` instructions and skills present, both from commit `e4c0c3c` and using the same adapter.

## acceptance criteria

- The baseline workspace is a local clone at the target commit with only `AGENTS.md` and `skills/` removed.
- The skill-assisted workspace is the clean target checkout at the same commit.
- Both runs produce 13 attempts, assessments, and complete provenance in separate caller-owned temporary directories.
- A comparison record reports results without presenting the mode declaration as verified provenance or one run as a benchmark.
- Raw artifacts remain outside the repository and are reviewed before any summary is committed.

## non-goals

- Published benchmarking, regression thresholds, CI gating, a second provider, or an assertion that Codex loaded or followed any particular skill.
