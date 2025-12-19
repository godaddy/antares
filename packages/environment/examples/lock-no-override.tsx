import { Environment } from '@bento/environment';
import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { Button } from '@bento/button';
import { Container } from '@bento/container';
import { RadioGroup, Radio } from '@bento/radio';
/* v8 ignore next */
import React from 'react';

// Cast components to accept children (workaround for strict slot types)
const TypedContainer = Container as React.FC<any>;
const TypedButton = Button as React.FC<any>;
const TypedRadioGroup = RadioGroup as React.FC<any>;
const TypedRadio = Radio as React.FC<any>;

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
    <TypedContainer slot="root">
      <TypedButton slot="trigger">Press Me</TypedButton>
      <TypedRadioGroup id="fruit-group" slots={slots} label="Favorite fruit" description="Pick your favorite">
        <TypedRadio value="apple">Apple</TypedRadio>
        <TypedRadio value="banana">Banana</TypedRadio>
        <TypedRadio value="orange">Orange</TypedRadio>
      </TypedRadioGroup>
    </TypedContainer>
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
