import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { MinimalExample } from '../examples/minimal.tsx';
import { PageCountKnownExample } from '../examples/page-count-known.tsx';
import { PageCountUnknownExample } from '../examples/page-count-unknown.tsx';
import { PaginationDotsExample } from '../examples/dots.tsx';
import { PlaygroundExample } from '../examples/pagination-playground.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  beforeEach(resetHover);

  describe('#Pagination', function paginationTests() {
    it('page count known', async function pageCountKnownRender() {
      const { container } = await render(<PageCountKnownExample />);
      await expect(container).toMatchScreenshot('page-count-known');
    });

    it('page count unknown', async function pageCountUnknownRender() {
      const { container } = await render(<PageCountUnknownExample />);
      await expect(container).toMatchScreenshot('page-count-unknown');
    });

    it('minimal composition', async function minimalRender() {
      const { container } = await render(<MinimalExample />);
      await expect(container).toMatchScreenshot('minimal');
    });

    it('pagination dots', async function paginationDotsRender() {
      const { container } = await render(<PaginationDotsExample />);
      await expect(container).toMatchScreenshot('pagination-dots');
    });

    it('small size', async function smallRender() {
      const { container } = await render(<PlaygroundExample pageCount={5} size="sm" />);
      await expect(container).toMatchScreenshot('small');
    });
  });
});
