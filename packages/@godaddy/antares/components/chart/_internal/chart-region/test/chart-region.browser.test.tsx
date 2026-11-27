import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { PlacementExample } from '../examples/placement.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ChartRegion', function chartRegionTests() {
    it('keeps the chart placement alongside consumer overrides', async function placement() {
      const { getByTestId } = await render(<PlacementExample />);

      const region = getByTestId('region');
      await expect.element(region).toHaveClass('example-placement');
      await expect.element(region).toHaveClass('consumer-override');
    });

    it('passes slot props from the chart to the slotted text', async function slotProps() {
      const { getByText } = await render(<PlacementExample />);

      await expect.element(getByText('Last 30 days')).toHaveAttribute('id', 'example-note-id');
      await expect.element(getByText('Last 30 days')).toHaveClass('example-note');
      await expect.element(getByText('Revenue')).toHaveClass('example-title');
    });
  });
});
