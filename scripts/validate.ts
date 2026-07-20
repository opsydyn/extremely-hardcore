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

export const decisionChallengeTriggerRequirements = [
  "external writable-agent execution",
  "architecture",
  "security",
  "sandbox",
  "isolation",
  "provenance",
  "public contracts",
  "persistence",
  "ci",
  "deployment",
  "observability",
  "product-differentiation",
  "benchmark",
  "provider-comparison",
  "regression-threshold",
];

export const requiredDecisionChallengeTemplateSections = [
  "## trigger",
  "## proposal and claims",
  "## existing-platform ownership",
  "## durable differentiated value",
  "## strongest counterargument",
  "## claim-to-evidence map",
  "## minimum credible slice",
  "## stop conditions",
  "## verdict",
  "## rationale",
];

const decisionChallengeEvidenceGapTable = "| claim | current evidence | gap | required evidence |";
const decisionChallengeVerdictOptions = "proceed | hold | needs-human-decision";
const decisionChallengeSkillFile = "skills/decision-challenge/SKILL.md";
const decisionChallengeTemplateFile = "skills/decision-challenge/templates/decision-challenge.md";

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

  validateDecisionChallengeContract(root, errors);
  validatePluginManifest(root, errors);

  return { ok: errors.length === 0, errors };
}

function validateDecisionChallengeContract(root: string, errors: string[]): void {
  validateDecisionChallengeTriggerRubric(root, decisionChallengeSkillFile, errors);
  validateDecisionChallengeTriggerRubric(root, "AGENTS.md", errors);

  const templatePath = resolve(root, decisionChallengeTemplateFile);
  if (!existsSync(templatePath)) {
    return;
  }

  const content = readFileSync(templatePath, "utf8");
  const normalised = content.toLowerCase();
  for (const section of requiredDecisionChallengeTemplateSections) {
    if (!normalised.includes(`\n${section}\n`)) {
      errors.push(`${decisionChallengeTemplateFile} missing decision-challenge template section: ${section}`);
    }
  }

  if (!normalised.includes(decisionChallengeEvidenceGapTable)) {
    errors.push(`${decisionChallengeTemplateFile} missing decision-challenge evidence-gap table`);
  }

  if (!normalised.includes(decisionChallengeVerdictOptions)) {
    errors.push(`${decisionChallengeTemplateFile} missing decision-challenge verdict options`);
  }
}

function validateDecisionChallengeTriggerRubric(
  root: string,
  file: string,
  errors: string[],
): void {
  const fullPath = resolve(root, file);
  if (!existsSync(fullPath)) {
    return;
  }

  const normalised = readFileSync(fullPath, "utf8").toLowerCase();
  const rubric =
    file === decisionChallengeSkillFile
      ? getMarkdownSection(normalised, "## when to use")
      : normalised;
  for (const requirement of decisionChallengeTriggerRequirements) {
    if (!rubric.includes(requirement)) {
      errors.push(`${file} missing decision-challenge trigger: ${requirement}`);
    }
  }
}

function getMarkdownSection(content: string, heading: string): string {
  const start = content.indexOf(`\n${heading}\n`);
  if (start === -1) {
    return "";
  }

  const sectionStart = start + heading.length + 2;
  const nextHeading = content.indexOf("\n## ", sectionStart);
  return content.slice(sectionStart, nextHeading === -1 ? undefined : nextHeading);
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
