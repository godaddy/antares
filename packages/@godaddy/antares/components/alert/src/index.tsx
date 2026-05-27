import type React from 'react';
import { type ComponentProps, forwardRef } from 'react';
import { cx } from 'cva';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Flex } from '#components/layout/flex';
import { Text } from '#components/text';
import styles from './index.module.css';

const emphasisIcons: Record<AlertEmphasis, string> = {
  critical: 'alert',
  warning: 'alert',
  success: 'checkmark',
  info: 'information',
  highlight: 'star',
  premium: 'diamond',
  internal: 'comment'
};

const DEFAULT_ARIA_LABELS = {
  close: 'Close'
};

/**
 * Controls the visual accent, semantic icon, and intended tone of the alert.
 */
export type AlertEmphasis = 'critical' | 'warning' | 'success' | 'info' | 'highlight' | 'premium' | 'internal';

/**
 * Props for the {@link Alert} component.
 */
export interface AlertProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** Describes the importance or nature of the message. @default 'info' */
  emphasis?: AlertEmphasis;

  /** Sets title text for the alert. */
  title?: string;

  /** Sets body text. */
  children: React.ReactNode;

  /** Adds action button(s). */
  actions?: React.ReactNode;

  /** Callback fired when the dismiss button is clicked. When provided, renders a dismiss (X) icon button. */
  onClose?: () => void;

  /** Screen reader labels for sub-elements. */
  ariaLabels?: {
    /** Sets aria label for close button. @default 'Close' */
    close?: string;
  };

  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/**
 * Displays a non-intrusive, persistent notification within the page.
 *
 * @example
 * // Warn the user about an expiring payment method with a clear call to action.
 * <Alert
 *   emphasis="warning"
 *   title="Your payment method is expiring"
 *   actions={<Button variant="secondary" size="sm">Update Payment Method</Button>}
 *   onClose={() => setVisible(false)}
 * >
 *   Please update your payment method before it expires to avoid service interruption.
 * </Alert>
 *
 * @param props - {@link AlertProps}
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const {
    emphasis = 'info',
    title,
    children,
    actions,
    onClose,
    ariaLabels: _ariaLabels = DEFAULT_ARIA_LABELS,
    className,
    ...rest
  } = props;

  const float = <div className={styles.float} />;

  const titleElem =
    onClose && title ? (
      <div>
        {float}
        {title}
      </div>
    ) : (
      title
    );

  const bodyContent =
    onClose && !title ? (
      <div>
        {float}
        {children}
      </div>
    ) : (
      children
    );

  return (
    <Flex
      ref={ref}
      className={cx(styles.alert, className)}
      alignItems="start"
      data-emphasis={emphasis}
      data-dismissible={onClose ? '' : undefined}
      role="alert"
      {...rest}
    >
      <Flex className={styles.content} alignItems="baseline">
        <Flex className={styles.iconWrapper} alignItems="center" justifyContent="center">
          <Icon icon={emphasisIcons[emphasis]} className={styles.icon} />
        </Flex>
        <Flex className={styles.textAndActionWrapper} alignItems="center" wrap="wrap">
          <Flex direction="column" className={styles.text}>
            {titleElem ? <Text className={styles.title}>{titleElem}</Text> : null}
            {bodyContent ? <span>{bodyContent}</span> : null}
          </Flex>
          {actions ? (
            <Flex className={styles.actions} alignItems="center" gap="sm" wrap="wrap">
              {actions}
            </Flex>
          ) : null}
        </Flex>
      </Flex>
      {onClose ? (
        <Button
          variant="minimal"
          size="sm"
          className={styles.close}
          onPress={onClose}
          aria-label={_ariaLabels.close ?? DEFAULT_ARIA_LABELS.close}
        >
          <Icon icon="x" />
        </Button>
      ) : null}
    </Flex>
  );
});
