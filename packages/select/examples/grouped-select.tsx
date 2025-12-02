/* v8 ignore start */
import React, { useState } from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';
import styles from './select.module.css';

/**
 * Grouped Select example.
 * Demonstrates using ListBoxSection to organize options into categories.
 *
 * @param {any} props - Props passed from parent
 * @returns {JSX.Element} The rendered Select
 * @public
 */
export function GroupedSelectExample(props: any) {
  const { placeholder = 'Select a fruit...', label = 'Favorite Fruit', defaultValue, ...selectProps } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange = function handleChange(newValue: any) {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Select {...selectProps} value={value} onChange={handleChange} aria-label={label} className={styles.selectWrapper}>
      <Button slot="trigger" className={styles.trigger}>
        <ValueDisplay slot="value" placeholder={placeholder} />
      </Button>
      <Popover slot="popover" className={styles.popover}>
        <ListBox slot="listbox" aria-label={label} className={styles.listbox}>
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
        </ListBox>
      </Popover>
    </Select>
  );
}
