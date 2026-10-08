import {
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  type ProgressBarProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface WithoutLabelExampleProps extends ProgressBarProps {
  /** Whether to include visible value output. */
  showValue?: boolean;

  /** Custom visible value content. Omit for the formatted value. */
  valueContent?: ProgressBarValueProps['children'];
}

/**
 * Compose only the track for progress in a table or fixed position. Supply an accessible name.
 * Add ProgressBarValue when a visible value is useful.
 * @order 6
 */
export function WithoutLabelExample({ showValue = false, valueContent, ...props }: WithoutLabelExampleProps) {
  return (
    <ProgressBar aria-label="Upload progress" value={60} size="sm" {...props}>
      {showValue ? <ProgressBarValue>{valueContent}</ProgressBarValue> : null}
      <ProgressBarTrack />
    </ProgressBar>
  );
}
