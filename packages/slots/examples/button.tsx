import { useRenderProps } from '@bento/render-props';
import { withSlots } from '@bento/slots';
import React from 'react';

export const Button = withSlots('SlotsButton', function ButtonComponent(args) {
  const [props] = useRenderProps(args);
  return <button {...props}>{props.children}</button>;
});
