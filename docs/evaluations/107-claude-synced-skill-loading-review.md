# Claude Synced-Skill Loading Review

Date: 2026-10-13. Approved no-model follow-up to
[stop 106](106-claude-auth-restored-synced-skill-stop.md).

- result: complete
- claim: Static review supports excluding cached account skills with the unchanged proposed native profile. Cache absence is an unnecessarily strong preparation requirement; this review does not dispatch or qualify the implementation observation.
- evidence: Official loading guidance and pinned CLI 2.1.289 source agree on the user-setting-source gate. The existing profile omits user sources; native sync returns before cache resolution. Six related environment flags are absent, settings hash is unchanged, and all 39 retained 106 artefacts still match their pins.
- remaining uncertainty: No fresh runtime inventory, instruction-byte attestation, managed-policy refresh or model behaviour was observed. The private prepare helper remains stopped, with no ready gate or dispatch marker.
- next: needs follow-up; correct only the private preparation assertion, test its positive/negative cases, then refresh the existing observation's launch checks. Preserve its payload, tools, budget, startup predicate and zero-retry scope.

## Trigger

Instruction-source provenance before the explicitly authorised external edit
observation in [review 104](104-claude-implementation-boundary-review.md).
The present approval covers loading-control review, not model execution or
changes to auth, cache, permissions, adapters or EHS instructions.

## Proposal And Claims

Retain `--restricted --setting-sources ""`, the explicit staged plugin and
Read/Skill/Edit-only profile. Replace the private helper's assumption that
`~/.claude/skills` must be absent with a check tied to the pinned native profile's
source exclusion. Do not accept extra runtime skills merely because they exist
on disk. This is a proposed preparation correction, not implemented here.

The reviewed native behaviour excludes the account cache through this route;
it does not prove all host context absent or establish OS-level isolation.
No new ADR is required for this static review and documentation: ADR 0021's
read-only adapter, the installed skills and the approved trial profile are
unchanged. A new execution boundary would need a separate decision.

## Existing-Platform Ownership

Claude owns account sync, source selection, authentication and its system
context. Its [official skills guidance](https://code.claude.com/docs/en/skills#where-synced-skills-load)
excludes syncing when the setting-source list omits `user`. The
[CLI reference](https://code.claude.com/docs/en/cli-reference)
documents source selection and session-local explicit plugin loading.

The installed binary's static path supplies the cache distinction:

- The empty-source parser returns an empty list. Effective sources still include
  flag and managed settings, not user settings.
- Account-sync eligibility requires user settings. Both normal eligibility and
  the sync round enforce that check.
- The sync round returns before resolving the account bucket, reuse/reload or
  cached definitions when the gate is closed.
- Personal skill-as-plugin discovery also checks whether user settings are
  enabled before adding the user directory.

These are interpretations of pinned embedded source, not executed loader
probes. Minified identifiers were resolved through their module imports, not
assumed globally unique. No cached skill bodies or manifest contents were read.

## Durable Differentiated Value

Keep EHS a standalone engineering method. Its value here is a small, honest
evidence boundary and useful engineering observation, not another sync manager,
permission shim or agent runtime. Ordinary installation still does not require
users to remove their other skills.

## Strongest Counterargument

Static source and current documentation do not attest the complete runtime.
More private controller work can delay testing the method without improving
that attestation. Make the smallest assertion correction, keep the existing
runtime rejection rules and do not build a new loader or inventory service.

## Claim-To-Evidence Map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The candidate omits user sources | Retained profile has `--setting-sources ""`; parser/source-membership review | Launch-time drift | Refresh exact arguments and binary pin |
| Cached sync does not bypass that gate | Native eligibility and pre-cache return; official source-selection guidance | Not exercised in a model session | Preserve exact startup catalogue rejection; do not call it byte attestation |
| No user state needs repair | No auth/cache/settings writes; settings hash unchanged | Auth and managed policy are not freshly checked here | Refresh existing launch gates, not another login by default |
| The observation is still unspent | No model invocation; stopped helper has no ready/dispatch files; all 106 pins match | No implementation or final verification | One existing scoped observation only after preparation passes |

## Minimum Credible Slice

In a fresh private preparation, allow the existing cache only when the reviewed
binary/profile excludes user sources. Test acceptance for that exact profile
and rejection when user sources are enabled, the profile is missing/changed or
the binary pin drifts. Keep the original 106 record and failed helper immutable.
Keep rejecting extra native catalogue entries; do not widen the startup guard.
Refresh auth/configuration/input pins and expected original-red verification
before the already consented observation. No model runs in the present slice.

## Stop Conditions

Stop on binary/profile drift, enabled user sources, new unreviewed effective
configuration, unexpected native catalogue/tools, failed auth or a different
fixture failure. Do not relax guards, resume/retry a dispatched task, broaden
the payload, enable shell tools or delete personal state to obtain a pass.

## Verdict

**proceed**

## Rationale

Proceed with the narrow no-model preparation correction, not an automatic
launch or release claim. The stronger cache-absence assumption caused 106's
stop; cache presence itself is not exposure. Existing scoped consent remains
unspent, but fresh preparation is still required.

Do not use `CLAUDE_CODE_SYNC_SKILLS=0` as an off switch: the
[environment reference](https://code.claude.com/docs/en/env-vars)
describes a wait/download opt-in, and the installed path tests string presence.
Disabling bundled skills targets another source. Safe/bare modes would change
EHS loading or authentication. Persistently turning account sync off can move
cached files to trash; it is unnecessary and outside this review's scope.

## Retention And Verification

Private root: `/private/tmp/ehs-claude-107.73X02Z`. A read-only extraction helper
and JSON record retain six short native excerpts with byte offsets and hashes,
CLI SHA-256, profile pin, environment presence and unchanged settings/106 pins.
The directory is mode 0700; files are 0600. No Claude process was launched.

- CLI: `03d66745e3bb69ec727d66023696f3820bc0a00a8a5ba725eb6706d0c67cbe69`.
- Review: `22cd769d78d4e2c46fa7df453fd221994246e656edf17f91570881d8c688197c`.
- Manifest: `448617b1456f949be768264dbac00afb906e015cdbb57bf66a5c9a904eae293e`.

Temporary retention may expire. Repository scaffold and local document-link
checks pass; full product tests were not rerun for this review-only diff.
No product code, skill, adapter, auth, cache, commit or publication changes.
