import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { TagEyebrowExample } from '../examples/tag-eyebrow.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { LegibleLinesExample } from '../examples/legible-lines.tsx';
import { WithActionsExample } from '../examples/with-actions.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);
  // `page.viewport` persists across tests, so reset it for every one.
  beforeEach(async function resetViewport() {
    await page.viewport(414, 896);
  });

  describe('#TextLockup', function textLockupTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('tag eyebrow example', async function tagEyebrowRender() {
      const { container } = await render(<TagEyebrowExample />);
      await expect(container).toMatchScreenshot('tag-eyebrow');
    });

    it('alignment example', async function alignmentRender() {
      const { container } = await render(<AlignmentExample />);
      await expect(container).toMatchScreenshot('alignment');
    });

    it('legible lines example', async function legibleLinesRender() {
      // The clamp is 60ch (~534px), so the default 414px viewport cannot show it.
      await page.viewport(900, 400);
      const { container } = await render(<LegibleLinesExample />);
      await expect(container).toMatchScreenshot('legible-lines');
    });

    it('with actions example', async function withActionsRender() {
      const { container } = await render(<WithActionsExample />);
      await expect(container).toMatchScreenshot('with-actions');
    });
  });
});
