import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { resetPointer } from '#test/utils/test-helpers.tsx';
import { waitForSelector } from '#test/utils/wait-for-selector.ts';
import { LegendLayoutExample } from '../examples/legend-layout.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetPointer);

  describe('#DonutChart', function donutChartTests() {
    it('legend-layout screenshot at a constrained width', async function legendLayout() {
      await page.viewport(320, 800);
      const { container } = await render(
        <div style={{ width: '320px' }}>
          <LegendLayoutExample />
        </div>
      );
      await waitForSelector(container, 'svg path');

      await expect(container).toMatchScreenshot('legend-layout');
    });
  });
});
