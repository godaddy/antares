'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Tooltip } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { CustomAnchorExample } from './examples/custom-anchor.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/tooltip-playground.tsx';

export default getMeta({
  title: 'Antares/Components/Tooltip'
});

export const Props = getComponentDocs(Tooltip);

export const Default = getStory(DefaultExample);

export const CustomAnchor = getStory(CustomAnchorExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    placement: 'bottom',
    hideArrow: false,
    delay: 1500,
    closeDelay: 500
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom', 'bottom start', 'bottom end', 'top', 'top start', 'top end', 'left', 'right'],
      description: 'Tooltip placement relative to the trigger'
    },
    hideArrow: {
      control: 'boolean',
      description: 'Hide the tooltip arrow'
    },
    delay: {
      control: 'number',
      description: 'Delay before tooltip appears on hover (ms)'
    },
    closeDelay: {
      control: 'number',
      description: 'Delay before tooltip closes (ms)'
    }
  }
};
