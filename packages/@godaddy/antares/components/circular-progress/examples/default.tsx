import { Box, CircularProgress, Label, Text, type CircularProgressProps } from '@godaddy/antares';

/**
 * Compose a circular track, formatted value, label, and description.
 * @order 1
 */
export function DefaultExample(props: CircularProgressProps) {
  return (
    <CircularProgress value={60} {...props}>
      <Box slot="track" />
      <Box slot="value" />
      <Label>Uploading…</Label>
      <Text slot="description">3 of 5 files uploaded</Text>
    </CircularProgress>
  );
}
