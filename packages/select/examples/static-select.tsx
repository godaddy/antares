/* v8 ignore start */
import { useState } from 'react';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';
import styles from './select.module.css';

/**
 * Basic static Select example.
 * Demonstrates the simplest Select usage with static JSX children.
 *
 * @param {any} props - Props passed from parent
 * @returns {JSX.Element} The rendered Select
 * @public
 */
export function StaticSelectExample(props: any) {
  const { placeholder = 'Select a fruit...', label = 'Favorite Fruit', defaultValue, ...selectProps } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange = function handleChange(newValue: any) {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Select {...selectProps} value={value} onChange={handleChange} aria-label={label} className={styles.selectWrapper}>
      <Button slot="trigger" className={styles.trigger}>
        <ValueDisplay slot="value" placeholder={placeholder} />
      </Button>
      <Popover slot="popover" className={styles.popover}>
        <ListBox slot="listbox" aria-label={label} className={styles.listbox}>
          <ListBoxItem id="apple" textValue="Apple">
            Apple
          </ListBoxItem>
          <ListBoxItem id="banana" textValue="Banana">
            Banana
          </ListBoxItem>
          <ListBoxItem id="orange" textValue="Orange">
            Orange
          </ListBoxItem>
          <ListBoxItem id="mango" textValue="Mango">
            Mango
          </ListBoxItem>
          <ListBoxItem id="strawberry" textValue="Strawberry">
            Strawberry
          </ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  );
}
