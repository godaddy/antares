import { forwardRef, type CSSProperties } from 'react';
import { ProgressBar as RACProgressBar, type ProgressBarProps as RACProgressBarProps } from 'react-aria-components';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { ProgressSlots, useProgressDescription } from '#components/_internal/progress-slots';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface ProgressBarProps extends RACProgressBarProps, Omit<GridOwnProps, 'as'> {
  /** Composed label, value, track, and description. A function receives progress state. */
  children?: RACProgressBarProps['children'];

  /** Accessible value text and default value-slot content. Does not add visible output. */
  valueLabel?: string;

  /** Visual size of the track. @default 'md' */
  size?: 'xs' | 'sm' | 'md';

  /** Color intent of the fill. @default 'default' */
  status?: 'default' | 'success' | 'warning' | 'critical';
}

/** Shows determinate or indeterminate progress. Compose only the parts you need. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(props, ref) {
  const { size = 'md', status = 'default', className, children, 'aria-describedby': describedBy, ...rest } = props;
  const { descriptionId, descriptionRef, describedBy: description } = useProgressDescription(describedBy);

  return (
    <Grid
      columns="minmax(0, 1fr) auto"
      areas={['label value', 'track track', 'description description']}
      columnGap="xs"
      alignItems="baseline"
      {...rest}
      as={RACProgressBar}
      ref={ref}
      className={composeClassName(className, styles.progressBar)}
      data-size={size}
      data-status={status}
      aria-describedby={description}
    >
      {function renderContent(state) {
        return (
          <ProgressSlots
            state={state}
            descriptionId={descriptionId}
            descriptionRef={descriptionRef}
            classNames={{ label: styles.label, value: styles.value, description: styles.description }}
            track={{
              className: styles.track,
              style: {
                '--progress-bar-progress': state.isIndeterminate ? undefined : `${state.percentage ?? 0}%`
              } as CSSProperties,
              'aria-hidden': true,
              'data-indeterminate': state.isIndeterminate || undefined
            }}
          >
            {typeof children === 'function' ? children(state) : children}
          </ProgressSlots>
        );
      }}
    </Grid>
  );
});
