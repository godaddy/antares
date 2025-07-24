import React from 'react';
import type { ComponentProps } from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import styles from './styles.module.css';

export interface DividerProps extends ComponentProps<'hr'> {
  orientation?: 'horizontal' | 'vertical';
}

/**
 * A simple and accessible divider component that renders an `<hr>` element.
 *
 * @component
 * @param {DividerProps} args - The properties passed to the Divider component.
 * @param {string} [args.orientation] - The orientation of the divider, either 'horizontal' or 'vertical'.
 *
 * @example
 * ```tsx
 * <Divider orientation='vertical' />
 * ```
 *
 * @public
 */
export const Divider = withSlots('BentoDivider', function Divider(args: DividerProps) {
  const { props, apply } = useProps(args);
  const { orientation = 'horizontal' } = props;

  return (
    <hr
      {...apply(
        {
          'aria-orientation': orientation,
          className: styles.divider
        },
        ['orientation']
      )}
    />
  );
});
