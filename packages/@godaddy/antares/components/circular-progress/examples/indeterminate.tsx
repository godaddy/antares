import { CircularProgress, type CircularProgressProps } from '@godaddy/antares';

/**
 * Use indeterminate progress while preparing an upload whose total size is unknown.
 * Once the total is known, set `isIndeterminate` to false and supply a measured value.
 * @order 4
 */
export function IndeterminateExample(props: CircularProgressProps) {
  return (
    <CircularProgress label="Preparing upload…" helperText="Calculating the total size" isIndeterminate {...props} />
  );
}
