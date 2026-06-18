import { describe, expect, it } from 'vitest';
import { page } from '@vitest/browser/context';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';

describe('@godaddy/antares', function antares() {
  describe('#CircularProgress', function circularProgressVisualTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('all sizes', async function sizesRender() {
      await page.viewport(600, 200);
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('emphasis variants', async function emphasisRender() {
      const { container } = await render(<EmphasisExample />);
      await expect(container).toMatchScreenshot('emphasis');
    });
  });
});
