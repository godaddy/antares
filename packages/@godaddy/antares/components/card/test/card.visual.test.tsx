import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { CollectionExample } from '../examples/collection.tsx';
import { MediaExample } from '../examples/media.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeEach(resetHover);

  describe('#Card layout compositions', function cardLayoutVisualTests() {
    it('renders inset, full bleed, standalone and custom media', async function media() {
      const { container } = await render(<MediaExample />);
      await expect(container).toMatchScreenshot('layout-media');
    });

    it('renders aligned collection actions and corner spacing', async function collection() {
      const { container } = await render(<CollectionExample />);
      await expect(container).toMatchScreenshot('layout-collection');
    });
  });
});
