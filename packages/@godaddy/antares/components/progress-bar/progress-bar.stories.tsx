'use client';
import { PlaygroundExample } from './examples/progress-bar-playground.tsx';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ProgressBar, ProgressBarTrack, ProgressBarValue } from './src/index.tsx';

export default getMeta({
  title: 'components/ProgressBar'
});

export const Props = getComponentDocs(ProgressBar);
export const TrackProps = getComponentDocs(ProgressBarTrack);
export const ValueProps = getComponentDocs(ProgressBarValue);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    status: 'default',
    value: 60,
    showValue: false,
    isIndeterminate: false,
    label: 'Progress',
    description: 'Notice/helper text'
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
    isIndeterminate: {
      control: 'boolean',
      description: 'Show ongoing activity when the completion percentage is unknown; hides value text'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0–100)'
    },
    showValue: {
      control: 'boolean',
      description: 'Render the optional ProgressBarValue'
    },
    label: {
      control: 'text',
      description: 'Label text for the progress bar'
    },
    description: {
      control: 'text',
      description: 'Helper or notice text below the track'
    }
  }
});
