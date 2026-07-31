'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { Legend } from './src/index.tsx';

export default getMeta({
  title: 'components/Chart/Legend'
});

export const Props = getComponentDocs(Legend);

export const Examples = getExamples('./examples');
