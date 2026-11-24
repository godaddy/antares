import { GaugeChartCenterContext, GaugeChartRangeContext } from '@godaddy/antares';
import { createRef } from 'react';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { ContinuousExample } from '../examples/continuous.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/gauge-chart-playground.tsx';
import { RegionOrderExample } from '../examples/region-order.tsx';
import { SegmentedExample } from '../examples/segmented.tsx';
import { VariantsExample } from '../examples/variants.tsx';
import { WithRangeLabelsExample } from '../examples/with-range-labels.tsx';

describe('@godaddy/antares', function antares() {
  describe('#GaugeChart', function gaugeChartTests() {
    describe('#basic-and-continuous', function basicAndContinuous() {
      it('renders basic continuous meter at half scale', async function basicMeter() {
        const { getByRole, getByText } = await render(<DefaultExample />);

        const meter = getByRole('meter', { name: 'Basic gauge' });
        await expect.element(meter).toBeVisible();
        await expect.element(getByText('50%')).toBeVisible();

        const el = meter.element();
        expect(el?.getAttribute('aria-valuenow')).toBe('50');
        expect(el?.getAttribute('aria-valuemin')).toBe('0');
        expect(el?.getAttribute('aria-valuemax')).toBe('100');
        expect(el?.hasAttribute('data-segmented')).toBe(false);
      });

      it('renders continuous example meters at 0 and 100', async function continuousMeters() {
        const { container, getByRole } = await render(<ContinuousExample />);

        const atZero = getByRole('meter', { name: 'Gauge at 0%' });
        await expect.element(atZero).toBeVisible();
        expect(atZero.element()?.getAttribute('aria-valuenow')).toBe('0');
        expect(atZero.element()?.hasAttribute('data-filled')).toBe(false);

        const atFull = getByRole('meter', { name: 'Gauge at 100%' });
        await expect.element(atFull).toBeVisible();
        expect(atFull.element()?.getAttribute('aria-valuenow')).toBe('100');
        expect(atFull.element()?.hasAttribute('data-full')).toBe(true);

        expect(container.querySelectorAll('[role="meter"]').length).toBe(5);
      });
    });

    describe('#segmented', function segmented() {
      it('exposes segmented scale and empty vs full state', async function segmentedStates() {
        const { getByRole } = await render(<SegmentedExample />);

        const empty = getByRole('meter', { name: 'Gauge with 0 of 5 filled' });
        await expect.element(empty).toBeVisible();
        expect(empty.element()?.getAttribute('aria-valuemax')).toBe('5');
        expect(empty.element()?.getAttribute('aria-valuenow')).toBe('0');
        expect(empty.element()?.hasAttribute('data-segmented')).toBe(true);
        expect(empty.element()?.hasAttribute('data-filled')).toBe(false);

        const full = getByRole('meter', { name: 'Gauge with 5 of 5 filled' });
        await expect.element(full).toBeVisible();
        expect(full.element()?.getAttribute('aria-valuenow')).toBe('5');
        expect(full.element()?.hasAttribute('data-full')).toBe(true);
      });
    });

    describe('#variants', function variants() {
      it('sets data-variant for each status', async function variantAttributes() {
        const { getByRole } = await render(<VariantsExample />);

        const cases: Array<[string, string]> = [
          ['Default variant gauge', 'default'],
          ['Success variant gauge', 'success'],
          ['Warning variant gauge', 'warning'],
          ['Critical variant gauge', 'critical']
        ];

        for (const [name, variant] of cases) {
          const meter = getByRole('meter', { name });
          await expect.element(meter).toBeVisible();
          expect(meter.element()?.getAttribute('data-variant')).toBe(variant);
        }
      });
    });

    describe('#range-labels', function rangeLabels() {
      it('places min and max labels under the ends of the arc', async function rangeLabelPlacement() {
        const { getByRole } = await render(<WithRangeLabelsExample />);

        const meter = getByRole('meter', { name: 'Risk level gauge' });
        await expect.element(meter).toBeVisible();
        const min = meter.getByText('Low').element().getBoundingClientRect();
        const max = meter.getByText('High').element().getBoundingClientRect();
        const description = meter.getByText('Risk Level').element().getBoundingClientRect();

        expect(min.right).toBeLessThanOrEqual(description.left);
        expect(max.left).toBeGreaterThanOrEqual(description.right);
        expect(min.top).toBeCloseTo(max.top, 0);
      });

      it('flips the range labels in right-to-left layouts', async function rtlRangeLabels() {
        const { getByRole } = await render(
          <div dir="rtl">
            <WithRangeLabelsExample />
          </div>
        );

        const meter = getByRole('meter', { name: 'Risk level gauge' });
        await expect.element(meter).toBeVisible();
        expect(meter.getByText('Low').element().getBoundingClientRect().left).toBeGreaterThan(
          meter.getByText('High').element().getBoundingClientRect().right
        );
      });
    });

    describe('#composition', function composition() {
      it('lays out regions the same in either order', async function regionOrder() {
        const { getByRole } = await render(<RegionOrderExample />);

        const [rangeFirst, centerFirst] = ['Range first', 'Center first'].map(function measure(name) {
          const meter = getByRole('meter', { name });
          const origin = meter.element().getBoundingClientRect();
          return ['72%', 'Score', 'Low', 'High'].map(function offset(text) {
            const rect = meter.getByText(text).element().getBoundingClientRect();
            return [rect.left - origin.left, rect.top - origin.top];
          });
        });

        expect(rangeFirst).toEqual(centerFirst);
      });

      it('keeps region layout with consumer context overrides', async function contextOverrides() {
        const centerRef = createRef<HTMLDivElement>();
        const rangeRef = createRef<HTMLDivElement>();
        const { getByRole } = await render(
          <GaugeChartCenterContext.Provider value={{ className: 'custom-center', ref: centerRef }}>
            <GaugeChartRangeContext.Provider value={{ className: 'custom-range', ref: rangeRef }}>
              <WithRangeLabelsExample />
            </GaugeChartRangeContext.Provider>
          </GaugeChartCenterContext.Provider>
        );

        const meter = getByRole('meter', { name: 'Risk level gauge' });
        await expect.element(meter).toBeVisible();
        expect(centerRef.current?.classList.contains('custom-center')).toBe(true);
        expect(rangeRef.current?.classList.contains('custom-range')).toBe(true);
        expect(meter.getByText('Low').element().getBoundingClientRect().right).toBeLessThanOrEqual(
          meter.getByText('Risk Level').element().getBoundingClientRect().left
        );
      });
    });

    describe('#accessible-text', function accessibleText() {
      it('announces valueLabel as the value text', async function valueLabel() {
        const { getByRole } = await render(<SegmentedExample />);

        await expect
          .element(getByRole('meter', { name: 'Gauge with 2 of 5 filled' }))
          .toHaveAttribute('aria-valuetext', '2 of 5');
      });

      it('uses the description to describe the meter', async function describedByDescription() {
        const { getByRole, rerender } = await render(<PlaygroundExample label="50%" description="Done" value={50} />);

        const meter = getByRole('meter', { name: 'Playground gauge' });
        await expect.element(meter).toHaveAccessibleDescription('Done');
        expect(meter.element().hasAttribute('aria-valuetext')).toBe(false);

        await rerender(<PlaygroundExample label="50%" value={50} />);
        expect(meter.element().hasAttribute('aria-describedby')).toBe(false);
      });
    });

    describe('#value-clamping', function valueClamping() {
      it('clamps continuous value below 0', async function clampLow() {
        const { getByRole } = await render(<PlaygroundExample label="x" value={-5} />);

        expect(getByRole('meter', { name: 'Playground gauge' }).element()?.getAttribute('aria-valuenow')).toBe('0');
      });

      it('clamps continuous value above 100', async function clampHigh() {
        const { getByRole } = await render(<PlaygroundExample label="y" value={200} />);

        expect(getByRole('meter', { name: 'Playground gauge' }).element()?.getAttribute('aria-valuenow')).toBe('100');
      });

      it('clamps segmented value above segment count', async function segmentedClamp() {
        const { getByRole } = await render(<PlaygroundExample label="5/5" segments={5} value={99} />);

        const meter = getByRole('meter', { name: 'Playground gauge' });
        expect(meter.element()?.getAttribute('aria-valuenow')).toBe('5');
        expect(meter.element()?.getAttribute('aria-valuemax')).toBe('5');
      });
    });

    describe('#segments-validation', function segmentsValidation() {
      const segmentsError = /GaugeChart: `segments` must be a positive integer when provided/;

      it('throws when segments is not an integer', async function nonIntegerSegments() {
        await expect(render(<PlaygroundExample label="x" segments={3.5} value={1} />)).rejects.toThrow(segmentsError);
      });

      it('throws when segments is zero or negative', async function nonPositiveSegments() {
        await expect(render(<PlaygroundExample label="x" segments={0} value={0} />)).rejects.toThrow(segmentsError);
        await expect(render(<PlaygroundExample label="x" segments={-2} value={0} />)).rejects.toThrow(segmentsError);
      });

      it('throws when segments is not finite', async function nonFiniteSegments() {
        await expect(render(<PlaygroundExample label="x" segments={Number.NaN} value={0} />)).rejects.toThrow(
          segmentsError
        );
      });
    });

    describe('#label-type', function labelType() {
      it('applies data-label-type text', async function textLabelType() {
        const { getByRole } = await render(<PlaygroundExample label="OK" labelType="text" value={1} />);

        const meter = getByRole('meter', { name: 'Playground gauge' });
        expect(meter.element()?.getAttribute('data-label-type')).toBe('text');
      });
    });
  });
});
