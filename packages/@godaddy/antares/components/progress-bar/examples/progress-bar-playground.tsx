import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

export interface PlaygroundExampleProps extends Pick<ProgressBarProps, 'size' | 'status' | 'value'> {
  /** The label for the progress bar. */
  label?: string;
  /** Helper text below the track. */
  helperText?: string;
}

export function PlaygroundExample({
  size = 'md',
  status = 'default',
  value = 60,
  label = 'Progress',
  helperText = 'Notice/helper text'
}: PlaygroundExampleProps) {
  return (
    <ProgressBar
      label={label}
      size={size}
      status={status}
      value={value}
      helperText={helperText}
      formatOptions={{ currency: 'USD', style: 'currency' }}
    />
  );
}
