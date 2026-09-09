import { HeadingContext } from 'react-aria-components';
import { Flex, Heading, Text, TextLockup } from '@godaddy/antares';

/**
 * Fixture for the lockup governing its own box and type whatever surrounds it. One region per
 * behavior, each titled so a test can target it.
 * @ignore
 */
export function SelfContainedExample() {
  return (
    <Flex direction="column" gap="lg">
      <TextLockup size="2xl" style={{ inlineSize: '400px' }}>
        <Heading slot="title">Narrow</Heading>
      </TextLockup>

      <TextLockup size="2xl">
        <Heading slot="title">Outer</Heading>
        <TextLockup size="md" style={{ inlineSize: '400px' }}>
          <Heading slot="title">Inner</Heading>
        </TextLockup>
      </TextLockup>

      <Flex style={{ textAlign: 'center' }}>
        <TextLockup>
          <Heading slot="title">Centered ancestor</Heading>
        </TextLockup>
      </Flex>

      <Flex direction="row" style={{ inlineSize: '600px' }}>
        <TextLockup>
          <Heading slot="title">In a row</Heading>
        </TextLockup>
      </Flex>

      <TextLockup size="2xl">
        <Heading slot="title">Mixed slotting</Heading>
        <Text>Bare paragraph</Text>
        <Text slot="body">Body paragraph</Text>
      </TextLockup>
      <Text>Outside every lockup</Text>

      <HeadingContext.Provider value={{ slots: { title: { level: 5 } } }}>
        <TextLockup>
          <Heading slot="title">Owns its slots</Heading>
        </TextLockup>
      </HeadingContext.Provider>
    </Flex>
  );
}
