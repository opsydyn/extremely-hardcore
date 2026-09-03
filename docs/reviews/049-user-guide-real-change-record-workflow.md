# bounded-context review: user-guide real-change record workflow

## proposed change

Add a concise link and boundary explanation for the future dogfood record
template in `docs/user-guide.md`.

## affected contexts

- New-user EHS documentation.
- Human-readable dogfood records.
- Optional local `eh` protocol guidance.

## allowed dependencies

- The existing relative link to `docs/dogfood/template.md`.
- Existing standalone receipt and protocol wording.

## suspicious dependencies

- A new CLI command or JSON schema.
- Making the template mandatory for trivial edits.
- Requiring the optional `eh` protocol for standalone EHS use.
- Rewriting older dogfood records.

## data ownership

The template owns record guidance. The user guide owns first-use discovery. The
protocol owns executable run artifacts. No data or transaction boundary changes.

## integration events

None.

## anti-corruption needs

Keep human-readable record guidance separate from executable protocol state and
avoid presenting documentation fields as a runtime contract.

## verdict

safe

## follow-up

Use the template on later real changes and review whether the field count causes
omission or unnecessary ceremony.
