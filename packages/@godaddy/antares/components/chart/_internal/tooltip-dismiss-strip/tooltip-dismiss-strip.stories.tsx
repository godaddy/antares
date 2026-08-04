'use client';
import { getComponentDocs, getExamples, getMeta } from '@bento/storybook-addon-helpers';
import { TooltipDismissStrip } from './src/index.tsx';

export default getMeta({
  title: 'components/Chart/TooltipDismissStrip'
});

export const Props = getComponentDocs(TooltipDismissStrip);

export const Examples = getExamples('./examples');
