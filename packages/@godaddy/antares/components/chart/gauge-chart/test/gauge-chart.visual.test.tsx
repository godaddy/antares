import assume from 'assume';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { waitForSelector } from '../../../../utils/wait-for-selector.ts';
import { BasicExample } from '../examples/basic.tsx';
import { ContinuousExample } from '../examples/continuous.tsx';
import { PlaygroundExample } from '../examples/gauge-chart-playground.tsx';
import { LabelTypeExample } from '../examples/label-type.tsx';
import { SegmentedExample } from '../examples/segmented.tsx';
import { VariantsExample } from '../examples/variants.tsx';
import { WithRangeLabelsExample } from '../examples/with-range-labels.tsx';

/**
 * Renders a node and waits for the meter to mount.
 *
 * @param node - Content to render
 * @returns Render result after at least one meter is present
 */
async function renderAndWait(node: React.ReactNode) {
  const result = await render(node);
  await waitForSelector(result.container, '[role="meter"]');

  return result;
}

/** Container widths (px) from the Figma spec: Small baseline plus Medium and XLarge. */
const SCALING_WIDTHS = [118, 151, 200];

/**
 * Lays the same gauge out at each scaling width side by side, labelled with its width,
 * so a single screenshot shows how the component scales as the container grows.
 *
 * @param gauge - Gauge element to repeat at each width
 * @returns A row of width-constrained gauges
 */
function scalingRow(gauge: React.ReactElement) {
  return (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end', padding: '24px' }}>
      {SCALING_WIDTHS.map(function column(width) {
        return (
          <div key={width} style={{ width: `${width}px` }}>
            {gauge}
            <p style={{ marginTop: '8px', textAlign: 'center', font: '12px sans-serif', color: '#767676' }}>
              {width}px
            </p>
          </div>
        );
      })}
    </div>
  );
}

describe('@godaddy/antares', function antares() {
  describe('#GaugeChart', function gaugeChartTests() {
    describe('#examples', function examples() {
      it('basic screenshot', async function basicShot() {
        const { container } = await renderAndWait(<BasicExample />);

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('basic');
      });

      it('continuous screenshot', async function continuousShot() {
        const { container } = await renderAndWait(<ContinuousExample />);

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('continuous');
      });

      it('segmented screenshot', async function segmentedShot() {
        const { container } = await renderAndWait(<SegmentedExample />);

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('segmented');
      });

      it('variants screenshot', async function variantsShot() {
        const { container } = await renderAndWait(<VariantsExample />);

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('variants');
      });

      it('label-type screenshot', async function labelTypeShot() {
        const { container } = await renderAndWait(<LabelTypeExample />);

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('label-type');
      });

      it('with-range-labels screenshot', async function withRangeLabelsShot() {
        const { container } = await renderAndWait(<WithRangeLabelsExample />);

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('with-range-labels');
      });
    });

    describe('#scaling', function scaling() {
      it('label + sublabel scales with width', async function labelSubLabelScaling() {
        const { container } = await renderAndWait(
          scalingRow(<PlaygroundExample label="50%" subLabel="Progress" value={50} />)
        );

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('label-sublabel-scaling');
      });

      it('segmented + range scales with width', async function segmentedRangeScaling() {
        const { container } = await renderAndWait(
          scalingRow(
            <PlaygroundExample
              label="3/5"
              subLabel="Risk Level"
              rangeMin="Low"
              rangeMax="High"
              segments={5}
              value={3}
            />
          )
        );

        assume(container.querySelector('[role="meter"]')).exists();
        await expect(container).toMatchScreenshot('segmented-range-scaling');
      });
    });
  });
});
