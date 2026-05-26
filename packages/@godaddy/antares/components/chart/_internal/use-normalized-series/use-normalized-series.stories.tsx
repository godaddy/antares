'use client';
import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { MixedIdsExample } from './examples/mixed-ids.tsx';

export default getMeta({
  title: 'components/Chart/useNormalizedSeries'
});

export const MixedIds = getStory(MixedIdsExample);
