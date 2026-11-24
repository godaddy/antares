import { Box, CircularProgress, Flex, Label, Text } from '@godaddy/antares';

/**
 * Compose only the parts you need. Box and Text value slots share formatted defaults;
 * the root's render function supplies progress state for custom content.
 * @order 5
 */
export function SlotsExample() {
  return (
    <Flex gap="lg" wrap="wrap" alignItems="start">
      <CircularProgress value={60} size="sm">
        <Box slot="track" />
        <Box slot="value" />
        <Label>Box value</Label>
        <Text slot="description">Processing files</Text>
      </CircularProgress>
      <CircularProgress value={60} size="sm">
        <Box slot="track" />
        <Text slot="value" />
        <Label>Text value</Label>
      </CircularProgress>
      <CircularProgress value={60} size="sm">
        {({ percentage }) => (
          <>
            <Box slot="track" />
            <Box slot="value">{percentage}/100</Box>
            <Label>Custom value</Label>
          </>
        )}
      </CircularProgress>
      <CircularProgress value={60} size="sm">
        <Box slot="track" />
        <Label>Without value</Label>
      </CircularProgress>
      <CircularProgress aria-label="Track only" value={60} size="sm">
        <Box slot="track" />
      </CircularProgress>
      <CircularProgress aria-label="Preparing upload" isIndeterminate size="sm">
        <Box slot="track" />
      </CircularProgress>
    </Flex>
  );
}
