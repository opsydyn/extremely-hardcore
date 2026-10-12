import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { canReserve as original } from "./original";

const root = join(import.meta.dir, "..");
const cases: [number, number, boolean][] = [
  [10, 2, true], [2, 3, false], [3, 3, true], [0, 1, false],
  [3, 0, false], [3, -1, false], [-1, 1, false],
  [3.5, 1, false], [3, 1.5, false],
  [NaN, 1, false], [Infinity, 1, false], [-Infinity, 1, false],
  [3, NaN, false], [3, Infinity, false], [3, -Infinity, false],
];
const final = await import(join(root, "fixture/reservation.ts"));
const tests = await readFile(join(root, "fixture/reservation.test.ts"), "utf8");
const source = await readFile(join(root, "fixture/reservation.ts"), "utf8");
const variants = [
  { name: "final", source },
  { name: "original-over-reservation", source: await readFile(join(root, "controller/original.ts"), "utf8") },
  { name: "reject-exact-stock", source: "export function canReserve(s:number,q:number):boolean { return Number.isInteger(s) && Number.isInteger(q) && s >= 0 && q > 0 && q < s; }" },
  { name: "accept-zero", source: "export function canReserve(s:number,q:number):boolean { return Number.isInteger(s) && Number.isInteger(q) && s >= 0 && q >= 0 && q <= s; }" },
  { name: "accept-fractional", source: "export function canReserve(s:number,q:number):boolean { return Number.isFinite(s) && Number.isFinite(q) && s >= 0 && q > 0 && q <= s; }" },
  { name: "accept-infinite-stock", source: "export function canReserve(s:number,q:number):boolean { return (Number.isInteger(s) || s === Infinity) && Number.isInteger(q) && s >= 0 && q > 0 && q <= s; }" },
];
const results = [];
for (const variant of variants) {
  const path = join(root, "controller/variants", variant.name);
  await mkdir(path, { recursive: true });
  await writeFile(join(path, "reservation.ts"), variant.source);
  await writeFile(join(path, "reservation.test.ts"), tests);
  const proc = Bun.spawn([process.execPath, "test", "./reservation.test.ts"], { cwd: path, stdout: "pipe", stderr: "pipe" });
  const timer = setTimeout(() => proc.kill(), 10000);
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exit = await proc.exited;
  clearTimeout(timer);
  const log = stdout + stderr;
  await writeFile(join(path, "result.json"), JSON.stringify({ stdout, stderr, exit }, null, 2) + "\n");
  const implementation = await import(join(path, "reservation.ts"));
  const violatesContract = cases.some(([s, q, expected]) => implementation.canReserve(s, q) !== expected);
  results.push({ name: variant.name, exit, violatesContract,
    behaviouralFailure: exit !== 0 && log.includes("(fail)") && log.includes("expect(received)") });
}
const report = {
  originalDefectObserved: original(2, 3) === true,
  independentCases: cases.map(([stock, quantity, expected]) => ({
    stock: String(stock), quantity: String(quantity), expected,
    actual: final.canReserve(stock, quantity), pass: final.canReserve(stock, quantity) === expected,
  })),
  variants: results,
};
await writeFile(join(root, "controller/results.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
process.exitCode = report.independentCases.every((c) => c.pass)
  && results.every((v) => v.name === "final" ? v.exit === 0 : v.violatesContract && v.behaviouralFailure) ? 0 : 1;
