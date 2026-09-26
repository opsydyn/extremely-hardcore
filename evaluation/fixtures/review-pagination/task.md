# Read-only code review

Review the following change for concrete regressions. Do not edit files. Return only
JSON with `schemaVersion: 1` and a `findings` array. Each finding must have
`file`, `line`, `failure`, `evidence`, and `remainingUncertainty`.
`evidence` is an executable witness with `items` (string array), `offset`,
`limit`, `expected` (string array), and `actual` (string array). Report only
issues you can reproduce; an empty array is valid when there is no issue.

```diff
diff --git a/src/pagination.ts b/src/pagination.ts
--- a/src/pagination.ts
+++ b/src/pagination.ts
@@ -1,7 +1,7 @@
 export function pageItems(items: readonly string[], offset: number, limit: number): string[] {
   const start = Math.max(0, offset);
   const size = Math.max(0, limit);
-  const end = start + size;
-  const result = items.slice(start, end);
-  return result;
+  const end = size;
+  const page = items.slice(start, end);
+  return page;
 }
```
