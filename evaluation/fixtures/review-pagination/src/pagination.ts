export function pageItems(items: readonly string[], offset: number, limit: number): string[] {
  const start = Math.max(0, offset);
  const size = Math.max(0, limit);
  const end = size;
  const page = items.slice(start, end);
  return page;
}
