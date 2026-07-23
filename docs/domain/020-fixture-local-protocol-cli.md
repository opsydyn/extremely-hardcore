# domain map: fixture-local protocol CLI

## domain terms

| Term | Meaning | Owner |
| --- | --- | --- |
| Fixture protocol command | A fixed local command that captures evidence or requests completion for this fixture. | Fixture |
| Invocation ledger | Append-only record linking a local command to its stage, fingerprint, and protocol artifact. | Fixture protocol script |
| Structural provenance | Verifiable artifact linkage without an assertion about which external process invoked the command. | Fixture runner |
| Provider-side provenance | Raw process artifacts retained by a future adapter. | Future provider adapter |

## candidate bounded contexts

- Fixture assets own task instructions and the fixed local command surface.
- Fixture runner owns stage order, immutability, ledger validation, and scoring.
- Generic protocol owns V1 artifact semantics and final validation authority.
- A future provider adapter owns external process execution and provider-side artifacts.

## aggregates/entities/value objects

- `FixtureProtocolInvocation`: one command, stage, fingerprint, and linked evidence or transition ID.
- `ActionFixtureRequest`: runner-provided stage context; unchanged provider-neutral handoff.
- `ActionFixtureResult`: runner-owned score and retained-artifact digests.

## commands

- Capture fixture evidence for `fix` or `resume`.
- Complete the fixture run during `resume`.

## events

- Fixture evidence captured.
- Fixture completion accepted.
- Invocation ledger appended.

## policies/rules

- The command surface uses fixed path, criterion, and test argv; it is not a generic protocol CLI.
- Stage A records one `fix` evidence invocation and no completion invocation.
- Stage B adds one `resume` evidence invocation and one `resume` completion invocation linked to final artifacts.
- Missing, malformed, reordered, or unlinked ledger records invalidate the fixture result.

## invariants

- The local script and `FIXTURE.md` are immutable fixture assets.
- Generic protocol artifact validation remains authoritative.
- The ledger is structural provenance only and does not prove external agent identity.

## external systems

Local Bun executes the fixed command script and test. Local Git supplies the workspace fingerprint. No provider is invoked.

## integration points

The reference executor invokes the fixture command script. A later live adapter may correlate provider-side process artifacts to the retained ledger without changing fixture scoring semantics.

## ambiguity

The future provider's raw command-artifact format is unknown and deliberately excluded.

## recommended next questions

Which provider execution artifact can reliably show fixture command invocations without making transcript parsing the scorer?
