---
status: "not-required"
date: 2026-09-02
decision-makers: "Codex under approved Run 5 scope"
consulted: "40k-builder ADR 0022 and committed compiler implementation"
informed: "Future maintainers and implementation agents"
---

# ADR assessment: Enhancement resource metadata guard

## decision

No new architecture decision record is required for Run 5. The change tightens an existing compiler acceptance branch inside the BSData anti-corruption layer mandated by accepted ADR 0022. It changes no module dependency, runtime, IR shape, API, persistence, deployment, or operational boundary.

## consequence

The source contract becomes stricter for one audited modifier family. Any future legitimate source key must be admitted through a separate source audit and decision, rather than through silent acceptance.
