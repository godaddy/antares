import type { CSSProperties, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import { ProgressBar as RACProgressBar, type ProgressBarProps as RACProgressBarProps } from 'react-aria-components';
import styles from './index.module.css';
import { Label } from '#components/label';
import { Text } from '#components/text';
import { Flex } from '#components/layout/flex';
import { composeClassName } from '#utils/render-props.ts';
import { cx } from 'cva';
import { textTreatmentClassName } from '#components/_internal/typography';

export interface ProgressBarProps extends Omit<RACProgressBarProps, 'children' | 'valueLabel'> {
  /** Show ongoing activity when progress cannot be measured. Ignores value and hides value text. @default false */
  isIndeterminate?: boolean;

  /** Visible label text rendered above the track. */
  label?: string;

  /**
   * Optional visible value output. Pass true for the formatted value, a React node for static
   * content, or a render function to access progress state. Omit it, or pass null or false, to hide it.
   */
  valueLabel?: RACProgressBarProps['children'];

  /** Helper or notice text rendered below the track. */
  helperText?: ReactNode;

  /** Visual size of the track. @default 'md' */
  size?: 'xs' | 'sm' | 'md';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

/**
 * A progress bar shows determinate or indeterminate progress of an operation over time.
 *
 * @param props - The properties {@link ProgressBarProps} passed to the component.
 *
 * @example
 * ```tsx
 * <ProgressBar label="Uploading…" value={60} valueLabel status="default" helperText="3 of 5 files uploaded" />
 * ```
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(props, ref) {
  const {
    size = 'md',
    status = 'default',
    className,
    label,
    valueLabel,
    helperText,
    'aria-describedby': describedByProp,
    ...rest
  } = props;
  const helperTextId = useId();
  const describedBy = helperText ? [describedByProp, helperTextId].filter(Boolean).join(' ') : describedByProp;

  return (
    <Flex
      {...rest}
      valueLabel={typeof valueLabel === 'string' ? valueLabel : undefined}
      direction="column"
      gap="xs"
      ref={ref}
      className={composeClassName(className, styles.progressBar)}
      data-size={size}
      data-status={status}
      aria-describedby={describedBy}
      as={RACProgressBar}
    >
      {function renderContent(renderProps) {
        const { percentage, valueText, isIndeterminate } = renderProps;
        const valueContent = typeof valueLabel === 'function' ? valueLabel(renderProps) : valueLabel;
        const valueLabelVisible = !isIndeterminate && valueContent != null && valueContent !== false;

        return (
          <>
            {label || valueLabelVisible ? (
              <Flex justifyContent={label ? 'space-between' : 'flex-end'} alignItems="baseline">
                {label ? <Label className={styles.label}>{label}</Label> : null}
                {valueLabelVisible ? (
                  <Text className={cx(styles.valueLabel, textTreatmentClassName('inherit'))}>
                    {valueContent === true ? valueText : valueContent}
                  </Text>
                ) : null}
              </Flex>
            ) : null}
            <div
              className={styles.track}
              data-indeterminate={isIndeterminate || undefined}
              style={
                isIndeterminate ? undefined : ({ '--progress-bar-progress': `${percentage ?? 0}%` } as CSSProperties)
              }
            />
            {helperText ? (
              <Text id={helperTextId} className={cx(styles.helperText, textTreatmentClassName('inherit'))}>
                {helperText}
              </Text>
            ) : null}
          </>
        );
      }}
    </Flex>
  );
});
