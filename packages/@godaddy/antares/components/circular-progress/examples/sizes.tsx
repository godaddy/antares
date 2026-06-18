import { CircularProgress, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex gap="lg" alignItems="flex-end">
      <CircularProgress size="sm" value={40} label="Small" />
      <CircularProgress size="md" value={60} label="Medium" />
      <CircularProgress size="lg" value={75} label="Large" />
      <CircularProgress size="xl" value={90} label="Extra Large" />
    </Flex>
  );
}
