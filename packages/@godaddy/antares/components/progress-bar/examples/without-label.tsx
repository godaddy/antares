import { ProgressBar, ProgressBarTrack, type ProgressBarProps } from '@godaddy/antares';

/**
 * Compose only the track for progress in a table or fixed position. Supply an accessible name.
 * @order 6
 */
export function WithoutLabelExample(props: ProgressBarProps) {
  return <ProgressBar aria-label="Upload progress" value={60} size="sm" children={<ProgressBarTrack />} {...props} />;
}
