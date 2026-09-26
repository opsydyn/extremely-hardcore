import { pageItems } from "./fixtures/review-pagination/src/pagination";

export const REVIEW_OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "findings"],
  properties: {
    schemaVersion: { type: "integer", const: 1 },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["file", "line", "failure", "evidence", "remainingUncertainty"],
        properties: {
          file: { type: "string" },
          line: { type: "integer" },
          failure: { type: "string" },
          remainingUncertainty: { type: "string" },
          evidence: {
            type: "object",
            additionalProperties: false,
            required: ["items", "offset", "limit", "expected", "actual"],
            properties: {
              items: { type: "array", items: { type: "string" } },
              offset: { type: "integer" },
              limit: { type: "integer" },
              expected: { type: "array", items: { type: "string" } },
              actual: { type: "array", items: { type: "string" } },
            },
          },
        },
      },
    },
  },
} as const;

type Finding = {
  file: string;
  line: number;
  failure: string;
  evidence: { items: string[]; offset: number; limit: number; expected: string[]; actual: string[] };
  remainingUncertainty: string;
};

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasKeys(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).sort().join("|") === [...keys].sort().join("|");
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function finding(value: unknown): value is Finding {
  if (!record(value) || !hasKeys(value, ["file", "line", "failure", "evidence", "remainingUncertainty"])) return false;
  if (typeof value.file !== "string" || !Number.isSafeInteger(value.line) ||
      typeof value.failure !== "string" || !value.failure.trim() ||
      typeof value.remainingUncertainty !== "string" || !value.remainingUncertainty.trim() ||
      !record(value.evidence) ||
      !hasKeys(value.evidence, ["items", "offset", "limit", "expected", "actual"])) return false;
  const evidence = value.evidence;
  return stringArray(evidence.items) && stringArray(evidence.expected) && stringArray(evidence.actual) &&
    Number.isSafeInteger(evidence.offset) && Number.isSafeInteger(evidence.limit);
}

export function scoreReview(input: unknown): { status: "passed" | "failed" | "invalid"; reasons: string[] } {
  if (!record(input) || !hasKeys(input, ["schemaVersion", "findings"]) ||
      input.schemaVersion !== 1 || !Array.isArray(input.findings) || !input.findings.every(finding)) {
    return { status: "invalid", reasons: ["response does not match the review output contract"] };
  }
  if (input.findings.length !== 1) {
    return { status: "failed", reasons: ["required finding missing or unsupported extra finding present"] };
  }
  const found = input.findings[0] as Finding;
  const witness = found.evidence;
  const expected = witness.items.slice(witness.offset, witness.offset + witness.limit);
  const actual = pageItems(witness.items, witness.offset, witness.limit);
  const validWitness = witness.offset > 0 && witness.limit > 0 &&
    witness.offset + witness.limit <= witness.items.length &&
    expected.length > 0 && JSON.stringify(expected) !== JSON.stringify(actual) &&
    JSON.stringify(witness.expected) === JSON.stringify(expected) &&
    JSON.stringify(witness.actual) === JSON.stringify(actual);
  return found.file === "src/pagination.ts" && found.line === 4 && validWitness
    ? { status: "passed", reasons: [] }
    : { status: "failed", reasons: ["finding location or executable witness is unsupported"] };
}
