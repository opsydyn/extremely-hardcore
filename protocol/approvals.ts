import { randomUUID } from "node:crypto";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SCHEMA_VERSION } from "./schema-version";
import type { ApprovalRecord, ApprovalDecision } from "./types";

export type RecordApprovalOptions = {
  approver: string;
  decision: ApprovalDecision;
  gate: "complete";
  workspaceFingerprint: string;
  reason: string;
};

export function recordApproval(runPath: string, options: RecordApprovalOptions): ApprovalRecord {
  if (!options.approver.trim() || !options.reason.trim()) {
    throw new Error("approval approver and reason are required");
  }
  const approval: ApprovalRecord = {
    schemaVersion: SCHEMA_VERSION,
    approvalId: randomUUID(),
    approver: options.approver.trim(),
    decision: options.decision,
    gate: options.gate,
    at: new Date().toISOString(),
    workspaceFingerprint: options.workspaceFingerprint,
    reason: options.reason.trim(),
  };
  appendFileSync(join(runPath, "approvals.jsonl"), `${JSON.stringify(approval)}\n`);
  return approval;
}

export function readApprovals(runPath: string): ApprovalRecord[] {
  const path = join(runPath, "approvals.jsonl");
  if (!existsSync(path)) {
    return [];
  }
  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as ApprovalRecord);
}
