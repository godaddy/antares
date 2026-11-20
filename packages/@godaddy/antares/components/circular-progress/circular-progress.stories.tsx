'use client';
import { PlaygroundExample } from './examples/circular-progress-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { CircularProgress } from './src/index.tsx';

export default getMeta({
  title: 'components/CircularProgress'
});

export const Props = getComponentDocs(CircularProgress);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    status: 'default',
    value: 60,
    isIndeterminate: false,
    label: 'Progress',
    description: 'Notice/helper text',
    showValue: true
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size preset controlling circle diameter and typography scale'
    },
    status: {
      control: 'radio',
      options: ['default', 'success', 'warning', 'critical'],
      description: 'Color intent of the fill'
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Show ongoing activity when the completion percentage is unknown; hides value text'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0–100)'
    },
    label: {
      control: 'text',
      description: 'Visible label text displayed below the circle'
    },
    description: {
      control: 'text',
      description: 'Description displayed below the label'
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to render the visible value slot'
    }
  }
});
