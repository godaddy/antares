import { useId } from 'react';
import { Label, ProgressBar, ProgressBarTrack, ProgressBarValue, Text, type ProgressBarProps } from '@godaddy/antares';

interface PlaygroundExampleProps extends Pick<ProgressBarProps, 'size' | 'status' | 'value' | 'isIndeterminate'> {
  /** Visible label text. */
  label?: string;

  /** Description below the track. */
  description?: string;

  /** Whether to render ProgressBarValue. */
  showValue?: boolean;
}

export function PlaygroundExample({
  size = 'md',
  status = 'default',
  value = 60,
  isIndeterminate = false,
  label = 'Progress',
  description = 'Notice/helper text',
  showValue = false
}: PlaygroundExampleProps) {
  const descriptionId = useId();
  return (
    <ProgressBar
      aria-describedby={description ? descriptionId : undefined}
      aria-label={label ? undefined : 'Progress'}
      size={size}
      status={status}
      value={value}
      isIndeterminate={isIndeterminate}
    >
      {label ? <Label>{label}</Label> : null}
      {showValue ? <ProgressBarValue /> : null}
      <ProgressBarTrack />
      {description ? (
        <Text id={descriptionId} slot="description">
          {description}
        </Text>
      ) : null}
    </ProgressBar>
  );
}
