import { Radio, RadioGroup } from '@bento/radio';
import { FieldError } from '@bento/field-error';
import { Text } from '@bento/text';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import React, { type ComponentProps, useRef } from 'react';
import assume from 'assume';

function RadioGroupExample(props: {
  groupProps?: Partial<ComponentProps<typeof RadioGroup>>;
  radioProps?: Partial<ComponentProps<typeof Radio>>;
}) {
  return (
    <RadioGroup name="fruit" {...props.groupProps}>
      <Text slot="label">Favorite fruit</Text>
      <Radio value="apple" {...props.radioProps}>
        Apple
      </Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>

      <FieldError slot="error">error message</FieldError>
    </RadioGroup>
  );
}

function RadioGroupExampleWithState(props: Partial<ComponentProps<typeof RadioGroup>>) {
  const [value, setValue] = React.useState('banana');

  return (
    <RadioGroup label="Favorite fruit" name="fruit" value={value} onChange={setValue} {...props}>
      <Radio value="apple">Apple</Radio>
      <Radio value="banana">Banana</Radio>
      <Radio value="cherry">Cherry</Radio>
    </RadioGroup>
  );
}

describe('@bento/radio', function bento() {
  it('should render a RadioGroup and Radios and no radio should be selected', async function renderUnselectedRadios() {
    const { container } = await render(<RadioGroupExample />);
    const result = container.innerHTML;
    const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"][name="fruit"]');

    assume(radios.length).equals(3);
    radios.forEach((radio) => assume(radio.checked).equals(false));
    assume(result).includes('value="apple"');
    assume(result).includes('value="banana"');
    assume(result).includes('value="cherry"');
  });

  it('should select no radio when no value/defaultValue is provided', async function noSelectionByDefault() {
    const { container } = await render(<RadioGroupExample />);
    const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');

    assume(radios.length).equals(3);
    radios.forEach((radio) => assume(radio.checked).equals(false));
  });

  describe('Uncontrolled', function uncontrolled() {
    it('should select the correct radio when a defaultValue is provided', async function selectDefaultValue() {
      const { container } = await render(<RadioGroupExample groupProps={{ defaultValue: 'banana' }} />);
      const radio = container.querySelector<HTMLInputElement>('input[value="banana"]');
      assume(radio?.checked).equals(true);
    });

    it('should select the correct radio when it is selected', async function selectRadioOnClick() {
      const { container } = await render(<RadioGroupExample />);
      const bananaRadio = container.querySelector<HTMLInputElement>('input[value="banana"]')!;

      assume(bananaRadio?.checked).equals(false);
      await userEvent.click(bananaRadio);
      assume(bananaRadio?.checked).equals(true);
    });

    it('should change the selected radio when a defaultValue is provided and another radio is selected', async function changeSelectionFromDefault() {
      const { container } = await render(<RadioGroupExample groupProps={{ defaultValue: 'banana' }} />);
      const bananaRadio = container.querySelector<HTMLInputElement>('input[value="banana"]')!;
      const appleRadio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(bananaRadio?.checked).equals(true);
      await userEvent.click(appleRadio);
      assume(bananaRadio?.checked).equals(false);
      assume(appleRadio?.checked).equals(true);
    });
  });

  it('should allow to use ref in Radio', async function allowRadioRef() {
    const onChange = vi.fn();

    function RadioGroupWithRef() {
      const ref = useRef<HTMLInputElement>(null);

      return (
        <RadioGroup label="Fruit" onChange={onChange}>
          <Radio value="apple" inputRef={ref}>
            Apple
          </Radio>
        </RadioGroup>
      );
    }

    const { container } = await render(<RadioGroupWithRef />);

    const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;
    assume(radio?.checked).equals(false);
    await userEvent.click(radio);
    assume(radio?.checked).equals(true);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('should focus the first radio when its autoFocus is true', async function focusRadioOnAutoFocus() {
    const { container } = await render(
      <RadioGroup label="Favorite fruit" name="fruit">
        <Radio value="apple" autoFocus>
          Apple
        </Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="cherry">Cherry</Radio>
      </RadioGroup>
    );

    const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;
    await expect.element(radio).toHaveFocus();
    const firstRadioElement = radio?.closest('[data-focused="true"]');
    assume(firstRadioElement?.getAttribute('data-selected')).equals(null);
  });

  describe('Controlled', function controlled() {
    it('should select the correct radio when a value is provided', async function selectControlledValue() {
      const { container } = await render(<RadioGroupExample groupProps={{ value: 'banana' }} />);
      const radio = container.querySelector<HTMLInputElement>('input[value="banana"]');
      assume(radio?.checked).equals(true);
    });

    it('should not change the selected radio when a value is provided and another radio is selected', async function notChangeControlledValue() {
      const { container } = await render(<RadioGroupExample groupProps={{ value: 'banana' }} />);
      const bananaRadio = container.querySelector<HTMLInputElement>('input[value="banana"]')!;
      const appleRadio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(bananaRadio?.checked).equals(true);
      await userEvent.click(appleRadio);
      assume(bananaRadio?.checked).equals(true);
      assume(appleRadio?.checked).equals(false);
    });

    it('should change the selected radio when a value is provided and another radio is selected with onChange', async function changeControlledValueWithStateOnChange() {
      const { container } = await render(<RadioGroupExampleWithState />);
      const bananaRadio = container.querySelector<HTMLInputElement>('input[value="banana"]')!;
      const appleRadio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;
      assume(bananaRadio?.checked).equals(true);
      await userEvent.click(appleRadio);
      assume(bananaRadio?.checked).equals(false);
      assume(appleRadio?.checked).equals(true);
    });
  });

  describe('Disabled', function disabled() {
    it('should ensure all radios are disabled when the RadioGroup is disabled', async function allRadiosDisabled() {
      const { container } = await render(<RadioGroupExample groupProps={{ isDisabled: true }} />);
      const radios = container.querySelectorAll<HTMLInputElement>('input[type="radio"]');

      radios.forEach((radio) => assume(radio.disabled).equals(true));
    });

    it('should ensure individual radio is disabled when radio is disabled', async function individualRadioDisabled() {
      const { container } = await render(<RadioGroupExample radioProps={{ isDisabled: true }} />);
      const radio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      assume(radio.disabled).equals(true);
      assume(radio.closest('label[data-disabled="true"]')).exists();
    });
  });

  describe('ReadOnly', function readOnly() {
    it('should not change the selected radio when a value is provided and another radio is selected with onChange', async function notChangeReadOnlyValue() {
      const { container } = await render(<RadioGroupExample groupProps={{ value: 'banana', isReadOnly: true }} />);
      const bananaRadio = container.querySelector<HTMLInputElement>('input[value="banana"]')!;
      const appleRadio = container.querySelector<HTMLInputElement>('input[value="apple"]')!;

      await userEvent.click(appleRadio);
      assume(bananaRadio?.checked).equals(true);
    });
  });

  describe('Form', function form() {
    it('should submit a form using correct values', async function submitForm() {
      const onSubmit = vi.fn(function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        e.target.setAttribute('fruit-value', formData.get('fruit'));
      });

      const { container } = await render(
        <form onSubmit={onSubmit}>
          <RadioGroupExample />
          <button type="submit">Submit</button>
        </form>
      );

      const form = container.querySelector('form')!;
      const submitButton = container.querySelector('button[type="submit"]')!;
      const appleRadio = container.querySelector('input[value="apple"]')!;

      await userEvent.click(appleRadio);
      await userEvent.click(submitButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      assume(form.getAttribute('fruit-value')).equals('apple');
    });

    it('should display error message when the radio is required', async function displayErrorMessage() {
      const { container } = await render(
        <form>
          <RadioGroupExample
            groupProps={{
              isRequired: true,
              validationBehavior: 'native'
            }}
          />
          <button type="submit">Submit</button>
        </form>
      );

      const form = container.querySelector('form')!;
      const submitButton = container.querySelector('button[type="submit"]')!;

      assume(form.innerHTML).does.not.include('error message');

      await userEvent.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve));

      assume(form.innerHTML).includes('error message');
    });
  });

  describe('Keyboard', function keyboard() {
    it('should select the correct radio when a keyboard is used', async function selectWithKeyboard() {
      const { container } = await render(<RadioGroupExample />);

      await userEvent.tab();

      // first Radio should be focused and unselected
      const firstRadioInput = container.querySelector<HTMLInputElement>('input[value="apple"]');
      const firstRadioElement = firstRadioInput?.closest('[data-focused="true"]');
      assume(firstRadioInput?.checked).equals(false);
      assume(firstRadioElement?.getAttribute('data-focus-visible')).equals('true');
      assume(firstRadioElement?.getAttribute('data-selected')).equals(null);

      // Focus the second radio and select it (arrow right)
      await userEvent.keyboard('{ArrowRight}');
      const secondRadioInput = container.querySelector<HTMLInputElement>('input[value="banana"]');
      const secondRadioElement = secondRadioInput?.closest('[data-focused="true"]');
      assume(secondRadioInput?.checked).equals(true);
      assume(secondRadioElement?.getAttribute('data-selected')).equals('true');

      // Focus the third radio and select it (arrow right)
      await userEvent.keyboard('{ArrowRight}');
      const thirdRadioInput = container.querySelector<HTMLInputElement>('input[value="cherry"]');
      const thirdRadioElement = thirdRadioInput?.closest('[data-focused="true"]');
      assume(thirdRadioInput?.checked).equals(true);
      assume(thirdRadioElement?.getAttribute('data-selected')).equals('true');

      // on last radio, focus the first radio and select it (arrow right)
      await userEvent.keyboard('{ArrowRight}');
      assume(firstRadioInput?.checked).equals(true);
      assume(firstRadioElement?.getAttribute('data-focused')).equals('true');
      assume(firstRadioElement?.getAttribute('data-selected')).equals('true');
    });
  });

  describe('Accessibility', function accessibility() {
    it('should add the correct role and aria-orientation to the radiogroup', async function checkRadiogroupRoleAndOrientation() {
      const { container } = await render(<RadioGroupExample />);
      const radioGroup = container.querySelector('[role="radiogroup"]')!;
      assume(radioGroup.getAttribute('role')).equals('radiogroup');
      assume(radioGroup.getAttribute('aria-orientation')).equals('vertical');
    });

    it('should associate the visible label with the radiogroup via aria-labelledby', async function radiogroupLabelledBy() {
      const { container } = await render(<RadioGroupExample />);
      const radioGroup = container.querySelector('[role="radiogroup"]');
      const labelId = radioGroup?.getAttribute('aria-labelledby');
      const labelEl = container.querySelector(`[id="${labelId}"]`);
      assume(labelEl?.innerHTML).includes('Favorite fruit');
    });
  });
});
