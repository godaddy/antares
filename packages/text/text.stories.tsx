import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text as TextComponent, type TextProps } from './src/index.tsx';
import { TextExample } from './examples/text.tsx';
import { AlignExample } from './examples/align.tsx';
import { AsExample } from './examples/as.tsx';
import { MaxLinesExample } from './examples/max-lines.tsx';
import { WrapExample } from './examples/wrap.tsx';

const meta = {
  title: 'components/text',
  component: () => null
} satisfies Meta<TextProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Props = {
  tags: ['!dev', 'stable'],
  argTypes: {
    as: {
      description: 'The HTML element to render the text as.',
      type: 'string',
      control: {
        type: 'select',
        options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      },
      table: {
        defaultValue: { summary: 'span' }
      }
    },
    align: {
      description: 'The alignment of the text.',
      type: 'start|center|end|justify',
      control: {
        type: 'select',
        options: ['start', 'center', 'end', 'justify']
      }
    },
    children: {
      description: 'The content to display inside the text.',
      type: 'ReactNode',
      control: {
        type: 'text'
      }
    },
    maxLines: {
      description: 'The maximum number of lines to display.',
      type: 'number',
      control: {
        type: 'number'
      }
    },
    wrap: {
      description: 'The wrapping behavior of the text.',
      type: 'wrap|nowrap|balance|pretty|stable',
      control: {
        type: 'select',
        options: ['wrap', 'nowrap', 'balance', 'pretty', 'stable']
      }
    }
  }
} satisfies Story;

export const Text = {
  render: TextExample
} satisfies Story;

export const Align = {
  render: AlignExample
} satisfies Story;

export const As = {
  render: AsExample
} satisfies Story;

export const MaxLines = {
  render: MaxLinesExample
} satisfies Story;

export const Wrap = {
  render: WrapExample
} satisfies Story;
