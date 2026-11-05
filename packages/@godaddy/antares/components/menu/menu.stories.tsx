'use client';
import { getComponentDocs, getMeta, getExamples, getStory } from '@bento/storybook-addon-helpers';
import { Menu, MenuGroup, MenuItem, Separator, MenuTrigger, SubmenuTrigger } from './src/index.tsx';
import { PlaygroundExample } from './examples/menu-playground.tsx';

export default getMeta({
  title: 'components/Menu'
});

export const Props = getComponentDocs(Menu);
export const MenuTriggerProps = getComponentDocs(MenuTrigger);
export const MenuGroupProps = getComponentDocs(MenuGroup);
export const MenuItemProps = getComponentDocs(MenuItem);
export const SeparatorProps = getComponentDocs(Separator);
export const SubmenuTriggerProps = getComponentDocs(SubmenuTrigger);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    singleSelection: true,
    multipleSelection: false,
    showGroups: true,
    showSubmenu: true,
    showSeparators: true
  },
  argTypes: {
    singleSelection: {
      control: 'boolean',
      description: 'Enable single selection mode'
    },
    multipleSelection: {
      control: 'boolean',
      description: 'Enable multiple selection mode'
    },
    showGroups: {
      control: 'boolean',
      description: 'Show menu groups with headers'
    },
    showSubmenu: {
      control: 'boolean',
      description: 'Show nested submenu'
    },
    showSeparators: {
      control: 'boolean',
      description: 'Show menu separators'
    }
  }
});
