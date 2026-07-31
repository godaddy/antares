'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { AxisTitle } from './src/index.tsx';

export default getMeta({
  title: 'components/Chart/AxisTitle'
});

export const Props = getComponentDocs(AxisTitle);

export const Examples = getExamples('./examples');
