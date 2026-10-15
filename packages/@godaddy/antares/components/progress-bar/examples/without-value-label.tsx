import { Box, Label, ProgressBar, type ProgressBarProps } from '@godaddy/antares';

/**
 * Omit the value slot to hide visible value output. Accessible progress is preserved.
 * @order 5
 */
export function WithoutValueLabelExample(props: ProgressBarProps) {
  return (
    <ProgressBar value={60} {...props}>
      <Label>Uploading files</Label>
      <Box slot="track" />
    </ProgressBar>
  );
}
