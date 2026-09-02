# Make minimum complete change explicit in change contracts

## problem

The `change-contract` skill asks agents to define scope and forbidden work, but it does not explicitly ask them to identify the smallest complete implementation. Agents can therefore either expand scope unnecessarily or interpret minimality as a licence to remove necessary safeguards.

## impact

Scope decisions are harder to review consistently. The EHS guidance lacks a short answer to the practical question: what is the least powerful solution that satisfies the contract without weakening correctness or architectural fit?

## expected behaviour

For non-trivial work, a change contract states:

- the minimum complete change;
- the validation, security, error-handling, accessibility, and architectural obligations that remain mandatory;
- why the chosen scope is complete rather than merely short.

Trivial edits remain exempt from the full loop.

## scope

Update the `change-contract` skill and template only. Dogfood the change through the existing Run 4 protocol and record operator friction. Do not add runtime, schema, command, hook, or scoring behaviour.

## verification

The pre-change content assertion must fail, the post-change assertion must pass, all Bun repository checks must pass, and the real run must exercise the existing human-decision handoff before completion.
