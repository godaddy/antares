/* v8 ignore next */
import React from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Example component demonstrating multi-select with selectionMode="multiple".
 * Shows the structure for multiple selection mode with Set<Key> values.
 *
 * Note: This example is stateless for demonstration purposes. In real applications,
 * you would typically use controlled state with useState to manage the Set<Key> of
 * selected items and onValueChange to update that state.
 *
 * @param {any} args - The Select component props.
 * @returns {JSX.Element} The rendered multi-select configuration.
 * @public
 */
export function MultiSelectExample(args: any) {
  return (
    <Select {...args} selectionMode="multiple">
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Choose ingredients..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="listbox" aria-label="Ingredients">
          <SelectOption value="rice">Rice</SelectOption>
          <SelectOption value="chicken">Chicken</SelectOption>
          <SelectOption value="salmon">Salmon</SelectOption>
          <SelectOption value="tofu">Tofu</SelectOption>
          <SelectOption value="edamame">Edamame</SelectOption>
          <SelectOption value="seaweed">Seaweed</SelectOption>
          <SelectOption value="tempura">Tempura</SelectOption>
          <SelectOption value="pickles">Pickled Vegetables</SelectOption>
        </ListBox>
      </Popover>
    </Select>
  );
}
