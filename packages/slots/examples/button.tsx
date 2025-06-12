import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
/* v8 ignore next */
import React from 'react';

/**
 * Button component for the slots example.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered button.
 * @public
 */
export const Button = withSlots('SlotsButton', function ButtonComponent(args: any) {
  const { props } = useProps(args);

  return <button {...props}>{props.children}</button>;
});
