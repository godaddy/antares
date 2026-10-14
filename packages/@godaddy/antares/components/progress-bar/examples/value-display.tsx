import { Box, Flex, Label, ProgressBar } from '@godaddy/antares';

/**
 * The value slot shows formatted text by default and accepts custom children.
 * Static content does not change the accessible value; set the root's valueLabel when needed.
 * @order 7
 */
export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar value={60}>
        <Label>Upload progress</Label>
        <Box slot="value" />
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar value={60}>
        <Label>Files uploaded</Label>
        <Box slot="value">
          <span>3 of 5 files</span>
        </Box>
        <Box slot="track" />
      </ProgressBar>
      <ProgressBar value={60}>
        {({ percentage }) => (
          <>
            <Label>Processing progress</Label>
            <Box slot="value">Current: {percentage}%</Box>
            <Box slot="track" />
          </>
        )}
      </ProgressBar>
    </Flex>
  );
}
