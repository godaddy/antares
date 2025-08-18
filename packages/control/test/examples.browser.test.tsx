import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { InputRefExample } from '../examples/input-ref.tsx';

describe('@bento/control examples', function bento() {
  describe('Default', function defaultExample() {
    it('should render the default example', async function renderDefaultExample() {
      const { container } = render(<DefaultExample />);
      const result = container.innerHTML;

      const control = container.querySelector<HTMLInputElement>('input')!;
      assume(control).does.not.equal(null);

      assume(result).includes('Control label');
      assume(result).includes('Control description');
      assume(result).includes('Control error message');
      assume(result).includes('Control 1');
      assume(result).includes('Control 2');
    });
  });

  describe('InputRef', function inputRefExample() {
    it('should render the input ref example', async function renderInputRefExample() {
      const { container } = render(<InputRefExample />);
      const dateLabel = container.querySelector<HTMLLabelElement>('label[for="dateId"]')!;
      const radioLabel = container.querySelector<HTMLLabelElement>('label[for="radioId"]')!;
      const dateControl = container.querySelector<HTMLInputElement>('input[type="date"]')!;
      const radioControl = container.querySelector<HTMLInputElement>('input[type="radio"]')!;
      assume(dateControl).does.not.equal(null);
      assume(radioControl).does.not.equal(null);
      assume(dateLabel).does.not.equal(null);
      assume(radioLabel).does.not.equal(null);
    });
  });
});
