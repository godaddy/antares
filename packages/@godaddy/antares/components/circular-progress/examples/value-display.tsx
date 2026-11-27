import { Box, CircularProgress, Flex, Label } from '@godaddy/antares';

/**
 * Custom ranges determine the completion percentage, while formatOptions controls the formatted value.
 * Set valueLabel to override both the accessible value text and the default visible value.
 * @order 6
 */
export function ValueDisplayExample() {
  return (
    <Flex gap="lg" wrap="wrap" alignItems="start">
      <CircularProgress value={60} minValue={20} maxValue={100}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Custom range</Label>
      </CircularProgress>
      <CircularProgress value={60} formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Budget used</Label>
      </CircularProgress>
      <CircularProgress value={3} maxValue={5} valueLabel="3 of 5">
        <Box slot="track" />
        <Box slot="value" />
        <Label>Files uploaded</Label>
      </CircularProgress>
    </Flex>
  );
}
