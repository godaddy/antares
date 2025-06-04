import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import React from 'react';

/**
 * Button component demonstrating render props usage.
 *
 * @param {Record<string, unknown>} args - The component props.
 * @returns {JSX.Element} The rendered button or anchor element.
 * @public
 */
export const Button = withSlots('RenderPropsButton', function BentoButton(args: Record<string, unknown>) {
  const { props, apply } = useProps(args);

  if (props.as) {
    return <a {...apply({ className: 'xyz-hashed-class' }, ['as'])}>{props.children}</a>;
  }

  return <button {...props}>{props.children}</button>;
});
