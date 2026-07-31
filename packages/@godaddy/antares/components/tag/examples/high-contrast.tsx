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
 * A bolder color treatment for when tags need to stand out more - for example, on colored backgrounds.
 * @title High Contrast
 * @order 5
 */
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
