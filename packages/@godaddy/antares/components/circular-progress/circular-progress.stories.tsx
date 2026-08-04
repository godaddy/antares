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
});
