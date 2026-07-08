'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { InlineDrawer, InlineDrawerPanel } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { SidebarNavExample } from './examples/sidebar-nav.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/inline-drawer-playground.tsx';

export default getMeta({
  title: 'components/InlineDrawer'
});

export const Props = getComponentDocs(InlineDrawer);

export const InlineDrawerPanelProps = getComponentDocs(InlineDrawerPanel);

export const Default = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const SidebarNav = getStory(SidebarNavExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
