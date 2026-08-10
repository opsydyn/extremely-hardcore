# decision challenge: AgentOS no-model containment probe

## trigger

The proposal would introduce an external execution dependency and alter the intended sandbox and isolation boundary after an observed containment failure.

## proposal and claims

The proposed direct AgentOS probe would create a no-mount VM with denied guest network, no model session, and no credentials. It would make claims only about recorded guest attempts. It is not implemented because the supported dependency path fails the minimum-slice boundary.

## existing-platform ownership

AgentOS owns VM isolation and policy enforcement. Bun owns host execution. The fixture runner owns scoring, and the Codex adapter owns retained provider artefacts. This repository owns the dependency boundary and the decision not to turn vendor documentation into evidence.

## durable differentiated value

Extremely Hardcore tests and limits claims around execution environments rather than treating a VM API as proof of provider isolation.

## strongest counterargument

A broad SDK may still be acceptable for an application that needs its bundled agents and orchestration. This repository needs only one contained execution probe, so importing that graph would defeat the declared no-model scope.

## claim-to-evidence map

| Claim | Current evidence | Gap | Required evidence |
| --- | --- | --- | --- |
| A direct VM path is usable from this Bun plugin. | `@rivet-dev/agentos` 0.2.15 is published; local Node is v24.15.0. | Bun resolution includes bundled agent software, sidecars, React/RivetKit, native modules, and cloud integrations. | A supported minimal SDK or standalone containment binary with a documented contract. |
| The internal core package is a narrower supported entrypoint. | It exports implementation APIs. | Its metadata says it is published only as an unsupported transitive dependency and it retains agent dependencies. | A supported public contract with a reduced graph. |
| The proposed VM would contain the host path and deny guest networking. | Vendor documentation describes those properties. | No VM ran locally. | A future no-model VM probe after a viable dependency decision. |

## minimum credible slice

The completed slice is the dependency-boundary assessment. Do not implement a local command until a supported AgentOS entrypoint can be added without bundled agent software.

## stop conditions

- The supported SDK bundles agent software or the lower-level package is unsupported: hold. This occurred.
- Do not use a bespoke sidecar protocol, add Node as a workaround, or introduce an external sandbox without a new decision challenge.

## verdict

hold

## rationale

The intended probe was narrow, but its available public dependency is not. Adding a large agent runtime would weaken the no-model boundary before any containment result exists, and the unsupported core package is not an acceptable escape hatch.
