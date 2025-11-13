/* v8 ignore next */
import React from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Example component demonstrating basic Select usage with slot-based composition.
 * Shows how Select coordinates props to slotted children (Button, Popover, ListBox).
 *
 * Note: This example is stateless for demonstration purposes. In real applications,
 * you would typically use controlled state with useState and onValueChange handlers.
 *
 * @param {any} args - The Select component props.
 * @returns {JSX.Element} The rendered Select with static options.
 * @public
 */
export function BasicSelectExample(args: any) {
  return (
    <Select {...args}>
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Select a fruit..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="listbox" aria-label="Fruit options">
          <SelectOption value="apple" textValue="Apple">
            🍎 Apple
          </SelectOption>
          <SelectOption value="banana" textValue="Banana">
            🍌 Banana
          </SelectOption>
          <SelectOption value="orange" textValue="Orange">
            🍊 Orange
          </SelectOption>
          <SelectOption value="grape" textValue="Grape" isDisabled>
            🍇 Grape (Out of Stock)
          </SelectOption>
          <SelectOption value="strawberry" textValue="Strawberry">
            🍓 Strawberry
          </SelectOption>
        </ListBox>
      </Popover>
      <span slot="description">Description text</span>
      <span slot="errorMessage">Error message</span>
    </Select>
  );
}
