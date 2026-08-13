import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { ManilaExample } from '../examples/manila.tsx';
import { OverflowExample } from '../examples/overflow.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Tabs', function tabsTests() {
    it('renders the Underline design', async function underline() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('underline');
    });

    it('renders the Manila design', async function manila() {
      const { container } = await render(<ManilaExample />);
      await expect(container).toMatchScreenshot('manila');
    });

    it('renders disabled tabs', async function disabled() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('renders overflow controls', async function overflow() {
      const { container } = await render(<OverflowExample />);
      await expect(container).toMatchScreenshot('overflow');
    });
  });
});
