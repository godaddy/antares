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
 * A minimal style that pairs a small colored dot with a neutral background. Well suited for dense layouts like tables or dashboards where multiple tags in close proximity would otherwise compete for attention.
 * @order 7
 */
export function IndicatorExample() {
  return (
    <Flex gap="xs" wrap="wrap" alignItems="center">
      {emphases.map((emphasis) => (
        <Tag key={emphasis} emphasis={emphasis} indicator>
          {emphasis}
        </Tag>
      ))}
    </Flex>
  );
}
