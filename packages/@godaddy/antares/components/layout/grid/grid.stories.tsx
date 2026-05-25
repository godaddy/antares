'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/grid-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { ResponsiveExample } from './examples/responsive.tsx';
import { AlignmentExample } from './examples/alignment.tsx';
import { DefaultExample } from './examples/default.tsx';
import { ColumnsExample } from './examples/columns.tsx';
import { AreasExample } from './examples/areas.tsx';
import { GapExample } from './examples/gap.tsx';
import { FormExample } from './examples/form.tsx';
import { Grid } from './src/index.tsx';

export default getMeta({
  title: 'components/Layout/Grid'
});

export const Props = getComponentDocs(Grid);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    columns: 'repeat(3, 1fr)',
    gap: 'md',
    as: 'div'
  },
  argTypes: {
    columns: { control: 'text' },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    justifyContent: {
      control: 'select',
      options: ['normal', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']
    },
    alignItems: { control: 'select', options: ['normal', 'start', 'end', 'center', 'stretch', 'baseline'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside'] }
  }
};

export const Default = DefaultExample;

export const Columns = ColumnsExample;

export const Gap = GapExample;

export const Areas = AreasExample;

export const Responsive = ResponsiveExample;

export const Alignment = AlignmentExample;

export const Form = FormExample;
