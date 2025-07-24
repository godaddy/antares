import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MergeClassName } from './examples/merge-classname.tsx';
import { Default } from './examples/default-divider.tsx';
import { VerticalStyleOverride } from './examples/vertical-style-override.tsx';
import { VerticalDiv } from './examples/vertical-div.tsx';

const meta: Meta<typeof Default> = {
  title: 'components/divider',
  component: () => null
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Props: Story = {
  tags: ['!dev', 'stable'],
  argTypes: {
    orientation: {
      description: 'The orientation of the divider. Defaults to "horizontal".'
    },
    id: {
      description: 'The id of the divider element. This is useful for accessibility purposes.'
    }
  }
};

export const Divider: Story = {
  render: (args) => <Default {...args} />
};

export const VerticalDivider: Story = {
  render: (args) => <VerticalStyleOverride {...args} />
};

export const VerticalDividerInADiv: Story = {
  render: (args) => <VerticalDiv {...args} />
};

export const MergeClassNameExample: Story = {
  render: (args) => <MergeClassName {...args} />
};
