import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { requiredFiles, requiredSkillHeadings, validateProject } from "./validate";

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function tempRepo(): string {
  const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-test-"));
  roots.push(root);
  return root;
}

function write(root: string, path: string, content: string): void {
  const fullPath = join(root, path);
  mkdirSync(join(fullPath, ".."), { recursive: true });
  writeFileSync(fullPath, content);
}

function writeMinimalRequiredFiles(root: string): void {
  for (const file of requiredFiles) {
    if (file.endsWith("SKILL.md")) {
      write(root, file, completeSkill(file));
    } else if (file === "skills/decision-challenge/templates/decision-challenge.md") {
      write(root, file, completeDecisionChallengeTemplate());
    } else if (file === "AGENTS.md") {
      write(root, file, completeAgentsRouting());
    } else if (file === ".codex-plugin/plugin.json") {
      write(root, file, JSON.stringify({ name: "extremely-hardcore", skills: "./skills/" }));
    } else {
      write(root, file, `${file}\n`);
    }
  }
}

function completeSkill(path: string): string {
  const name = path.split("/").at(-2) ?? "unknown";
  if (name === "decision-challenge") {
    return completeDecisionChallengeSkill();
  }

  return [
    "---",
    `name: ${name}`,
    `description: Use when validating ${name}`,
    "---",
    "",
    `# ${name}`,
    "",
    ...requiredSkillHeadings.map((heading) => `${heading}\n\nRequired content.`),
    "",
  ].join("\n");
}

function completeDecisionChallengeSkill(): string {
  return [
    "---",
    "name: decision-challenge",
    "description: Use when evaluating high-consequence proposals.",
    "---",
    "",
    "# decision-challenge",
    "",
    "## when to use",
    "",
    "Use before planning a proposal that introduces external writable-agent execution; changes an architecture, security, sandbox, isolation, or provenance boundary; changes public contracts, persistence, CI, deployment, or observability behaviour; or makes a product-differentiation, benchmark, provider-comparison, or regression-threshold claim.",
    "",
    ...requiredSkillHeadings
      .filter((heading) => heading !== "## when to use")
      .map((heading) => `${heading}\n\nRequired content.`),
    "",
  ].join("\n");
}

function completeDecisionChallengeTemplate(): string {
  return [
    "# decision challenge: <proposal>",
    "",
    "## trigger",
    "",
    "## proposal and claims",
    "",
    "## existing-platform ownership",
    "",
    "## durable differentiated value",
    "",
    "## strongest counterargument",
    "",
    "## claim-to-evidence map",
    "",
    "| Claim | Current evidence | Gap | Required evidence |",
    "| --- | --- | --- | --- |",
    "",
    "## minimum credible slice",
    "",
    "## stop conditions",
    "",
    "## verdict",
    "",
    "proceed | hold | needs-human-decision",
    "",
    "## rationale",
    "",
  ].join("\n");
}

function completeAgentsRouting(): string {
  return "- Use `decision-challenge` before planning a proposal that introduces external writable-agent execution; changes an architecture, security, sandbox, isolation, or provenance boundary; changes public contracts, persistence, CI, deployment, or observability behaviour; or makes a product-differentiation, benchmark, provider-comparison, or regression-threshold claim.\n";
}

describe("validateProject", () => {
  test("reports missing required files", () => {
    const result = validateProject(tempRepo());

    expect(result.ok).toBe(false);
    expect(result.errors.some((error) => error.includes("missing required file: README.md"))).toBe(true);
  });

  test("requires the decision challenge skill and record template", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    rmSync(join(root, "skills", "decision-challenge"), { recursive: true, force: true });

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "missing required file: skills/decision-challenge/SKILL.md",
    );
    expect(result.errors).toContain(
      "missing required file: skills/decision-challenge/templates/decision-challenge.md",
    );
  });

  test("reports missing required skill headings", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(root, "skills/change-contract/SKILL.md", "# change-contract\n");

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/change-contract/SKILL.md missing heading: ## when to use",
    );
  });

  test("passes a complete decision-challenge skill and template", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);

    const result = validateProject(root);

    expect(result).toEqual({ ok: true, errors: [] });
  });

  test("rejects an incomplete decision-challenge trigger rubric", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "skills/decision-challenge/SKILL.md",
      completeDecisionChallengeSkill().replace(
        "benchmark, provider-comparison, or regression-threshold claim",
        "benchmark claim",
      ),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/decision-challenge/SKILL.md missing decision-challenge trigger: provider-comparison",
    );
    expect(result.errors).toContain(
      "skills/decision-challenge/SKILL.md missing decision-challenge trigger: regression-threshold",
    );
  });

  test("rejects incomplete decision-challenge routing", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(root, "AGENTS.md", completeAgentsRouting().replace("sandbox, ", ""));

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("AGENTS.md missing decision-challenge trigger: sandbox");
  });

  test("does not count trigger terms outside the decision-challenge routing rule", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "AGENTS.md",
      [
        completeAgentsRouting().replace("sandbox, ", ""),
        "",
        "Unrelated notes mention sandbox, isolation, provenance, public contracts, persistence, CI, deployment, observability, product-differentiation, benchmark, provider-comparison, and regression-threshold.",
      ].join("\n"),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("AGENTS.md missing decision-challenge trigger: sandbox");
  });

  test("reads the skill trigger rubric instead of unrelated prose", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "skills/decision-challenge/SKILL.md",
      completeDecisionChallengeSkill()
        .replace("sandbox, ", "")
        .replace("## failure modes\n\nRequired content.", "## failure modes\n\nSandbox evidence is not enough."),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/decision-challenge/SKILL.md missing decision-challenge trigger: sandbox",
    );
  });

  test("rejects a decision-challenge template without its strongest counterargument", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "skills/decision-challenge/templates/decision-challenge.md",
      completeDecisionChallengeTemplate().replace("## strongest counterargument\n\n", ""),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/decision-challenge/templates/decision-challenge.md missing decision-challenge template section: ## strongest counterargument",
    );
  });

  test("rejects a decision-challenge template without its evidence-gap map", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "skills/decision-challenge/templates/decision-challenge.md",
      completeDecisionChallengeTemplate().replace(
        "## claim-to-evidence map\n\n| Claim | Current evidence | Gap | Required evidence |\n| --- | --- | --- | --- |\n\n",
        "",
      ),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/decision-challenge/templates/decision-challenge.md missing decision-challenge template section: ## claim-to-evidence map",
    );
    expect(result.errors).toContain(
      "skills/decision-challenge/templates/decision-challenge.md missing decision-challenge evidence-gap table",
    );
  });

  test("rejects a decision-challenge template without stop conditions", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "skills/decision-challenge/templates/decision-challenge.md",
      completeDecisionChallengeTemplate().replace("## stop conditions\n\n", ""),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/decision-challenge/templates/decision-challenge.md missing decision-challenge template section: ## stop conditions",
    );
  });

  test("rejects a decision-challenge template without a verdict", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(
      root,
      "skills/decision-challenge/templates/decision-challenge.md",
      completeDecisionChallengeTemplate().replace(
        "## verdict\n\nproceed | hold | needs-human-decision\n\n",
        "",
      ),
    );

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "skills/decision-challenge/templates/decision-challenge.md missing decision-challenge template section: ## verdict",
    );
    expect(result.errors).toContain(
      "skills/decision-challenge/templates/decision-challenge.md missing decision-challenge verdict options",
    );
  });
});
