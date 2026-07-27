'use client';
import { getComponentDocs, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Menu, MenuGroup, MenuItem, MenuSeparator, MenuTrigger, SubmenuTrigger } from './src/index.tsx';
import { DefaultExample } from './examples/default.tsx';
import { GroupsExample } from './examples/groups.tsx';
import { SingleSelectionExample } from './examples/single-selection.tsx';
import { MultipleSelectionExample } from './examples/multiple-selection.tsx';
import { SizesExample } from './examples/sizes.tsx';
import { ControlledExample } from './examples/controlled.tsx';
import { SubmenuExample } from './examples/submenu.tsx';
import { BottomSheetExample } from './examples/bottom-sheet.tsx';
import { PlaygroundExample, type PlaygroundExampleProps } from './examples/menu-playground.tsx';

export default getMeta({
  title: 'components/Menu'
});

export const Props = getComponentDocs(Menu);
export const MenuTriggerProps = getComponentDocs(MenuTrigger);
export const MenuGroupProps = getComponentDocs(MenuGroup);
export const MenuItemProps = getComponentDocs(MenuItem);
export const MenuSeparatorProps = getComponentDocs(MenuSeparator);
export const SubmenuTriggerProps = getComponentDocs(SubmenuTrigger);

export const Basic = getStory(DefaultExample);

export const Controlled = getStory(ControlledExample);

export const Groups = getStory(GroupsExample);

export const SingleSelection = getStory(SingleSelectionExample);

export const MultipleSelection = getStory(MultipleSelectionExample);

export const Sizes = getStory(SizesExample);

export const WithSubmenus = getStory(SubmenuExample);

export const BottomSheet = getStory(BottomSheetExample);

export const Playground = {
  render: (args: PlaygroundExampleProps) => <PlaygroundExample {...args} />,
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
};
