import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';
import { SlotsExample } from '../examples/slots.tsx';

describe('@godaddy/antares', function antares() {
  describe('#CircularProgress', function circularProgressVisualTests() {
    it('composed slots', async function slotsRender() {
      await page.viewport(900, 240);
      const { container } = await render(<SlotsExample />);
      await expect(container).toMatchScreenshot('slots');
    });

    it('default example', async function defaultRender() {
      await page.viewport(414, 896);
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('all sizes', async function sizesRender() {
      await page.viewport(600, 200);
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('status variants', async function statusesRender() {
      await page.viewport(600, 200);
      const { container } = await render(<StatusesExample />);
      await expect(container).toMatchScreenshot('statuses');
    });
  });
});
