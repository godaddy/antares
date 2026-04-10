import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { ControlledExample } from '../examples/controlled.tsx';
import { UncontrolledExample } from '../examples/uncontrolled.tsx';
import { SingleRadioExample } from '../examples/single-radio.tsx';
import { ErrorHandlingExample, ErrorHandlingExampleWithState } from '../examples/error-handling.tsx';
import userEvent from '@testing-library/user-event';

describe('@bento/radio examples', function bento() {
  describe('Controlled', function controlledExample() {
    it('should select the correct radio when it is clicked', async function selectCorrectRadio() {
      const { container } = await render(<ControlledExample />);

      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.checked).equals(false);
      await userEvent.click(radio);
      assume(radio.checked).equals(true);
    });
  });

  describe('Uncontrolled', function uncontrolledExample() {
    it('should select the correct radio when it is clicked', async function selectCorrectRadio() {
      const { container } = await render(<UncontrolledExample />);
      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.checked).equals(false);
      await userEvent.click(radio);
      assume(radio.checked).equals(true);
    });
  });

  describe('SingleRadio', function singleRadioExample() {
    it('should select the correct radio when it is clicked', async function selectCorrectRadio() {
      const { container } = await render(<SingleRadioExample />);
      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.checked).equals(false);
      await userEvent.click(radio);
      assume(radio.checked).equals(true);
    });
  });

  describe('ErrorHandling', function errorHandlingExample() {
    it('should display the correct error message when the radio is invalid', async function displayErrorMessage() {
      const { container } = await render(<ErrorHandlingExample />);
      const radio = container.querySelector<HTMLInputElement>('input[value="banana"]')!;
      await userEvent.click(radio);
      assume(container.innerHTML).includes('Error! banana selected');
    });
  });

  it('should display the correct custom error message when the radio is invalid', async function displayErrorMessage() {
    const { container } = await render(<ErrorHandlingExampleWithState />);
    const radio = container.querySelector<HTMLInputElement>('input[value="orange"]')!;
    await userEvent.click(radio);
    assume(container.innerHTML).includes('Invalid fruit: orange');
  });
});
