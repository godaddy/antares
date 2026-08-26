import { Heading, Tag, Text, TextLockup } from '@godaddy/antares';

/**
 * Fixture for context precedence. The lockup injects its defaults, so an explicit prop on a
 * child has to win: the tag keeps `sm` where the lockup would pair `2xl` with `lg`, and the
 * heading keeps `level={4}` where nothing else supplies one.
 * @ignore
 */
export function OverridesExample() {
  return (
    <TextLockup size="2xl">
      <Tag slot="eyebrow" size="sm">
        Explicit tag size
      </Tag>
      <Heading level={4}>Explicit heading level</Heading>
      <Text>Body text.</Text>
    </TextLockup>
  );
}
