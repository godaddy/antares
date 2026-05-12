import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { type HeadingProps } from './src/index.tsx';
import { HeadingExample } from './examples/heading.tsx';
import { LevelExample } from './examples/level.tsx';
import { HeadingProviderExample } from './examples/provider.tsx';
import { HeadingOverrideExample } from './examples/override.tsx';

const meta = {
  title: 'Bento/components/Heading',
  component: () => null
} satisfies Meta<HeadingProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Props = {
  tags: ['!dev', 'stable'],
  argTypes: {
    level: {
      description: 'The level of the heading.',
      type: 'number',
      control: {
        type: 'number'
      }
    },
    children: {
      description: 'The content to display inside the text.',
      type: 'ReactNode',
      control: {
        type: 'text'
      }
    }
  }
} satisfies Story;

export const Heading = {
  render: HeadingExample
} satisfies Story;

export const Level = {
  render: LevelExample
} satisfies Story;

export const Provider = {
  render: HeadingProviderExample
} satisfies Story;

export const Override = {
  render: HeadingOverrideExample
} satisfies Story;
