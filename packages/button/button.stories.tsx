import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonExample } from './examples/button.tsx';

const meta: Meta<typeof ButtonExample> = {
  title: 'components/button',
  component: () => null
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    childRef: {
      description: 'A ref to the button element. This is useful if you want to access the button element directly.'
    },
    children: {
      description: 'The content to display inside the button.'
    }
  }
};

export const Button: Story = {
  render: (args) => <ButtonExample {...args} />
};
