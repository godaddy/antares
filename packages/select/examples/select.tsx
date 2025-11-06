/* v8 ignore next */
import React from 'react';
import { Button } from '@bento/button';
import { Select } from '@bento/select';
import { Text } from '@bento/text';
import { Container } from '@bento/container';
import { Popover } from 'react-aria-components';
import { ListBox, ListBoxItem } from '@bento/listbox';

/**
 * Example component demonstrating basic Select usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered Select with static items.
 * @public
 */
export function SelectExample(args: any) {
  return (
    <Select {...args} aria-label="Choose a fruit" placeholder="Select a fruit">
      <Button slot="trigger">
        <Text slot="value" />
      </Button>
      <Container slot="overlay" />
      <Popover>
        <ListBox slot="list" selectionMode="single">
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
          <ListBoxItem id="orange" textValue="Orange">
            Orange
          </ListBoxItem>
        </ListBox>
      </Popover>
      Selected: <Text slot="value" />
    </Select>
  );
}
