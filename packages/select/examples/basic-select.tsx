import React, { useState } from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { Text } from '@bento/text';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';

// Simple Popover component for testing (actual Popover component doesn't exist yet)
function Popover({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) {
  return <div {...props}>{children}</div>;
}

// Value component that handles placeholder display
function ValueDisplay({ selectedItem, placeholder, ...props }: any) {
  return <Text {...props}>{selectedItem ? selectedItem.textValue : placeholder}</Text>;
}

/**
 * Basic Select example demonstrating slot-based composition.
 * Shows how Select coordinates props to slotted children (Button, Text, Popover, ListBox).
 *
 * @param {any} args - Select component props
 * @returns {JSX.Element} The rendered Select component
 */
export function BasicSelectExample(args: any) {
  const [value, setValue] = useState<string | undefined>(args.selectedKey || undefined);

  return (
    <Select
      {...args}
      selectedKey={value}
      onSelectionChange={function handleSelectionChange(key: React.Key | null) {
        setValue(key as string);
        args.onSelectionChange?.(key);
      }}
    >
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Select a fruit..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="list" aria-label="Fruit options">
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
      <Text slot="description" />
      <Text slot="errorMessage" />
    </Select>
  );
}

/**
 * Select with groups example showing how to use ListBoxSection for organizing options.
 */
export function SelectWithGroupsExample(args: any) {
  const [value, setValue] = useState<string | undefined>(args.selectedKey || undefined);

  return (
    <Select
      {...args}
      selectedKey={value}
      onSelectionChange={function handleSelectionChange(key: React.Key | null) {
        setValue(key as string);
        args.onSelectionChange?.(key);
      }}
    >
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Choose a meal..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="list" aria-label="Bento box menu">
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
          <ListBox slot="list" aria-label="Fruit options">
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
        <Text slot="errorMessage" />
      </Select>
      <button type="submit">Submit Form</button>
    </form>
  );
}

/**
 * Custom components example showing how users can bring their own components
 * that implement the slot interfaces.
 */
export function CustomComponentsExample() {
  const [value, setValue] = useState<string | undefined>();

  // Custom trigger component
  function CustomTrigger({ triggerProps, ...props }: any) {
    return (
      <button
        {...triggerProps}
        {...props}
        style={{
          padding: '12px 16px',
          border: '2px solid #0066cc',
          borderRadius: '8px',
          backgroundColor: props['data-open'] ? '#e6f2ff' : 'white',
          color: '#0066cc',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.2s',
          ...props.style
        }}
      >
        {props.children}
      </button>
    );
  }

  // Custom value display
  function CustomValue({ valueProps, selectedItem, placeholder, ...props }: any) {
    return (
      <span
        {...valueProps}
        {...props}
        style={{
          fontSize: '16px',
          color: selectedItem ? '#333' : '#999',
          ...props.style
        }}
      >
        {selectedItem ? `✓ ${selectedItem.textValue}` : placeholder}
      </span>
    );
  }

  return (
    <Select
      selectedKey={value}
      onSelectionChange={function handleSelectionChange(key: React.Key | null) {
        setValue(key as string);
      }}
      placeholder="Pick something..."
    >
      <CustomTrigger slot="trigger">
        <CustomValue slot="value" />
      </CustomTrigger>
      <Popover slot="popover">
        <ListBox slot="list" aria-label="Options">
          <SelectOption value="option1" textValue="Option 1">
            Option 1
          </SelectOption>
          <SelectOption value="option2" textValue="Option 2">
            Option 2
          </SelectOption>
          <SelectOption value="option3" textValue="Option 3">
            Option 3
          </SelectOption>
        </ListBox>
      </Popover>
    </Select>
  );
}

/**
 * Example using ListBoxItem directly instead of SelectOption convenience wrapper.
 * This shows that users can use ListBoxItem with id prop if they prefer.
 */
export function UsingListBoxItemExample(args: any) {
  const [value, setValue] = useState<string | undefined>(args.selectedKey || undefined);

  return (
    <Select
      {...args}
      selectedKey={value}
      onSelectionChange={function handleSelectionChange(key: React.Key | null) {
        setValue(key as string);
        args.onSelectionChange?.(key);
      }}
    >
      <Button slot="trigger">
        <ValueDisplay slot="value" placeholder="Select an option..." />
      </Button>
      <Popover slot="popover">
        <ListBox slot="list" aria-label="Options">
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
