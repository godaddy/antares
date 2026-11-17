# Publishing Guide

## Contributor workflow

### 1. Add a Changeset

When a change affects a published package, add a Changeset:

```sh
pnpm run changeset
```

For dependency changes made only in the workspace catalog, include a Changeset
for each published package whose resolved dependencies change. A catalog-only
edit may not be detected as a package change automatically.

### 2. Review the version pull request

The Release workflow in `.github/workflows/release.yaml` runs on pushes to
`main` and can also be started manually. The Changesets action opens or updates
a `Version Packages` pull request. Its version command runs
`changeset version` and then `pnpm install --no-frozen-lockfile`, so review the
package versions, changelogs, and `pnpm-lock.yaml` changes before merging it.

### 3. Publish from the release workflow

After the version pull request is merged, the Changesets action runs
`pnpm run release`. That script builds the workspace and then runs
`scripts/publish-workspaces.mjs`. The helper runs `pnpm publish -r
--report-summary`, reads pnpm's list of published packages, and prints a
`New tag: <name>@<version>` line for each one. The Changesets action uses those
lines to create Git tags and GitHub releases. Pnpm recursively publishes
eligible non-private workspace packages and rewrites `workspace:` and
`catalog:` references in packed manifests. Published package manifests specify
the public npm registry and public access.

## Verify without publishing

To inspect what a recursive publish would do without uploading packages, run
this from a clean Git worktree; pnpm rejects publish commands from a dirty tree:

```sh
pnpm publish -r --dry-run
```

Recursive publishing skips package versions that are already published. If no
new versions are eligible, the dry run reports that and skips package
`prepublishOnly` scripts. When a package is eligible, a dry run can still run
`prepublishOnly`; the button package's script compiles `README.md` from
`README.mdx`. Review generated README changes afterward. `pnpm pack` can also be
used to inspect an individual package tarball.

## Authentication and release gates

The release workflow grants `id-token: write` and does not reference
`NPM_TOKEN`. This migration does not validate npm-side trusted-publisher
configuration. Confirm the production release path after merge before relying
on OIDC publishing.
