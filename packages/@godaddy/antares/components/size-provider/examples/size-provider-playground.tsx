import { Button, Detail, Flex, Heading, SizeProvider, Text, type SizeProviderProps } from '@godaddy/antares';

export function PlaygroundExample(props: SizeProviderProps) {
  return (
    <SizeProvider {...props}>
      <Flex direction="column" gap="sm" alignItems="start">
        <Heading>Account</Heading>
        <Text>Review your account settings.</Text>
        <Detail>Last updated 2 hours ago.</Detail>
        <Button variant="primary">Save</Button>
      </Flex>
    </SizeProvider>
  );
}
