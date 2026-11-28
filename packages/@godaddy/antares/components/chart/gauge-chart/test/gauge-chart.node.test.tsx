import type { ReactElement } from 'react';
import { GaugeChart, GaugeChartCenter, Text } from '@godaddy/antares';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ContextDescriptionExample } from '../examples/context-description.tsx';
import { ContinuousExample } from '../examples/continuous.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/gauge-chart-playground.tsx';
import { SegmentedExample } from '../examples/segmented.tsx';
import { VariantsExample } from '../examples/variants.tsx';
import { WithRangeLabelsExample } from '../examples/with-range-labels.tsx';

const SSR_EXAMPLES: Array<[string, ReactElement]> = [
  ['continuous', <ContinuousExample key="continuous" />],
  ['context description', <ContextDescriptionExample key="context" />],
  ['basic', <DefaultExample key="basic" />],
  [
    'playground',
    <PlaygroundExample
      key="playground"
      label="3/5"
      value={3}
      segments={5}
      rangeMin="Low"
      rangeMax="High"
      labelType="text"
      variant="warning"
      description="Risk"
      descriptionId="risk-description"
      width="118px"
    />
  ],
  ['segmented', <SegmentedExample key="segmented" />],
  ['variants', <VariantsExample key="variants" />],
  ['with-range-labels', <WithRangeLabelsExample key="with-range-labels" />]
];

describe('@godaddy/antares', function antares() {
  describe('#GaugeChart', function gaugeChartTests() {
    it.each(SSR_EXAMPLES)('renders %s example', function ssrSnapshot(_name, element) {
      const result = renderToString(element);
      expect(result).toMatchSnapshot();
    });

    it('rejects chart-owned placement props on the center region', function centerPlacementProps() {
      const result = renderToString(
        <GaugeChart value={50} aria-label="Placement">
          {/* @ts-expect-error - The chart owns how the center region aligns its items. */}
          <GaugeChartCenter justifyItems="start">
            <Text slot="value">50%</Text>
          </GaugeChartCenter>
        </GaugeChart>
      );
      expect(result).toContain('50%');
    });
  });
});
