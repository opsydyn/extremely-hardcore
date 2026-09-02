# adr: confine generated Azure function names to one path segment

## status

accepted

## context

The `astro-azure-integration` adapter accepts a public `functionName` option and uses it to create the generated Azure Functions directory below `dist/api`. The existing code passes the option directly to path construction. A separator or dot segment can therefore change the directory resolved by the filesystem, while an empty value produces an invalid layout. This is a public input and filesystem-boundary issue, not an Azure runtime feature.

## decision

Validate `functionName` at the start of `generateAzureSwaFiles`. Accept non-empty values that are one path segment and reject both slash forms, NUL, and the complete values `.` and `..`. Keep the existing name in all generated route, package, and entrypoint references after validation.

## consequences

- Generated files cannot be directed through the function-name option to a sibling or parent path.
- Invalid input fails before `mkdir` or file writes with an actionable error.
- Consumers using nested or dot-segment names receive a clear failure and must choose a single segment.
- The adapter does not claim to validate every platform-specific function naming rule.

## options considered

- Keep passing the option to `path.join`: rejected because normalization is not input validation.
- Resolve the output path and compare it with `dist/api`: rejected because it still permits an unnecessarily broad function-name contract and is harder to explain across platforms.
- Use a new platform-specific character whitelist: rejected because the repository has no verified Azure naming corpus for that contract.
- Reject only path-boundary hazards before writing: selected.

## trade-offs

The selected rule is small and cross-platform, but it deliberately leaves non-boundary naming policy to Azure. It may reject a consumer's previously tolerated nested name, which is preferable to allowing a public option to redirect generated writes.

## follow-up work

Run a separate source and deployment audit if the package needs to promise a complete Azure function-name grammar. Do not expand this local guard based on an unverified assumption.

## review date

2026-09-02
