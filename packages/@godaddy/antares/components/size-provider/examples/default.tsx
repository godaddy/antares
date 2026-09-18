import { Button, Detail, Flex, Heading, SizeProvider, Text } from '@godaddy/antares';

/**
 * A wrapperless scope coordinates participating text and controls.
 * @order 1
 */
export function DefaultExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md">
        <Heading level={2}>Account settings</Heading>
        <Text>Manage the details of your account.</Text>
        <Detail>Supporting copy inherits the same color.</Detail>
        <Button>Save changes</Button>
      </Flex>
    </SizeProvider>
  );
}
