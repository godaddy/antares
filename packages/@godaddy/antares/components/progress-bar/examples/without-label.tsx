import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

/**
 * Omit the visible label for compact progress in a table or a fixed position.
 * Supply an accessible name with `aria-label`. Use `valueLabel` to opt into visible value output.
 * @order 6
 */
export function WithoutLabelExample(props: ProgressBarProps) {
  return <ProgressBar aria-label="Upload progress" value={60} size="sm" {...props} />;
}
