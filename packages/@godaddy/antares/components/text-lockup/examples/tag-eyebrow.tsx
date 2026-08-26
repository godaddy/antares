import { Flex, Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * The eyebrow takes either plain text or a `Tag`. Both use `slot="eyebrow"`, so the two
 * forms swap freely, and the lockup pairs the tag's `size` with its own.
 * @order 3
 */
export function TagEyebrowExample() {
  return (
    <Flex direction="column" gap="lg">
      <TextLockup size="xl">
        <Tag slot="eyebrow" emphasis="success">
          New
        </Tag>
        <Heading>Tag eyebrow</Heading>
        <Text>The tag is sized to match the lockup, so changing `size` keeps them in step.</Text>
      </TextLockup>

      <TextLockup size="sm">
        <Tag slot="eyebrow" emphasis="success">
          New
        </Tag>
        <Heading>The same lockup, smaller</Heading>
        <Text>The tag steps down with it.</Text>
      </TextLockup>
    </Flex>
  );
}
