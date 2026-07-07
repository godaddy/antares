'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { InlineDrawer } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { SidebarNavExample } from './examples/sidebar-nav.tsx';
import { PlacementsExample } from './examples/placements.tsx';
import { AnimationExample } from './examples/animation.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/inline-drawer-playground.tsx';

export default getMeta({
  title: 'components/InlineDrawer'
});

export const Props = getComponentDocs(InlineDrawer);

export const Default = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const SidebarNav = getStory(SidebarNavExample);

export const Placements = getStory(PlacementsExample);

export const Animation = getStory(AnimationExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    placement: 'left',
    animate: true,
    minSize: undefined,
    maxSize: 240,
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
    minSize: {
      control: 'text',
      description: 'Collapsed "peek" size; when set the panel stays visible when collapsed'
    },
    maxSize: {
      control: 'text',
      description: 'Expanded size'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the trigger'
    }
  }
};
