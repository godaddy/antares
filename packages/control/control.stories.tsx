import { DefaultExample } from './examples/default.tsx';
import { InputRefExample } from './examples/input-ref.tsx';
import { Control, ControlGroup } from '@bento/control';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const meta: Meta<typeof ControlGroup> = {
  title: 'internal/control',
  component: () => null
};

type Story = StoryObj<typeof ControlGroup>;

export default meta;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    children: {
      description: 'The control elements to render within the group.'
    },
    label: {
      description: 'The label for the control group.',
      type: 'string'
    },
    labelProps: {
      description: 'Props to pass to the label element.'
    },
    description: {
      description: 'Additional description text for the control group.',
      type: 'string'
    },
    descriptionProps: {
      description: 'Props to pass to the description element.'
    },
    errorMessage: {
      description: 'Error message to display below the controls.',
      type: 'string'
    },
    errorMessageProps: {
      description: 'Props to pass to the error message element.'
    },
    contentProps: {
      description: 'Props to pass to the container wrapping the children.'
    }
  }
};

export const ControlProps: StoryObj<typeof Control> = {
  tags: ['!dev', 'stable'],
  argTypes: {
    inputRef: {
      description: 'A ref for the HTML input element.'
    },
    inputProps: {
      description: 'Props to pass to the underlying input element.'
    },
    label: {
      description: 'The label for the control.'
    },
    labelProps: {
      description: 'Props to pass to the label element.'
    },
    children: {
      description: 'Additional content for the control.'
    }
  }
};

export const Default: Story = {
  render: (args) => <DefaultExample {...args} />
};

export const InputRef: Story = {
  render: (args) => <InputRefExample {...args} />
};
