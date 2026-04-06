import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

/**
 * Button component for the slots example.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered button.
 * @public
 */
export const Button = withSlots('SlotsButton', function ButtonComponent(args: any) {
  const { apply } = useProps(args);

  return <button {...apply()} />;
});
