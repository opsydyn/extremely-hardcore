import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function computeWorkspaceFingerprint(startPath: string): string {
  const root = findWorkspaceRoot(startPath);
  const head = gitText(root, ["rev-parse", "HEAD"]);
  const pathspec = [".", ":(exclude).extremely-hardcore/**"];
  const diff = gitBuffer(root, ["diff", "--binary", "HEAD", "--", ...pathspec]);
  const untracked = gitText(root, [
    "ls-files",
    "--others",
    "--exclude-standard",
    "-z",
    "--",
    ...pathspec,
  ])
    .split("\0")
    .filter(Boolean)
    .sort();

  const hash = createHash("sha256").update(head).update("\0").update(diff);
  for (const path of untracked) {
    hash.update("\0").update(path).update("\0").update(readFileSync(join(root, path)));
  }

  return hash.digest("hex");
}

export function findWorkspaceRoot(startPath: string): string {
  return gitText(startPath, ["rev-parse", "--show-toplevel"]).trim();
}

function gitText(cwd: string, args: string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf8" });
}

function gitBuffer(cwd: string, args: string[]): Buffer {
  return execFileSync("git", args, { cwd, encoding: "buffer" });
}
