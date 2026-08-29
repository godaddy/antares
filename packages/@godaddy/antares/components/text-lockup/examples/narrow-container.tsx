import { Heading, TextLockup } from '@godaddy/antares';

/**
 * Fixture for the narrow-container title step. The lockup queries its own inline size, so a
 * `2xl` lockup 400px wide drops its title to the `xl` tier.
 * @ignore
 */
export function NarrowContainerExample() {
  return (
    <TextLockup size="2xl" style={{ inlineSize: '400px' }}>
      <Heading>Text Lockup</Heading>
    </TextLockup>
  );
}
