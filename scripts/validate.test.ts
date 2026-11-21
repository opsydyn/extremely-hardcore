import { afterEach, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { requiredFiles, requiredSkillHeadings, validateProject } from "./validate";

const roots: string[] = [];

test("0.0.3 preview source versions are aligned", () => {
  const version = JSON.parse(source("package.json")).version;
  expect(version).toBe("0.0.3");
  for (const path of [".codex-plugin/plugin.json", ".claude-plugin/plugin.json"]) {
    expect(JSON.parse(source(path)).version).toBe(version);
  }
  const marketplace = JSON.parse(source(".claude-plugin/marketplace.json"));
  expect(marketplace.plugins.find((plugin: { name: string }) => plugin.name === "extremely-hardcore").version).toBe(version);
});

function source(path: string): string {
  return readFileSync(join(import.meta.dir, "..", path), "utf8");
}

function skillSection(name: string, heading: string): string {
  return source(`skills/${name}/SKILL.md`).split(`## ${heading}\n`)[1]?.split("\n## ")[0] ?? "";
}

describe("proportionate instruction contracts", () => {
  test("routine work has a short path without new stage approvals", () => {
    const router = skillSection("using-extremely-hardcore", "procedure");
    expect(router).toMatch(/scope and constraints.*smallest complete change.*meaningful verification.*outcome and limitations/is);
    expect(router).toMatch(/routine steps do not create new approval gates/);
    expect(source("AGENTS.md")).toMatch(/Routine work follows/);
  });

  test("execution approach fits the task without expanding worker authority", () => {
    const execution = skillSection("using-extremely-hardcore", "execution approach").replace(/\s+/g, " ");
    expect(execution).toContain("Honour the chosen user/host method");
    expect(execution).toMatch(/simplest effective approach.*inline.*tightly coupled.*native subagents.*independent work or fresh review/);
    expect(execution).toMatch(/available, authorised.*context\/coordination cost/);
    expect(execution).toMatch(/Ask only if.*scope, budget or permissions/);
    expect(execution).toContain("not extra authority");
    expect(execution).toContain("One owner handles overlapping writes");
    expect(execution).toContain("parent owns integration and final verification");
  });

  test("resource-aware verification preserves required checks and retained resources", () => {
    const implementation = source("skills/test-first-implementation/SKILL.md").replace(/\s+/g, " ");
    expect(implementation).toMatch(/shared machines.*duplicate expensive builds or test runs/);
    expect(implementation).toMatch(/concurrency.*capacity for other work/);
    expect(implementation).toMatch(/stop only jobs you started/);
    expect(implementation).toMatch(/remove only your disposable temporary resources once no longer needed/);
    expect(implementation).toMatch(/Preserve evidence, user resources and anything still in use/);
    expect(implementation).toContain("Resource limits never waive required checks");
  });

  test("decision reuse avoids a new ADR but never waives safeguards", () => {
    const architecture = source("skills/architecture-decision/SKILL.md");
    expect(architecture).toMatch(/reuse.*accepted decision/is);
    expect(architecture).toMatch(/assumptions.*still hold/is);
    expect(architecture).toMatch(/does not waive.*approval.*verification/is);
    expect(architecture).not.toContain("If any trigger applies, write an ADR");
    expect(skillSection("architecture-decision", "required output")).toMatch(/No standalone.*no-ADR/is);
  });

  test("challenge and boundary selection distinguish consequences from keywords", () => {
    const challenge = skillSection("decision-challenge", "when to use");
    expect(challenge).toMatch(/material.*consequences/is);
    expect(skillSection("decision-challenge", "when not to use")).toMatch(/accepted.*assumptions/is);
    const boundary = source("skills/bounded-context-review/SKILL.md");
    expect(boundary).not.toMatch(/description:.*before changing imports/);
    expect(skillSection("bounded-context-review", "when not to use")).toMatch(/import.*alone/is);
    expect(boundary).toMatch(/Types do not replace runtime/);
  });

  test("ordinary completion is flexible while provenance and existing gates remain", () => {
    const ledger = source("skills/evidence-ledger/SKILL.md");
    expect(skillSection("evidence-ledger", "required output")).toMatch(/concise paragraph/);
    expect(ledger).not.toMatch(/exactly five fields|result.*is exactly one of/);
    expect(ledger).toContain("host-captured");
    expect(ledger).toContain("agent-declared");
    expect(ledger).toContain("independent review");
    expect(ledger).toContain("Do not hand-author success when the gate rejects it");
    expect(ledger).toMatch(/required.*formats.*remain binding/is);
    expect(source("docs/adr/0023-standalone-work-receipt.md")).toMatch(/superseded.*049/is);
  });

  test("simplicity records only a useful choice, not another fixed form", () => {
    const output = skillSection("simple-made-easy", "required output");
    expect(output).toMatch(/only.*material.*trade-off/is);
    expect(output).not.toContain("outcome:\noptions checked:");
    expect(source("skills/simple-made-easy/SKILL.md")).toMatch(/does not change the choice.*omit/is);
  });

  test("domain discovery makes functional modelling selective and keeps runtime checks", () => {
    const domain = source("skills/domain-discovery/SKILL.md");
    expect(domain).toContain("Scott Wlaschin");
    expect(domain).toContain("Domain Modeling Made Functional");
    expect(domain).toMatch(/workflow.*valid states.*expected rejections/is);
    expect(domain).toContain("validated construction");
    expect(domain).toMatch(/decision logic.*I\/O/is);
    expect(domain).toMatch(/Types\s+do\s+not\s+replace.*authorisation.*freshness.*concurrency/is);
    expect(domain).toMatch(/Do not require.*functional.*library/is);
    expect(skillSection("domain-discovery", "when not to use")).toMatch(/already understood/);
  });

  test("ubiquitous language stays context-specific without requiring a glossary", () => {
    const procedure = skillSection("domain-discovery", "procedure").replace(/\s+/g, " ");
    expect(procedure).toMatch(/ubiquitous language/i);
    expect(procedure).toMatch(/agreed.*code, tests and documentation within each bounded context/i);
    expect(procedure).toMatch(/preserving legitimate differences between contexts/i);
    expect(procedure).toMatch(/Reuse existing definitions.*not create a glossary by default/i);
  });

  test("verification alternatives do not introduce an automatic approval pause", () => {
    const implementation = source("skills/test-first-implementation/SKILL.md");
    const manifesto = source("MANIFESTO.md");
    expect(implementation).toMatch(/approval only when.*user or repository/is);
    expect(manifesto).not.toContain("unless an explicit, approved exception applies");
    expect(manifesto).toMatch(/alternative verification/);
    expect(implementation).toContain("independently of the implementation");
  });

  test("ordinary reviewers do not require protocol attestations", () => {
    const critic = source("agents/delivery-critic.md");
    expect(critic).toMatch(/Input:.*intent.*diff.*verification/);
    expect(critic).toMatch(/When.*protocol.*attestation/is);
    expect(source("agents/architecture-critic.md")).toMatch(/accepted decisions/);
  });

  test("onboarding names the published preview and separates development tooling", () => {
    for (const path of ["README.md", "docs/user-guide.md", "docs/provider-onboarding.md"]) {
      const content = source(path);
      expect(content).toContain("experimental");
      expect(content).toContain("v0.0.3");
      expect(content).toMatch(/source checkout.*development/is);
      expect(content).not.toContain("this is a private source package");
      expect(content).not.toContain("The receipt has five fields");
    }
  });

  test("fresh-session setup links directly to the preview recommended in the README", () => {
    const preview = source("README.md").match(/`(extremely-hardcore-(\d+\.\d+\.\d+)[\w.-]*-skills-only-preview\.zip)`/);
    expect(preview).not.toBeNull();
    const [, asset, version] = preview!;
    const setup = source("docs/fresh-session-check.md").split("## Before Starting\n")[1]?.split("\n## ")[0] ?? "";
    const firstStep = setup.split(/^\d+\.\s/m)[1];
    const download = firstStep?.match(/\]\(([^)\s]+)\)/)?.[1];
    expect(download).toBe(`https://github.com/opsydyn/extremely-hardcore/releases/download/v${version}/${asset}`);
  });

  test("onboarding sends ZIP readers to the same preview as fresh-session setup", () => {
    const firstLink = (section: string) => section.match(/\]\(([^)\s]+)\)/)?.[1];
    const setup = source("docs/fresh-session-check.md").split("## Before Starting\n")[1]?.split("\n## ")[0] ?? "";
    const preview = source("docs/provider-onboarding.md").split("## Published preview ZIP\n")[1]?.split("\n## ")[0] ?? "";
    const expected = firstLink(setup);
    expect(expected).toBeDefined();
    expect(firstLink(preview)).toBe(expected);
    expect(source("docs/user-guide.md")).toContain("](provider-onboarding.md#published-preview-zip)");
  });
});

