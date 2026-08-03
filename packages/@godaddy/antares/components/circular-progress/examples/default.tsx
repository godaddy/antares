import { CircularProgress } from '@godaddy/antares';

/**
 * A basic determinate progress indicator with a label and helper text.
 * @order 1
 */
export function DefaultExample() {
  return <CircularProgress value={60} label="Uploading…" helperText="3 of 5 files uploaded" />;
}
