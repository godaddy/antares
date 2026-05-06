'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { BasicExample } from './examples/menu.tsx';
import { SubmenuExample } from './examples/menu-submenu.tsx';
import { SelectionExample } from './examples/menu-selection.tsx';
import { SectionsExample } from './examples/menu-sections.tsx';
import { PlaygroundExample } from './examples/menu-playground.tsx';
import { Menu } from './src/index.tsx';

export default getMeta({
  title: 'components/Menu'
});

export const Props = getComponentDocs(Menu);

export const Basic = getStory(BasicExample);

export const WithSubmenus = getStory(SubmenuExample);

export const WithSelection = getStory(SelectionExample);

export const WithSections = getStory(SectionsExample);

export const Playground = {
  render: (args: Record<string, unknown>) => <PlaygroundExample {...args} />,
  args: {
    size: 'md',
    selectionMode: 'none',
    matchWidth: false,
    withIcons: false,
    withSections: false,
    withKeyboardShortcuts: false,
    disabledItems: false
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size variant for menu items'
    },
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple'],
      description: 'Selection mode for menu items'
    },
    matchWidth: {
      control: 'boolean',
      description: 'Match menu width to trigger button'
    },
    withIcons: {
      control: 'boolean',
      description: 'Show icons in menu items'
    },
    withSections: {
      control: 'boolean',
      description: 'Organize items into sections with headers'
    },
    withKeyboardShortcuts: {
      control: 'boolean',
      description: 'Show keyboard shortcuts'
    },
    disabledItems: {
      control: 'boolean',
      description: 'Disable some menu items'
    }
  }
};
