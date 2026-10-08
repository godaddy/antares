import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

/**
 * Use indeterminate progress while the total is unknown. Value output is hidden automatically.
 * @order 4
 */
export function IndeterminateExample(props: ProgressBarProps) {
  return (
    <ProgressBar isIndeterminate {...props}>
      <Label>Preparing upload…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text slot="description">Calculating the total size</Text>
    </ProgressBar>
  );
}
