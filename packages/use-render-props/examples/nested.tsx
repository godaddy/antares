import { useRenderProps } from '@bento/use-render-props';
import { withSlots } from '@bento/slots';
import { Button } from './button.tsx';
import React, { useId } from 'react';

export const Example = withSlots('RenderPropsExample', function ExampleComponent(args) {
  const [props, apply] = useRenderProps(args);

  return <div {...apply({ className: 'example' })}>{props.children}</div>;
});

export const Label = withSlots('RenderPropsLabel', function LabelComponent(args) {
  const [props, apply] = useRenderProps(args);

  return <label {...apply()}>{props.children}</label>;
});

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
