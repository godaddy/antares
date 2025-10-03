#!/bin/bash
set -e

BASE_REF=$1

if [ -z "$BASE_REF" ]; then
  echo "Error: BASE_REF argument is required"
  exit 1
fi

***REMOVED***Get list of changed files in packages directory
CHANGED_PACKAGES=$(git diff --name-only origin/$BASE_REF...HEAD | grep '^packages/' | grep -v -E '\.(test|spec|stories)\.' || true)

if [ -z "$CHANGED_PACKAGES" ]; then
  echo "No package changes detected that require a changeset."
  exit 0
fi

echo "Changed packages detected:"
echo "$CHANGED_PACKAGES"

***REMOVED***Check if any changeset files were added or modified in this PR (excluding README.md)
NEW_CHANGESETS=$(git diff --name-only --diff-filter=AM origin/$BASE_REF...HEAD | grep '^\.changeset/.*\.md$' | grep -v '\.changeset/README\.md$' || true)

if [ -z "$NEW_CHANGESETS" ]; then
  echo "::error::This PR contains changes to packages but is missing a changeset. Please run 'npm run changeset' to add a changeset."
  exit 1
fi

echo "✅ Changeset found:"
echo "$NEW_CHANGESETS"

