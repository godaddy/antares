'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/box-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { ElevationExample } from './examples/elevation.tsx';
import { AlignmentExample } from './examples/alignment.tsx';
import { RoundingExample } from './examples/rounding.tsx';
import { PaddingExample } from './examples/padding.tsx';
import { AsExample } from './examples/as.tsx';
import { Box } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Layout/Box'
});

export const Props = getComponentDocs(Box);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    padding: 'md',
    as: 'div'
  },
  argTypes: {
    padding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    elevation: { control: 'select', options: ['base', 'card', 'raised', 'overlay'] },
    rounding: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside'] }
  }
};

export const Padding = PaddingExample;

export const Elevation = ElevationExample;

export const Rounding = RoundingExample;

export const As = AsExample;

export const Alignment = AlignmentExample;
