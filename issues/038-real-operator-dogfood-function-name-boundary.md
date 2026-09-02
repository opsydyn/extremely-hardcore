# Reject unsafe generated function names

## problem

The adapter uses the public `functionName` option directly in `join(dist/api, functionName)`. Path separators and dot segments can redirect generated writes or produce an invalid function-app layout.

## impact

A build configuration value can cross the adapter's intended output boundary. The generated route and package metadata can also disagree with the files written on disk.

## expected behaviour

Reject an empty value, either path separator, NUL, or complete `.` and `..` values before any generated output is created. Existing valid single-segment names remain unchanged.

## scope

One validation guard, one source-shaped generator test, and one package README clarification. No runtime bridge, routing behavior, deployment, dependency, or Azure SDK change.

## verification

The unsafe-name regression fails before the guard, passes after it, and is followed by focused tests, root check/build, package lint, diff validation, and the completed EHS Run 6 protocol.
