'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { InlineDrawer, InlineDrawerPanel } from './src/index.tsx';
import { PlaygroundExample } from './examples/inline-drawer-playground.tsx';

export default getMeta({
  title: 'components/InlineDrawer'
});

export const Props = getComponentDocs(InlineDrawer);

export const InlineDrawerPanelProps = getComponentDocs(InlineDrawerPanel);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    placement: 'top',
    animate: true,
    isDisabled: false
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Edge the drawer anchors to (selects the collapse axis)'
    },
    animate: {
      control: 'boolean',
      description: 'Animate expand/collapse'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the trigger'
    }
  }
});
