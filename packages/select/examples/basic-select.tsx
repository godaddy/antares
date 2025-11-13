import React, { useState } from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { Text } from '@bento/text';
import { ListBox } from '@bento/listbox';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Box } from '@bento/box';

// Simple Popover component for testing (actual Popover component doesn't exist yet)
const _Popover = withSlots(
  'Popover',
  function Popover({
    children,
    style: userStyle,
    ...args
  }: {
    children?: React.ReactNode;
    style?: any;
    [key: string]: any;
  }) {
    // Workaround: Access slotted props directly from context
    // because useProps has a bug where falsy values (like isOpen: false)
    // are treated as undefined due to || operator
    const ctx = React.useContext(Box);
    const dot = ctx?.slots?.namespace?.join?.('.');
    const slotted = ctx?.slots?.assigned?.[dot] || {};
    const isOpen = slotted.isOpen;
    const popoverRef = slotted.ref;

    const { apply } = useProps(args);

    // Always render but hide with CSS when not open
    // This is necessary because React Aria's useSelect requires the listbox ref to be valid
    // Use visibility + pointer-events instead of display:none to keep element in DOM
    const appliedProps = apply();
    // Remove ref from applied props to avoid React Aria issues
    const { ref: _unusedRef, style: slotStyle, ...propsWithoutRef } = appliedProps as any;

    // Merge user style (from JSX), slot style, and our internal style
    // Order: user style < slot style < our conditional style
    // Convert userStyle if it's a CSSStyleDeclaration to avoid React errors
    const convertedUserStyle = React.useMemo(
      function convertUserStyle() {
        if (!userStyle || typeof userStyle !== 'object') return {};
        // Check if it's a CSSStyleDeclaration-like object
        if (typeof userStyle.length === 'number') {
          // Convert to plain object
          const plain: Record<string, any> = {};
          for (let i = 0; i < userStyle.length; i++) {
            const prop = userStyle[i];
            const value = userStyle.getPropertyValue ? userStyle.getPropertyValue(prop) : userStyle[prop];
            if (value) plain[prop] = value;
          }
          return plain;
        }
        // Already a plain object, try to convert defensively
        try {
          return { ...userStyle };
        } catch {
          return {};
        }
      },
      [userStyle]
    );

    const mergedStyle = {
      ...convertedUserStyle,
      ...slotStyle,
      // Only override visibility if display is not set to none by slot
      ...(slotStyle?.display !== 'none'
        ? {
            visibility: isOpen ? 'visible' : 'hidden',
            pointerEvents: isOpen ? 'auto' : 'none'
          }
        : {}),
      position: slotStyle?.position || convertedUserStyle?.position || 'absolute'
    };

    return (
      <div {...propsWithoutRef} ref={popoverRef} style={mergedStyle}>
        {children}
      </div>
    );
  }
);

// Value component that handles placeholder display
// Using plain span instead of styled Text component to avoid style merging issues
function ValueDisplay({ selectedItem, placeholder, ...props }: any) {
  return <span {...props}>{selectedItem ? selectedItem.textValue : placeholder}</span>;
}

/**
 * Basic Select example demonstrating slot-based composition.
 * Shows how Select coordinates props to slotted children (Button, Text, Popover, ListBox).
 *
 * @param {any} args - Select component props
 * @returns {JSX.Element} The rendered Select component
 */
export function BasicSelectExample(args: any) {
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
        <ValueDisplay slot="value" placeholder="Select a fruit..." />
      </Button>
      <ListBox slot="listbox" aria-label="Fruit options">
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
      <span slot="description">Description text</span>
      <span slot="errorMessage">Error message</span>
    </Select>
  );
}
