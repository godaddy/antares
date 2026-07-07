'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Drawer } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { BottomSheetExample } from './examples/bottom-sheet.tsx';
import { PlacementsExample } from './examples/placements.tsx';
import { NestedPopoverExample } from './examples/nested-popover.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/drawer-playground.tsx';

export default getMeta({
  title: 'components/Drawer'
});

export const Props = getComponentDocs(Drawer);

export const Default = getStory(DefaultExample);

export const BottomSheet = getStory(BottomSheetExample);

export const Placements = getStory(PlacementsExample);

export const NestedPopover = getStory(NestedPopoverExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    placement: 'right',
    isDismissable: true,
    showCloseButton: undefined,
    title: 'Playground'
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
    showCloseButton: {
      control: 'boolean',
      description: 'Show built-in close button'
    },
    title: {
      control: 'text',
      description: 'Heading rendered inside the drawer'
    }
  }
};
