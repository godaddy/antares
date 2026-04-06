import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { ContinuousExample } from '../examples/continuous.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/gauge-chart-playground.tsx';
import { SegmentedExample } from '../examples/segmented.tsx';
import { VariantsExample } from '../examples/variants.tsx';
import { WithRangeLabelsExample } from '../examples/with-range-labels.tsx';

describe('@godaddy/antares', function antares() {
  describe('#GaugeChart', function gaugeChartTests() {
    describe('#default-and-continuous', function defaultAndContinuous() {
      it('renders default meter with range and continuous scale', async function defaultMeter() {
        const { getByRole, getByText } = await render(<DefaultExample />);

        const meter = getByRole('meter', { name: 'Default gauge' });
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
      it('renders numeric and string range labels', async function rangeLabelContent() {
        const { container } = await render(<WithRangeLabelsExample />);

        const mins = container.querySelectorAll('[data-range-label="min"]');
        const maxs = container.querySelectorAll('[data-range-label="max"]');
        expect(mins.length).toBe(2);
        expect(maxs.length).toBe(2);

        expect(mins[0]?.textContent).toBe('0');
        expect(maxs[0]?.textContent).toBe('100');
        expect(mins[1]?.textContent).toBe('Low');
        expect(maxs[1]?.textContent).toBe('High');
      });
    });

    describe('#aria-valuetext', function ariaValueText() {
      it('uses label only without subLabel', async function labelOnly() {
        const { getByRole } = await render(<PlaygroundExample label="Plain" value={40} />);

        const meter = getByRole('meter', { name: 'Playground gauge' });
        expect(meter.element()?.getAttribute('aria-valuetext')).toBe('Plain');
      });

      it('combines label and subLabel in aria-valuetext', async function labelWithSub() {
        const { getByRole } = await render(<PlaygroundExample label="50%" subLabel="Done" value={50} />);

        const meter = getByRole('meter', { name: 'Playground gauge' });
        expect(meter.element()?.getAttribute('aria-valuetext')).toBe('50% - Done');
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
