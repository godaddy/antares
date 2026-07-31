import { CircularProgress, Flex } from '@godaddy/antares';

/**
 * Four circle diameters are available: `sm` (64px), `md` (96px), `lg` (128px), and `xl` (160px).
 * @order 2
 */
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
