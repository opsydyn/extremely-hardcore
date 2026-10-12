# Inventory reservation

`canReserve(stock, quantity)` is a pure availability check. It must return true
only when stock and quantity are finite integers, stock is non-negative,
quantity is positive, and the quantity does not exceed stock. Reserving exactly
the available stock is allowed. All other numeric inputs return false.

The current check can approve reservations larger than available inventory.
Fix that defect without changing the public function signature or adding
dependencies. Use the existing Bun test setup. This fixture has no persistence,
external service, UI or concurrency contract.
