/* v8 ignore next */
import React from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Example component demonstrating Select with grouped options using ListBoxSection.
 * Shows how to organize options into sections with headers.
 *
 * Note: This example is stateless for demonstration purposes. In real applications,
 * you would typically use controlled state with useState and onValueChange handlers.
 *
 * @param {any} args - The Select component props.
 * @returns {JSX.Element} The rendered Select with sectioned options.
 * @public
 */
export function SelectWithGroupsExample(args: any) {
  return (
    <Select {...args}>
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Choose a meal..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="listbox" aria-label="Bento box menu">
          <ListBoxSection>
            <Header>Main Dishes</Header>
            <SelectOption value="chicken-teriyaki" textValue="Chicken Teriyaki">
              Chicken Teriyaki
            </SelectOption>
            <SelectOption value="salmon-bento" textValue="Salmon Bento">
              Salmon Bento
            </SelectOption>
            <SelectOption value="beef-bowl" textValue="Beef Bowl">
              Beef Bowl
            </SelectOption>
          </ListBoxSection>
          <ListBoxSection>
            <Header>Side Dishes</Header>
            <SelectOption value="pickled-vegetables" textValue="Pickled Vegetables">
              Pickled Vegetables
            </SelectOption>
            <SelectOption value="edamame" textValue="Edamame">
              Edamame
            </SelectOption>
            <SelectOption value="miso-soup" textValue="Miso Soup">
              Miso Soup
            </SelectOption>
          </ListBoxSection>
        </ListBox>
      </Popover>
    </Select>
  );
}
