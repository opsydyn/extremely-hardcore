export function canReserve(stock: number, quantity: number): boolean {
  if (!Number.isInteger(stock) || !Number.isInteger(quantity)) return false;
  if (stock < 0 || quantity <= 0) return false;
  return quantity <= stock;
}
