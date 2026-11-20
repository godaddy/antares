import { Box, CircularProgress, Flex, Label, Text } from '@godaddy/antares';

/**
 * Use the `status` prop to communicate progress: `default`, `success`, `warning`, or `critical`.
 * When omitted, the default teal fill is used.
 * @order 3
 */
export function StatusesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress status="default" value={60}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Default</Label>
      </CircularProgress>
      <CircularProgress status="success" value={100}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Success</Label>
        <Text slot="description">Complete</Text>
      </CircularProgress>
      <CircularProgress status="warning" value={70}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Warning</Label>
        <Text slot="description">Storage almost full</Text>
      </CircularProgress>
      <CircularProgress status="critical" value={30}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Critical</Label>
        <Text slot="description">Action required</Text>
      </CircularProgress>
    </Flex>
  );
}
