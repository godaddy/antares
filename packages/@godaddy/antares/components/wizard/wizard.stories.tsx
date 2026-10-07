'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { DialogTrigger, Wizard, WizardStep, WizardSteps } from './src/index.tsx';
import { PlaygroundExample } from './examples/wizard-playground.tsx';

export default getMeta({ title: 'components/Wizard' });

export const Props = getComponentDocs(Wizard);
export const DialogTriggerProps = getComponentDocs(DialogTrigger);
export const WizardStepsProps = getComponentDocs(WizardSteps);
export const WizardStepProps = getComponentDocs(WizardStep);
export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    defaultActiveStep: 'details',
    isKeyboardDismissDisabled: false,
    showMenu: true,
    showCloseButton: true
  },
  argTypes: {
    defaultActiveStep: {
      control: 'radio',
      options: ['details', 'review'],
      description: 'Initial step for each new opening'
    },
    isKeyboardDismissDisabled: {
      control: 'boolean',
      description: 'Keep Escape from dismissing the dialog'
    },
    showMenu: {
      control: 'boolean',
      description: 'Show the menu of visited steps'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show a close control above the step content'
    }
  }
});
