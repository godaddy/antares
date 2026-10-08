import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

/**
 * Compose a label, formatted value, track, and description.
 * @order 1
 */
export function DefaultExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Loading…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">Please wait while we process your request</Text>
    </ProgressBar>
  );
}
