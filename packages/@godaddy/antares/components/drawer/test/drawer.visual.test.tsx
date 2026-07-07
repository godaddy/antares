import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import assume from 'assume';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { PlaygroundExample } from '../examples/drawer-playground.tsx';

const PLACEMENTS = ['right', 'left', 'top', 'bottom'] as const;

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Drawer', function drawerTests() {
    it.each(PLACEMENTS)('renders %s placement', async function placement(p) {
      const { getByRole } = await render(<PlaygroundExample placement={p} />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });

      // Let the CSS slide transition finish before capturing.
      await new Promise(function settle(r) {
        setTimeout(r, 400);
      });

      const panel = document.querySelector('[data-placement]') as HTMLElement;
      await expect(panel).toMatchScreenshot(`placement-${p}`);
    });
  });
});
