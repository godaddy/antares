import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ContinuousExample } from '../examples/continuous.tsx';
import { BasicExample } from '../examples/basic.tsx';
import { PlaygroundExample } from '../examples/gauge-chart-playground.tsx';
import { SegmentedExample } from '../examples/segmented.tsx';
import { VariantsExample } from '../examples/variants.tsx';
import { WithRangeLabelsExample } from '../examples/with-range-labels.tsx';

const SSR_EXAMPLES: Array<[string, React.ReactElement]> = [
  ['continuous', <ContinuousExample key="continuous" />],
  ['basic', <BasicExample key="basic" />],
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
      subLabel="Risk"
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
  });
});
