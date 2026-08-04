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
    isDismissable: true,
    showHeader: false,
    animate: true
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Edge the drawer slides in from'
    },
    isDismissable: {
      control: 'boolean',
      description: 'Close on backdrop click'
    },
    animate: {
      control: 'boolean',
      description: 'Animate the open/close slide'
    },
    showHeader: {
      control: 'boolean',
      description: 'Compose a Header with a title and close button'
    }
  }
});
