import { Box, Flex, Label, ProgressBar, Text } from '@godaddy/antares';

/**
 * Box slots receive the formatted value and decorative track from ProgressBar.
 * Use the root's render function for custom value content. Text can also fill the value slot.
 * @order 8
 */
export function SlotsExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60}>
        <Label>Box value</Label>
        <Box slot="value" />
        <Box slot="track" />
        <Text slot="description">Processing files</Text>
      </ProgressBar>
      <ProgressBar value={60}>
        {({ percentage }) => (
          <>
            <Label>Custom value</Label>
            <Box slot="value">Current: {percentage}%</Box>
            <Box slot="track" />
          </>
        )}
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Text value</Label>
        <Text slot="value" />
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar aria-label="Track only" value={60} size="xs">
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar isIndeterminate>
        <Label>Preparing upload</Label>
        <Box slot="value">Waiting</Box>
        <Box slot="track" />
      </ProgressBar>
    </Flex>
  );
}
