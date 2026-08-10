import { expect, test } from "bun:test";
import { runDogfood } from "../../evaluation/run-dogfood";

test("exercises ten controlled dogfood cases and records the limitation", async () => {
  const report = await runDogfood();

  expect(report.controlled).toBe(true);
  expect(report.cases).toHaveLength(10);
  expect(report.summary).toEqual({ total: 10, passed: 10, failed: 0, falseBlocks: 0 });
  expect(report.limitations).toContain("controlled temporary repositories are not real operator dogfood");
});
