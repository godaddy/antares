'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/circular-progress-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { DefaultExample } from './examples/default.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { EmphasisExample } from './examples/emphasis.tsx';
import { CircularProgress } from './src/index.tsx';

export default getMeta({
  title: 'components/CircularProgress'
});

export const Props = getComponentDocs(CircularProgress);

export const Default = DefaultExample;

export const Sizes = SizesExample;

export const Emphasis = EmphasisExample;

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    size: 'md',
    value: 60,
    label: 'Progress',
    helperText: 'Notice/helper text'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size preset controlling circle diameter and typography scale'
    },
    emphasis: {
      control: 'radio',
      options: ['success', 'warning', 'critical'],
      description: 'Visual emphasis for status feedback'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0–100)'
    },
    label: {
      control: 'text',
      description: 'Visible label text displayed below the circle'
    },
    helperText: {
      control: 'text',
      description: 'Helper or notice text displayed below the label'
    }
  }
};
