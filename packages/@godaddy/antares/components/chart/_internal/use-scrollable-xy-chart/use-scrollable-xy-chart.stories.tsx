'use client';
import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { AutoLayoutExample } from './examples/auto-layout.tsx';

export default getMeta({
  title: 'components/Chart/useScrollableXYChart'
});

export const AutoLayout = getStory(AutoLayoutExample);
