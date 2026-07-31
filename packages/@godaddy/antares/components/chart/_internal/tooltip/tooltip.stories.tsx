'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { Tooltip } from './src/index.tsx';

export default getMeta({
  title: 'components/Chart/Tooltip'
});

export const Props: object = getComponentDocs(Tooltip);

export const Examples = getExamples('./examples');
