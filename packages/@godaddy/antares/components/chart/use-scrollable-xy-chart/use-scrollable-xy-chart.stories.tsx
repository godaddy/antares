'use client';
import { getMeta, getInterfaceDocs, getStory } from '@bento/storybook-addon-helpers';
import { AutoLayoutExample } from './examples/auto-layout.tsx';
import type { UseScrollableXYChartOptions } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Chart/useScrollableXYChart'
});

export const Props = getInterfaceDocs<UseScrollableXYChartOptions>();

export const AutoLayout = getStory(AutoLayoutExample);
