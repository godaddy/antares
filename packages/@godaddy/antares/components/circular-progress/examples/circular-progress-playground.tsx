import { Box, CircularProgress, Label, Text, type CircularProgressProps } from '@godaddy/antares';

export interface PlaygroundExampleProps
  extends Pick<CircularProgressProps, 'size' | 'status' | 'value' | 'isIndeterminate'> {
  /** Visible label text displayed below the circle. */
  label?: string;

  /** Description displayed below the label. */
  description?: string;

  /** Whether to render the visible value slot. */
  showValue?: boolean;
}

export function PlaygroundExample({
  size = 'md',
  status = 'default',
  value = 60,
  isIndeterminate = false,
  label = 'Progress',
  description = 'Notice/helper text',
  showValue = true
}: PlaygroundExampleProps) {
  return (
    <CircularProgress
      aria-label={label ? undefined : 'Progress'}
      size={size}
      status={status}
      value={value}
      isIndeterminate={isIndeterminate}
    >
      <Box slot="track" />
      {showValue ? <Box slot="value" /> : null}
      {label ? <Label>{label}</Label> : null}
      {description ? <Text slot="description">{description}</Text> : null}
    </CircularProgress>
  );
}
