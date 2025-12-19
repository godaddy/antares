import { withLock } from '@bento/environment';
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
 * Internal composed component with slots.
 * This is the "raw" component that will be wrapped by the design system.
 *
 * @param {ComponentProps} props - The component props.
 * @returns {JSX.Element} The rendered composed component.
 * @public
 */
const Composed = withSlots('WithLock.Composed', function ComposedComponent(props: ComponentProps) {
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
 * Design system component created using withLock HOC.
 * The lock boundary is automatically created by withLock.
 *
 * @public
 */
const DesignSystemComponent = withSlots(
  'WithLock.DSComponent',
  withLock(function DSComponentInner(props: ComponentProps) {
    const { props: p } = useProps(props);
    const slots = {
      'root.trigger': {
        children: 'Click Me'
      }
    };

    return <Composed slot="composed" slots={slots} {...p} />;
  })
);

/**
 * Example demonstrating withLock with NO consumer overrides.
 * Expected: NO data-override attributes anywhere.
 * All slots (trigger, label, description) are internal composition.
 *
 * @returns {JSX.Element} The rendered example.
 * @public
 */
export const WithLockNoOverride: React.FC = function WithLockNoOverride() {
  return <DesignSystemComponent />;
};

/**
 * Example demonstrating withLock WITH consumer overrides.
 * Expected: data-override on trigger button (consumer changed children).
 * Label and description should NOT have data-override (internal composition).
 *
 * @returns {JSX.Element} The rendered example.
 * @public
 */
export const WithLockWithOverride: React.FC = function WithLockWithOverride() {
  return (
    <DesignSystemComponent
      slots={{
        'composed.root.trigger': {
          children: 'Hello World'
        }
      }}
    />
  );
};
