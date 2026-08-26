import { Flex, Heading, Text, TextLockup } from '@godaddy/antares';

const COPY =
  'She expressed her gratitude again, but it was too painful a subject to be dwelt on farther. ' +
  'Elizabeth was pleased to find that he had not betrayed the interference of his friend, and she ' +
  'was glad of it, for she could not have borne the reflection.';

/**
 * The text parts are constrained to a comfortable line length by default. Set
 * `legibleLines={false}` to let them run the full width of their container, which suits a
 * lockup already inside a narrow column.
 * @order 5
 */
export function LegibleLinesExample() {
  return (
    <Flex direction="column" gap="lg">
      <TextLockup>
        <Heading>Constrained by default</Heading>
        <Text>{COPY}</Text>
      </TextLockup>

      <TextLockup legibleLines={false}>
        <Heading>Full width</Heading>
        <Text>{COPY}</Text>
      </TextLockup>
    </Flex>
  );
}
