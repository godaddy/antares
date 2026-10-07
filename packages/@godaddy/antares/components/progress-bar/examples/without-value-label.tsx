import { ProgressBar, type ProgressBarProps } from '@godaddy/antares';

/**
 * Omit `valueLabel` to show a label without visible value text.
 * Progress remains available to assistive technology.
 * @order 5
 */
export function WithoutValueLabelExample(props: ProgressBarProps) {
  return <ProgressBar label="Uploading files" value={60} {...props} />;
}
