'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ProgressSteps, ProgressStep } from './src/index.tsx';
import { ProgressStepsPlaygroundExample } from './examples/progress-steps-playground.tsx';

export default getMeta({
  title: 'components/ProgressSteps'
});

export const Props = getComponentDocs(ProgressSteps);

export const ProgressStepProps = getComponentDocs(ProgressStep);

export const Examples = getExamples('./examples');

export const Playground = getStory(ProgressStepsPlaygroundExample, {
  args: {
    orientation: 'horizontal',
    currentStep: 1,
    hideStepNumbers: false,
    interactive: true
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the steps'
    },
    currentStep: {
      control: 'number',
      description: '0-based index of the current step; omit for a not-yet-started flow'
    },
    hideStepNumbers: {
      control: 'boolean',
      description: 'Hide the auto-generated "N. " step-number prefix'
    },
    interactive: {
      control: 'boolean',
      description: 'Give each step an onPress handler (focusable, navigable)'
    }
  }
});
