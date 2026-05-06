'use client';
import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { AutoLayoutExample } from './examples/auto-layout.tsx';

export default getMeta({
  title: 'components/chart/useScrollableXYChart'
});

export const AutoLayout = getStory(AutoLayoutExample);
