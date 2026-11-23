# Bundle Size PDR

Status: **Implemented**

## Purpose

Bundle analysis helps contributors understand the cost of public imports and review changes that increase it. It provides two views: the build output a package produces, and the JavaScript, CSS and assets a consumer receives when bundling a particular import.

Interactive reports explain where the bytes come from. Package-owned budgets make reviewed limits enforceable locally and in CI. Analysis uses the existing package builds and runs in the checkout without a hosted analysis service.

## Scope and measurements

Analysis covers publishable library workspaces. Private workspaces and applications under `apps/` are excluded. Public roots, subpaths and runtime exports are discovered from package manifests and built output, so new exports appear automatically.

JavaScript entries receive one consumer case retaining all runtime exports and one case per exported value. CSS and JSON entries receive entry cases. Declarations, metadata, source/preprocessor resources and standalone assets are catalogued with reasons when they cannot produce a browser consumer. Types-only packages still have a package-output measurement and budget.

| Metric | What it measures | Use |
| --- | --- | --- |
| Output raw | All files in the package's `dist/`, including ESM, CJS, CSS, declarations, source maps and assets | Enforce `outputBudget` |
| Consumer raw | Runtime files emitted by an independent production consumer build | Inspect uncompressed output |
| Consumer gzip | Sum of independently gzip-compressed runtime files | Enforce a consumer budget |
| Consumer Brotli | Sum of independently Brotli-compressed runtime files | Inspect an alternative compressed size |

Consumer builds use production ES2022 settings and retain the requested exports while allowing unused code to be tree-shaken. Reachable CSS, emitted assets and transitive dependencies are included; source maps and declarations are excluded. Each package's declared peer dependencies remain external and are recorded in the report.

All sizes are bytes. Gzip and Brotli are alternative encodings of the same files; do not add them together. Compression is calculated per emitted file rather than over concatenated output.

## Reports

Generated reports live under `.bundle-analysis/` and are ignored by Git. Open `.bundle-analysis/index.html` for the aggregate view or `.bundle-analysis/packages/<package>/index.html` for one package.

| Report | What contributors get |
| --- | --- |
| `index.html` | Searchable consumer cases, raw/gzip/Brotli sizes and links to visualizations |
| `summary.md` | Package versions, external peers, sizes, limits and PASS/FAIL results |
| `metrics.json` | Measurements and hashed case IDs, plus readable budget keys, package and tool metadata |
| `public-api.json` | Public imports, runtime exports and reasons for entries without consumer cases |
| `reports/<case-id>/` within a package report | Treemap, sunburst and dependency-network HTML for the same consumer build |

Treemap and sunburst help locate large modules and folders; network shows import relationships. The HTML index focuses on consumer cases. Package-output totals are available in JSON and Markdown.

## Contributor workflow

Use the repository's Node 24 and npm 11 environment. After installing dependencies, build and check all measured packages from the repository root:

```sh
npm ci
npm run bundle-size:build
npm run bundle-size:check
```

To work on one package:

```sh
npm exec -- nx run @bento/button:bundle-size:build
npm exec -- nx run @bento/button:bundle-size:check
```

The build target prepares package and dependency output through Nx, validates the budget configuration, then generates measurements and reports. Each analysis invalidates the previous package report before measuring, so a failed analysis cannot leave old measurements available to check. Report generation can succeed with missing or exceeded budgets so contributors can inspect the results. Invalid configuration, broken exports or measurement errors can still fail the build.

Consumer cases remain independent, with at most two running per package to bound memory use. Measurements keep discovery order. If a case fails, analysis stops starting new cases and waits for those already running before returning the first failure in discovery order. Incomplete analyses do not publish `metrics.json`.

The check reads saved reports and compares them with budgets; it does not rebuild or remeasure. Package checks need only that package's report. The root check combines package reports into an aggregate and checks all measured packages. Summaries include diagnostics for missing, exceeded and obsolete budgets.

When adding or changing an export:

1. Build the owning package's bundle report.
2. Inspect its sizes, summary and visualizations. Copy the readable `budgetKey` from `metrics.json`; no manual fixture registration is needed.
3. Add a justified limit to the package's `bundle-size.json`. Review the full-entry case as well: adding an export can increase its size under the same key.
4. Run the package check and explain intentional budget increases in the PR.
5. Regenerate reports and remove obsolete budget keys when deleting or renaming exports. A budget without a matching measurement fails the check.

For changes to the analyzer itself, run `npm exec -- nx run scripts:test` and regenerate the affected reports. The implementation is in [bundle-analysis.ts](../../../scripts/bundle-analysis.ts) and [bundle-discovery.ts](../../../scripts/bundle-discovery.ts).

## Budgets

Each package owns a `bundle-size.json` beside its manifest. Limits are non-negative integer bytes: `outputBudget` caps raw package output and `consumerBudgets` caps gzip bytes per readable entry or export key. Hashed case IDs remain in generated fixtures, measurements and report filenames.

Entry keys use `entry:<public import>`; export keys use `export:<public import>#<export name>`. Literal `%` and `#` characters in either part are escaped as `%25` and `%23`.

For example, [the Button package](../../../packages/@bento/button/bundle-size.json) owns:

```json
{
  "outputBudget": 8832,
  "consumerBudgets": {
    "entry:@bento/button": 14848,
    "export:@bento/button#Button": 14848
  }
}
```

Exactly at a limit passes. Exceeded or missing limits, invalid byte counts and budget keys without a corresponding measurement fail the check. Each package's budgets are checked against its own report, including in the root check. Malformed budget JSON, unknown config fields and invalid limits are errors.

Budgets are reviewed limits, not measurements to overwrite after every build. They are never increased automatically. Initial limits were seeded from measurements plus 10% headroom, with minimums of 512 B for output and 256 B for consumers, rounded up to 128 B. Growth within the approved headroom passes; there is no historical or base-branch comparison.

## CI

The [CI workflow](../../../.github/workflows/ci.yaml) builds bundle reports after the regular tests, then checks their budgets in a separate step. The check publishes aggregate results in the GitHub Job Summary.

If report generation or budget checking fails, CI uploads the available `.bundle-analysis/` output as a downloadable artifact retained for two days. Download and extract the artifact, then open `index.html` to inspect the reports and their linked visualizations. If generation stopped before creating the root index, open a completed package's index under `packages/` or its available visualization reports. No artifact is uploaded if no report files were produced.

## Interpretation and limits

Package-output raw size is neither npm tarball size nor installed size. A consumer case estimates one independent import with peers supplied by the host application; it does not represent the complete application. Summing cases double-counts shared dependencies.

Remote resources fetched at runtime, rendering cost, HTTP overhead, cache behavior and route-loading performance are outside these measurements. Visualizer module estimates can differ from final compressed file totals because of minification, wrappers and compression boundaries.

Saved-report checks compare package versions and peer names, require one package-output measurement and match consumer cases to measurements without duplicates or rows from another package. Remaining fields are trusted as analyzer output; the budget checker validates the byte counts used for limits. Aggregate reports require matching recorded toolchains.

Reports do not fingerprint source changes. Regenerate them after changes to source, exports, dependencies or analysis tools, even if the package version has not changed.
