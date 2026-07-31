import { ProgressBar, Flex } from '@godaddy/antares';

/**
 * Three track heights are available: `xs` (6px), `sm` (12px), and `md` (24px).
 * @order 2
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Extra Small" size="xs" value={40} />
      <ProgressBar label="Small" size="sm" value={60} />
      <ProgressBar label="Medium" size="md" value={80} />
    </Flex>
  );
}
