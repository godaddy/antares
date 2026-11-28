import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ChartLegend', function chartLegendTests() {
    it('lists the chart slices under the legend label', async function legendItems() {
      const { locator } = await render(<DefaultExample />);
      const list = locator.getByRole('list', { name: 'Channel' });

      await expect.element(list).toBeVisible();
      expect(
        list
          .getByRole('listitem')
          .all()
          .map(function itemText(item) {
            return item.element().textContent;
          })
      ).toEqual(['Online', 'In store']);
    });
  });
});
