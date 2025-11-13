/* v8 ignore next */
import React from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Example component demonstrating using ListBoxItem directly instead of SelectOption.
 * Shows that users can use ListBoxItem with id prop as an alternative to SelectOption's value prop.
 *
 * Note: This example is stateless for demonstration purposes. In real applications,
 * you would typically use controlled state with useState and onValueChange handlers.
 *
 * @param {any} args - The Select component props.
 * @returns {JSX.Element} The rendered Select using ListBoxItem components.
 * @public
 */
export function UsingListBoxItemExample(args: any) {
  return (
    <Select {...args}>
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Select an option..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="listbox" aria-label="Options">
          {/* Using ListBoxItem directly with id prop instead of SelectOption with value prop */}
          <ListBoxItem id="item1" textValue="Item 1">
            Item 1
          </ListBoxItem>
          <ListBoxItem id="item2" textValue="Item 2">
            Item 2
          </ListBoxItem>
          <ListBoxItem id="item3" textValue="Item 3">
            Item 3
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
}
