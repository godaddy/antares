'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/text-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { MaxLinesExample } from './examples/max-lines.tsx';
import { AlignExample } from './examples/align.tsx';
import { TextExample } from './examples/text.tsx';
import { WrapExample } from './examples/wrap.tsx';
import { AsExample } from './examples/as.tsx';
import { Text } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Text'
});

export const Props = getComponentDocs(Text);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    as: 'span',
    children: 'The quick brown fox jumps over the lazy dog.'
  },
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end', 'justify'] },
    as: { control: 'select', options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] },
    maxLines: { control: 'number' },
    wrap: { control: 'select', options: ['wrap', 'nowrap', 'balance', 'pretty', 'stable'] },
    children: { control: 'text' }
  }
};

export const Default = TextExample;

export const Align = AlignExample;

export const As = AsExample;

export const MaxLines = MaxLinesExample;

export const Wrap = WrapExample;
