import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import { Button } from './button.tsx';
import React, { useId } from 'react';

/**
 * Example component demonstrating container usage.
 *
 * @param {Record<string, unknown>} args - The component props.
 * @returns {JSX.Element} The rendered div element.
 * @public
 */
export const Example = withSlots('RenderPropsExample', function ExampleComponent(args: Record<string, unknown>) {
  const { props, apply } = useProps(args);

  return <div {...apply({ className: 'example' })}>{props.children}</div>;
});

/**
 * Label component for form elements.
 *
 * @param {Record<string, unknown>} args - The component props.
 * @returns {JSX.Element} The rendered label element.
 * @public
 */
export const Label = withSlots('RenderPropsLabel', function LabelComponent(args: Record<string, unknown>) {
  const { props } = useProps(args);

  return <label {...props}>{props.children}</label>;
});

/**
 * Nested component demonstrating component composition.
 *
 * @returns {JSX.Element} The rendered nested component structure.
 * @public
 */
export const Nested = withSlots('RenderPropsNested', function NestedComponent() {
  const id = useId();

  return (
    <Example slot="example-container">
      <Label slot="label" htmlFor={id}>
        Hello World
      </Label>
      <Button slot="button" id={id}>
        Click Me
      </Button>
    </Example>
  );
});