describe("standalone completion routing", () => {
  test("entrypoint routes planning and review to a non-trivial task finish", () => {
    const content = readFileSync(join(import.meta.dir, "..", "skills/using-extremely-hardcore/SKILL.md"), "utf8");
    const routing = content.split("## procedure")[1]?.split("## durable run handoff")[0] ?? "";
    const ledgerRoute = routing.split("\n").find((line) => line.includes("`evidence-ledger`")) ?? "";

    expect(ledgerRoute).toMatch(/finish.*every non-trivial task/);
    expect(ledgerRoute).toMatch(/planning.*review/);
  });

  test("ledger applies to planning and review while bounding completion to authorised scope", () => {
    const content = readFileSync(join(import.meta.dir, "..", "skills/evidence-ledger/SKILL.md"), "utf8");
    const applicability = content.split("## when to use")[1]?.split("## when not to use")[0] ?? "";

    expect(applicability).toMatch(/closing non-trivial.*implementation.*planning.*review/);
    expect(applicability).toMatch(/Completion.*only.*authorised scope/);
    expect(applicability).toMatch(/state what was not performed/);
  });
});

test.each(requiredFiles.filter((file) => file.endsWith("/SKILL.md")))(
  "%s has parseable skill discovery metadata",
  (file) => {
    const frontmatter = source(file).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    expect(frontmatter).not.toBeNull();
    const metadata = Bun.YAML.parse(frontmatter![1]!) as Record<string, unknown>;
    expect(metadata.name).toBe(file.split("/").at(-2));
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).trim().length).toBeGreaterThan(0);
  },
);

