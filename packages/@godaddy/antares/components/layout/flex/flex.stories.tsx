'use client';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/flex-playground.tsx';
import { getMeta, getComponentDocs } from '@bento/storybook-addon-helpers';
import { DirectionExample } from './examples/direction.tsx';
import { AlignmentExample } from './examples/alignment.tsx';
import { SidebarExample } from './examples/sidebar.tsx';
import { DefaultExample } from './examples/default.tsx';
import { NavbarExample } from './examples/navbar.tsx';
import { WrapExample } from './examples/wrap.tsx';
import { GapExample } from './examples/gap.tsx';
import { Flex } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Layout/Flex'
});

export const Props = getComponentDocs(Flex);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
  args: {
    direction: 'row',
    gap: 'md',
    as: 'div'
  },
  argTypes: {
    direction: { control: 'select', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    wrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    justifyContent: {
      control: 'select',
      options: ['normal', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']
    },
    alignItems: { control: 'select', options: ['normal', 'start', 'end', 'center', 'stretch', 'baseline'] },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    as: { control: 'select', options: ['div', 'section', 'article', 'aside'] }
  }
};

export const Default = DefaultExample;

export const Direction = DirectionExample;

export const Alignment = AlignmentExample;

export const Gap = GapExample;

export const Wrap = WrapExample;

export const Navbar = NavbarExample;

export const Sidebar = SidebarExample;
