import { Label, ProgressBar, ProgressBarTrack, type ProgressBarProps } from '@godaddy/antares';

/**
 * Omit ProgressBarValue to hide visible value output. Accessible progress is preserved.
 * @order 5
 */
export function WithoutValueLabelExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Uploading files</Label>
      <ProgressBarTrack />
    </ProgressBar>
  );
}
