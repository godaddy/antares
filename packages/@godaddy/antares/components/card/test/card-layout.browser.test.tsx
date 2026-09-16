import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { CollectionExample } from '../examples/collection.tsx';
import { ContainerQueryExample } from '../examples/container-query.tsx';

function bounds(element: Element) {
  return element.getBoundingClientRect();
}

describe('@godaddy/antares', function packageTests() {
  describe('#Card layout compositions', function cardLayoutTests() {
    it('stacks media in a narrow container', async function narrowContainer() {
      await page.viewport(420, 800);
      const { getByTestId } = await render(<ContainerQueryExample />);
      const media = bounds(getByTestId('container-query-media').element());
      const content = bounds(getByTestId('container-query-content').element());

      expect(media.bottom).toBeLessThanOrEqual(content.top);
    });

    it('places media beside content in a wide container', async function wideContainer() {
      await page.viewport(800, 800);
      const { getByTestId } = await render(<ContainerQueryExample />);
      const media = bounds(getByTestId('container-query-media').element());
      const content = bounds(getByTestId('container-query-content').element());

      expect(media.right).toBeLessThanOrEqual(content.left);
    });

    it('keeps collection actions aligned at the bottom of equal-height cards', async function alignedCollection() {
      await page.viewport(1000, 800);
      const { getByTestId } = await render(<CollectionExample />);
      const cards = [0, 1, 2].map(function card(index) {
        return bounds(getByTestId(`collection-card-${index}`).element());
      });
      const actions = [0, 1, 2].map(function action(index) {
        return bounds(getByTestId(`collection-action-${index}`).element());
      });

      expect(cards[0].height).toBeCloseTo(cards[1].height);
      expect(cards[1].height).toBeCloseTo(cards[2].height);
      expect(actions[0].bottom).toBeCloseTo(actions[1].bottom);
      expect(actions[1].bottom).toBeCloseTo(actions[2].bottom);
    });
  });
});
