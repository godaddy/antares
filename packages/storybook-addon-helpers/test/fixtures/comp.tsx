import React, { memo, type ComponentProps } from 'react';

export interface InterfaceProps {
  /** interface prop description */
  prop1: string;

  /**
   * interface prop description 2
   * @default 'default value'
   */
  prop2?: string;

  /**
   * interface prop description 3
   */
  prop3?: () => React.ReactNode;
}

interface ButtonProps extends Omit<ComponentProps<'button'>, 'slot'> {
  /** this is the onClick handler */
  onClick: () => void;
}

/**
 * A reusable button component with custom click handling
 */
export function Button(props: ButtonProps) {
  return <button {...props}>Click me</button>;
}

export interface NewComponentProps extends ComponentProps<'hr'> {
  /** interface orientation description */
  orientation?: 'horizontal' | 'vertical';
}

export interface Slots {
  /**
   * Slot description
   */
  slot?: string;
  /**
   * Slots description
   */
  slots?: Record<string, object | Function>;
}

function withSlots(name: string, component: (args: NewComponentProps) => React.ReactNode) {
  return memo<NewComponentProps & Slots>(component);
}

export const Component = withSlots('Component', function Component(args: NewComponentProps) {
  return <span>{JSON.stringify(args)}</span>;
});
