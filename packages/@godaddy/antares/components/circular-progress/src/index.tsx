import type { CSSProperties, ReactNode } from 'react';
import { forwardRef, useId } from 'react';
import { cx } from 'cva';
import {
  ProgressBar as RACProgressBar,
  type ProgressBarProps as RACProgressBarProps,
  Label as RACLabel
} from 'react-aria-components';
import { Text } from '#components/text';
import { Flex } from '#components/layout/flex';
import styles from './index.module.css';

const VIEWBOX_SIZE = 100;
const STROKE_WIDTH = 12.5;
const RADIUS = (VIEWBOX_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface CircularProgressProps extends Omit<RACProgressBarProps, 'className' | 'children' | 'isIndeterminate'> {
  /** Size preset controlling circle diameter and typography scale. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Visual emphasis for status feedback. Overrides the fill color. */
  emphasis?: 'success' | 'warning' | 'critical';

  /** Visible label text displayed below the circle. */
  label?: string;

  /** Helper or notice text displayed below the label. */
  helperText?: ReactNode;

  /** Additional CSS class name for the root element. */
  className?: string;
}

/**
 * A circular progress indicator shows determinate progress of an operation over time.
 *
 * @param props - The properties {@link CircularProgressProps} passed to the component.
 *
 * @example
 * ```tsx
 * <CircularProgress label="Uploading…" value={60} helperText="3 of 5 files uploaded" />
 * ```
 */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress(props, ref) {
    const {
      size = 'md',
      emphasis,
      label,
      helperText,
      className,
      style,
      'aria-describedby': describedByProp,
      ...rest
    } = props;

    const helperTextId = useId();
    const describedBy = helperText ? [describedByProp, helperTextId].filter(Boolean).join(' ') : describedByProp;

    return (
      <Flex
        {...rest}
        ref={ref}
        direction="column"
        alignItems="center"
        gap="sm"
        as={RACProgressBar}
        className={cx(styles.root, className)}
        data-size={size}
        data-emphasis={emphasis}
        aria-describedby={describedBy}
        style={{ ...style, '--circular-progress-stroke-width': STROKE_WIDTH } as CSSProperties}
      >
        {function renderContent({ percentage, valueText }) {
          const offset = CIRCUMFERENCE * (1 - (percentage ?? 0) / 100);
          return (
            <>
              <div className={styles.indicator}>
                <svg className={styles.svg} viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} aria-hidden="true">
                  <circle className={styles.track} cx="50" cy="50" r={RADIUS} fill="none" strokeLinecap="round" />
                  <circle
                    className={styles.fill}
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                  />
                </svg>
                {valueText ? (
                  <Flex className={styles.output} alignItems="center" justifyContent="center" aria-hidden="true">
                    {valueText}
                  </Flex>
                ) : null}
              </div>
              {label ? <RACLabel className={styles.label}>{label}</RACLabel> : null}
              {helperText ? (
                <Text id={helperTextId} className={styles.helperText}>
                  {helperText}
                </Text>
              ) : null}
            </>
          );
        }}
      </Flex>
    );
  }
);
