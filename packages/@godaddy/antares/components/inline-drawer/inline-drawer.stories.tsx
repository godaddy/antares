'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { InlineDrawer } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { SidebarNavExample } from './examples/sidebar-nav.tsx';
import { DismissOnBlurExample } from './examples/dismiss-on-blur.tsx';
import { FocusScopeExample } from './examples/focus-scope.tsx';
import { VerticalExample } from './examples/vertical.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/inline-drawer-playground.tsx';

export default getMeta({
  title: 'components/InlineDrawer'
});

export const Props = getComponentDocs(InlineDrawer);

export const Default = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const SidebarNav = getStory(SidebarNavExample);

export const DismissOnBlur = getStory(DismissOnBlurExample);

export const FocusScope = getStory(FocusScopeExample);

export const Vertical = getStory(VerticalExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    placement: 'left',
    animate: true,
    shouldDismissOnBlur: false
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Edge the drawer anchors to'
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable transition'
    },
    shouldDismissOnBlur: {
      control: 'boolean',
      description: 'Collapse when focus leaves'
    }
  }
};
