'use client';
import { getComponentDocs, getMeta, getExamples, getStory } from '@bento/storybook-addon-helpers';
import { Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger, SubmenuTrigger } from './src/index.tsx';
import { PlaygroundExample } from './examples/menu-playground.tsx';

export default getMeta({
  title: 'components/Menu'
});

export const Props = getComponentDocs(Menu);
export const MenuTriggerProps = getComponentDocs(MenuTrigger);
export const MenuGroupProps = getComponentDocs(MenuGroup);
export const MenuItemProps = getComponentDocs(MenuItem);
export const MenuSeparatorProps = getComponentDocs(MenuSeparator);
export const SubmenuTriggerProps = getComponentDocs(SubmenuTrigger);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    size: 'md',
    multiSelect: false,
    withIcons: false,
    withGroups: false,
    disabledItems: false
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Size variant for the menu and its items; set it separately on nested menus'
    },
    multiSelect: {
      control: 'boolean',
      description: 'Enable multiple selection, rendering items as checkboxes'
    },
    withIcons: {
      control: 'boolean',
      description: 'Show a leading icon on each item'
    },
    withGroups: {
      control: 'boolean',
      description: 'Organize items into labeled groups separated by a divider'
    },
    disabledItems: {
      control: 'boolean',
      description: 'Disable an item'
    }
  }
});
