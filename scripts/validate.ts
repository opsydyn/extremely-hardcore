import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

export const requiredSkillHeadings = [
  "## when to use",
  "## when not to use",
  "## required inputs",
  "## required output",
  "## procedure",
  "## quality bar",
  "## failure modes",
];

export const skillFiles = [
  "skills/using-extremely-hardcore/SKILL.md",
  "skills/change-contract/SKILL.md",
  "skills/architecture-decision/SKILL.md",
  "skills/domain-discovery/SKILL.md",
  "skills/bounded-context-review/SKILL.md",
  "skills/decision-challenge/SKILL.md",
  "skills/test-first-implementation/SKILL.md",
  "skills/evidence-ledger/SKILL.md",
];

export const templateFiles = [
  "skills/change-contract/templates/change-contract.md",
  "skills/architecture-decision/templates/adr.md",
  "skills/domain-discovery/templates/domain-map.md",
  "skills/bounded-context-review/templates/bounded-context-review.md",
  "skills/decision-challenge/templates/decision-challenge.md",
  "skills/test-first-implementation/templates/implementation-plan.md",
  "skills/evidence-ledger/templates/evidence-ledger.md",
];

export const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "package.json",
  "tsconfig.json",
  ".gitignore",
  ".codex-plugin/plugin.json",
  ...skillFiles,
  ...templateFiles,
  "agents/scout.md",
  "agents/architect.md",
  "agents/implementer.md",
  "agents/test-critic.md",
  "agents/architecture-critic.md",
  "agents/delivery-critic.md",
  "agents/pr-scribe.md",
  "policies/scope-policy.md",
  "policies/command-policy.md",
  "policies/dependency-policy.md",
  "policies/architecture-policy.md",
  "examples/saved-search-ddd-change/README.md",
  "examples/saved-search-ddd-change/change-contract.md",
  "examples/saved-search-ddd-change/domain-map.md",
  "examples/saved-search-ddd-change/adr.md",
  "examples/saved-search-ddd-change/implementation-plan.md",
  "examples/saved-search-ddd-change/evidence-ledger.md",
  "issues/001-dogfood-extremely-hardcore-against-itself.md",
];

export function validateProject(root: string): ValidationResult {
  const errors: string[] = [];

  for (const file of requiredFiles) {
    if (!existsSync(resolve(root, file))) {
      errors.push(`missing required file: ${file}`);
    }
  }

  for (const file of skillFiles) {
    const fullPath = resolve(root, file);
    if (!existsSync(fullPath)) {
      continue;
    }

    const content = readFileSync(fullPath, "utf8");
    const normalised = content.toLowerCase();

    if (!content.split(/\r?\n/).some((line) => line.startsWith("# "))) {
      errors.push(`${file} missing top-level heading: #`);
    }

    for (const heading of requiredSkillHeadings) {
      if (!normalised.includes(`\n${heading}\n`)) {
        errors.push(`${file} missing heading: ${heading}`);
      }
    }
  }

  validatePluginManifest(root, errors);

  return { ok: errors.length === 0, errors };
}

export function formatValidationResult(result: ValidationResult): string {
  if (result.ok) {
    return "validation passed: extremely-hardcore scaffold is complete";
  }

  return ["validation failed:", ...result.errors.map((error) => `- ${error}`)].join("\n");
}

function validatePluginManifest(root: string, errors: string[]): void {
  const manifestPath = resolve(root, ".codex-plugin/plugin.json");
  if (!existsSync(manifestPath)) {
    return;
  }

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
      name?: unknown;
      skills?: unknown;
    };

    if (manifest.name !== "extremely-hardcore") {
      errors.push(".codex-plugin/plugin.json must use name extremely-hardcore");
    }

    if (manifest.skills !== "./skills/") {
      errors.push(".codex-plugin/plugin.json must point skills to ./skills/");
    }
  } catch (error) {
    errors.push(`.codex-plugin/plugin.json is not valid JSON: ${String(error)}`);
  }
}

function isCliEntry(): boolean {
  return resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url);
}

if (isCliEntry()) {
  const result = validateProject(process.cwd());
  console.log(formatValidationResult(result));
  process.exit(result.ok ? 0 : 1);
}
