import type { ComponentProps } from 'react';
import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import styles from './styles.module.css';

export interface DividerProps extends ComponentProps<'hr'> {
  /** The id of the divider element. This is useful for accessibility purposes. */
  id?: string;

  /**
   * The orientation of the divider.
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * A simple and accessible divider component that renders an `<hr>` element.
 *
 * @component
 * @param {DividerProps} args - The properties passed to the Divider component.
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
