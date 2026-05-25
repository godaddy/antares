'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { SingleSeriesExample } from './examples/single-series.tsx';
import { MultiSeriesExample } from './examples/multi-series.tsx';
import { ChartColorProvider } from './src/index.tsx';

export default getMeta({
  title: 'components/Chart/useChartColor'
});

export const ChartColorProviderProps = getComponentDocs(ChartColorProvider);

export const SingleSeries = getStory(SingleSeriesExample);

export const MultiSeries = getStory(MultiSeriesExample);
