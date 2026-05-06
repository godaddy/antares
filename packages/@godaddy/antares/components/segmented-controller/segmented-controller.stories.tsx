'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/segmented-controller-playground.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { IconOnlyExample } from './examples/icon-only.tsx';
import { DisabledExample } from './examples/disabled.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { BasicExample } from './examples/basic.tsx';
import { IconExample } from './examples/icon.tsx';
import { SegmentedController } from './src/index.tsx';
import { OverflowExample } from './examples/overflow.tsx';
import { RTLExample } from './examples/rtl.tsx';

export default getMeta({
  title: 'components/SegmentedController'
});

export const Props = getComponentDocs(SegmentedController);

export const Basic = getStory(BasicExample);

export const Controlled = getStory(ControlledExample);

export const Sizes = getStory(SizesExample);

export const Icon = getStory(IconExample);

export const IconOnly = getStory(IconOnlyExample);

export const Disabled = getStory(DisabledExample);

export const Overflow = getStory(OverflowExample);

export const RTL = getStory(RTLExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    size: 'md',
    isDisabled: false,
    value: 'day'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the segmented controller'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disable the entire group'
    },
    value: {
      control: 'select',
      options: ['day', 'week', 'month', 'year'],
      description: 'Value'
    }
  }
};
