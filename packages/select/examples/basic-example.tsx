/* v8 ignore start */
import React, { useState } from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Basic Select example with full Storybook controls.
 * Demonstrates all Select features: single/multi selection, groups, states, form integration.
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
    ...restProps
  } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange = function handleChange(newValue: any) {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const selectProps = {
    ...restProps,
    selectionMode,
    value,
    onChange: handleChange,
    isDisabled,
    isRequired,
    isInvalid,
    ...(name && { name }),
    ...(label && { 'aria-label': label })
  };

  return (
    <Select {...selectProps}>
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder={placeholder} />
      </Button>
      <Popover slot="popover">
        <ListBox slot="listbox" aria-label={label || 'Fruit options'}>
          {withGroups ? (
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
      {showDescription && <span slot="description">Choose your favorite fruit from the list</span>}
      {showError && <span slot="error">Please select a fruit</span>}
    </Select>
  );
}
