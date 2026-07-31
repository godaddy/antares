import { ProgressBar } from '@godaddy/antares';

/**
 * A determinate progress bar with a label and helper text.
 * @order 1
 */
export function DefaultExample() {
  return <ProgressBar label="Loading…" value={60} helperText="Please wait while we process your request" />;
}
