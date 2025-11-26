import { useProps } from '@bento/use-props';
import { withSlots, type Slots } from '@bento/slots';
/* v8 ignore next */
import React from 'react';

export interface ForwardRefExampleProps extends Slots, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode;
}

/**
 * Minimal example that demonstrates how refs supplied directly and through slots
 * are merged automatically when using `withSlots`.
 *
 * Note: No need to wrap with React.forwardRef - withSlots handles it automatically!
 *
 * @example
 * ```tsx
 * const outerRef = useRef<HTMLDivElement | null>(null);
 * const slotRef = useRef<HTMLDivElement | null>(null);
 *
 * <ForwardRefExample ref={outerRef} slots={{ panel: { ref: slotRef } }}>
 *   <ForwardRefExample slot="panel">Inner content</ForwardRefExample>
 * </ForwardRefExample>
 * ```
 */
export const ForwardRefExample = withSlots('SlotsForwardRefExample', function ForwardRefExample(...rest: any[]) {
  const { apply } = useProps(rest);

  return <div {...apply()} />;
});
