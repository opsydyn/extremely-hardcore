import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const source = await readFile(join(root, "fixture/access.ts"), "utf8");
const tests = await readFile(join(root, "fixture/access.test.ts"), "utf8");
const original = await readFile(join(root, "controller/initial/access.ts"), "utf8");
async function run(path: string) {
  const startedAt = new Date().toISOString();
  const proc = Bun.spawn([process.execPath, "test", "./access.test.ts"], { cwd: path, stdout: "pipe", stderr: "pipe" });
  const timer = setTimeout(() => proc.kill(), 10000);
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exit = await proc.exited;
  clearTimeout(timer);
  return { command: [process.execPath, "test", "./access.test.ts"], startedAt,
    finishedAt: new Date().toISOString(), stdout, stderr, exit,
    behaviouralFailure: exit === 1 && (stdout + stderr).includes("(fail)")
      && (stdout + stderr).includes("expect(received)") };
}
if (process.argv[2] === "checkpoint") {
  const inputs = [
    ["access.ts", "access.ts"], ["README.md", "README.md"],
    ["docs/adr/001-access-policy.md", "policy.md"],
  ];
  const unchanged = [];
  for (const [current, initial] of inputs) {
    const a = await readFile(join(root, "fixture", current), "utf8");
    const b = await readFile(join(root, "controller/initial", initial), "utf8");
    unchanged.push({ path: current, matches: a === b, initialHash: digest(b), currentHash: digest(a) });
  }
  const path = join(root, "controller/checkpoint");
  await mkdir(path, { recursive: true });
  await writeFile(join(path, "access.ts"), source);
  await writeFile(join(path, "access.test.ts"), tests);
  const command = await run(path);
  const result = { capturedAt: new Date().toISOString(), unchanged, sourceHash: digest(source), testsHash: digest(tests), command };
  await writeFile(join(path, "result.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = unchanged.every((v) => v.matches) && command.behaviouralFailure ? 0 : 1;
} else if (process.argv[2] === "final") {
  const cases: [string, string, string, boolean][] = [
    ["reader", "north", "north", true], ["admin", "north", "north", true],
    ["reader", "north", "south", false], ["admin", "north", "south", false],
    ["", "north", "north", false], ["writer", "north", "north", false],
    ["ADMIN", "north", "north", false], ["__proto__", "north", "north", false],
    ["constructor", "north", "north", false], ["toString", "north", "north", false],
    ["admin", "", "", false], ["reader", "", "", false],
    ["admin", " ", " ", false], ["reader", "\t", "\t", false],
    ["admin", "", "north", false], ["admin", "north", "", false],
    ["reader", "", "north", false], ["reader", "north", "", false],
    ["admin", "north", "North", false], ["reader", " north", "north", false],
    ["admin", " north", " north", true], ["reader", " north", " north", true],
  ];
  const implementation = await import(join(root, "fixture/access.ts"));
  const independent = cases.map(([role, actorTenant, documentTenant, expected]) => {
    const actual = implementation.canReadDocument({ role, tenantId: actorTenant }, { tenantId: documentTenant });
    return { role, actorTenant, documentTenant, expected, actual, pass: actual === expected };
  });
  const prefix = "export interface Actor { tenantId:string; role:string; }\nexport interface Document { tenantId:string; }\n";
  const variants = [
    { name: "final", source, tests },
    { name: "checkpoint-tests-final-source", source, tests: await readFile(join(root, "controller/checkpoint/access.test.ts"), "utf8") },
    { name: "original-cross-tenant-admin", source: original, tests },
    { name: "allow-missing-identity", source: prefix + 'export function canReadDocument(a:Actor,d:Document):boolean { return (a.role === "reader" || a.role === "admin") && a.tenantId === d.tenantId; }', tests },
    { name: "allow-unknown-role", source: prefix + 'export function canReadDocument(a:Actor,d:Document):boolean { return a.tenantId.trim().length > 0 && d.tenantId.trim().length > 0 && a.tenantId === d.tenantId; }', tests },
    { name: "allow-cross-tenant-admin", source: prefix + 'export function canReadDocument(a:Actor,d:Document):boolean { return (a.role === "reader" || a.role === "admin") && a.tenantId.trim().length > 0 && d.tenantId.trim().length > 0 && (a.role === "admin" || a.tenantId === d.tenantId); }', tests },
    { name: "deny-valid-reader", source: prefix + 'export function canReadDocument(a:Actor,d:Document):boolean { return a.role === "admin" && a.tenantId.trim().length > 0 && d.tenantId.trim().length > 0 && a.tenantId === d.tenantId; }', tests },
  ];
  const checks = [];
  for (const variant of variants) {
    const path = join(root, "controller/variants", variant.name);
    await mkdir(path, { recursive: true });
    await writeFile(join(path, "access.ts"), variant.source);
    await writeFile(join(path, "access.test.ts"), variant.tests);
    const command = await run(path);
    await writeFile(join(path, "result.json"), JSON.stringify(command, null, 2) + "\n");
    const variantImplementation = await import(join(path, "access.ts"));
    const violatesContract = cases.some(([role, tenantId, target, expected]) =>
      variantImplementation.canReadDocument({ role, tenantId }, { tenantId: target }) !== expected);
    checks.push({ name: variant.name, exit: command.exit, behaviouralFailure: command.behaviouralFailure, violatesContract });
  }
  const result = { capturedAt: new Date().toISOString(), sourceHash: digest(source), testsHash: digest(tests), independent, checks };
  await writeFile(join(root, "controller/final-result.json"), JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = independent.every((v) => v.pass) && checks.every((v) =>
    v.name === "final" || v.name === "checkpoint-tests-final-source" ? v.exit === 0 : v.violatesContract && v.behaviouralFailure) ? 0 : 1;
} else throw new Error("Expected checkpoint or final");
