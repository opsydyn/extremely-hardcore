# Dogfood Run 2: missing evidence record validation

## change

Bug fix: a criterion that referenced a missing `evidence/<id>.json` record caused `eh validate` to expose a raw `ENOENT` exception. The validator now returns `evidence.missing` and guarded completion remains non-mutating.

Risk: standard. The change modifies the experimental CLI's validation output for one persisted invalid state, without changing schema, capture, lifecycle, CI, authentication, or external services.

## observed failure

The first CLI regression test created a run whose `criterion-a` referenced `missing-evidence` without a corresponding JSON file. Before the fix, `eh validate` exited 1 with:

```text
error: ENOENT: no such file or directory, open '.../evidence/missing-evidence.json'
```

After the fix it reports:

```text
evidence.missing: missing-evidence evidence record is missing
```

The transition regression also proves that this invalid state appends no history and rewrites no run data.

## gate record

Run directory: `.extremely-hardcore/runs/004-missing-evidence-records/`.

The completion gate captures the targeted regressions, structural validation, full focused suite, and TypeScript check. All evidence must share one workspace fingerprint before completion.

## observed behaviour

- The invalid persisted state is classified by the protocol rather than leaked from the filesystem adapter.
- No false block occurred after the missing record was converted into a validation error.
- Setup overhead was not separately timed and remains a campaign metric for future runs.
- A fresh agent can see the exact missing evidence ID and decide to recapture or repair it without interpreting an OS path.
- No manual protocol edits or workarounds were used after run creation.

## finding

Run 2 supports the product claim that completion failures should be explainable from durable state. Broader malformed-record handling remains deliberately unimplemented until it is observed in dogfood.
