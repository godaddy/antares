import { describe, expect, it } from 'vitest';
import { formatChangesetsTags } from '../publish-workspaces.mjs';

describe('Changesets publish output', function changesetsPublishOutput() {
  it('formats pnpm published packages as Changesets action tags', function formatsPublishedPackages() {
    expect(
      formatChangesetsTags({
        publishedPackages: [
          { name: '@godaddy/antares', version: '0.12.1' },
          { name: '@bento/button', version: '0.1.5' }
        ]
      })
    ).toEqual(['New tag: @godaddy/antares@0.12.1', 'New tag: @bento/button@0.1.5']);
  });

  it('returns no tags when recursive publish has no new packages', function formatsEmptyPublish() {
    expect(formatChangesetsTags({ publishedPackages: [] })).toEqual([]);
  });
});
