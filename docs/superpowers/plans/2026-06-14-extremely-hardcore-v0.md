# Extremely Hardcore V0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a Bun-based v0 plugin-style repo for the `extremely-hardcore` skill system.

**Architecture:** The repo is mostly markdown: seven skills, templates, role docs, policies, one worked example, and Codex plugin metadata. A small TypeScript validator checks the required scaffold shape and skill headings.

**Tech Stack:** Bun, TypeScript, tsx, markdown, Codex plugin manifest.

---

### Task 1: Validator Test

**Files:**
- Create: `scripts/validate.test.ts`
- Create later: `scripts/validate.ts`

- [ ] **Step 1: Write the failing test**

Create `scripts/validate.test.ts` with tests that build temporary repo fixtures and assert that validation reports missing files/headings and passes a minimal complete fixture.

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test scripts/validate.test.ts`
Expected: FAIL because `scripts/validate.ts` does not exist yet.

### Task 2: Scaffold Content

**Files:**
- Create: `.codex-plugin/plugin.json`
- Create: `README.md`
- Create: `AGENTS.md`
- Create: `package.json`
- Create: `tsconfig.json`
- Modify: `.gitignore`
- Create: all `skills/**/SKILL.md`
- Create: all required skill templates
- Create: all `agents/*.md`
- Create: all `policies/*.md`
- Create: all `examples/saved-search-ddd-change/*.md`

- [ ] **Step 1: Add files from the approved handoff**

Use Bun in package scripts. Keep the content concise, operational, and in UK English.

### Task 3: Validator Implementation

**Files:**
- Create: `scripts/validate.ts`

- [ ] **Step 1: Implement minimal validator**

Export `validateProject(root)` and `formatValidationResult(result)`. Check required files, required skill headings, required templates, and plugin manifest basics.

- [ ] **Step 2: Run tests**

Run: `bun test scripts/validate.test.ts`
Expected: PASS.

### Task 4: Project Checks

**Files:**
- Generated: `bun.lock`

- [ ] **Step 1: Install dependencies**

Run: `bun install`
Expected: lockfile created and dependencies installed.

- [ ] **Step 2: Run validation**

Run: `bun run check`
Expected: validator prints a pass result.

- [ ] **Step 3: Run unit tests**

Run: `bun test`
Expected: validator tests pass.
