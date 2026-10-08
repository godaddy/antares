import {
  ProgressBar,
  ProgressBarTrack,
  ProgressBarValue,
  type ProgressBarProps,
  type ProgressBarValueProps
} from '@godaddy/antares';

interface ValueOnlyExampleProps extends ProgressBarProps {
  /** Visible value content, or undefined for the formatted value. */
  valueContent?: ProgressBarValueProps['children'];
}

/**
 * Compose a value without a visible label, using aria-label for the accessible name.
 * @order 9
 */
export function ValueOnlyExample({ valueContent, ...props }: ValueOnlyExampleProps) {
  return (
    <ProgressBar aria-label="Upload progress" value={60} {...props}>
      <ProgressBarValue>{valueContent}</ProgressBarValue>
      <ProgressBarTrack />
    </ProgressBar>
  );
}
