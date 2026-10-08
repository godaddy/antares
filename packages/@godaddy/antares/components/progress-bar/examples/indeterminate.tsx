import { useId } from 'react';
import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

/**
 * Use indeterminate progress while the total is unknown. Value output is hidden automatically.
 * @order 4
 */
export function IndeterminateExample(props: ProgressBarProps) {
  const descriptionId = useId();
  const { 'aria-describedby': describedBy, ...rest } = props;
  return (
    <ProgressBar isIndeterminate aria-describedby={[describedBy, descriptionId].filter(Boolean).join(' ')} {...rest}>
      <Label>Preparing upload…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text id={descriptionId} slot="description">
        Calculating the total size
      </Text>
    </ProgressBar>
  );
}
