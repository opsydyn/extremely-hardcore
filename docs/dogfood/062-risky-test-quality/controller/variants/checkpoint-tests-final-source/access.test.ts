import { expect, test } from "bun:test";
import { canReadDocument } from "./access";

test("same-tenant reader has access", () => {
  expect(canReadDocument({ tenantId: "north", role: "reader" }, { tenantId: "north" })).toBe(true);
});

test("cross-tenant reader is denied", () => {
  expect(canReadDocument({ tenantId: "north", role: "reader" }, { tenantId: "south" })).toBe(false);
});

for (const role of ["reader", "admin"]) {
  for (const tenantId of ["north", "North", " north", "north ", "\tnorth\n", "north south", "n\u00f8rth"]) {
    test(`${role} can read an exactly matching valid ID ${JSON.stringify(tenantId)}`, () => {
      expect(canReadDocument({ tenantId, role }, { tenantId })).toBe(true);
    });
  }

  const mismatches = [
    ["north", "south"],
    ["south", "north"],
    ["north", "North"],
    ["North", "north"],
    [" north", "north"],
    ["north", " north"],
    ["north ", "north"],
    ["north", "north "],
    ["\tnorth\n", "north"],
    ["north", "\tnorth\n"],
    ["north south", "northsouth"],
    ["northsouth", "north south"],
    ["north", "northeast"],
    ["northeast", "north"],
  ];
  for (const [actorId, documentId] of mismatches) {
    test(`${role} is denied for unequal IDs ${JSON.stringify(actorId)} and ${JSON.stringify(documentId)}`, () => {
      expect(canReadDocument({ tenantId: actorId, role }, { tenantId: documentId })).toBe(false);
    });
  }

  for (const invalidId of ["", " ", "\t", "\n", "\r\n", " \t\n ", "\u00a0", "\u2003"]) {
    test(`${role} is denied with an invalid actor ID ${JSON.stringify(invalidId)}`, () => {
      expect(canReadDocument({ tenantId: invalidId, role }, { tenantId: "north" })).toBe(false);
    });
    test(`${role} is denied with an invalid document ID ${JSON.stringify(invalidId)}`, () => {
      expect(canReadDocument({ tenantId: "north", role }, { tenantId: invalidId })).toBe(false);
    });
    test(`${role} is denied even when invalid IDs match ${JSON.stringify(invalidId)}`, () => {
      expect(canReadDocument({ tenantId: invalidId, role }, { tenantId: invalidId })).toBe(false);
    });
  }
}

for (const role of ["", " ", "viewer", "owner", "superadmin", "administrator", "Reader", "ADMIN", " admin", "admin ", "reader\n", "reader admin", "admin,reader"]) {
  test(`unauthorised role ${JSON.stringify(role)} is denied even for matching valid IDs`, () => {
    expect(canReadDocument({ tenantId: "north", role }, { tenantId: "north" })).toBe(false);
  });
}
