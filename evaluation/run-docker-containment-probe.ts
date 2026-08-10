import { spawnSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

export type ProbeObservation = "blocked" | "succeeded" | "error";

export type ToolObservation = {
  available: boolean;
  version?: string;
  error?: string;
};

export type GuestProbeReport = {
  schemaVersion: 1;
  hostPath: string;
  filesystem: {
    absolute: ProbeObservation;
    traversal: ProbeObservation;
    symlink: ProbeObservation;
  };
  network: ProbeObservation;
  tools: {
    bun: ToolObservation;
    git: ToolObservation;
  };
};

export const DOCKER_CONTAINMENT_POLICY = {
  network: "none",
  readOnlyRoot: true,
  tmpfs: [
    "/workspace:rw,noexec,nosuid,nodev,uid=10001,gid=10001,mode=700",
    "/tmp:rw,noexec,nosuid,nodev,uid=10001,gid=10001,mode=700",
  ],
  user: "10001:10001",
  workdir: "/workspace",
  capDrop: "ALL",
  securityOpt: "no-new-privileges=true",
  pidsLimit: 128,
  memory: "512m",
  cpus: "1",
} as const;

const FORBIDDEN_ENV_NAMES = new Set([
  "ANTHROPIC_API_KEY",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AZURE_OPENAI_API_KEY",
  "CODEX_HOME",
  "GITHUB_TOKEN",
  "GOOGLE_APPLICATION_CREDENTIALS",
  "OPENAI_API_KEY",
]);

export type DockerInspect = Record<string, unknown>;

export type DockerCreateArgs = {
  containerName: string;
  image: string;
  hostPath: string;
};

export function buildDockerCreateArgs(input: DockerCreateArgs): string[] {
  return [
    "create",
    "--name",
    input.containerName,
    "--network",
    DOCKER_CONTAINMENT_POLICY.network,
    "--read-only",
    "--tmpfs",
    DOCKER_CONTAINMENT_POLICY.tmpfs[0],
    "--tmpfs",
    DOCKER_CONTAINMENT_POLICY.tmpfs[1],
    "--cap-drop",
    DOCKER_CONTAINMENT_POLICY.capDrop,
    "--security-opt",
    DOCKER_CONTAINMENT_POLICY.securityOpt,
    "--pids-limit",
    String(DOCKER_CONTAINMENT_POLICY.pidsLimit),
    "--memory",
    DOCKER_CONTAINMENT_POLICY.memory,
    "--cpus",
    DOCKER_CONTAINMENT_POLICY.cpus,
    "--user",
    DOCKER_CONTAINMENT_POLICY.user,
    "--workdir",
    DOCKER_CONTAINMENT_POLICY.workdir,
    input.image,
    "bun",
    "/opt/containment-probe.ts",
    input.hostPath,
  ];
}

export type ContainmentClassification = {
  status: "passed" | "failed";
  failures: string[];
};

export function classifyContainmentRun(input: {
  inspect: DockerInspect;
  guest: GuestProbeReport;
}): ContainmentClassification {
  const failures = inspectPolicyFailures(input.inspect);

  for (const [name, status] of [
    ["filesystem.absolute", input.guest.filesystem.absolute],
    ["filesystem.traversal", input.guest.filesystem.traversal],
    ["filesystem.symlink", input.guest.filesystem.symlink],
    ["network", input.guest.network],
  ] as const) {
    if (status !== "blocked") {
      failures.push(`${name} was not blocked`);
    }
  }

  return {
    status: failures.length === 0 ? "passed" : "failed",
    failures,
  };
}

export type CommandResult = {
  executable: string;
  args: string[];
  status: number | null;
  stdout: string;
  stderr: string;
  error?: string;
};

export type DockerContainmentProbeOptions = {
  outputDir: string;
  profile: string;
  context: string;
  image: string;
  hostPath: string;
  limaConfigPath: string;
  dockerExecutable?: string;
  colimaExecutable?: string;
};

export type ContainmentEvidenceFile = {
  path: string;
  bytes: number;
};

export type DockerContainmentProbeReport = {
  schemaVersion: 1;
  probeId: "docker-colima-containment";
  status: "passed" | "failed";
  profile: string;
  context: string;
  image: string;
  imageId?: string;
  hostPath: string;
  containerName: string;
  policy: typeof DOCKER_CONTAINMENT_POLICY;
  guest?: GuestProbeReport;
  classification?: ContainmentClassification;
  failures: string[];
  evidenceFiles: ContainmentEvidenceFile[];
};

export function runDockerContainmentProbe(
  options: DockerContainmentProbeOptions,
): DockerContainmentProbeReport {
  const outputDir = resolve(options.outputDir);
  const hostPath = resolve(options.hostPath);
  const limaConfigPath = resolve(options.limaConfigPath);
  if (existsSync(outputDir)) {
    throw new Error(`output directory already exists: ${outputDir}`);
  }
  if (!options.profile || !options.context || !options.image) {
    throw new Error("profile, context, and image are required");
  }
  if (!isAbsolute(options.hostPath) || !isAbsolute(options.limaConfigPath)) {
    throw new Error("host path and Lima config path must be absolute");
  }
  if (!existsSync(hostPath)) {
    throw new Error(`host path does not exist: ${hostPath}`);
  }
  if (!existsSync(limaConfigPath)) {
    throw new Error(`Lima config does not exist: ${limaConfigPath}`);
  }

  mkdirSync(outputDir, { recursive: true });
  const dockerExecutable = options.dockerExecutable ?? "docker";
  const colimaExecutable = options.colimaExecutable ?? "colima";
  const commands: CommandResult[] = [];
  const containerName = `eh-containment-${randomUUID()}`;
  let imageId: string | undefined;
  let guest: GuestProbeReport | undefined;
  let classification: ContainmentClassification | undefined;
  const failures: string[] = [];
  let containerCreated = false;

  const execute = (executable: string, args: string[]): CommandResult => {
    const result = runCommand(executable, args);
    commands.push(result);
    return result;
  };
  const docker = (args: string[]): CommandResult => execute(dockerExecutable, ["--context", options.context, ...args]);

  try {
    writeFileSync(join(outputDir, "effective-lima.yaml"), readFileSync(limaConfigPath));
    writeCommandFile(outputDir, "colima-list", execute(colimaExecutable, ["list"]));
    const profileStatus = execute(colimaExecutable, ["status", options.profile]);
    writeCommandFile(outputDir, "colima-status", profileStatus);
    requireSuccess(profileStatus, `Colima profile ${options.profile} is not available`);

    const contextInspect = docker(["context", "inspect", options.context]);
    writeCommandFile(outputDir, "docker-context-inspect", contextInspect);
    requireSuccess(contextInspect, `Docker context ${options.context} could not be inspected`);

    const dockerVersion = docker(["version", "--format", "{{json .}}"]);
    writeCommandFile(outputDir, "docker-version", dockerVersion);
    requireSuccess(dockerVersion, "Docker version check failed");

    const dockerInfo = docker(["info", "--format", "{{json .}}"]);
    writeCommandFile(outputDir, "docker-info", dockerInfo);
    requireSuccess(dockerInfo, "Docker daemon is not available");

    const imageInspect = docker(["image", "inspect", options.image]);
    writeCommandFile(outputDir, "docker-image-inspect", imageInspect);
    requireSuccess(imageInspect, `Docker image could not be inspected: ${options.image}`);
    imageId = readImageId(imageInspect.stdout);

    const create = docker(buildDockerCreateArgs({
      containerName,
      image: options.image,
      hostPath,
    }));
    writeCommandFile(outputDir, "docker-create", create);
    requireSuccess(create, "Docker container could not be created");
    containerCreated = true;

    const beforeInspectResult = docker(["inspect", containerName]);
    writeCommandFile(outputDir, "docker-inspect-before", beforeInspectResult);
    requireSuccess(beforeInspectResult, "Docker container could not be inspected before start");
    const beforeInspect = parseDockerInspect(beforeInspectResult.stdout);
    const beforeClassification = inspectPolicyOnly(beforeInspect);
    if (beforeClassification.length > 0) {
      throw new Error(`container policy failed before start: ${beforeClassification.join("; ")}`);
    }

    const start = docker(["start", containerName]);
    writeCommandFile(outputDir, "docker-start", start);
    requireSuccess(start, "Docker container could not be started");

    const wait = docker(["wait", containerName]);
    writeCommandFile(outputDir, "docker-wait", wait);

    const logs = docker(["logs", containerName]);
    writeCommandFile(outputDir, "docker-logs", logs);
    writeFileSync(join(outputDir, "guest-stdout.log"), logs.stdout);
    writeFileSync(join(outputDir, "guest-stderr.log"), logs.stderr);
    requireSuccess(wait, "Docker container did not finish cleanly");
    if (wait.stdout.trim() !== "0") {
      throw new Error(`guest probe exited with status ${wait.stdout.trim()}`);
    }
    requireSuccess(logs, "Docker guest output could not be retained");
    guest = parseGuestProbeOutput(logs.stdout);
    writeFileSync(join(outputDir, "guest-report.json"), `${JSON.stringify(guest, null, 2)}\n`);

    const afterInspectResult = docker(["inspect", containerName]);
    writeCommandFile(outputDir, "docker-inspect-after", afterInspectResult);
    requireSuccess(afterInspectResult, "Docker container could not be inspected after run");
    const afterInspect = parseDockerInspect(afterInspectResult.stdout);
    writeFileSync(join(outputDir, "container-inspect-after.json"), `${JSON.stringify(afterInspect, null, 2)}\n`);
    classification = classifyContainmentRun({ inspect: afterInspect, guest });
    if (classification.status === "failed") {
      failures.push(...classification.failures);
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  } finally {
    if (containerCreated) {
      const remove = execute(dockerExecutable, ["--context", options.context, "rm", "--force", containerName]);
      writeCommandFile(outputDir, "docker-remove", remove);
      if (remove.status !== 0) {
        failures.push("Docker container cleanup failed");
      }
    }
    writeFileSync(join(outputDir, "commands.json"), `${JSON.stringify(commands, null, 2)}\n`);
  }

  const report: DockerContainmentProbeReport = {
    schemaVersion: 1,
    probeId: "docker-colima-containment",
    status: failures.length === 0 && classification?.status === "passed" ? "passed" : "failed",
    profile: options.profile,
    context: options.context,
    image: options.image,
    ...(imageId ? { imageId } : {}),
    hostPath,
    containerName,
    policy: DOCKER_CONTAINMENT_POLICY,
    ...(guest ? { guest } : {}),
    ...(classification ? { classification } : {}),
    failures,
    evidenceFiles: listEvidenceFiles(outputDir),
  };
  writeFileSync(join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

function inspectPolicyOnly(inspect: DockerInspect): string[] {
  return inspectPolicyFailures(inspect);
}

function inspectPolicyFailures(inspect: DockerInspect): string[] {
  const config = asRecord(inspect.Config);
  const hostConfig = asRecord(inspect.HostConfig);
  const failures: string[] = [];
  if (hostConfig.NetworkMode !== DOCKER_CONTAINMENT_POLICY.network) {
    failures.push("container network mode must be none");
  }
  if (hostConfig.ReadonlyRootfs !== DOCKER_CONTAINMENT_POLICY.readOnlyRoot) {
    failures.push("container root filesystem must be read-only");
  }
  if (config.User !== DOCKER_CONTAINMENT_POLICY.user) {
    failures.push("container user must be 10001:10001");
  }
  if (config.WorkingDir !== DOCKER_CONTAINMENT_POLICY.workdir) {
    failures.push("container working directory must be /workspace");
  }
  if (hostConfig.Privileged !== false) {
    failures.push("container must not be privileged");
  }
  if (!asStringArray(hostConfig.CapDrop).includes(DOCKER_CONTAINMENT_POLICY.capDrop)) {
    failures.push("container must drop all capabilities");
  }
  if (asStringArray(hostConfig.CapAdd).length > 0) {
    failures.push("container must not add capabilities");
  }
  if (!asStringArray(hostConfig.SecurityOpt).includes(DOCKER_CONTAINMENT_POLICY.securityOpt)) {
    failures.push("container must enable no-new-privileges");
  }
  if (hostConfig.PidsLimit !== DOCKER_CONTAINMENT_POLICY.pidsLimit) {
    failures.push("container PID limit must be 128");
  }
  if (hostConfig.Memory !== 512 * 1024 * 1024) {
    failures.push("container memory limit must be 512 MiB");
  }
  if (hostConfig.NanoCpus !== 1_000_000_000) {
    failures.push("container CPU limit must be 1 CPU");
  }
  if (hostConfig.PidMode === "host") {
    failures.push("container must not use host PID namespace");
  }
  if (hostConfig.IpcMode === "host") {
    failures.push("container must not use host IPC namespace");
  }
  if (hostConfig.UsernsMode === "host") {
    failures.push("container must not use the host user namespace");
  }
  if (asStringArray(hostConfig.VolumesFrom).length > 0) {
    failures.push("container must not inherit volumes from another container");
  }
  if (isNonEmptyArray(hostConfig.Devices) || isNonEmptyArray(hostConfig.DeviceRequests)) {
    failures.push("container must not receive host devices");
  }
  for (const environment of asStringArray(config.Env)) {
    const name = environment.split("=", 1)[0] ?? "";
    if (FORBIDDEN_ENV_NAMES.has(name)) {
      failures.push(`container must not receive provider credential environment: ${name}`);
    }
  }
  failures.push(...mountPolicyFailures(inspect, hostConfig));
  return failures;
}

function mountPolicyFailures(
  inspect: DockerInspect,
  hostConfig: Record<string, unknown>,
): string[] {
  const failures: string[] = [];
  const expectedTmpfs = {
    "/tmp": "rw,noexec,nosuid,nodev,uid=10001,gid=10001,mode=700",
    "/workspace": "rw,noexec,nosuid,nodev,uid=10001,gid=10001,mode=700",
  };
  const actualTmpfs = asRecord(hostConfig.Tmpfs);
  if (JSON.stringify(sortRecord(actualTmpfs)) !== JSON.stringify(sortRecord(expectedTmpfs))) {
    failures.push("container mounts must be exactly the two requested tmpfs mounts");
  }

  const mounts = Array.isArray(inspect.Mounts) ? inspect.Mounts.map(asRecord) : [];
  if (mounts.some((mount) => mount.Type !== "tmpfs")) {
    failures.push("container must not have non-tmpfs mounts");
  }
  const mountDestinations = mounts
    .map((mount) => mount.Destination)
    .filter((destination): destination is string => typeof destination === "string")
    .sort();
  if (
    mountDestinations.length > 0 &&
    JSON.stringify(mountDestinations) !== JSON.stringify(["/tmp", "/workspace"])
  ) {
    failures.push("container tmpfs destinations are unexpected");
  }
  if (asStringArray(hostConfig.Binds).length > 0) {
    failures.push("container must not have host bind mounts");
  }
  return failures;
}

function sortRecord(record: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(record).sort(([left], [right]) => left.localeCompare(right)));
}

function runCommand(executable: string, args: string[]): CommandResult {
  const result = spawnSync(executable, args, { encoding: "utf8" });
  return {
    executable,
    args,
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    ...(result.error ? { error: result.error.message } : {}),
  };
}

function requireSuccess(result: CommandResult, message: string): void {
  if (result.error || result.status !== 0) {
    const detail = result.error ?? (result.stderr.trim() || `exit status ${String(result.status)}`);
    throw new Error(`${message}: ${detail}`);
  }
}

function writeCommandFile(outputDir: string, name: string, result: CommandResult): void {
  writeFileSync(join(outputDir, `${name}.json`), `${JSON.stringify(result, null, 2)}\n`);
}

function readImageId(output: string): string {
  const parsed = JSON.parse(output) as unknown;
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Docker image inspect returned no image");
  }
  const image = asRecord(parsed[0]);
  if (typeof image.Id !== "string" || image.Id.length === 0) {
    throw new Error("Docker image inspect did not return an image ID");
  }
  return image.Id;
}

function parseDockerInspect(output: string): DockerInspect {
  const parsed = JSON.parse(output) as unknown;
  if (!Array.isArray(parsed) || parsed.length !== 1 || !isRecord(parsed[0])) {
    throw new Error("Docker inspect must return exactly one container");
  }
  return parsed[0];
}

function parseGuestProbeOutput(output: string): GuestProbeReport {
  for (const line of output.trim().split(/\r?\n/).reverse()) {
    try {
      const parsed = JSON.parse(line) as unknown;
      if (isGuestProbeReport(parsed)) {
        return parsed;
      }
    } catch {
      // Ignore non-JSON diagnostic lines and continue looking for the report.
    }
  }
  throw new Error("guest output did not contain a valid probe report");
}

function isGuestProbeReport(value: unknown): value is GuestProbeReport {
  if (!isRecord(value) || value.schemaVersion !== 1 || typeof value.hostPath !== "string") {
    return false;
  }
  const filesystem = asRecord(value.filesystem);
  return (
    isObservation(filesystem.absolute) &&
    isObservation(filesystem.traversal) &&
    isObservation(filesystem.symlink) &&
    isObservation(value.network) &&
    isRecord(value.tools)
  );
}

function isObservation(value: unknown): value is ProbeObservation {
  return value === "blocked" || value === "succeeded" || value === "error";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function isNonEmptyArray(value: unknown): boolean {
  return Array.isArray(value) && value.length > 0;
}

function listEvidenceFiles(outputDir: string): ContainmentEvidenceFile[] {
  return readdirSync(outputDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const path = join(outputDir, entry.name);
      return { path: entry.name, bytes: statSync(path).size };
    })
    .sort((left, right) => left.path.localeCompare(right.path));
}

export function parseContainmentArgs(args: string[]): Omit<DockerContainmentProbeOptions, "dockerExecutable" | "colimaExecutable"> {
  const values = new Map<string, string>();
  for (let index = 0; index < args.length; index += 2) {
    const flag = args[index];
    const value = args[index + 1];
    if (!flag || !flag.startsWith("--") || !value || value.startsWith("--")) {
      throw new Error("usage: bun run evaluate:docker-containment -- --output-dir <new-dir> --profile <name> --context <docker-context> --image <image> --host-path <absolute-path> --lima-config <absolute-path>");
    }
    if (values.has(flag)) {
      throw new Error(`duplicate argument: ${flag}`);
    }
    values.set(flag, value);
  }
  const required = ["--output-dir", "--profile", "--context", "--image", "--host-path", "--lima-config"];
  const missing = required.find((flag) => !values.has(flag));
  if (missing) {
    throw new Error(`missing required argument: ${missing}`);
  }
  if ([...values.keys()].some((flag) => !required.includes(flag))) {
    throw new Error("unknown argument");
  }
  return {
    outputDir: values.get("--output-dir")!,
    profile: values.get("--profile")!,
    context: values.get("--context")!,
    image: values.get("--image")!,
    hostPath: values.get("--host-path")!,
    limaConfigPath: values.get("--lima-config")!,
  };
}
