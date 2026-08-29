import { Heading, TextLockup } from '@godaddy/antares';

/**
 * Fixture for narrow title sizes across nesting. Every lockup declares its own narrow tier, so
 * the inner `md` lockup keeps its size instead of inheriting the outer `2xl` step down.
 * @ignore
 */
export function NestedNarrowContainerExample() {
  return (
    <TextLockup size="2xl">
      <Heading>Outer</Heading>
      <TextLockup size="md" style={{ inlineSize: '400px' }}>
        <Heading>Inner</Heading>
      </TextLockup>
    </TextLockup>
  );
}
