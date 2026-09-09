import { Flex, Heading, Text, TextLockup, type TextLockupSize } from '@godaddy/antares';

const SIZES: TextLockupSize[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

/**
 * `size` is the tier: the eyebrow reads it on the `detail` ramp, the title on `heading`,
 * and the body on `body`. Use `2xl` for a page title, `xl` for a hero, `lg` for a section
 * title, and `md` (the default) everywhere else.
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
