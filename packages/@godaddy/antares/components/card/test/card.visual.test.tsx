import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { CheckboxExample } from '../examples/checkbox.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { MediaExample } from '../examples/media.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Card layout compositions', function cardLayoutVisualTests() {
    it('renders checkbox cards with top-end selection indicators', async function checkbox() {
      const { container } = await render(<CheckboxExample />);
      await expect(container).toMatchScreenshot('layout-checkbox');
    });

    it('renders inset, full bleed, standalone and custom media', async function media() {
      const { container } = await render(<MediaExample />);
      await expect(container).toMatchScreenshot('layout-media');
    });

    it('renders responsive layout and intrinsic card heights', async function layout() {
      const { container } = await render(<LayoutExample />);
      await expect(container).toMatchScreenshot('layout-composition');
    });
  });
});
