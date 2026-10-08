import { useId } from 'react';
import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

/**
 * Compose a label, formatted value, track, and description.
 * @order 1
 */
export function DefaultExample(props: ProgressBarProps) {
  const descriptionId = useId();
  const { 'aria-describedby': describedBy, ...rest } = props;
  return (
    <ProgressBar value={60} aria-describedby={[describedBy, descriptionId].filter(Boolean).join(' ')} {...rest}>
      <Label>Loading…</Label>
      <ProgressBarValue />
      <ProgressBarTrack />
      <Text id={descriptionId} slot="description">
        Please wait while we process your request
      </Text>
    </ProgressBar>
  );
}
