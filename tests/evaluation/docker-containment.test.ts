import { expect, test } from "bun:test";
import {
  buildDockerCreateArgs,
  classifyContainmentRun,
  parseContainmentArgs,
  type GuestProbeReport,
} from "../../evaluation/run-docker-containment-probe";

const blockedGuest: GuestProbeReport = {
  schemaVersion: 1,
  hostPath: "/Users/alancurrie/.codex/memories/MEMORY.md",
  filesystem: {
    absolute: "blocked",
    traversal: "blocked",
    symlink: "blocked",
  },
  network: "blocked",
  tools: {
    bun: { available: true, version: "1.3.11" },
    git: { available: true, version: "git version 2.47.0" },
  },
};

const hardenedInspect = {
  Config: { User: "10001:10001", WorkingDir: "/workspace" },
  HostConfig: {
    NetworkMode: "none",
    ReadonlyRootfs: true,
    CapDrop: ["ALL"],
    CapAdd: [],
    SecurityOpt: ["no-new-privileges=true"],
    PidsLimit: 128,
    Memory: 536870912,
    NanoCpus: 1000000000,
    Privileged: false,
    Tmpfs: {
      "/tmp": "rw,noexec,nosuid,nodev,uid=10001,gid=10001,mode=700",
      "/workspace": "rw,noexec,nosuid,nodev,uid=10001,gid=10001,mode=700",
    },
  },
  Mounts: [],
};

test("Docker create policy has no host ingress and applies explicit limits", () => {
  const args = buildDockerCreateArgs({
    containerName: "eh-containment-test",
    image: "extremely-hardcore/containment-probe:test",
    hostPath: "/Users/alancurrie/.codex/memories/MEMORY.md",
  });

  expect(args).toEqual(
    expect.arrayContaining([
      "--network",
      "none",
      "--read-only",
      "--cap-drop",
      "ALL",
      "--security-opt",
      "no-new-privileges=true",
      "--pids-limit",
      "128",
      "--memory",
      "512m",
      "--cpus",
      "1",
      "--user",
      "10001:10001",
      "--workdir",
      "/workspace",
    ]),
  );
  expect(args).toContain("--tmpfs");
  expect(args).not.toContain("--privileged");
  expect(args).not.toContain("--volume");
  expect(args).not.toContain("--mount");
  expect(args).not.toContain("--env");
  expect(args).not.toContain("--network=host");
});

test("classification passes only when policy and all denial probes pass", () => {
  expect(classifyContainmentRun({ inspect: hardenedInspect, guest: blockedGuest })).toEqual({
    status: "passed",
    failures: [],
  });
});

test("classification fails closed when a forbidden read succeeds", () => {
  const result = classifyContainmentRun({
    inspect: hardenedInspect,
    guest: {
      ...blockedGuest,
      filesystem: { ...blockedGuest.filesystem, symlink: "succeeded" },
    },
  });

  expect(result.status).toBe("failed");
  expect(result.failures).toContain("filesystem.symlink was not blocked");
});

test("classification fails closed when inspect evidence omits a required policy", () => {
  const result = classifyContainmentRun({
    inspect: {
      ...hardenedInspect,
      HostConfig: { ...hardenedInspect.HostConfig, Tmpfs: undefined },
    },
    guest: blockedGuest,
  });

  expect(result.status).toBe("failed");
  expect(result.failures).toContain("container mounts must be exactly the two requested tmpfs mounts");
});

test("classification rejects provider credentials or host namespaces in inspect evidence", () => {
  const result = classifyContainmentRun({
    inspect: {
      ...hardenedInspect,
      Config: {
        ...hardenedInspect.Config,
        Env: ["PATH=/usr/bin", "OPENAI_API_KEY=unexpected"],
      },
      HostConfig: {
        ...hardenedInspect.HostConfig,
        PidMode: "host",
      },
    },
    guest: blockedGuest,
  });

  expect(result.status).toBe("failed");
  expect(result.failures).toEqual(
    expect.arrayContaining([
      "container must not use host PID namespace",
      "container must not receive provider credential environment: OPENAI_API_KEY",
    ]),
  );
});

test("operator arguments require explicit profile, context, image, paths, and a new output directory", () => {
  expect(
    parseContainmentArgs([
      "--output-dir",
      "/tmp/evidence",
      "--profile",
      "eh-containment",
      "--context",
      "colima-eh-containment",
      "--image",
      "extremely-hardcore/containment-probe:test",
      "--host-path",
      "/Users/alancurrie/.codex/memories/MEMORY.md",
      "--lima-config",
      "/Users/alancurrie/.colima/_lima/eh-containment/lima.yaml",
    ]),
  ).toEqual({
    outputDir: "/tmp/evidence",
    profile: "eh-containment",
    context: "colima-eh-containment",
    image: "extremely-hardcore/containment-probe:test",
    hostPath: "/Users/alancurrie/.codex/memories/MEMORY.md",
    limaConfigPath: "/Users/alancurrie/.colima/_lima/eh-containment/lima.yaml",
  });
  expect(() => parseContainmentArgs(["--output-dir", "/tmp/evidence"])).toThrow(
    "missing required argument: --profile",
  );
});
