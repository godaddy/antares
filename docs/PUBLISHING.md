# Publishing Guide

## Workflow

### 1. Create Changesets

As you work, create changesets for your changes:

```bash
npm run changeset
```

### 2. Release Workflow Creates PR

When a PR is merged to main:
- The Release workflow runs automatically
- It creates/updates a "Version Packages" PR
- Review the version bumps and changelogs

### 3. Merge the PR

When ready to release:
- Merge the "Version Packages" PR
- This triggers the Publish workflow automatically
- Packages are published to npm

You can also manually trigger publish: [Actions → Publish](https://github.com/godaddy/bento/actions/workflows/publish.yaml)

## Troubleshooting

### NPM_TOKEN Issues
- Ensure it's an "Automation" token
- Verify publish access for `@bento` scope

### Version Already Exists
- Check: `npm view @bento/button versions`

### Build Failures
- Run locally: `npm run build && npm run test`
