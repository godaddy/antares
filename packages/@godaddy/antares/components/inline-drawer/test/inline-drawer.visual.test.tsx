import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SidebarNavExample } from '../examples/sidebar-nav.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { AnimationExample } from '../examples/animation.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#InlineDrawer', function inlineDrawerTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('sidebar nav (peek) example', async function sidebarRender() {
      const { container } = await render(<SidebarNavExample />);
      await expect(container).toMatchScreenshot('sidebar-nav');
    });

    it('placements example', async function placementsRender() {
      const { container } = await render(<PlacementsExample />);
      await expect(container).toMatchScreenshot('placements');
    });

    it('animation example', async function animationRender() {
      const { container } = await render(<AnimationExample />);
      await expect(container).toMatchScreenshot('animation');
    });
  });
});
