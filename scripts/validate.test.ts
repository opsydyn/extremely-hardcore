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
    } else if (file === ".codex-plugin/plugin.json") {
      write(root, file, JSON.stringify({ name: "extremely-hardcore", skills: "./skills/" }));
    } else {
      write(root, file, `${file}\n`);
    }
  }
}

function completeSkill(path: string): string {
  const name = path.split("/").at(-2) ?? "unknown";
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

  test("passes a complete minimal fixture", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);

    const result = validateProject(root);

    expect(result).toEqual({ ok: true, errors: [] });
  });
});
