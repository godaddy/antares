'use client';

import { getMeta, getStory } from '@bento/storybook-addon-helpers';
import { OverviewDashboard } from './index.tsx';

export default getMeta({
  title: 'Blocks/Overview Dashboard',
  parameters: {
    layout: 'fullscreen'
  }
});

/** The complete dashboard preview embedded by the block README. */
export const Preview = getStory(OverviewDashboard);
