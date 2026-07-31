'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { ChartColorProvider } from './src/index.tsx';

export default getMeta({
  title: 'components/Chart/useChartColor'
});

export const ChartColorProviderProps = getComponentDocs(ChartColorProvider);

export const Examples = getExamples('./examples');
