import { Flex, Heading, TextLockup } from '@godaddy/antares';

/**
 * Fixture for text alignment. The lockup sets its own alignment, so a centered ancestor does not
 * inherit into a default `start` lockup.
 * @ignore
 */
export function CenteredAncestorExample() {
  return (
    <Flex style={{ textAlign: 'center' }}>
      <TextLockup>
        <Heading>Text Lockup</Heading>
      </TextLockup>
    </Flex>
  );
}
