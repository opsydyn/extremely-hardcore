# Change contract: self-evolving skills roadmap and README art

## user intent

Commit the completed retention-policy slice, then add self-evolving skills as
an evidence-bounded roadmap opportunity and use the supplied artwork as the
repository README graphic.

## current understanding

- The retention-policy slice is complete and ready to preserve as commit
  `645b092`.
- `ROADMAP.md` already contains a backlogged `Governed Skill Evolution
  Sandbox (SkillOpt-Informed)` initiative with strong guardrails.
- The roadmap correctly says that no optimiser integration or autonomous skill
  adoption is approved and that a moat claim needs behavioural evidence.
- `README.md` has no repository graphic yet.
- The user supplied a 1254x1254 JPEG that can be copied without transformation.

## allowed scope

- Extend the existing governed skill-evolution roadmap section with a moat
  hypothesis, staged path, and explicit evidence threshold.
- Add the supplied image under `assets/` and link it from `README.md` with
  meaningful alternative text and a stable display width.
- Create documentation-only Run 054 records and capture local protocol
  evidence.
- Run repository, asset-integrity, and content-hygiene checks.
- Commit the new slice after verification.

## forbidden scope

- Do not implement an optimiser, candidate-skill sandbox, autonomous adoption,
  runtime self-modification, provider execution, network access, or writable
  agent boundary.
- Do not claim that self-evolving skills are already a moat or that EHS has
  comparative superiority without independent held-out evidence.
- Do not edit, regenerate, or fetch an alternative image; use the supplied
  asset as-is.
- Do not add new dependencies, schemas, CLI commands, ADRs, or CI behaviour.
- Do not change the existing skill instructions or release gates.

## affected areas

- `ROADMAP.md` governed skill-evolution strategy and sequencing.
- `README.md` repository presentation and relative asset reference.
- `assets/extremely-hardcore-skills.jpg` supplied repository artwork.
- Documentation-only Run 054 records under `docs/` and `issues/`.

## minimum complete change

Make the existing roadmap initiative clearly explain why bounded, evaluated,
human-promoted skill evolution could become a differentiator, while naming the
evidence required before calling it a moat. Add the supplied image once, link
it from the README with accessible text, and prove the link, file integrity,
repository checks, and protocol record. Do not build the capability itself.

## architecture-decision check

No ADR is required for this slice. The change updates product documentation and
adds a static repository asset; it does not change runtime architecture,
persistence, public machine contracts, CI, or integrations. Any future
self-evolution implementation requires a new contract, ADR check, decision
challenge, and independent evaluation design.

## public contracts

The README and roadmap are public documentation. They gain a bounded
self-evolution hypothesis and a relative image reference. No skill, CLI,
plugin, provider, protocol, or machine-readable contract changes.

## assumptions

- The supplied JPEG is authorised for this repository's README.
- A relative `assets/extremely-hardcore-skills.jpg` path is supported by the
  repository and common Git hosting viewers.
- Self-evolving skills remain a future, human-governed capability rather than a
  current product promise.

## risks

- Readers may interpret the visual brand asset or "moat" language as a claim
  of product maturity; the text must keep the evidence boundary explicit.
- A roadmap can create accidental implementation pressure if its stages are
  not gated by held-out evaluation and human promotion.
- A large binary asset adds repository weight; the supplied image is kept
  unchanged because the request is to use it as the README graphic.

## acceptance evidence

- The roadmap names self-evolving skills as a hypothesis, not an established
  moat, and preserves the no-autonomous-adoption guardrails.
- The roadmap defines a staged path from evaluator credibility to bounded
  candidate changes, held-out evaluation, and human promotion.
- The README references the supplied asset with meaningful alternative text
  and a bounded display width.
- The asset is a readable JPEG with the expected dimensions and a recorded
  digest.
- Run 054 has fresh passing evidence, zero blockers, and valid local
  attestation and CI projection.
- Repository validation, tests, typecheck, whitespace, and content-hygiene
  checks pass.

## stop conditions

Stop if the slice expands into optimiser integration, candidate generation,
autonomous adoption, runtime changes, provider execution, external fetching,
or a comparative moat claim. Stop if the supplied asset cannot be copied or
verified without modifying it.
