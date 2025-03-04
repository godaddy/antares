import { useRenderProps } from '@bento/use-render-props';
import { withSlots } from '@bento/slots';
import React from 'react';

export const Button = withSlots('RenderPropsButton', function BentoButton(args: object) {
  const [props, apply] = useRenderProps(args);
  const { as, ...rest } = props;

  if (as) {
    return (
      <a {...rest} {...apply({ className: 'xyz-hashed-class' })}>
        {props.children}
      </a>
    );
  }

  return <button {...rest}>{props.children}</button>;
});
