'use client';
import { getMeta, getComponentDocs, getStory } from '@bento/storybook-addon-helpers';
import { Alert } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { EmphasesExample } from './examples/emphases.tsx';
import { DismissibleExample } from './examples/dismissible.tsx';
import { WithActionExample } from './examples/with-action.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/alert-playground.tsx';

export default getMeta({
  title: 'components/Alert'
});

export const Props = getComponentDocs(Alert);

export const Default = getStory(DefaultExample);

export const Emphases = getStory(EmphasesExample);

export const Dismissible = getStory(DismissibleExample);

export const WithAction = getStory(WithActionExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    emphasis: 'info',
    title: 'Alert title',
    children: 'Optional description text providing additional context.',
    dismissible: false,
    showAction: false
  },
  argTypes: {
    emphasis: {
      control: 'select',
      options: ['critical', 'warning', 'success', 'info', 'highlight', 'premium', 'internal'],
      description: 'The semantic emphasis of the alert'
    },
    title: {
      control: 'text',
      description: 'The bold heading text'
    },
    children: {
      control: 'text',
      description: 'Optional body text'
    },
    dismissible: {
      control: 'boolean',
      description: 'Show the dismiss button'
    },
    showAction: {
      control: 'boolean',
      description: 'Show an action button'
    }
  }
};
