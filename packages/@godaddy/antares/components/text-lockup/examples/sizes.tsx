import { Flex, Heading, Text, TextLockup, type TextLockupSize } from '@godaddy/antares';

const SIZES: TextLockupSize[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

/**
 * `size` sets every part, each on its own role ramp. Without it, the lockup follows the size
 * scope.
 * @order 2
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="lg">
      {SIZES.map(function renderSize(size) {
        return (
          <TextLockup key={size} size={size}>
            <Text slot="eyebrow">Unaffectedly Modest</Text>
            <Heading slot="title">Text Lockup</Heading>
            <Text slot="body">
              She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.
            </Text>
          </TextLockup>
        );
      })}
    </Flex>
  );
}
