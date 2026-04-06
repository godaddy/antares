import assume from 'assume';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { waitForSelector } from '../../../../utils/wait-for-selector.ts';
import { BarChartCustomDomainExample } from '../examples/custom-domain';
import { BarChartFormattedTickMarksExample } from '../examples/formatted-tick-marks';
import { BarChartHorizontalMultiSeriesExample } from '../examples/horizontal-multi-series';
import { BarChartHorizontalSingleSeriesExample } from '../examples/horizontal-single-series';
import { BarChartMultiSeriesExample } from '../examples/multi-series';
import { BarChartRTLHorizontalMultiSeriesExample } from '../examples/rtl-horizontal-multi-series';
import { BarChartRTLMultiSeriesExample } from '../examples/rtl-multi-series';
import { BarChartExample } from '../examples/single-series';

/**
 * Renders an example in a sized container and waits for chart SVG
 *
 * @param Example - Example component to render
 * @returns Render result after SVG is present
 */
async function renderExampleAndWait(Example: React.ComponentType, width = 800, height = 800) {
  await page.viewport(width, height);
  const result = await render(
    <div style={{ width: `${width}px`, height: `${height}px` }}>
      <Example />
    </div>
  );
  await waitForSelector(result.container, 'svg');

  return result;
}

describe('@godaddy/antares', function antares() {
  describe('#BarChart', function barChartTests() {
    describe('#basic', function basic() {
      it('single-series screenshot', async function singleSeries() {
        const { container } = await renderExampleAndWait(BarChartExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('single-series');
      });

      it('multi-series screenshot', async function multiSeries() {
        const { container } = await renderExampleAndWait(BarChartMultiSeriesExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('multi-series');
      });
    });

    describe('#feature', function feature() {
      it('horizontal-single-series screenshot', async function horizontalSingleSeries() {
        const { container } = await renderExampleAndWait(BarChartHorizontalSingleSeriesExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('horizontal-single-series');
      });

      it('horizontal-multi-series screenshot', async function horizontalMultiSeries() {
        const { container } = await renderExampleAndWait(BarChartHorizontalMultiSeriesExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('horizontal-multi-series');
      });

      it('rtl-multi-series screenshot', async function rtlMultiSeries() {
        const { container } = await renderExampleAndWait(BarChartRTLMultiSeriesExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('rtl-multi-series');
      });

      it('rtl-horizontal-multi-series screenshot', async function rtlHorizontalMultiSeries() {
        const { container } = await renderExampleAndWait(BarChartRTLHorizontalMultiSeriesExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('rtl-horizontal-multi-series');
      });

      it('formatted-tick-marks screenshot', async function formattedTickMarks() {
        const { container } = await renderExampleAndWait(BarChartFormattedTickMarksExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('formatted-tick-marks');
      });
    });

    describe('#configuration', function configuration() {
      it('custom-domain screenshot', async function customDomain() {
        const { container } = await renderExampleAndWait(BarChartCustomDomainExample);

        assume(container.querySelector('svg')).exists();
        await expect(container).toMatchScreenshot('custom-domain');
      });
    });
  });
});
