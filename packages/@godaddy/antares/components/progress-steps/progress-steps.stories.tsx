'use client';
import { getComponentDocs, getInterfaceDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { ProgressSteps, type ProgressStepProps as ProgressStepPropsType } from './src/index.tsx';
import {
  ProgressStepsPlaygroundExample,
  type ProgressStepsPlaygroundExampleProps
} from './examples/progress-steps-playground.tsx';
import { DefaultExample } from './examples/default.tsx';
import { NotStartedExample } from './examples/not-started.tsx';
import { VerticalExample } from './examples/vertical.tsx';
import { InteractiveExample } from './examples/interactive.tsx';
import { DisabledExample } from './examples/disabled.tsx';
import { HideStepNumbersExample } from './examples/hide-step-numbers.tsx';
import { RTLExample } from './examples/rtl.tsx';

export default getMeta({
  title: 'components/ProgressSteps'
});

export const Props = getComponentDocs(ProgressSteps);

export const ProgressStepProps = getInterfaceDocs<ProgressStepPropsType>();

export const Default = getStory(DefaultExample);

export const NotStarted = getStory(NotStartedExample);

export const Vertical = getStory(VerticalExample);

export const Interactive = getStory(InteractiveExample);

export const Disabled = getStory(DisabledExample);

export const HideStepNumbers = getStory(HideStepNumbersExample);

export const RTL = getStory(RTLExample);

export const Playground = {
  render: (args: ProgressStepsPlaygroundExampleProps) => <ProgressStepsPlaygroundExample {...args} />,
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
};
