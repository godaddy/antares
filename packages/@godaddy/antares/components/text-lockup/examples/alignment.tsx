import { Flex, Heading, Text, TextLockup } from '@godaddy/antares';

/**
 * `align` centers the parts as well as the text, so a `Tag` eyebrow stays centered too.
 * @order 4
 */
export function AlignmentExample() {
  return (
    <Flex direction="column" gap="lg">
      <TextLockup align="start">
        <Text slot="eyebrow">Unaffectedly Modest</Text>
        <Heading>Start aligned</Heading>
        <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
      </TextLockup>

      <TextLockup align="center">
        <Text slot="eyebrow">Unaffectedly Modest</Text>
        <Heading>Center aligned</Heading>
        <Text>She expressed her gratitude again, but it was too painful a subject to be dwelt on farther.</Text>
      </TextLockup>
    </Flex>
  );
}
