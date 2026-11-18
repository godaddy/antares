'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Drawer, DrawerTrigger } from './src/index.tsx';
import { PlaygroundExample } from './examples/drawer-playground.tsx';

export default getMeta({
  title: 'components/Drawer'
});

export const Props = getComponentDocs(Drawer);

export const DrawerTriggerProps = getComponentDocs(DrawerTrigger);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    placement: 'right',
    preventDismissal: false,
    showTitle: false
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Edge the drawer slides in from'
    },
    preventDismissal: {
      control: 'boolean',
      description: 'Block closing by swipe, Escape, or backdrop press'
    },
    showTitle: {
      control: 'boolean',
      description: 'Render a Heading slot="title" beside the close button'
    }
  }
});
