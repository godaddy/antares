'use client';
import { PlaygroundExample } from './examples/progress-bar-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ProgressBar } from './src/index.tsx';

export default getMeta({
  title: 'components/ProgressBar'
});

export const Props = getComponentDocs(ProgressBar);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
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
});
