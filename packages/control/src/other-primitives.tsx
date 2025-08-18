// TODO: Temp implementation for VisuallyHidden, Text, FieldError primitives
// https://

import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import React from 'react';
import { VisuallyHidden as VisuallyHiddenAria, VisuallyHiddenProps } from 'react-aria';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: string;
}

export const Text = withSlots('BentoText', function Text(args: TextProps) {
  const { props } = useProps(args);
  const { children, as: Component = 'span', ...restProps } = props;

  return <Component {...restProps}>{children}</Component>;
});

export const VisuallyHidden = withSlots(
  'BentoVisuallyHidden',
  function VisuallyHidden(args: VisuallyHiddenProps & { as?: string }) {
    const { props } = useProps(args);
    const { children, as, ...restProps } = props;

    return (
      <VisuallyHiddenAria elementType={as} {...restProps}>
        {children}
      </VisuallyHiddenAria>
    );
  }
);

export const FieldError = withSlots('BentoFieldError', function FieldError(args: any) {
  const { props } = useProps(args);
  const { children, errorMessageProps, ...restProps } = props;

  return (
    <div {...errorMessageProps} {...restProps}>
      {children}
    </div>
  );
});
