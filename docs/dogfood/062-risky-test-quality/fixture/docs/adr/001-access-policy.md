# ADR 001: tenant-local document access

Status: accepted for this synthetic fixture.

## Context

The pure check receives an actor and document with string identifiers. No global
administrator privilege is part of this domain. The initial implementation is
inconsistent with the accepted policy, not a new policy decision.

## Decision

Grant access only to exact `reader` or `admin` roles when both tenant identifiers
are non-empty after checking for whitespace and are exactly equal. Do not
normalise valid identifiers. Unknown or empty roles and invalid identifiers
fail closed. Preserve the existing exported function and types.

## Consequences and alternatives

Global admin access would violate tenant isolation and is rejected. Treating all
non-empty roles as authorised would silently widen privilege and is rejected.
No persistence, external identity integration or delivery change is required.
Rollback of a mistaken patch is local; this fixture grants no real access.
