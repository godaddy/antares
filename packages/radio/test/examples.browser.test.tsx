import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { ControlledExample } from '../examples/controlled.tsx';
import { UncontrolledExample } from '../examples/uncontrolled.tsx';
import { SingleRadioExample } from '../examples/single-radio.tsx';
import userEvent from '@testing-library/user-event';

describe('@bento/radio examples', function bento() {
  describe('Controlled', function controlledExample() {
    it('should select the correct radio when it is clicked', async function selectCorrectRadio() {
      const { container } = render(<ControlledExample />);

      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.checked).equals(false);
      await userEvent.click(radio);
      assume(radio.checked).equals(true);
    });
  });

  describe('Uncontrolled', function uncontrolledExample() {
    it('should select the correct radio when it is clicked', async function selectCorrectRadio() {
      const { container } = render(<UncontrolledExample />);
      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.checked).equals(false);
      await userEvent.click(radio);
      assume(radio.checked).equals(true);
    });
  });

  describe('SingleRadio', function singleRadioExample() {
    it('should select the correct radio when it is clicked', async function selectCorrectRadio() {
      const { container } = render(<SingleRadioExample />);
      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.checked).equals(false);
      await userEvent.click(radio);
      assume(radio.checked).equals(true);
    });
  });
});
