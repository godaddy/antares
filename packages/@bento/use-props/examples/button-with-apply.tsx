import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
/* v8 ignore next */

/**
 * Button component demonstrating apply functionality.
 *
 * @param {Record<string, unknown>} args - The component props.
 * @returns {JSX.Element} The rendered button element.
 * @public
 */
export const Button = withSlots('UsePropsApplyButton', function BentoButton(args: Record<string, unknown>) {
  const { props, apply } = useProps(args);

  return <button {...apply({ className: 'xyz-hashed-class' }, ['as'])}>{props.children}</button>;
});
