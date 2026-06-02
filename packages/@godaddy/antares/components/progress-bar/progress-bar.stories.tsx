'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/progress-bar-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';
import { StatusesExample } from './examples/statuses.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { ProgressBar } from './src/index.tsx';

export default getMeta({
  title: 'components/ProgressBar'
});

export const Props = getComponentDocs(ProgressBar);

export const Default = DefaultExample;

export const Sizes = SizesExample;

export const Statuses = StatusesExample;

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    size: 'md',
    status: 'default',
    value: 60,
    label: 'Progress',
    helperText: 'Notice/helper text'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md'],
      description: 'Visual size of the track'
    },
    status: {
      control: 'radio',
      options: ['default', 'success', 'warning', 'critical'],
      description: 'Color intent of the fill'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0–100)'
    },
    label: {
      control: 'text',
      description: 'Label text for the progress bar'
    },
    helperText: {
      control: 'text',
      description: 'Helper or notice text below the track'
    }
  }
};
