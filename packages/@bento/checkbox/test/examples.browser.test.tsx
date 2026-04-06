import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { CheckboxExample } from '../examples/checkbox.tsx';
import { CheckboxControlledExample } from '../examples/checkbox-controlled.tsx';
import { CheckboxGroupExample } from '../examples/checkbox-group.tsx';
import { CheckboxGroupControlledExample } from '../examples/checkbox-group-controlled.tsx';
import userEvent from '@testing-library/user-event';

describe('@bento/checkbox examples', function bento() {
  it('renders an uncontrolled checkbox', async function test() {
    const { container } = await render(<CheckboxExample />);
    const checkbox = container.querySelector<HTMLInputElement>('input[type="checkbox"]')!;

    assume(checkbox.checked).equals(false);
    await userEvent.click(checkbox);
    assume(checkbox.checked).equals(true);
  });

  it('renders a controlled checkbox', async function test() {
    const { container } = await render(<CheckboxControlledExample />);
    const checkbox = container.querySelector<HTMLInputElement>('input[type="checkbox"]')!;

    assume(checkbox.checked).equals(false);
    await userEvent.click(checkbox);
    assume(checkbox.checked).equals(true);
  });

  it('renders an uncontrolled checkbox group', async function test() {
    const { container } = await render(<CheckboxGroupExample />);
    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    assume(checkboxes.length).equals(2);
    assume(checkboxes[0].checked).equals(false);
    assume(checkboxes[1].checked).equals(false);

    await userEvent.click(checkboxes[0]);
    assume(checkboxes[0].checked).equals(true);
    assume(checkboxes[1].checked).equals(false);
  });

  it('renders a controlled checkbox group', async function test() {
    const { container } = await render(<CheckboxGroupControlledExample />);
    const checkboxes = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

    assume(checkboxes.length).equals(3);
    assume(checkboxes[0].checked).equals(false);
    assume(checkboxes[1].checked).equals(false);
    assume(checkboxes[2].checked).equals(false);

    await userEvent.click(checkboxes[0]);
    assume(checkboxes[0].checked).equals(true);
    assume(checkboxes[1].checked).equals(false);
    assume(checkboxes[2].checked).equals(false);
  });
});
