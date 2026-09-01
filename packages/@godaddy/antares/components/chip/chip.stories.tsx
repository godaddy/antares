'use client';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { Chip, ChipGroup, ChipList } from './src/index.tsx';
import { PlaygroundExample } from './examples/chip-playground.tsx';

export default getMeta({
  title: 'components/Chip'
});

export const Props = getComponentDocs(Chip);

export const ChipGroupProps = getComponentDocs(ChipGroup);

export const ChipListProps = getComponentDocs(ChipList);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    groupLabel: 'Categories',
    description: 'Choose at least one.',
    errorMessage: 'Select at least one category.',
    size: 'md',
    selectionMode: 'multiple',
    disallowEmptySelection: false,
    empty: false,
    children: 'Austin',
    textValue: '',
    isChipDisabled: false,
    href: '',
    removable: false,
    showError: false
  },
  argTypes: {
    groupLabel: {
      control: 'text',
      description: 'Visible Label for the ChipGroup'
    },
    description: {
      control: 'text',
      description: 'Help text shown when showError is false'
    },
    errorMessage: {
      control: 'text',
      description: 'Validation message shown when showError is true'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Visual size shared by every Chip in the group'
    },
    selectionMode: {
      control: 'radio',
      options: ['none', 'single', 'multiple'],
      description: 'Whether chips can be selected'
    },
    disallowEmptySelection: {
      control: 'boolean',
      description: 'Whether selection can be cleared to empty'
    },
    empty: {
      control: 'boolean',
      description: 'Whether the ChipList has no items'
    },
    children: {
      control: 'text',
      description: 'Visible text for the playground Chip'
    },
    textValue: {
      control: 'text',
      description: 'Accessible textValue for the Chip when composed'
    },
    isChipDisabled: {
      control: 'boolean',
      description: 'Whether the playground Chip is disabled'
    },
    href: {
      control: 'text',
      description: 'Optional link href for the Chip'
    },
    removable: {
      control: 'boolean',
      description: 'Whether onRemove is enabled and a remove button is shown'
    },
    showError: {
      control: 'boolean',
      description: 'Whether to render the errorMessage slot instead of description'
    }
  }
});
