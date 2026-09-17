import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { MediaExample } from '../examples/media.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeEach(resetHover);

  describe('#Card layout compositions', function cardLayoutVisualTests() {
    it('renders inset, full bleed, standalone and custom media', async function media() {
      const { container } = await render(<MediaExample />);
      await expect(container).toMatchScreenshot('layout-media');
    });

    it('renders responsive layout, aligned actions, and wrapping titles', async function layout() {
      const { container } = await render(<LayoutExample />);
      await expect(container).toMatchScreenshot('layout-composition');
    });
  });
});
