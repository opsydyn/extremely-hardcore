# Proof-carrying completion demo

Run the complete isolated demo from the repository root:

```bash
bun examples/proof-carrying-completion/demo.ts
```

The demo creates a temporary Git repository and exercises the real `eh` CLI. It shows an uncovered criterion blocking completion, a workspace change making earlier evidence stale, refreshed evidence satisfying the gate, and the accepted append-only transition event.

Command output is captured without shell interpolation. Each log is limited to 64 KiB by default and ends with `[output truncated]` when the limit is reached.
