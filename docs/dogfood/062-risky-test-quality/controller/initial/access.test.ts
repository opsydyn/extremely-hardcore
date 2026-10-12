import { expect, test } from "bun:test";
import { canReadDocument } from "./access";

test("same-tenant reader has access", () => {
  expect(canReadDocument({ tenantId: "north", role: "reader" }, { tenantId: "north" })).toBeTruthy();
});

test("cross-tenant reader is denied", () => {
  expect(canReadDocument({ tenantId: "north", role: "reader" }, { tenantId: "south" })).toBe(false);
});
