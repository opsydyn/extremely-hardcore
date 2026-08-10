import type { Risk, RiskAssessment, RiskFactor, RiskLevel } from "./types";

export const RISK_FACTORS: readonly RiskFactor[] = [
  "blast-radius",
  "reversibility",
  "data-sensitivity",
  "privilege",
  "public-contract",
  "operational-impact",
  "uncertainty",
];

export function classifyRisk(assessment: RiskAssessment): Risk {
  const levels = RISK_FACTORS.map((factor) => assessment.factors[factor]).filter(
    (level): level is RiskLevel => level !== undefined,
  );
  if (levels.includes("high") || levels.filter((level) => level === "medium").length >= 2) {
    return "high";
  }
  if (levels.includes("medium")) {
    return "standard";
  }
  return "trivial";
}
