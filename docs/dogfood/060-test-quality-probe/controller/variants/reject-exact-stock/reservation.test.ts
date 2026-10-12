import { expect, test } from "bun:test";
import { canReserve } from "./reservation";

test("available inventory can be reserved", () => {
  expect(canReserve(10, 2)).toBe(true);
});

test("reservations cannot exceed available inventory", () => {
  expect(canReserve(10, 11)).toBe(false);
  expect(canReserve(1, 2)).toBe(false);
});

test("exactly the available inventory can be reserved", () => {
  expect(canReserve(10, 10)).toBe(true);
  expect(canReserve(1, 1)).toBe(true);
});

test("stock must be non-negative and quantity must be positive", () => {
  for (const [stock, quantity] of [
    [0, 1], [-0, 1], [-1, 1], [-10, 2],
    [10, 0], [10, -0], [10, -1], [0, 0], [-1, -1],
  ]) {
    expect(canReserve(stock, quantity)).toBe(false);
  }
});

test("both inputs must be finite integers", () => {
  for (const invalid of [NaN, Infinity, -Infinity, 0.5, 1.5, -0.5]) {
    expect(canReserve(invalid, 1)).toBe(false);
    expect(canReserve(10, invalid)).toBe(false);
  }
});

test("finite integers are not restricted to safe integers", () => {
  expect(canReserve(1e100, 1)).toBe(true);
  expect(canReserve(1e100, 1e100)).toBe(true);
  expect(canReserve(1e100, 1e101)).toBe(false);
});
