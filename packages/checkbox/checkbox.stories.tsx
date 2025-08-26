import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { CheckboxExample } from './examples/checkbox.tsx';
import { CheckboxControlledExample } from './examples/checkbox-controlled.tsx';
import { CheckboxGroupControlledExample } from './examples/checkbox-group-controlled.tsx';
import { CheckboxGroupIndeterminateExample } from './examples/checkbox-group-indeterminate.tsx';
import { CheckboxGroupExample } from './examples/checkbox-group.tsx';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'components/checkbox',
  component: () => null
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxGroupProps: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    value: {
      description: 'The current value of the checkbox group (controlled).',
      type: 'string'
    },
    defaultValue: {
      description: 'The default value of the checkbox group (uncontrolled).',
      type: 'string'
    },

    isDisabled: {
      description: 'Whether the input is disabled.',
      type: 'boolean'
    },
    isReadOnly: {
      description: 'Whether the input can be selected but not changed by the user.',
      type: 'boolean'
    },
    isRequired: {
      description: 'Whether user input is required on the input before form submission.',
      type: 'boolean'
    },
    isInvalid: {
      description: 'Whether the input value is invalid.',
      type: 'boolean'
    },
    name: {
      description: 'The name of the input element, used when submitting an HTML form.',
      type: 'string'
    },
    description: {
      description: 'Description for the checkbox group.',
      type: 'string'
    },
    children: {
      description: 'Checkbox children within the group.'
    }
  }
};

export const CheckboxProps: StoryObj<typeof Checkbox> = {
  tags: ['!dev', 'stable'],
  argTypes: {
    value: {
      description: 'The value of the checkbox, used when submitting an HTML form.',
      type: 'string'
    },
    isDisabled: {
      description: 'Whether the input is disabled.',
      type: 'boolean'
    },
    isReadOnly: {
      description: 'Whether the input can be selected but not changed by the user.',
      type: 'boolean'
    },
    isRequired: {
      description: 'Whether user input is required on the input before form submission.',
      type: 'boolean'
    },
    isInvalid: {
      description: 'Whether the input value is invalid.',
      type: 'boolean'
    },
    inputRef: {
      description: 'A ref for the HTML input element.'
    },
    name: {
      description: 'The name of the input element, used when submitting an HTML form.',
      type: 'string'
    },
    children: {
      description: 'Checkbox children.'
    },
    autoFocus: {
      description: 'Whether the element should receive focus on render.',
      type: 'boolean'
    }
  }
};

export const CheckboxStory: Story = {
  render: (args) => <CheckboxExample {...args} />
};

export const CheckboxGroupStory: Story = {
  render: (args) => <CheckboxGroupExample {...args} />
};

export const CheckboxControlledStory: Story = {
  render: (args) => <CheckboxControlledExample {...args} />
};

export const CheckboxGroupIndeterminateStory: Story = {
  render: (args) => <CheckboxGroupIndeterminateExample {...args} />
};

export const CheckboxGroupControlledStory: Story = {
  render: (args) => <CheckboxGroupControlledExample {...args} />
};
