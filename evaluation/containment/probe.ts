import { readFileSync, symlinkSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

type Observation = "blocked" | "succeeded" | "error";

const hostPath = process.argv[2];
if (!hostPath) {
  throw new Error("host path argument is required");
}

const absolute = attemptRead(hostPath);
const traversal = attemptRead(resolve("/workspace", "..", hostPath.replace(/^\/+/, "")));
const symlinkPath = "/tmp/extremely-hardcore-host-path-link";
let symlink: Observation;
try {
  try {
    unlinkSync(symlinkPath);
  } catch {
    // The link is disposable probe state.
  }
  symlinkSync(hostPath, symlinkPath);
  symlink = attemptRead(symlinkPath);
} catch {
  symlink = "error";
} finally {
  try {
    unlinkSync(symlinkPath);
  } catch {
    // The link may not have been created.
  }
}

let network: Observation;
try {
  const response = await fetch("http://example.com", {
    signal: AbortSignal.timeout(1_500),
  });
  network = response.ok || response.status > 0 ? "succeeded" : "error";
} catch {
  network = "blocked";
}

const report = {
  schemaVersion: 1 as const,
  hostPath,
  filesystem: { absolute, traversal, symlink },
  network,
  tools: {
    bun: { available: true, version: Bun.version },
    git: toolVersion("git"),
  },
};

process.stdout.write(`${JSON.stringify(report)}\n`);

function attemptRead(path: string): Observation {
  try {
    readFileSync(path);
    return "succeeded";
  } catch {
    return "blocked";
  }
}

function toolVersion(command: string): { available: boolean; version?: string; error?: string } {
  try {
    const result = Bun.spawnSync([command, "--version"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const stdout = new TextDecoder().decode(result.stdout).trim();
    const stderr = new TextDecoder().decode(result.stderr).trim();
    if (result.exitCode === 0) {
      return { available: true, version: stdout || stderr || "unknown" };
    }
    return { available: false, error: stderr || `exit status ${String(result.exitCode)}` };
  } catch (error) {
    return { available: false, error: error instanceof Error ? error.message : String(error) };
  }
}

