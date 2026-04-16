'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { SingleSeriesLegendExample } from './examples/single-series.tsx';
import { MultiSeriesLegendExample } from './examples/multi-series.tsx';
import { LegendWithLabelExample } from './examples/with-label.tsx';
import { LegendVerticalExample } from './examples/vertical.tsx';
import { LegendSizeChartExample } from './examples/legend-size-chart-example.tsx';
import { Legend } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Chart/Legend'
});

export const Props = getComponentDocs(Legend);

export const SingleSeries = getStory(SingleSeriesLegendExample);

export const MultipleSeries = getStory(MultiSeriesLegendExample);

export const WithLabel = getStory(LegendWithLabelExample);

export const Vertical = getStory(LegendVerticalExample);

export const LegendSizeChart = getStory(LegendSizeChartExample);
