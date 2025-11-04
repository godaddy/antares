import { Environment } from '@bento/environment';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { Button } from '@bento/button';
import { Container } from '@bento/container';
import { RadioGroup, Radio } from '@bento/radio';
/* v8 ignore next */
import React from 'react';

/**
 * Interface for component props.
 *
 * @interface ComponentProps
 * @public
 */
interface ComponentProps {
  [key: string]: any;
}

/**
 * Composite component with internal slots.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered composed component.
 * @public
 */
const Composed = withSlots('LockNoOverride.Composed', function ComposedComponent(props: ComponentProps) {
  const slots = {
    'group.label': { className: 'label' },
    'group.description': { className: 'describe' }
  };

  return (
    <Container slot="root">
      <Button slot="trigger">Press Me</Button>
      <RadioGroup id="fruit-group" slots={slots} label="Favorite fruit" description="Pick your favorite">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="orange">Orange</Radio>
      </RadioGroup>
    </Container>
  );
});

/**
 * Design system component with lock boundary.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered design system component.
 * @public
 */
export const DesignSystemVersion = withSlots(
  'LockNoOverride.DSVersion',
  function DSVersionComponent(props: ComponentProps) {
    const { props: p } = useProps(props);
    const slots = {
      'root.trigger': {
        children: 'Click Me'
      }
    };

    return (
      <Environment lock={true}>
        <Composed slot="composed" slots={slots} {...p} />
      </Environment>
    );
  }
);

/**
 * Example demonstrating lock with NO consumer overrides.
 * Expected: NO data-override attributes anywhere.
 * All slots (trigger, label, description) are internal composition.
 *
 * @returns {JSX.Element} The rendered example.
 * @public
 */
export const LockNoOverride: React.FC = function LockNoOverride() {
  return <DesignSystemVersion />;
};
