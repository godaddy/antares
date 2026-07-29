import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { ButtonExample } from '../examples/button.tsx';
import { ButtonDisabledExample } from '../examples/button-disabled.tsx';
import { ButtonSelectedExample } from '../examples/button-selected.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';
import { IconFallbackExample } from '../examples/icon-fallback.tsx';
import { ImageFallbackExample } from '../examples/image-fallback.tsx';
import { ImageExample } from '../examples/image.tsx';
import { ShapesExample } from '../examples/shapes.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Avatar', function avatarVisualTests() {
    it('default', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('image', async function imageRender() {
      const { container } = await render(<ImageExample />);
      await expect(container).toMatchScreenshot('image');
    });

    it('image fallback', async function imageFallbackRender() {
      const { container } = await render(<ImageFallbackExample />);
      await expect(container).toMatchScreenshot('image-fallback');
    });

    it('shape and size matrix', async function shapesRender() {
      const { container } = await render(<ShapesExample />);
      await expect(container).toMatchScreenshot('shapes');
    });

    it('all emphasis values', async function emphasisRender() {
      const { container } = await render(<EmphasisExample />);
      await expect(container).toMatchScreenshot('emphasis');
    });

    it('icon fallback', async function iconFallbackRender() {
      const { container } = await render(<IconFallbackExample />);
      await expect(container).toMatchScreenshot('icon-fallback');
    });

    it('button default', async function buttonRender() {
      const { container } = await render(<ButtonExample />);
      await expect(container).toMatchScreenshot('button');
    });

    it('button selected', async function buttonSelectedRender() {
      const { container } = await render(<ButtonSelectedExample />);
      await expect(container).toMatchScreenshot('button-selected');
    });

    it('button disabled', async function buttonDisabledRender() {
      const { container } = await render(<ButtonDisabledExample />);
      await expect(container).toMatchScreenshot('button-disabled');
    });
  });
});
