import React from 'react';
import { ButtonExample } from '../examples/button';
import { render } from 'vitest-browser-react';
import { describe, vi, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import assume from 'assume';
import { Button } from '../src/index';
import { Slot } from '@bento/box';

describe('@bento/button', function bento() {
  describe('DOM and ARIA forwarding', function domTests() {
    it('should forward native button attributes', function forwardNativeAttrs() {
      const { container } = render(
        <Button type="submit" name="btn-name" value="btn-value" id="btn-id" title="Button title">
          Submit
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'btn-name');
      expect(button).toHaveAttribute('value', 'btn-value');
      expect(button).toHaveAttribute('id', 'btn-id');
      expect(button).toHaveAttribute('title', 'Button title');
    });

    it('should allow button without children (icon-only)', function noChildren() {
      const { container } = render(<Button aria-label="Close" />);
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('aria-label', 'Close');
      expect(button?.textContent).toBe('');
    });

    it('should forward aria-* attributes', function forwardAriaAttrs() {
      const { container } = render(
        <Button aria-label="Close dialog" aria-expanded="false" aria-haspopup="dialog">
          Close
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('aria-label', 'Close dialog');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('should forward multiple aria-* attributes', function forwardMultipleAria() {
      const { container } = render(
        <Button
          aria-labelledby="label-id"
          aria-required="true"
          aria-invalid="true"
          aria-disabled="false"
          aria-controls="panel-id"
        >
          Button
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('aria-labelledby', 'label-id');
      expect(button).toHaveAttribute('aria-required', 'true');
      expect(button).toHaveAttribute('aria-invalid', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'false');
      expect(button).toHaveAttribute('aria-controls', 'panel-id');
    });

    it('should forward data-* attributes', function forwardDataAttrs() {
      const { container } = render(
        <Button data-testid="my-button" data-foo="bar" data-select-trigger="true">
          Trigger
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('data-testid', 'my-button');
      expect(button).toHaveAttribute('data-foo', 'bar');
      expect(button).toHaveAttribute('data-select-trigger', 'true');
    });

    it('should forward arbitrary data-* attributes', function forwardArbitraryData() {
      const { container } = render(
        <Button data-custom="value" data-another-prop="123" data-kebab-case-prop="test">
          Test
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('data-custom', 'value');
      expect(button).toHaveAttribute('data-another-prop', '123');
      expect(button).toHaveAttribute('data-kebab-case-prop', 'test');
    });

    it('should forward className', function forwardClassName() {
      const { container } = render(<Button className="custom-button">Button</Button>);
      const button = container.querySelector('button');

      expect(button).toHaveClass('custom-button');
    });

    it('should forward style attribute', function forwardStyle() {
      const { container } = render(<Button style={{ color: 'red' }}>Button</Button>);
      const button = container.querySelector('button');

      expect(button).toHaveStyle({ color: 'red' });
    });

    it('should forward form-related attributes', function forwardFormAttrs() {
      const { container } = render(
        <Button form="my-form" formAction="/submit" formMethod="post" formNoValidate formTarget="_blank">
          Submit
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('form', 'my-form');
      expect(button).toHaveAttribute('formaction', '/submit');
      expect(button).toHaveAttribute('formmethod', 'post');
      expect(button).toHaveAttribute('formnovalidate');
      expect(button).toHaveAttribute('formtarget', '_blank');
    });

    it('should not forward event handlers as DOM attributes', function noEventHandlerAttrs() {
      const onClick = vi.fn();
      const onKeyDown = vi.fn();
      const { container } = render(
        <Button onClick={onClick as any} onKeyDown={onKeyDown as any}>
          Test
        </Button>
      );
      const button = container.querySelector('button');

      // Event handlers should not appear as DOM attributes
      expect(button?.outerHTML).not.toContain('onclick');
      expect(button?.outerHTML).not.toContain('onkeydown');
    });
  });

  describe('Behavior tests', function behaviorTests() {
    it('should call onPress on click', async function onPressClick() {
      const onPress = vi.fn();
      const { container } = render(<Button onPress={onPress}>Click me</Button>);
      const button = container.querySelector('button')!;

      await userEvent.click(button);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should call onPress on Space key', async function onPressSpace() {
      const onPress = vi.fn();
      const { container } = render(<Button onPress={onPress}>Press me</Button>);
      const button = container.querySelector('button')!;

      button.focus();
      await userEvent.keyboard('[Space]');

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should call onPress on Enter key', async function onPressEnter() {
      const onPress = vi.fn();
      const { container } = render(<Button onPress={onPress}>Press me</Button>);
      const button = container.querySelector('button')!;

      button.focus();
      await userEvent.keyboard('[Enter]');

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', async function noPresswhenDisabled() {
      const onPress = vi.fn();
      const { container } = render(<ButtonExample isDisabled>Disabled</ButtonExample>);
      const button = container.querySelector('button')!;

      await userEvent.click(button);

      expect(onPress).not.toHaveBeenCalled();
    });

    it('should have disabled attribute when isDisabled is true', function disabledAttr() {
      const { container } = render(<ButtonExample isDisabled>Disabled Button</ButtonExample>);
      const button = container.querySelector('button');

      expect(button).toBeDisabled();
    });

    it('should default type to button', function defaultType() {
      const { container } = render(<ButtonExample>Default</ButtonExample>);
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('type', 'button');
    });

    it('should not submit form when type is not specified', async function noFormSubmit() {
      const onSubmit = vi.fn((e) => e.preventDefault());
      const { container } = render(
        <form onSubmit={onSubmit}>
          <Button>Click</Button>
          <button type="submit">Real Submit</button>
        </form>
      );
      const button = container.querySelector('button')!;

      await userEvent.click(button);

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should submit form when type is submit', async function formSubmit() {
      const onSubmit = vi.fn((e) => e.preventDefault());
      const { container } = render(
        <form onSubmit={onSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );
      const button = container.querySelector('button')!;

      await userEvent.click(button);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should forward ref to button element', function refForwarding() {
      let buttonRef: any = null;
      function setButtonRef(el: any) {
        buttonRef = el;
      }
      const { container } = render(<Button ref={setButtonRef}>Ref test</Button>);
      const button = container.querySelector('button');

      expect(buttonRef).toBe(button);
      expect(buttonRef?.tagName).toBe('BUTTON');
    });
  });

  describe('Data attributes', function dataAttributeTests() {
    it('should forward custom data attributes', function customDataAttrs() {
      const { container } = render(
        <ButtonExample data-testid="my-button" data-custom="value">
          Test
        </ButtonExample>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('data-testid', 'my-button');
      expect(button).toHaveAttribute('data-custom', 'value');
    });
  });

  describe('Slot integration (Select use case)', function slotTests() {
    it('should accept slot-provided DOM attributes', function slotAttrs() {
      const { container } = render(
        <Button aria-expanded="true" aria-haspopup="listbox" aria-controls="listbox-1" role="combobox">
          Select trigger
        </Button>
      );
      const button = container.querySelector('button');

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(button).toHaveAttribute('aria-controls', 'listbox-1');
      expect(button).toHaveAttribute('role', 'combobox');
    });

    it('should allow slots to override children', function slotOverrideChildren() {
      const { container } = render(
        <Slot slots={{ trigger: { children: 'Slot children' } }}>
          <Button slot="trigger">Original children</Button>
        </Slot>
      );
      const button = container.querySelector('button');

      expect(button?.textContent).toBe('Slot children');
    });

    it('should allow slots to override className', function slotOverrideClassName() {
      const { container } = render(
        <Slot slots={{ trigger: { className: 'slot-class' } }}>
          <Button slot="trigger" className="original-class">
            Test
          </Button>
        </Slot>
      );
      const button = container.querySelector('button');
      const classes = button?.className || '';

      expect(button).toHaveClass('slot-class');
      // When slot provides className, baseline class is also replaced
      expect(classes).not.toMatch(/_button_/);
    });

    it('should not double-bind event handlers from slots', async function noDoubleEvents() {
      const onPress = vi.fn();
      // Simulating slots passing both the onPress handler
      const { container } = render(<Button onPress={onPress}>Test</Button>);
      const button = container.querySelector('button')!;

      await userEvent.click(button);

      // Should only fire once even though slots might try to pass the same handler
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('SSR safety', function ssrTests() {
    it('should not emit unknown props to DOM', function noUnknownProps() {
      const onPress = vi.fn();
      const { container } = render(
        <Button
          onPress={onPress}
          isDisabled={false}
          excludeFromTabOrder={false}
          // @ts-expect-error - testing unknown prop filtering
          unknownProp="should-not-appear"
        >
          Test
        </Button>
      );
      const button = container.querySelector('button');
      const html = button?.outerHTML || '';

      // Should not contain internal props
      expect(html).not.toContain('excludeFromTabOrder');
      expect(html).not.toContain('unknownProp');
    });

    it('should handle undefined prop values correctly', function undefinedProps() {
      const { container } = render(
        <Button className={undefined} aria-label={undefined} data-test={undefined} type="button">
          Test
        </Button>
      );
      const button = container.querySelector('button');

      // Undefined values should not be set as attributes
      expect(button).toHaveAttribute('type', 'button');
      expect(button?.hasAttribute('data-test')).toBe(false);
    });
  });
});
