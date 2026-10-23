---
name: antares-builder
description: Build, adapt, fix, or review React interfaces with @godaddy/antares. Use for component selection and composition, forms, accessible interactions, responsive layouts, charts (including chart data and rendering bugs), and consumer setup. Do not use for authoring the Antares library itself.
metadata:
  version: "0.1.0"
  author: GoDaddy LLC
---

# Antares Builder

Build consumer UI with the public `@godaddy/antares` API. Choose the interaction before its appearance. Many components use React Aria Components (RAC); Antares's own exports, props and slots define the consumer contract.

Follow the steps relevant to the request. Load only the reference sections needed for the selected feature.

## Step 1 — Read the project context

Inspect `package.json`, the lockfile, framework configuration and existing components and pages in the consuming application. Identify the Antares version, package manager, routing, form library, CSS conventions and locale. Preserve those conventions when adapting existing UI.

Resolve the Antares version used by the consuming application and verify its public exports and types before using unfamiliar APIs. Use the [Antares repository](https://github.com/godaddy/antares) for documentation matching that version. When sources disagree, prioritize the installed public API over documentation and this skill's examples.

For installation, imports, CSS failures or server/client boundaries, read the relevant [setup](references/setup.md) sections.

Use public root or subpath imports. Do not derive Antares APIs from another design system or import `#components/*`, `dist` files or transitive internals.

## Step 2 — Choose the component by behavior

Identify the action, value, navigation or information the user needs. Read the relevant branch of the [component decision tree](references/component-decision-tree.md) when choosing a component or comparing alternatives. The decision tree and examples describe one point in Antares's release history. Before using a component the tree recommends, verify it — and the specific props/children an example shows — still exist in the installed version's public exports and types: a newer install may add components the tree doesn't list yet, and an older install may lack a component the tree recommends or expose different props for it. If no matching export exists, use the application's established solution or semantic HTML and explain the gap.

## Step 3 — Arrange and style the interface

For page structure, responsive behavior, typography, icons or sizing, read [layout and styling](references/layout-and-styling.md). Prefer Antares's existing variants and layout primitives. Responsive changes use the application's CSS media/container queries; Antares has no breakpoint prop syntax or mandatory provider.

## Step 4 — Compose the selected components

Read the relevant [composition patterns](references/composition-patterns.md) for slots and state, collections, disclosures, tabs, overlays, files or feedback. For any chart implementation or customization, read [charts](references/charts.md). Include the required children and wire controlled callbacks. A RAC base provides behavior but does not render missing Antares parts.

## Step 5 — Build complete forms

For form UI, follow [fields and validation](references/composition-patterns.md#fields-and-validation), then the selection, date or file sections as needed. Field roots own validation and relationships; `Input` and `TextArea` are controls within them. Integrate with the application's submission and error handling rather than introducing a second form architecture.

## Step 6 — Supply the accessibility the app owns

Provide visible field labels, names for icon-only controls and collections, suitable heading levels and image alternatives. Preserve the selected component's keyboard model, focus indicator and DOM semantics. For dialogs, follow the title, dismissal and focus contracts in [modal layers](references/composition-patterns.md#modal-layers). Check locale/RTL when the feature depends on direction or date/number formatting.

## Step 7 — Verify and deliver

Use the consumer project's task runner for appropriate type, lint, build and meaningful interaction checks. Verify labels, validation, overlay focus/return, loading/empty states and narrow layouts for the changed feature. Advice-only requests need focused API inspection rather than unrelated tasks.

For implementation, deliver runnable code with real imports and data flow, then briefly explain the component choices and any gap. For review, report actionable findings and minimal fixes.
