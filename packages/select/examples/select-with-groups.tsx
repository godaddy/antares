import React, { useState } from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxSection, Header } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Select with groups example showing how to use ListBoxSection for organizing options.
 */
export function SelectWithGroupsExample(args: any) {
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
