'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Drawer } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { BottomSheetExample } from './examples/bottom-sheet.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/drawer-playground.tsx';
import { SnapPointsExample } from './examples/snap-points.tsx';
import { ControlledSnapExample } from './examples/controlled-snap.tsx';
import { NestedPopoverExample } from './examples/nested-popover.tsx';
import { PercentSnapPointsExample } from './examples/percent-snap-points.tsx';

export default getMeta({
  title: 'components/Drawer'
});

export const Props = getComponentDocs(Drawer);

export const Default = getStory(DefaultExample);

export const BottomSheet = getStory(BottomSheetExample);

export const SnapPoints = getStory(SnapPointsExample);

export const ControlledSnap = getStory(ControlledSnapExample);

export const PercentSnapPoints = getStory(PercentSnapPointsExample);

export const NestedPopover = getStory(NestedPopoverExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    placement: 'right',
    isDismissable: true,
    showCloseButton: undefined,
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
    showCloseButton: {
      control: 'boolean',
      description: 'Show built-in close button'
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable spring animation'
    }
  }
};
