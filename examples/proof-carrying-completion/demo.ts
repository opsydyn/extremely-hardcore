import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = mkdtempSync(join(tmpdir(), "extremely-hardcore-demo-"));
const repositoryRoot = join(import.meta.dir, "..", "..");
const cliPath = join(repositoryRoot, "scripts", "eh.ts");
const runPath = join(root, ".extremely-hardcore", "runs", "proof-demo");

try {
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["config", "user.email", "demo@example.com"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Demo User"], { cwd: root });
  writeFileSync(join(root, "work.txt"), "initial work\n");
  execFileSync("git", ["add", "work.txt"], { cwd: root });
  execFileSync("git", ["commit", "-qm", "initial"], { cwd: root });
  mkdirSync(runPath, { recursive: true });
  cpSync(join(import.meta.dir, "run.json"), join(runPath, "run.json"));

  runEvidence("criterion-a");
  run(["transition", runPath, "complete"], 1, "criterion B has no evidence");

  writeFileSync(join(root, "work.txt"), "changed work\n");
  runEvidence("criterion-b");
  run(["transition", runPath, "complete"], 1, "criterion A is stale");

  runEvidence("criterion-a");
  run(["transition", runPath, "complete"], 0, "both criteria are fresh");

  const transition = readFileSync(join(runPath, "transitions.jsonl"), "utf8").trim();
  console.log(`\naccepted transition:\n${JSON.stringify(JSON.parse(transition), null, 2)}`);
} finally {
  rmSync(root, { recursive: true, force: true });
}

function runEvidence(criterionId: string): void {
  run(
    ["evidence", runPath, criterionId, "--", "bun", "-e", "process.exit(0)"],
    0,
    `${criterionId} passes`,
  );
}

function run(args: string[], expectedExitCode: number, label: string): void {
  console.log(`\n# ${label}\n$ eh ${args.join(" ")}`);
  const result = Bun.spawnSync(["bun", cliPath, ...args], {
    cwd: root,
    stdout: "pipe",
    stderr: "pipe",
  });
  process.stdout.write(result.stdout);
  process.stderr.write(result.stderr);
  if (result.exitCode !== expectedExitCode) {
    throw new Error(`expected exit ${expectedExitCode}, got ${result.exitCode}`);
  }
}
