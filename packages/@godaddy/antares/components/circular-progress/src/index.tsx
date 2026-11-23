import { forwardRef, type CSSProperties } from 'react';
import {
  ProgressBar as RACProgressBar,
  type ProgressBarProps as RACProgressBarProps,
  composeRenderProps
} from 'react-aria-components';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { ProgressSlots, useProgressDescription } from '#components/_internal/progress-slots';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export type { ProgressBarRenderProps } from 'react-aria-components';

const VIEWBOX_SIZE = 100;
const STROKE_WIDTH = 12.5;
const RADIUS = (VIEWBOX_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface CircularProgressProps extends RACProgressBarProps, Omit<GridOwnProps, 'as'> {
  /** Composed label, value, circular track, and description. A function receives progress state. */
  children?: RACProgressBarProps['children'];

  /** Accessible value text and default value-slot content. Does not add visible output. */
  valueLabel?: string;

  /** Size preset controlling circle diameter and typography scale. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

/** Shows circular determinate or indeterminate progress. Compose only the parts you need. */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress(props, ref) {
    const {
      size = 'md',
      status = 'default',
      className,
      style,
      children,
      'aria-describedby': describedBy,
      ...rest
    } = props;
    const { descriptionId, descriptionRef, describedBy: description } = useProgressDescription(describedBy);

    return (
      <Grid
        columns="minmax(0, 1fr)"
        areas={['track', 'label', 'description']}
        justifyItems="center"
        {...rest}
        as={RACProgressBar}
        ref={ref}
        className={composeClassName(className, styles.root)}
        data-size={size}
        data-status={status}
        aria-describedby={description}
        style={composeRenderProps(style, function composeStyle(value) {
          return { ...value, '--circular-progress-stroke-width': STROKE_WIDTH } as CSSProperties;
        })}
      >
        {function renderContent(state) {
          const offset = CIRCUMFERENCE * (state.isIndeterminate ? 0.75 : 1 - (state.percentage ?? 0) / 100);
          return (
            <ProgressSlots
              state={state}
              descriptionId={descriptionId}
              descriptionRef={descriptionRef}
              classNames={{ label: styles.label, value: styles.value, description: styles.description }}
              isValueDecorative
              track={{
                className: styles.indicator,
                'aria-hidden': true,
                'data-indeterminate': state.isIndeterminate || undefined,
                children: (
                  <svg
                    className={styles.svg}
                    data-indeterminate={state.isIndeterminate || undefined}
                    viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
                    aria-hidden="true"
                  >
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
                )
              }}
            >
              {typeof children === 'function' ? children(state) : children}
            </ProgressSlots>
          );
        }}
      </Grid>
    );
  }
);
