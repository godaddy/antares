import { useRenderProps } from '@bento/use-render-props';
import { withSlots } from '@bento/slots';
import { Button } from './button.tsx';
import React, { useId } from 'react';

export const Example = withSlots('SlotsExample', function ExampleComponent(args: Record<string, any>) {
  const [props] = useRenderProps(args);

  return (
    <div {...props} className="example">
      {props.children}
    </div>
  );
});

export const Label = withSlots('SlotsLabel', function LabelComponent(props: Record<string, any>) {
  return <label {...props}>{props.children}</label>;
});

export const Nested = withSlots(
  'SlotsNested',
  function NestedComponent({ children = 'Hello World', id = useId() }: Record<string, any>) {
    return (
      <Example slot="example-container">
        <Label slot="label" htmlFor="example">
          {children}
        </Label>
        <Button slot="button" id={id}>
          Click Me
        </Button>
      </Example>
    );
  }
);
