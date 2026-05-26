'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Popover, type PopoverProps } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { CustomAnchorExample } from './examples/custom-anchor.tsx';
import { WithCloseButtonExample } from './examples/with-close-button.tsx';
import { PlaygroundExample } from './examples/popover-playground.tsx';

export default getMeta({
  title: 'components/Popover'
});

export const Props = getComponentDocs(Popover);

export const Default = getStory(DefaultExample);

export const CustomAnchor = getStory(CustomAnchorExample);

export const WithCloseButton = getStory(WithCloseButtonExample);

export const Playground = {
  render: (args: PopoverProps) => <PlaygroundExample {...args} />,
  args: {
    placement: 'bottom',
    hideArrow: false,
    showCloseButton: false
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'top start', 'top end', 'left', 'right'],
      description: 'Popover placement relative to the trigger'
    },
    hideArrow: {
      control: 'boolean',
      description: 'Hide the popover arrow'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show a close button in the header'
    }
  }
};
