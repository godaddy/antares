/* v8 ignore next */
import React from 'react';
import { Select, SelectOption } from '@bento/select';
import { ListBox } from '@bento/listbox';
import { Popover } from '../test/test-popover';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

//
// Slot composition pattern demonstration:
//
// Select coordinates props to slotted children via Container's slot system.
// Users can provide custom components for any slot as long as they:
// 1. Assign the appropriate slot name
// 2. Use withSlots + useProps to receive slot props from the coordinator
//
// This example shows custom trigger and value components with enhanced styling.
//

/**
 * Example component demonstrating custom slot components with enhanced styling.
 * Shows how users can provide their own components that receive props via the slot system.
 *
 * Note: This example is stateless for demonstration purposes. In real applications,
 * you would typically use controlled state with useState and onValueChange handlers.
 *
 * @returns {JSX.Element} The rendered Select with custom trigger and value components.
 * @public
 */
export function CustomComponentsExample() {
  // Custom trigger component using withSlots + useProps to receive slot props
  const CustomTrigger = withSlots('CustomTrigger', function CustomTrigger(args: any) {
    const { props } = useProps(args);
    const { children, ...restProps } = props;

    return (
      <button
        {...restProps}
        style={{
          padding: '12px 16px',
          border: '2px solid #0066cc',
          borderRadius: '8px',
          /* v8 ignore next - data-open true branch not reliably testable in stateless example */
          backgroundColor: restProps['data-open'] === 'true' ? '#e6f2ff' : 'white',
          color: '#0066cc',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.2s',
          ...restProps.style
        }}
      >
        {children}
      </button>
    );
  });

  // Custom value display wrapped with slots to receive slot props
  const CustomValue = withSlots('CustomValue', function CustomValue(args: any) {
    const { props } = useProps(args);
    const { selectedItem, placeholder, ...restProps } = props;

    return (
      <span
        {...restProps}
        style={{
          fontSize: '16px',
          /* v8 ignore next - selectedItem true branch not testable in stateless example */
          color: selectedItem ? '#333' : '#999',
          ...restProps.style
        }}
      >
        {/* v8 ignore next - selectedItem true branch not testable in stateless example */}
        {selectedItem ? `✓ ${selectedItem.textValue}` : placeholder}
      </span>
    );
  });

  return (
    <Select placeholder="Pick something...">
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
