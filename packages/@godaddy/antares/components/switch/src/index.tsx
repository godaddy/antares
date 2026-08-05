import { forwardRef, type ReactNode } from 'react';
import {
  SwitchButton as RACSwitchButton,
  SwitchField as RACSwitchField,
  type SwitchFieldProps as RACSwitchFieldProps
} from 'react-aria-components';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import styles from './index.module.css';

/** Props for configuring the Switch component. */
export interface SwitchProps extends Omit<RACSwitchFieldProps, 'children'>, Omit<FlexOwnProps, 'as'> {
  /** The label content rendered alongside the track. Omit for a label-less switch, and provide `aria-label` instead. */
  children?: ReactNode;

  /**
   * Size of the switch.
   * @default 'md'
   */
  size?: 'sm' | 'md';

  /**
   * Position of the label relative to the track.
   * @default 'start'
   */
  labelPosition?: 'start' | 'end';
}

/**
 * Antares Switch component. A binary toggle control that switches a setting between
 * on and off states, communicated via the WAI-ARIA `switch` role.
 *
 * @param props - {@link SwitchProps}
 *
 * @example
 * <Switch defaultSelected>Wi-Fi</Switch>
 */
export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(function Switch(props, ref) {
  const { children, size = 'md', labelPosition = 'start', ...rest } = props;

  const track = (
    <span className={styles.track} aria-hidden="true">
      <span className={styles.thumb} />
    </span>
  );
  const label = children != null && <span className={styles.label}>{children}</span>;

  return (
    <Flex {...rest} as={RACSwitchField}>
      <Flex as={RACSwitchButton} alignItems="center" gap="sm" data-size={size} className={styles.switch} ref={ref}>
        {labelPosition === 'start' ? (
          <>
            {label}
            {track}
          </>
        ) : (
          <>
            {track}
            {label}
          </>
        )}
      </Flex>
    </Flex>
  );
});
