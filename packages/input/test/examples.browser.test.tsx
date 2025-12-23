import React from 'react';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { BasicFormExample } from '../examples/basic-form.tsx';
import { FormExample } from '../examples/form.tsx';
import { ControlledInput } from '../examples/controlled.tsx';
import { UncontrolledInput } from '../examples/uncontrolled.tsx';

import userEvent from '@testing-library/user-event';

describe('@bento/input examples', function bento() {
  it('renders inputs that work in basic forms', async function test() {
    const { container } = render(<BasicFormExample />);
    const nameInput = container.querySelector<HTMLInputElement>('input[id="name"]')!;
    const emailInput = container.querySelector<HTMLInputElement>('input[id="email"]')!;
    const submitButton = container.querySelector<HTMLInputElement>('input[type="submit"]')!;

    assume(nameInput).to.exist();
    assume(emailInput).to.exist();
    assume(submitButton).to.exist();

    assume(nameInput.value).to.equal('');
    assume(emailInput.value).to.equal('');
    await userEvent.type(nameInput, 'Amanda');
    await userEvent.type(emailInput, 'amanda@example.com');
    await userEvent.click(submitButton);
    assume(nameInput.value).to.equal('Amanda');
    assume(emailInput.value).to.equal('amanda@example.com');
  });

  it('renders a controlled input', async function test() {
    const { container } = render(<ControlledInput />);
    const input = container.querySelectorAll<HTMLInputElement>('input[type="text"]')!;

    assume(input[0].value).to.equal('');
    await userEvent.type(input[0], 'Hello');
    assume(input[0].value).to.equal('Hello');
  });

  it('renders an uncontrolled input', async function test() {
    const { container } = render(<UncontrolledInput />);
    const input = container.querySelectorAll<HTMLInputElement>('input[type="text"]');

    assume(input[0].value).to.equal('');
    await userEvent.type(input[0], 'Hello');
    assume(input[0].value).to.equal('Hello');
  });

  it('renders a full basic form with multiple types of inputs', async function test() {
    const { container } = render(<FormExample />);
    const nameInput = container.querySelector<HTMLInputElement>('input[id="name"]')!;
    const emailInput = container.querySelector<HTMLInputElement>('input[id="email"]')!;
    const ageInput = container.querySelector<HTMLInputElement>('input[id="age"]')!;
    const quantityInput = container.querySelector<HTMLInputElement>('input[id="quantity"]')!;
    const newsletterInput = container.querySelector<HTMLInputElement>('input[id="newsletter"]')!;
    const favoriteFruitInputApple = container.querySelector<HTMLInputElement>('input[id="fruit-apple"]')!;
    const favoriteFruitInputBanana = container.querySelector<HTMLInputElement>('input[id="fruit-banana"]')!;
    const favoriteFruitInputOrange = container.querySelector<HTMLInputElement>('input[id="fruit-orange"]')!;
    const favoriteColorInput = container.querySelector<HTMLInputElement>('input[id="color"]')!;
    const birthdateInput = container.querySelector<HTMLInputElement>('input[id="birthdate"]')!;
    const websiteInput = container.querySelector<HTMLInputElement>('input[id="website"]')!;
    const phoneInput = container.querySelector<HTMLInputElement>('input[id="phone"]')!;
    const submitButton = container.querySelector<HTMLInputElement>('input[type="submit"]')!;

    assume(nameInput).to.exist();
    await userEvent.type(nameInput, 'John Doe');
    assume(nameInput.value).to.equal('John Doe');

    assume(emailInput).to.exist();
    await userEvent.type(emailInput, 'john.doe@example.com');
    assume(emailInput.value).to.equal('john.doe@example.com');

    assume(ageInput).to.exist();
    await userEvent.type(ageInput, '30');
    assume(ageInput.value).to.equal('30');

    assume(quantityInput).to.exist();
    await userEvent.click(container.querySelector<HTMLLabelElement>('label[for="quantity"]')!);
    quantityInput.focus();
    assume(quantityInput.value).to.equal('1');
    // Testing environment can't simulate native quantity input, so we set the value directly
    quantityInput.value = '2';
    quantityInput.dispatchEvent(new Event('input', { bubbles: true }));
    quantityInput.dispatchEvent(new Event('change', { bubbles: true }));
    assume(quantityInput.value).to.equal('2');

    assume(newsletterInput).to.exist();
    await userEvent.click(newsletterInput);
    assume(newsletterInput.checked).to.be.true();

    assume(favoriteFruitInputApple).to.exist();
    await userEvent.click(favoriteFruitInputApple);
    assume(favoriteFruitInputApple.checked).to.be.true();
    assume(favoriteFruitInputBanana).to.exist();
    await userEvent.type(favoriteFruitInputBanana, '{RightArrow}');
    assume(favoriteFruitInputBanana.checked).to.be.true();
    assume(favoriteFruitInputOrange).to.exist();
    await userEvent.type(favoriteFruitInputOrange, '{RightArrow}');
    assume(favoriteFruitInputOrange.checked).to.be.true();

    assume(favoriteColorInput).to.exist();
    await userEvent.click(favoriteColorInput);
    assume(favoriteColorInput.value).to.equal('#000000');
    // Testing environment can't simulate native color picker, so we set the value directly
    favoriteColorInput.value = '#ff0000';
    favoriteColorInput.dispatchEvent(new Event('input', { bubbles: true }));
    favoriteColorInput.dispatchEvent(new Event('change', { bubbles: true }));
    assume(favoriteColorInput.value).to.equal('#ff0000');

    assume(birthdateInput).to.exist();
    await userEvent.type(birthdateInput, '1990-01-01');
    assume(birthdateInput.value).to.equal('1990-01-01');

    assume(websiteInput).to.exist();
    await userEvent.type(websiteInput, 'https://example.com');
    assume(websiteInput.value).to.equal('https://example.com');

    assume(phoneInput).to.exist();
    assume(container.querySelector<HTMLSpanElement>('span[id="phone-error"]')).to.not.exist();
    await userEvent.type(phoneInput, '123456');
    assume(phoneInput.value).to.equal('123456');
    assume(container.querySelector<HTMLSpanElement>('span[id="phone-error"]')).to.exist();

    await userEvent.click(submitButton);
  });
});
