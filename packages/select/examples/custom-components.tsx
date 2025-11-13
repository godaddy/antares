import React, { useState } from 'react';
import { Select, SelectOption } from '@bento/select';
import { ListBox } from '@bento/listbox';
import { Popover } from '../test/test-popover';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

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

  // Custom value display wrapped with slots to receive slot props
  const CustomValue = withSlots('CustomValue', function CustomValue(args: any) {
    const { props } = useProps(args);
    const { selectedItem, placeholder, ...restProps } = props;

    return (
      <span
        {...restProps}
        style={{
          fontSize: '16px',
          color: selectedItem ? '#333' : '#999',
          ...restProps.style
        }}
      >
        {selectedItem ? `✓ ${selectedItem.textValue}` : placeholder}
      </span>
    );
  });

  return (
    <Select
      value={value}
      onValueChange={function handleValueChange(key: React.Key) {
        setValue(key as string);
      }}
      placeholder="Pick something..."
    >
      <CustomTrigger slot="trigger">
        <CustomValue slot="value" />
      </CustomTrigger>
      <Popover slot="popover">
        <ListBox slot="listbox" aria-label="Options">
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
