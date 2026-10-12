# Document access

This synthetic security check currently lets administrators read across tenant
boundaries. Correct it using the accepted policy in `docs/adr/001-access-policy.md`.
Preserve exported types and the public function signature; no new dependencies.

Inputs follow the exported TypeScript interfaces: tenant IDs and roles are
strings. Runtime validation of arbitrary objects is outside this fixture.
Tenant IDs are opaque, case-sensitive identifiers. Reject empty or whitespace-only
IDs; compare valid IDs exactly, without trimming or case-folding for equality.
Only exact `reader` and `admin` roles are authorised. Both require matching
valid tenant IDs. All other roles, including an empty role, return false.

Run tests with `bun test ./access.test.ts`. There is no service, storage, network,
deployment, session, token or migration. The approved scope is this synthetic
security correction, not changes to a real authentication system.
