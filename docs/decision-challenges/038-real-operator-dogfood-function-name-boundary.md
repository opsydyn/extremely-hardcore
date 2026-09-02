# decision challenge: confine generated Azure function names to one path segment

## trigger

This changes a public option and a filesystem safety boundary in an external repository. The challenge is required before implementation planning.

## proposal and claims

Add a pre-write validation guard to `generateAzureSwaFiles` and a regression test. The proposal claims that unsafe path-shaped `functionName` values should fail before generated output is created, while existing valid names retain their output and route behavior.

## existing-platform ownership

Node path handling owns normalization, not application-level containment policy. Astro owns the build hook and Azure Functions owns deployment/runtime interpretation. The adapter owns its public option validation and the generated `dist/api/<functionName>` artifact layout.

## durable differentiated value

The target keeps a reviewable, local safety invariant at the adapter boundary. EHS contributes the evidence-led change contract and regression receipt, not a new filesystem runtime or Azure policy engine.

## strongest counterargument

The package may have consumers that use nested or punctuation-heavy function names, and a new restriction could be an unnecessary breaking behavior change. The current repository does not contain a complete Azure naming audit that would justify a broader whitelist or prove all accepted names.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| The option reaches generated filesystem paths. | `generateAzureSwaFiles` calls `join(apiPath, functionName)`. | No prior unsafe-input regression. | Red test demonstrating current acceptance. |
| Unsafe path-shaped values should be rejected before writes. | Existing output layout and public option docs. | No containment guard. | Passing regression covering separators, dot segments, empty, and NUL values. |
| Valid output remains unchanged. | Existing generator test suite. | No post-change run yet. | Existing tests plus root check/build. |
| A complete platform naming grammar is known. | None in the repository. | Azure naming corpus and deployment proof are absent. | Do not make this claim in this slice. |

## minimum credible slice

One pre-write guard, one table-driven source test, and one documentation clarification. Preserve the existing valid-name output path and avoid a broader character policy.

## stop conditions

Stop if validation occurs after a write, the guard changes valid generated output, a nested name is required by an existing committed contract, or the implementation needs deployment/runtime changes.

## verdict

proceed

## rationale

The current path construction creates a concrete local safety gap. The minimum slice is reversible, directly testable, and avoids unsupported claims about the complete Azure naming grammar.
