import { GaugeChartCenterContext, GaugeChartRangeContext } from '@godaddy/antares';
import { createRef } from 'react';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { ContextDescriptionExample } from '../examples/context-description.tsx';
import { ContinuousExample } from '../examples/continuous.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DynamicDescriptionExample } from '../examples/dynamic-description.tsx';
import { PlaygroundExample } from '../examples/gauge-chart-playground.tsx';
import { OverlappingDescriptionsExample } from '../examples/overlapping-descriptions.tsx';
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
        expect(el.parentElement?.hasAttribute('data-segmented')).toBe(false);
      });

      it('renders continuous example meters at 0 and 100', async function continuousMeters() {
        const { container, getByRole } = await render(<ContinuousExample />);

        const atZero = getByRole('meter', { name: 'Gauge at 0%' });
        await expect.element(atZero).toBeVisible();
        expect(atZero.element()?.getAttribute('aria-valuenow')).toBe('0');
        expect(atZero.element().parentElement?.hasAttribute('data-filled')).toBe(false);

        const atFull = getByRole('meter', { name: 'Gauge at 100%' });
        await expect.element(atFull).toBeVisible();
        expect(atFull.element()?.getAttribute('aria-valuenow')).toBe('100');
        expect(atFull.element().parentElement?.hasAttribute('data-full')).toBe(true);

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
        expect(empty.element().parentElement?.hasAttribute('data-segmented')).toBe(true);
        expect(empty.element().parentElement?.hasAttribute('data-filled')).toBe(false);

        const full = getByRole('meter', { name: 'Gauge with 5 of 5 filled' });
        await expect.element(full).toBeVisible();
        expect(full.element()?.getAttribute('aria-valuenow')).toBe('5');
        expect(full.element().parentElement?.hasAttribute('data-full')).toBe(true);
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
          expect(meter.element().parentElement?.getAttribute('data-variant')).toBe(variant);
        }
      });
    });

    describe('#range-labels', function rangeLabels() {
      it('places min and max labels under the ends of the arc', async function rangeLabelPlacement() {
        const { getByRole, getByText } = await render(<WithRangeLabelsExample />);

        for (const [name, minLabel, maxLabel, descriptionLabel] of [
          ['CPU usage gauge', '0', '100', 'CPU Usage'],
          ['Risk level gauge', 'Low', 'High', 'Risk Level']
        ]) {
          const meter = getByRole('meter', { name });
          await expect.element(meter).toBeVisible();
          const arc = meter.element().getBoundingClientRect();
          const min = getByText(minLabel, { exact: true }).element().getBoundingClientRect();
          const max = getByText(maxLabel, { exact: true }).element().getBoundingClientRect();
          const description = getByText(descriptionLabel).element().getBoundingClientRect();

          expect(min.right).toBeLessThanOrEqual(description.left);
          expect(max.left).toBeGreaterThanOrEqual(description.right);
          expect(arc.left).toBeGreaterThanOrEqual(min.left);
          expect(arc.left).toBeLessThanOrEqual(min.right);
          expect(arc.right).toBeGreaterThanOrEqual(max.left);
          expect(arc.right).toBeLessThanOrEqual(max.right);
          expect(min.top).toBeGreaterThanOrEqual(arc.bottom);
          expect(max.top).toBeCloseTo(min.top, 0);
        }
      });

      it('flips the range labels in right-to-left layouts', async function rtlRangeLabels() {
        const { getByRole, getByText } = await render(
          <div dir="rtl">
            <WithRangeLabelsExample />
          </div>
        );

        const meter = getByRole('meter', { name: 'Risk level gauge' });
        await expect.element(meter).toBeVisible();
        expect(getByText('Low').element().getBoundingClientRect().left).toBeGreaterThan(
          getByText('High').element().getBoundingClientRect().right
        );
      });
    });

    describe('#composition', function composition() {
      it('keeps a wrapped description below the arc when Flex styles load last', async function lateFlexStyles() {
        const { getByRole, getByText } = await render(<ContextDescriptionExample />);
        const meter = getByRole('meter', { name: 'Site health' });
        const description = getByText('Health from context.');
        const flexStyles = document.querySelector('style[data-vite-dev-id$="/layout/flex/src/index.module.css"]');
        if (!flexStyles) throw new Error('Flex stylesheet is missing');
        const stylesheet = document.createElement('style');
        stylesheet.textContent = flexStyles.textContent;
        document.head.append(stylesheet);

        try {
          expect(description.element().getBoundingClientRect().top).toBeGreaterThanOrEqual(
            meter.element().getBoundingClientRect().bottom
          );
        } finally {
          stylesheet.remove();
        }
      });

      it('honors explicit text emphasis and center sizing', async function slotEmphasis() {
        const { getByText } = await render(
          <PlaygroundExample
            label="50%"
            description="Risk level"
            rangeMin="Low"
            rangeMax="High"
            emphasis="critical"
            textSize="xs"
            value={50}
          />
        );

        for (const label of ['50%', 'Risk level', 'Low', 'High']) {
          await expect.element(getByText(label)).toHaveStyle({ color: 'rgb(219, 24, 2)' });
        }
        for (const label of ['50%', 'Risk level']) {
          expect(getComputedStyle(getByText(label).element()).fontSize).toBe('12px');
        }
      });

      it('lays out regions the same in either order', async function regionOrder() {
        const { getByTestId } = await render(<RegionOrderExample />);

        const [rangeFirst, centerFirst] = ['range-first', 'center-first'].map(function measure(id) {
          const chart = getByTestId(id);
          const origin = chart.element().getBoundingClientRect();
          return ['72%', 'Score', 'Low', 'High'].map(function offset(text) {
            const rect = chart.getByText(text).element().getBoundingClientRect();
            return [rect.left - origin.left, rect.top - origin.top];
          });
        });

        expect(rangeFirst).toEqual(centerFirst);
      });

      it('keeps region layout with consumer context overrides', async function contextOverrides() {
        const centerRef = createRef<HTMLDivElement>();
        const rangeRef = createRef<HTMLDivElement>();
        const centerContextRef = createRef<HTMLDivElement>();
        const rangeContextRef = createRef<HTMLDivElement>();
        const { getByRole, getByText } = await render(
          <GaugeChartCenterContext.Provider value={{ className: 'custom-center', ref: centerContextRef }}>
            <GaugeChartRangeContext.Provider value={{ className: 'custom-range', ref: rangeContextRef }}>
              <WithRangeLabelsExample centerRef={centerRef} rangeRef={rangeRef} />
            </GaugeChartRangeContext.Provider>
          </GaugeChartCenterContext.Provider>
        );

        const meter = getByRole('meter', { name: 'Risk level gauge' });
        await expect.element(meter).toBeVisible();
        expect(centerRef.current?.classList.contains('custom-center')).toBe(true);
        expect(rangeRef.current?.classList.contains('custom-range')).toBe(true);
        expect(centerRef.current).toBe(centerContextRef.current);
        expect(rangeRef.current).toBe(rangeContextRef.current);
        expect(getByText('Low').element().getBoundingClientRect().right).toBeLessThanOrEqual(
          getByText('Risk Level').element().getBoundingClientRect().left
        );
      });
    });

    describe('#accessible-text', function accessibleText() {
      it('keeps the description linked until the last slot unmounts', async function overlappingDescriptions() {
        const { getByRole, rerender } = await render(<OverlappingDescriptionsExample count={2} />);
        const meter = getByRole('meter', { name: 'Site health' });

        await rerender(<OverlappingDescriptionsExample count={1} />);
        await expect.element(meter).toHaveAccessibleDescription('Updated daily. Current score.');

        await rerender(<OverlappingDescriptionsExample count={0} />);
        await expect.element(meter).toHaveAccessibleDescription('Updated daily.');
      });

      it.each([false, true])(
        'keeps center controls clickable and descriptions current (range first: %s)',
        async function dynamicDescription(rangeFirst) {
          const { getByRole } = await render(<DynamicDescriptionExample rangeFirst={rangeFirst} />);
          const meter = getByRole('meter', { name: 'Site health' });
          const changeDescription = getByRole('button', { name: 'Change description' });
          const descriptionButton = getByRole('button', { name: 'Change from description' });
          const changeAgain = getByRole('button', { name: 'Change again' });
          const arc = meter.element().getBoundingClientRect();
          const control = changeDescription.element().getBoundingClientRect();
          const sibling = changeAgain.element().getBoundingClientRect();
          const groupCenter = (control.top + sibling.bottom) / 2;

          expect(control.left + control.width / 2).toBeCloseTo(arc.left + arc.width / 2, 0);
          expect(Math.abs(groupCenter - (arc.top + arc.height / 2))).toBeLessThan(arc.height / 10);
          expect(control.bottom).toBeLessThanOrEqual(sibling.top);

          const id = descriptionButton.element().id;
          expect(id).toBeTruthy();
          expect(id).not.toBe('score-description');
          const describedBy = 'external-description ' + id;
          await expect.element(meter).toHaveAttribute('aria-describedby', describedBy);
          await expect.element(meter).toHaveAccessibleDescription('Updated daily. Change from description');
          expect(meter.element().contains(changeDescription.element())).toBe(false);
          await userEvent.tab();
          await expect.element(changeDescription).toHaveFocus();

          const target = descriptionButton.element().getBoundingClientRect();
          expect(document.elementFromPoint(target.x + target.width / 2, target.y + target.height / 2)).toBe(
            descriptionButton.element()
          );
          await descriptionButton.click();
          await expect.element(descriptionButton).toHaveAttribute('id', id);
          await changeAgain.click();
          await expect.element(descriptionButton).toHaveAttribute('id', id);
          await expect.element(meter).toHaveAttribute('aria-describedby', describedBy);
          await expect.element(meter).toHaveAccessibleDescription('Updated daily. Change from description');
          await changeDescription.click();
          await expect.element(meter).toHaveAttribute('aria-describedby', 'external-description');
          await expect.element(meter).toHaveAccessibleDescription('Updated daily.');
          await changeDescription.click();
          await expect.element(meter).toHaveAttribute('aria-describedby', describedBy);
        }
      );

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
        expect(meter.element().parentElement?.getAttribute('data-label-type')).toBe('text');
      });
    });
  });
});
