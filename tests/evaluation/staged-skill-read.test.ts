import { afterAll, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { acceptsStagedSkillRead } from "../../evaluation/staged-skill-read";

const cwd = realpathSync(mkdtempSync(join(tmpdir(), "ehs-skill-read-test-")));
const root = join(cwd, ".agents/skills");
const names = ["using-extremely-hardcore", "change-contract", "test-first-implementation", "evidence-ledger"];
for (const name of names) {
  mkdirSync(join(root, name), { recursive: true });
  writeFileSync(join(root, name, "SKILL.md"), name);
}
writeFileSync(join(cwd, "outside.md"), "outside");
symlinkSync(join(cwd, "outside.md"), join(root, "outside-link.md"));
symlinkSync(join(root, names[0]!), join(root, "inside-link"));
afterAll(() => rmSync(cwd, { recursive: true, force: true }));

const paths = names.map((name) => `.agents/skills/${name}/SKILL.md`);
const read = (command: string, commandActions: unknown[] = [{ type: "unknown", command }]) =>
  ({ type: "commandExecution", cwd, command, commandActions });
const accepts = (input: unknown) => acceptsStagedSkillRead(input, root, cwd);

test("accepts the observed shell-wrapped four-file read despite unknown action metadata", () => {
  const inner = `cat ${paths.join(" ")}`;
  expect(accepts(read(`/bin/zsh -lc '${inner}'`, [{ type: "unknown", command: inner }]))).toBe(true);
});

test("keeps direct literal cat reads working", () => {
  for (const command of ["cat", "/bin/cat"]) {
    for (const args of [paths.join(" "), paths.map((p) => `'${p}'`).join(" "), paths.map((p) => `"${p}"`).join(" ")]) {
      expect(accepts(read(`${command} ${args}`, paths.map((path) => ({ type: "read", path }))))).toBe(true);
    }
  }
});

test("rejects shell operators, substitutions, expansions, comments and nested execution", () => {
  const p = paths[0]!;
  for (const command of [`cat ${p}; touch x`, `cat ${p} && true`, `cat ${p} | cat`, `cat ${p} > x`,
    `cat ${p}\ntrue`, `cat ${p} # comment`, `cat $(echo ${p})`, `cat \`${p}\``,
    'cat "$HOME/file"', "cat .agents/skills/*/SKILL.md", `env cat ${p}`, `cat -- ${p}`,
    `cat < ${p}`, `/bin/zsh -lc 'cat ${p}' extra`, `/bin/sh -c 'cat ${p}'`,
    `/bin/zsh -lc 'cat ${p}; true'`]) {
    expect(accepts(read(command))).toBe(false);
  }
});

test("rejects traversal, sibling prefixes, missing files, directories and symlinks", () => {
  for (const path of ["outside.md", "../outside.md", ".agents/skills/../../outside.md",
    ".agents/skills/using-extremely-hardcore/../change-contract/SKILL.md",
    `${root}-other/file.md`, ".agents/skills/missing.md", ".agents/skills/change-contract",
    ".agents/skills/outside-link.md", ".agents/skills/inside-link/SKILL.md"]) {
    expect(accepts(read(`cat ${path}`, [{ type: "read", path }]))).toBe(false);
  }
});

test("rejects malformed input and unexpected cwd without throwing", () => {
  for (const input of [null, {}, [], read("cat"), read("cat ''"),
    { ...read(`cat ${paths[0]}`), cwd: join(cwd, ".agents") },
    { ...read(`cat ${paths[0]}`), type: "mcpToolCall" },
    { ...read(`cat ${paths[0]}`), command: null }]) expect(accepts(input)).toBe(false);
});

test("rejects trailing line breaks and forged read metadata", () => {
  const path = paths[0]!;
  for (const command of [`cat ${path}\n`, `cat ${path}\r\n`, `cat ${path}; true`, `touch ${path}`]) {
    expect(accepts(read(command, [{ type: "read", path }]))).toBe(false);
  }
});

test("accepts absolute staged paths and literal quotes inside the known wrapper", () => {
  const absolute = join(root, names[0]!, "SKILL.md");
  expect(accepts(read(`/bin/cat ${absolute}`))).toBe(true);
  expect(accepts(read(`/bin/zsh -lc 'cat "${paths[0]}"'`))).toBe(true);
});
