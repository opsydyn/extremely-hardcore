import { lstatSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

export function acceptsStagedSkillRead(input: unknown, skillRoot: string, cwd: string): boolean {
  if (!input || typeof input !== "object") return false;
  const item = input as Record<string, unknown>;
  if (item.type !== "commandExecution" || typeof item.cwd !== "string" || typeof item.command !== "string") return false;
  // A capture predicate, not execution prevention. Action metadata is best-effort;
  // inspect only this deliberately restricted literal grammar, never eval a shell.
  let command = item.command;
  const wrapper = command.match(/^\/bin\/zsh -lc '([^'\r\n]+)'$/);
  if (wrapper) command = wrapper[1]!;
  const token = String.raw`(?:[A-Za-z0-9_./-]+|'[A-Za-z0-9_./-]+'|"[A-Za-z0-9_./-]+")`;
  const match = command.match(new RegExp(`^(?:cat|/bin/cat) (${token}(?: ${token})*)$`));
  if (!match) return false;
  const paths = match[1]!.split(" ").map((path) => /^["']/.test(path) ? path.slice(1, -1) : path);
  try {
    const base = realpathSync(cwd);
    const root = realpathSync(skillRoot);
    if (realpathSync(item.cwd) !== base || !root.startsWith(base + sep)) return false;
    return paths.every((path) => {
      if (path.startsWith("-") || path.split("/").includes("..")) return false;
      const absolute = resolve(base, path);
      const suffix = relative(root, absolute);
      if (!suffix || isAbsolute(suffix) || suffix.split(sep).includes("..")) return false;
      let current = root;
      for (const part of suffix.split(sep)) {
        current = join(current, part);
        if (lstatSync(current).isSymbolicLink()) return false;
      }
      return lstatSync(absolute).isFile() && realpathSync(absolute).startsWith(root + sep);
    });
  } catch { return false; }
}
