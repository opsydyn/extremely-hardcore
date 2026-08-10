# bounded-context review: live Codex action-fixture pilot

## proposed change

Perform one external execution through the existing Codex action-fixture adapter without changing source code or interfaces.

## affected contexts

- Operator control
- Codex external process
- Adapter output directory
- Copied fixture workspace and runner-owned ledger

## allowed dependencies

`operator -> experimental CLI`; `adapter -> local Codex CLI`; `adapter -> caller-selected output directory`; `fixture runner -> copied workspace and protocol artefacts`.

## suspicious dependencies

Host repository modification, direct provider-event parsing by the runner, output-directory sharing, retries, and any implied control of Codex network or sandbox state.

## data ownership

The output bundle belongs to the local operator. Codex owns its emitted bytes. The fixture owns its ledger. The runner owns the fixture result. The adapter owns only report-level artefact integrity status.

## transaction boundaries

One process sequence consists of a `fix` request and, only if the runner reaches it, a `resume` request. The pilot ends immediately after the adapter returns or errors.

## integration events

No event transport is added. Raw provider output remains retained local data.

## anti-corruption needs

Prevent raw provider output from being treated as fixture evidence or from leaking into the repository checkout. Keep the result wording limited to the actual report.

## verdict

safe with noted risk. The execution uses existing boundaries and a temporary output directory, but provider behaviour and the excluded security/provenance properties remain external and unverified.
