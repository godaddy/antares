import { Alert, Icon, Content, Flex, Heading, Text } from '@godaddy/antares';

const emphases = [
  ['critical', 'alert'],
  ['warning', 'alert'],
  ['success', 'checkmark'],
  ['info', 'information'],
  ['highlight', 'star'],
  ['premium', 'diamond'],
  ['internal', 'comment']
] as const;

/**
 * Pair each emphasis accent with an explicit Icon glyph. Include text so color is not the only cue.
 * @title Emphasis Variants
 * @order 2
 */
export function EmphasesExample() {
  return (
    <Flex direction="column" gap="md">
      {emphases.map(([emphasis, icon]) => (
        <Alert key={emphasis} emphasis={emphasis}>
          <Icon slot="indicator" icon={icon} />
          <Content>
            <Heading slot="title">This is a {emphasis} alert</Heading>
            <Text>Description for the {emphasis} emphasis variant.</Text>
          </Content>
        </Alert>
      ))}
    </Flex>
  );
}
