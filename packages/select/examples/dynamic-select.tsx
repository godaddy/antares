/* v8 ignore start */
import React, { useState } from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem } from '@bento/listbox';
import { Popover } from '../test/test-popover';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import styles from './select.module.css';

type Fruit = {
  id: string;
  name: string;
  emoji: string;
  calories: number;
};

const FRUIT_DATA: Fruit[] = [
  { id: 'apple', name: 'Apple', emoji: '🍎', calories: 52 },
  { id: 'banana', name: 'Banana', emoji: '🍌', calories: 89 },
  { id: 'orange', name: 'Orange', emoji: '🍊', calories: 47 },
  { id: 'mango', name: 'Mango', emoji: '🥭', calories: 60 },
  { id: 'kiwi', name: 'Kiwi', emoji: '🥝', calories: 61 }
];

/**
 * Value display component for dynamic collections.
 * Accesses Node<T>.value to show rich fruit data.
 */
export const DynamicValueDisplay = withSlots('DynamicValue', function DynamicValue(args: any) {
  const { props, apply } = useProps(args);
  const { selectedItem, placeholder } = props;

  if (selectedItem) {
    // Type cast is safe: items prop is typed as Fruit[], so Node<T>.value will be Fruit
    const fruit = selectedItem.value as Fruit;
    return (
      <span {...apply(props, ['selectedItem', 'placeholder', 'selectedItems', 'preventFocusOnPress', 'isDisabled'])}>
        {fruit.emoji} {fruit.name} ({fruit.calories} cal)
      </span>
    );
  }

  return (
    <span
      {...apply(props, ['selectedItem', 'placeholder', 'selectedItems', 'preventFocusOnPress', 'isDisabled'])}
      data-placeholder="true"
    >
      {placeholder}
    </span>
  );
});

/**
 * Dynamic collection Select example.
 * Demonstrates using the items prop with typed data and Node<T>.value pattern.
 *
 * @param {any} props - Props passed from parent
 * @returns {JSX.Element} The rendered Select
 * @public
 */
export function DynamicSelectExample(props: any) {
  const {
    placeholder = 'Select a fruit...',
    label = 'Favorite Fruit',
    items = FRUIT_DATA,
    showEmptyState = false,
    defaultValue,
    ...rest
  } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange = function handleChange(newValue: any) {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const renderFruitItem = function renderFruitItem(item: unknown) {
    // Type cast is safe: items prop is typed as Fruit[], so each item will be Fruit
    const fruit = item as Fruit;
    return (
      <ListBoxItem id={fruit.id} textValue={fruit.name}>
        {fruit.emoji} {fruit.name} ({fruit.calories} cal)
      </ListBoxItem>
    );
  };

  return (
    <Select
      {...rest}
      value={value}
      onChange={handleChange}
      items={showEmptyState ? [] : items}
      {...(showEmptyState && {
        renderEmptyState: () => (
          <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
            <div>No fruits available</div>
          </div>
        )
      })}
      className={styles.selectWrapper}
      aria-label={label}
    >
      <Button slot="trigger" className={styles.trigger}>
        <DynamicValueDisplay slot="value" placeholder={placeholder} />
      </Button>
      <Popover slot="popover" className={styles.popover}>
        <ListBox slot="listbox" aria-label={label} className={styles.listbox}>
          {renderFruitItem}
        </ListBox>
      </Popover>
    </Select>
  );
}
