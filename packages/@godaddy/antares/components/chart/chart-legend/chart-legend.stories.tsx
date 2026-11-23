'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { ChartLegend } from './src/index.tsx';

export default getMeta({ title: 'components/Chart/ChartLegend' });

export const Props = getComponentDocs(ChartLegend);

export const Examples = getExamples('./examples');
