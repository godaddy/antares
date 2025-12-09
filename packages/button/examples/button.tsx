/* v8 ignore next */
import React from 'react';
import { Button, type ButtonProps } from '../src/index';

export function ButtonExample(props: ButtonProps) {
  return <Button {...props}>{props.children || 'Click me'}</Button>;
}

export function ButtonWithAriaExample() {
  return (
    <Button aria-label="Close dialog" aria-expanded="false" aria-haspopup="dialog">
      Close
    </Button>
  );
}

export function ButtonWithDataAttributesExample() {
  return (
    <Button data-testid="my-button" data-foo="bar" data-select-trigger="true">
      Trigger
    </Button>
  );
}

export function ButtonInFormExample() {
  return (
    <form id="test-form">
      <Button type="submit" form="test-form" name="action" value="submit">
        Submit
      </Button>
    </form>
  );
}

export function DisabledButtonExample() {
  return <Button isDisabled>Disabled Button</Button>;
}

export function ButtonWithRenderPropExample() {
  return (
    <Button onPress={() => console.log('pressed')}>{({ isHovered }) => (isHovered ? 'Hover!' : 'Click me')}</Button>
  );
}
