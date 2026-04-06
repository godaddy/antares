import { toInternalProps } from '@bento/internal-props';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';

/**
 * Simple button component that accepts internal props.
 *
 * @param {Record<string, any>} args - The component props.
 * @returns {JSX.Element} The rendered button element.
 * @public
 */
export const BentoButton = withSlots('InternalBentoButton', function ButtonComponent(args: Record<string, any>) {
  const { props, apply } = useProps(args);

  return <button {...apply({ className: 'bento-button-base' })}>{props.children}</button>;
});

/**
 * Example component demonstrating how to use toInternalProps for className overrides.
 *
 * @returns {JSX.Element} The rendered example with various button styles.
 * @public
 */
export const Example = withSlots('ClassNameOverrideExample', function ExampleComponent() {
  // Convert className to internal prop to avoid data-override
  const primaryButtonProps = toInternalProps({ className: 'primary-button large-button' });

  const customButtonProps = toInternalProps({
    className: ({ original }: { original: string }) => ['custom-button-class', original].join(' ')
  });

  return (
    <div>
      {/* Regular button with default className */}
      <BentoButton>Default Button</BentoButton>

      {/* Button with custom className that won't trigger data-override */}
      <BentoButton className="trigger-override">Triggers data-override</BentoButton>

      {/* Button with custom className that won't trigger data-override */}
      <BentoButton {...customButtonProps}>Custom Styled Button</BentoButton>

      {/* Button with multiple classNames */}
      <BentoButton {...primaryButtonProps}>Primary Large Button</BentoButton>
    </div>
  );
});
