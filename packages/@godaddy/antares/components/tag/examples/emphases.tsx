import { Flex, Tag } from '@godaddy/antares';

const emphases = [
  'passive',
  'critical',
  'warning',
  'success',
  'info',
  'highlight',
  'premium',
  'internal',
  'neutral'
] as const;

/**
 * Nine emphasis options are available. Choose the one that fits the visual tone of your context.
 * @title Emphasis
 * @order 2
 */
export function EmphasesExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      {emphases.map((emphasis) => (
        <Tag key={emphasis} emphasis={emphasis}>
          {emphasis}
        </Tag>
      ))}
    </Flex>
  );
}
