import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import { Box, type BoxOwnProps } from '#components/layout/box';
import { composeClassName, composeStyle } from '#utils/render-props.ts';
import { useProgressBarState } from './state.ts';
import styles from './progress-bar-track.module.css';

export interface ProgressBarTrackProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'>,
    Omit<BoxOwnProps, 'as'> {}

/** Decorative track and fill. Reads the range, size, status, and indeterminate state from ProgressBar. */
export const ProgressBarTrack = forwardRef<HTMLDivElement, ProgressBarTrackProps>(
  function ProgressBarTrack(props, ref) {
    const { className, style, ...rest } = props;
    const { percentage, isIndeterminate } = useProgressBarState();
    const progressStyle = {
      '--progress-bar-progress': isIndeterminate ? undefined : `${percentage ?? 0}%`
    } as CSSProperties;

    return (
      <Box
        {...rest}
        ref={ref}
        className={composeClassName(className, styles.track)}
        style={composeStyle(style, progressStyle)}
        aria-hidden="true"
        data-indeterminate={isIndeterminate || undefined}
      />
    );
  }
);
