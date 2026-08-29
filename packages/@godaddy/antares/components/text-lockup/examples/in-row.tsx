import { Flex, Heading, TextLockup } from '@godaddy/antares';

/**
 * Fixture for sizing inside a row. `inline-size` containment drops the children from the
 * lockup's intrinsic size, so it needs a definite inline size to fill a row that does not
 * stretch it.
 * @ignore
 */
export function InRowExample() {
  return (
    <Flex direction="row" style={{ inlineSize: '600px' }}>
      <TextLockup>
        <Heading>Text Lockup</Heading>
      </TextLockup>
    </Flex>
  );
}
