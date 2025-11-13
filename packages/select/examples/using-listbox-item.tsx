import React, { useState } from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Example using ListBoxItem directly instead of SelectOption convenience wrapper.
 * This shows that users can use ListBoxItem with id prop if they prefer.
 */
export function UsingListBoxItemExample(args: any) {
  const [value, setValue] = useState<string | undefined>(args.value || undefined);

  return (
    <Select
      {...args}
      value={value}
      onValueChange={function handleValueChange(key: React.Key) {
        setValue(key as string);
        args.onValueChange?.(key);
      }}
    >
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
