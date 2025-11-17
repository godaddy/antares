import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { BasicFormExample } from '../examples/basic-form.tsx';
import { ControlledInput } from '../examples/controlled.tsx';
import { UncontrolledInput } from '../examples/uncontrolled.tsx';

import userEvent from '@testing-library/user-event';

describe('@bento/checkbox examples', function bento() {
  it('renders inputs that work in basic forms', async function test() {
    const { container } = render(<BasicFormExample />);
    const nameInput = container.querySelector('input[id="name"]')!;
    const emailInput = container.querySelector('input[id="email"]')!;

    assume(nameInput).to.exist();
    assume(emailInput).to.exist();
  });

  it('renders a controlled input', async function test() {
    const { container } = render(<ControlledInput />);
    const input = container.querySelector<HTMLInputElement>('input[type="text"]')!;

    assume(input.value).to.equal('');
    await userEvent.type(input, 'Hello');
    assume(input.value).to.equal('Hello');
  });

  it('renders an uncontrolled input', async function test() {
    const { container } = render(<UncontrolledInput />);
    const input = container.querySelectorAll<HTMLInputElement>('input[type="text"]');

    assume(input[0].value).to.equal('');
    await userEvent.type(input[0], 'Hello');
    assume(input[0].value).to.equal('Hello');
  });
});
