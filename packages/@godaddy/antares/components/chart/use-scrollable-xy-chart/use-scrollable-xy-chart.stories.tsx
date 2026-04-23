'use client';
import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { AutoLayoutExample } from './examples/auto-layout.tsx';

export default getMeta({
  title: 'Antares/Components/Chart/useScrollableXYChart'
});

export const AutoLayout = getStory(AutoLayoutExample);
