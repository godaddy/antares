import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { CollectionExample } from '../examples/collection.tsx';
import { FullBleedExample } from '../examples/full-bleed.tsx';
import { LongTextExample } from '../examples/long-text.tsx';
import { MediaExample } from '../examples/media.tsx';

describe('@godaddy/antares', function packageTests() {
  beforeEach(resetHover);

  describe('#Card layout compositions', function cardLayoutVisualTests() {
    it('renders inset media', async function insetMedia() {
      const { container } = await render(<MediaExample />);
      await expect(container).toMatchScreenshot('layout-media');
    });

    it('renders full bleed media composition', async function fullBleed() {
      const { container } = await render(<FullBleedExample />);
      await expect(container).toMatchScreenshot('layout-full-bleed');
    });

    it('renders equal-height collection actions', async function collection() {
      const { container } = await render(<CollectionExample />);
      await expect(container).toMatchScreenshot('layout-collection');
    });

    it('renders long text with explicit corner spacing', async function longText() {
      const { container } = await render(<LongTextExample />);
      await expect(container).toMatchScreenshot('layout-long-text');
    });
  });
});
