/* v8 ignore next */
import React, { useState } from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';
import { DynamicValueDisplay } from './dynamic-select';
import styles from './select.module.css';

type Fruit = {
  id: string;
  name: string;
  category: string;
  emoji: string;
};

const FRUIT_DATA: Fruit[] = [
  { id: 'apple', name: 'Apple', category: 'Popular', emoji: '🍎' },
  { id: 'banana', name: 'Banana', category: 'Popular', emoji: '🍌' },
  { id: 'orange', name: 'Orange', category: 'Popular', emoji: '🍊' },
  { id: 'mango', name: 'Mango', category: 'Exotic', emoji: '🥭' },
  { id: 'kiwi', name: 'Kiwi', category: 'Exotic', emoji: '🥝' },
  { id: 'dragon-fruit', name: 'Dragon Fruit', category: 'Exotic', emoji: '🐉' },
  { id: 'strawberry', name: 'Strawberry', category: 'Berries', emoji: '🍓' },
  { id: 'blueberry', name: 'Blueberry', category: 'Berries', emoji: '🫐' },
  { id: 'grape', name: 'Grape', category: 'Berries', emoji: '🍇' }
];

/**
 * Basic Select example with full Storybook controls.
 * Demonstrates all Select features: single/multi selection, groups, states, form integration,
 * dynamic collections, empty state, and controlled open state.
 *
 * @param {any} props - Props passed from Storybook controls
 * @returns {JSX.Element} The rendered Select with all features
 * @public
 */
export function BasicSelectExample(props: any) {
  const {
    placeholder = 'Select a fruit...',
    withGroups = false,
    selectionMode = 'single',
    defaultValue,
    isDisabled = false,
    isRequired = false,
    isInvalid = false,
    name,
    label,
    showDescription = false,
    showError = false,
    autoFocus = false,
    defaultOpen = false,
    disabledKeys = [],
    useDynamicCollection = false,
    showEmptyState = false,
    controlledOpen = false,
    ...restProps
  } = props;

  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleChange = function handleChange(newValue: any) {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const handleOpenChange = function handleOpenChange(open: boolean) {
    setIsOpen(open);
    props.onOpenChange?.(open);
  };

  // Render function for dynamic collections
  const renderFruitItem = function renderFruitItem(item: unknown) {
    const fruit = item as Fruit;
    return (
      <ListBoxItem id={fruit.id} textValue={fruit.name}>
        {fruit.emoji} {fruit.name}
      </ListBoxItem>
    );
  };

  const selectProps = {
    ...restProps,
    selectionMode,
    value,
    onChange: handleChange,
    isDisabled,
    isRequired,
    isInvalid,
    autoFocus,
    disabledKeys,
    ...(name && { name }),
    ...(label && { 'aria-label': label }),
    ...(controlledOpen ? { isOpen, onOpenChange: handleOpenChange } : { defaultOpen }),
    ...(showEmptyState && {
      renderEmptyState: () => (
        <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
          <div>No fruits available</div>
        </div>
      )
    })
  };

  return (
    <Select {...selectProps} className={styles.selectWrapper}>
      <Button slot="trigger" className={styles.trigger}>
        {useDynamicCollection ? (
          <DynamicValueDisplay slot="value" placeholder={placeholder} className={styles.value} />
        ) : (
          <ValueDisplay slot="value" placeholder={placeholder} className={styles.value} />
        )}
      </Button>
      <Popover slot="popover" className={styles.popover}>
        <ListBox
          slot="listbox"
          aria-label={label || 'Fruit options'}
          className={styles.listbox}
          {...(useDynamicCollection && { items: showEmptyState ? [] : FRUIT_DATA })}
        >
          {useDynamicCollection ? (
            renderFruitItem
          ) : withGroups ? (
            <>
              <ListBoxSection>
                <Header>Popular Fruits</Header>
                <ListBoxItem id="apple" textValue="Apple">
                  Apple
                </ListBoxItem>
                <ListBoxItem id="banana" textValue="Banana">
                  Banana
                </ListBoxItem>
                <ListBoxItem id="orange" textValue="Orange">
                  Orange
                </ListBoxItem>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Exotic Fruits</Header>
                <ListBoxItem id="mango" textValue="Mango">
                  Mango
                </ListBoxItem>
                <ListBoxItem id="kiwi" textValue="Kiwi">
                  Kiwi
                </ListBoxItem>
                <ListBoxItem id="dragon-fruit" textValue="Dragon Fruit">
                  Dragon Fruit
                </ListBoxItem>
              </ListBoxSection>
              <ListBoxSection>
                <Header>Berries</Header>
                <ListBoxItem id="strawberry" textValue="Strawberry">
                  Strawberry
                </ListBoxItem>
                <ListBoxItem id="blueberry" textValue="Blueberry">
                  Blueberry
                </ListBoxItem>
                <ListBoxItem id="grape" textValue="Grape" isDisabled>
                  Grape (Out of Stock)
                </ListBoxItem>
              </ListBoxSection>
            </>
          ) : (
            <>
              <ListBoxItem id="apple" textValue="Apple">
                Apple
              </ListBoxItem>
              <ListBoxItem id="banana" textValue="Banana">
                Banana
              </ListBoxItem>
              <ListBoxItem id="orange" textValue="Orange">
                Orange
              </ListBoxItem>
              <ListBoxItem id="mango" textValue="Mango">
                Mango
              </ListBoxItem>
              <ListBoxItem id="grape" textValue="Grape" isDisabled>
                Grape (Out of Stock)
              </ListBoxItem>
              <ListBoxItem id="strawberry" textValue="Strawberry">
                Strawberry
              </ListBoxItem>
              <ListBoxItem id="kiwi" textValue="Kiwi">
                Kiwi
              </ListBoxItem>
            </>
          )}
        </ListBox>
      </Popover>
      {showDescription && (
        <span slot="description" className={styles.description}>
          Choose your favorite fruit from the list
        </span>
      )}
      {showError && (
        <span slot="error" className={styles.error}>
          Please select a fruit
        </span>
      )}
    </Select>
  );
}
