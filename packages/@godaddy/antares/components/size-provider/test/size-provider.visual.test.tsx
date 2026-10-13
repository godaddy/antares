import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { FormExample } from '../examples/form.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);

  describe('#SizeProvider', function sizeProviderTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('form example', async function formRender() {
      const { container } = await render(<FormExample />);
      await expect(container).toMatchScreenshot('form');
    });
  });
});
