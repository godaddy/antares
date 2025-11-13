import React from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { Text } from '@bento/text';
import { ListBox } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Select with form integration example showing how SelectOption maps value → id.
 */
export function SelectWithFormExample(args: any) {
  return (
    <form
      onSubmit={function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const entries: [string, FormDataEntryValue][] = [];
        formData.forEach(function addEntry(value, key) {
          entries.push([key, value]);
        });
        console.log('Form submitted with:', Object.fromEntries(entries));
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}
    >
      <label htmlFor="fruit-select" style={{ fontWeight: 'bold' }}>
        Favorite Fruit
      </label>
      <Select {...args} name="fruit" id="fruit-select" required>
        <Button slot="trigger">
          <ValueDisplay slot="value" placeholder="Select a fruit..." />
        </Button>
        <Popover slot="popover">
          <ListBox slot="listbox" aria-label="Fruit options">
            <SelectOption value="apple" textValue="Apple">
              Apple
            </SelectOption>
            <SelectOption value="banana" textValue="Banana">
              Banana
            </SelectOption>
            <SelectOption value="orange" textValue="Orange">
              Orange
            </SelectOption>
          </ListBox>
        </Popover>
        <Text slot="description">Choose your favorite fruit from the list</Text>
        <Text slot="error" />
      </Select>
      <button type="submit">Submit Form</button>
    </form>
  );
}
