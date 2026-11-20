import { Box, CircularProgress, Flex, Label } from '@godaddy/antares';

/**
 * Four circle diameters are available: `sm` (64px), `md` (96px), `lg` (128px), and `xl` (160px).
 * @order 2
 */
export function SizesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress size="sm" value={40}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Small</Label>
      </CircularProgress>
      <CircularProgress size="md" value={60}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Medium</Label>
      </CircularProgress>
      <CircularProgress size="lg" value={75}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Large</Label>
      </CircularProgress>
      <CircularProgress size="xl" value={90}>
        <Box slot="track" />
        <Box slot="value" />
        <Label>Extra Large</Label>
      </CircularProgress>
    </Flex>
  );
}
