import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@bento/radio';
import { ControlledExample } from './examples/controlled.tsx';
import { UncontrolledExample } from './examples/uncontrolled.tsx';
import { SingleRadioExample } from './examples/single-radio.tsx';

const meta: Meta<typeof RadioGroup> = {
  title: 'components/radio',
  component: () => null
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    value: {
      description: 'The current value (controlled).',
      type: 'string'
    },
    defaultValue: {
      description: 'The default value (uncontrolled).',
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
    form: {
      description:
        'The <form> element to associate the input with. The value of this attribute must be the id of a <form> in the same document.',
      type: 'string'
    },
    children: {
      description: 'Radio children.'
    }
  }
};

export const RadioProps: StoryObj<typeof Radio> = {
  tags: ['!dev', 'stable'],
  argTypes: {
    value: {
      description: 'The value of the radio button, used when submitting an HTML form.',
      type: 'string'
    },
    inputRef: {
      description: 'A ref for the HTML input element.'
    },
    children: {
      description: 'The label for the Radio. Accepts any renderable node.'
    },
    isDisabled: {
      description:
        'Whether the radio button is disabled or not. Shows that a selection exists, but is not available in that circumstance.',
      type: 'boolean'
    },
    autoFocus: {
      description: 'Whether the element should receive focus on render.',
      type: 'boolean'
    }
  }
};

export const Controlled: Story = {
  render: () => <ControlledExample />
};

export const Uncontrolled: Story = {
  render: () => <UncontrolledExample />
};

export const SingleRadio: Story = {
  render: () => <SingleRadioExample />
};
