/* v8 ignore next */
import React from 'react';
import { Select, SelectOption } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox } from '@bento/listbox';
import { Popover, ValueDisplay } from '../test/test-popover';

/**
 * Example component demonstrating Select integration with HTML forms.
 * Shows how Select works with native form submission using the name prop.
 *
 * Note: This example is stateless for demonstration purposes. In real applications,
 * you would typically use controlled state and handle form submission with your
 * preferred form library or native JavaScript.
 *
 * @param {any} args - The Select component props.
 * @returns {JSX.Element} The rendered form with Select component.
 * @public
 */
export function SelectWithFormExample(args: any) {
  return (
    <form
      /* v8 ignore next 6 - Form submit handler not testable in stateless example */
      onSubmit={function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData as any);
        console.log('Form submitted with:', data);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}
    >
      <label htmlFor="fruit-select" style={{ fontWeight: 'bold' }}>
        Favorite Fruit
      </label>
      <Select {...args} name="fruit" id="fruit-select">
        <Button slot="trigger">
          <ValueDisplay slot="value" placeholder="Select a fruit..." />
        </Button>
        <Popover slot="popover">
          <ListBox slot="listbox" aria-label="Fruits">
            <SelectOption value="apple">Apple</SelectOption>
            <SelectOption value="banana">Banana</SelectOption>
            <SelectOption value="orange">Orange</SelectOption>
          </ListBox>
        </Popover>
        <span slot="description">Choose your favorite fruit from the list</span>
      </Select>
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
}
