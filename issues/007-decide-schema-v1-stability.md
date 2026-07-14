# issue: decide whether protocol schema version 1 is stable

## outcome

Obtain an explicit human decision to declare schema version 1 stable, revise it, or keep it experimental.

## context

The completion gate now has durable run, evidence, and transition records. Declaring the schema stable would create a compatibility expectation for agents and users, but no migration policy, compatibility window, or release authority has been defined.

## required decision

- Declare schema version 1 stable with a documented compatibility policy.
- Keep version 1 experimental and define the next dogfood threshold.
- Revise the schema before any stability declaration.

## blocker

Human product and architecture authority is required. This issue must not be completed by an agent inference.
