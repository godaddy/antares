import { Button, Flex, type FlexProps, Icon, LinkButton, Text } from '@godaddy/antares';

/**
 * Control navigation with `target` and `rel`, and compose icons independently. Stretched inline content follows the browser's default alignment; other variants stay centered.
 */
export function IconsAndAlignmentExample({ dir }: Pick<FlexProps, 'dir'> = {}) {
  return (
    <Flex direction="column" gap="md" dir={dir} style={{ width: '20rem' }}>
      <Button variant="inline">
        <Text>Inline action</Text>
      </Button>
      <LinkButton href="#report" variant="inline" target="_blank" rel="noopener noreferrer">
        <Text>View report</Text>
      </LinkButton>
      <LinkButton href="#help" variant="inline" isExternal target="_self" rel="external">
        Read help
      </LinkButton>
      <LinkButton href="#documentation" variant="inline">
        <Text>Read documentation</Text>
        <Icon icon="window-new" />
      </LinkButton>
      <Button variant="primary">
        <Text>Centered action</Text>
      </Button>
      <LinkButton href="#" variant="primary">
        <Text>Centered link</Text>
      </LinkButton>
    </Flex>
  );
}
