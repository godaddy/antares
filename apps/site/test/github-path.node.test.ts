import { describe, it } from 'vitest';
import assume from 'assume';
import { getGithubPath } from '../lib/github-path';

describe('site', function siteTests() {
  describe('#getGithubPath', function getGithubPathTests() {
    it('returns the component README path for component pages', function componentPath() {
      assume(getGithubPath({ slugs: ['components', 'radio'], path: 'components/radio.mdx' })).equals(
        'packages/@godaddy/antares/components/radio/README.mdx'
      );
    });

    it('returns nested component README path for nested component pages', function nestedComponentPath() {
      assume(getGithubPath({ slugs: ['components', 'layout', 'flex'], path: 'components/layout/flex.mdx' })).equals(
        'packages/@godaddy/antares/components/layout/flex/README.mdx'
      );
    });

    it('returns the catalog README path for the Blocks index', function catalogPath() {
      assume(getGithubPath({ slugs: ['blocks'], path: 'blocks/index.mdx' })).equals(
        'packages/@godaddy/antares/blocks/README.mdx'
      );
    });

    it('returns the block README path for a detail page', function blockPath() {
      assume(getGithubPath({ slugs: ['blocks', 'sign-in-form'], path: 'blocks/sign-in-form.mdx' })).equals(
        'packages/@godaddy/antares/blocks/sign-in-form/README.mdx'
      );
    });

    it('returns the site content path for non-component pages', function nonComponentPath() {
      assume(getGithubPath({ slugs: ['getting-started'], path: 'getting-started.mdx' })).equals(
        'apps/site/content/docs/getting-started.mdx'
      );
    });
  });
});
