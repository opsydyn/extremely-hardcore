# decision challenge: Simple Made Easy lens

## trigger

This proposal adds a public installable skill and makes a product-positioning
claim about simplicity. It also introduces guidance that can influence code
structure, so the challenge must distinguish structural simplicity from
shortest-diff optimization and preserve EHS's existing ownership boundaries.

## proposal and claims

Add one optional `simple-made-easy` Markdown skill that:

- distinguishes structural simplicity from convenience and familiarity;
- walks a YAGNI, reuse, standard-library, native-platform, installed-dependency,
  then new-structure ladder;
- asks only decision-bearing Socratic questions;
- records a compact inline simplicity check in existing EHS documents;
- preserves completeness, security, validation, accessibility, testing, and
  evidence;
- leaves package identity, runtime, protocol, orchestration, and evaluation
  unchanged.

The claim is limited to improving design clarity and making accidental
complexity visible. It makes no claim about fewer lines, tokens, cost, speed,
provider performance, or skill effect.

## existing-platform ownership

The coding-agent host owns skill loading and user interaction. The repository's
existing EHS skills own scope, domain language, architecture decisions,
adversarial challenge, boundary review, testing, and evidence. The optional
protocol owns durable run state and verification gates. A new skill must not
take ownership from any of those surfaces.

## durable differentiated value

The durable value is a structural simplicity lens composed with EHS's evidence
and risk discipline: make the least entangled complete change easy to choose,
then make its completion hard to overstate. Ponytail's ladder and grilling
patterns are inputs; the differentiated contract is the preserved evidence and
boundary discipline.

## strongest counterargument

EHS already says “smallest coherent change,” so this may add another slogan and
another skill without changing agent behavior. Worse, an agent might read
“simple” as permission to delete safeguards or select the shortest diff. The
slice is justified only if the skill defines structural entanglement, keeps the
output inline and small, has narrow triggers, and is tested and dogfooded.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| EHS lacks a reusable simplicity lens | Existing skills cover scope, domain, architecture, challenge, testing, and evidence but do not provide a YAGNI/reuse ladder or complecting check | No user-facing adoption evidence | Add the skill and one real multi-option dogfood record |
| Structural simplicity is distinct from shortest code | The manifesto already prefers the smallest coherent change and protects obligations | Agents may still infer line-count optimization | Define structural criteria and explicit anti-failure wording |
| The skill can remain standalone | Existing roadmap keeps orchestration and protocol optional | A new skill could grow into a tracker or report system | No new runtime, schema, tracker, or required artifact; review the boundaries |
| Socratic questions improve alignment without ceremony | Existing decision-challenge and domain-discovery records use targeted questions and durable docs | Unbounded grilling remains a risk | Ask only questions that could change the selected path and stop when resolved |

## minimum credible slice

Add one Markdown skill, route it from the existing entry skill, validate its
presence, document its inline output, and apply it to the current multi-option
implementation decision. Do not add a separate template, command, score, or
provider integration.

## stop conditions

- The new skill becomes a second change-contract or architecture workflow.
- “Simple” is defined as fewer lines, files, tokens, or minutes.
- The skill can justify removing a required safeguard.
- The implementation needs a tracker, daemon, protocol state, or package rename.
- Dogfood cannot distinguish the new lens from existing EHS guidance.

## verdict

proceed

## rationale

The proposal is a narrow public skill addition with an explicit ownership
boundary and a falsifiable dogfood requirement. It captures useful external
ideas without importing their orchestration, benchmark, or shortest-code
assumptions. The approved design is small enough to reverse if the dogfood
shows duplication or ceremony.
