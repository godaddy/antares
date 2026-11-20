import { Box, CircularProgress, Label, Text, type CircularProgressProps } from '@godaddy/antares';

/**
 * Use indeterminate progress while preparing an upload whose total size is unknown.
 * Once the total is known, set `isIndeterminate` to false and supply a measured value.
 * @order 4
 */
export function IndeterminateExample(props: CircularProgressProps) {
  return (
    <CircularProgress isIndeterminate {...props}>
      <Box slot="track" />
      <Box slot="value" />
      <Label>Preparing upload…</Label>
      <Text slot="description">Calculating the total size</Text>
    </CircularProgress>
  );
}