test.each(requiredFiles.filter((file) => file.startsWith("agents/")))(
  "%s has minimal parseable Claude agent metadata",
  (file) => {
    const content = readFileSync(join(import.meta.dir, "..", file), "utf8");
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    expect(frontmatter).not.toBeNull();
    const metadata = Bun.YAML.parse(frontmatter![1]!) as Record<string, unknown>;
    expect(Object.keys(metadata).sort()).toEqual(["description", "name"]);
    expect(metadata.name).toBe(file.slice("agents/".length, -".md".length));
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).trim().length).toBeGreaterThan(0);
  },
);

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
    } else if (file === "package.json") {
      write(root, file, JSON.stringify({ private: true, pi: { skills: ["./skills"] } }));
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
  test("source exposes exactly the existing skills directory to Pi", () => {
    expect(JSON.parse(source("package.json")).pi).toEqual({ skills: ["./skills"] });
    expect(validateProject(join(import.meta.dir, "..")).ok).toBe(true);
  });

  test.each([undefined, null, {}, { skills: "./skills" }, { skills: [] },
    { skills: ["../skills"] }, { skills: ["./skills/using-extremely-hardcore"] },
    { skills: ["./skills", "./extra"] }, { skills: ["./skills"], extensions: ["./extension.ts"] },
  ])("rejects missing, filtered or non-skill Pi resources: %j", (pi) => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(root, "package.json", JSON.stringify({ pi }));
    expect(validateProject(root).errors).toContain('package.json pi must expose only skills: ["./skills"]');
  });

  test("Pi discovery requires every canonical skill and no extras", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    expect(validateProject(root).ok).toBe(true);
    rmSync(join(root, "skills", "domain-discovery"), { recursive: true });
    expect(validateProject(root).errors).toContain("Pi discovery must contain exactly the nine existing skill paths");
    write(root, "skills/domain-discovery/SKILL.md", completeSkill("skills/domain-discovery/SKILL.md"));
    write(root, "skills/extra/SKILL.md", completeSkill("skills/extra/SKILL.md"));
    expect(validateProject(root).errors).toContain("Pi discovery must contain exactly the nine existing skill paths");
  });

  test("Pi discovery rejects misleading metadata and loose root Markdown", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    const path = "skills/domain-discovery/SKILL.md";
    write(root, path, completeSkill(path).replace("name: domain-discovery", "name: change-contract"));
    expect(validateProject(root).errors).toContain(`${path} Pi metadata must match its directory name and have a description`);
    write(root, path, completeSkill(path));
    write(root, "skills/unexpected.md", "# unintended skill\n");
    expect(validateProject(root).errors).toContain("Pi discovery must contain exactly the nine existing skill paths");
  });

  test("Pi validation reports malformed package JSON instead of throwing", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(root, "package.json", "{");
    expect(validateProject(root).errors.some(error => error.startsWith("package.json Pi manifest is invalid:"))).toBe(true);
  });

  test("Pi discovery reports malformed metadata instead of passing a partial catalogue", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(root, "skills/domain-discovery/SKILL.md", "---\nname: domain-discovery\ndescription: broken: yaml\n---\n# domain-discovery\n");
    expect(validateProject(root).errors.some(error => error.startsWith("Pi discovery failed:"))).toBe(true);
  });

  test("Pi discovery rejects a linked skill rather than reading outside the canonical tree", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    write(root, "outside.md", completeSkill("skills/domain-discovery/SKILL.md"));
    rmSync(join(root, "skills/domain-discovery/SKILL.md"));
    symlinkSync(join(root, "outside.md"), join(root, "skills/domain-discovery/SKILL.md"));
    expect(validateProject(root).errors.some(error => error.startsWith("Pi discovery failed:"))).toBe(true);
  });

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

  test("requires the simple-made-easy skill", () => {
    const root = tempRepo();
    writeMinimalRequiredFiles(root);
    rmSync(join(root, "skills", "simple-made-easy"), { recursive: true, force: true });

    const result = validateProject(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "missing required file: skills/simple-made-easy/SKILL.md",
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
