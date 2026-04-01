'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { BasicExample } from './examples/basic.tsx';
import { TooltipDismissStrip } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Chart/TooltipDismissStrip'
});

export const Props = getComponentDocs(TooltipDismissStrip);

export const Basic = getStory(BasicExample);
