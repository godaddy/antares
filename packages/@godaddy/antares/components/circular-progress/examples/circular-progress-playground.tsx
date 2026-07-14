import { CircularProgress, type CircularProgressProps } from '@godaddy/antares';

export interface PlaygroundExampleProps extends Pick<CircularProgressProps, 'size' | 'emphasis' | 'value'> {
  /** Visible label text displayed below the circle. */
  label?: string;
  /** Helper or notice text displayed below the label. */
  helperText?: string;
}

export function PlaygroundExample({
  size = 'md',
  emphasis,
  value = 60,
  label = 'Progress',
  helperText = 'Notice/helper text'
}: PlaygroundExampleProps) {
  return <CircularProgress size={size} emphasis={emphasis} value={value} label={label} helperText={helperText} />;
}
