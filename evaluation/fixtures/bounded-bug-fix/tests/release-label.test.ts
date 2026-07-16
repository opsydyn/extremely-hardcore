import { expect, test } from "bun:test";
import { releaseLabel } from "../src/release-label";

test("prefixes a trimmed release label", () => {
  expect(releaseLabel("  Candidate  ")).toBe("release:Candidate");
});
