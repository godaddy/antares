import { Chip, ChipGroup, ChipList, Flex, Label } from '@godaddy/antares';

const sizes = ['sm', 'md', 'lg'] as const;

/**
 * Compare the supported `sm`, `md`, and `lg` sizes. Keep one size per group.
 * @order 5
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      {sizes.map((size) => (
        <ChipGroup key={size} size={size}>
          <Label>Topics ({size})</Label>
          <ChipList>
            <Chip id="design">Design</Chip>
            <Chip id="development">Development</Chip>
            <Chip id="research">Research</Chip>
          </ChipList>
        </ChipGroup>
      ))}
    </Flex>
  );
}
