# ADR: local CI attestation delivery

## status

accepted

## context

The protocol can validate a run but does not provide a stable delivery surface for CI or pull-request review. GitHub Actions should own scheduling and presentation; the repository needs only deterministic local output derived from validated records.

## decision

Add `eh summary`, `eh attest`, and `eh ci` commands. `summary` renders a concise human-readable state and next action. `attest` writes a schema-version-1 JSON file containing the run identity, derived state, validation result, current workspace fingerprint, and digests of the run and transition records. `ci` runs validation, writes both artefacts, and exits 0 only when the run is valid and complete; all validation failures exit 1 and command/usage errors exit 2.

Add a reference GitHub workflow that installs Bun, runs `bun run eh ci`, and uploads the generated artefacts. The workflow is documentation/reference integration only; it does not publish packages, sign attestations, or grant trust to the agent.

## consequences

- CI and reviewers receive stable, machine-readable and human-readable outputs.
- Attestations are reproducible derived files but are not cryptographic signatures.
- The workflow assumes a repository chooses a run path and has Bun available.
- Delivery remains an adapter over protocol validation and cannot weaken gates.

## options considered

### Emit only prose from CI

Rejected because prose is not a machine-readable review contract.

### Build a GitHub API integration

Rejected because scheduling and pull-request presentation already belong to GitHub and would add credentials and service coupling.

### Local artefacts plus reference workflow

Accepted because it keeps the protocol portable and provides a concrete adoption path.

## review date

After the first repository consumes the reference workflow or before adding a hosted attestation service.
