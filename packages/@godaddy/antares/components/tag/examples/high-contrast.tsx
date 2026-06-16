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

export function HighContrastExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      {emphases.map((emphasis) => (
        <Tag key={emphasis} emphasis={emphasis} highContrast>
          {emphasis}
        </Tag>
      ))}
    </Flex>
  );
}
