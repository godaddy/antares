'use client';
import { getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';

export default getMeta({ title: 'components/Responsive' });

export const Examples = getExamples('./examples');

export const Playground = getStory(DefaultExample, {
  args: { query: '(min-width: 64rem)', ssrMatch: false },
  argTypes: {
    query: { control: 'text', description: 'A viewport or device media query' },
    ssrMatch: { control: 'boolean', description: 'Match used for SSR and initial hydration, not a browser override' }
  }
});
