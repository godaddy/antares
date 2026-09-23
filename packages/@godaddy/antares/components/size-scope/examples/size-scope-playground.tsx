import { Button, Detail, Flex, Heading, SizeScope, Text, type SizeScopeProps } from '@godaddy/antares';

export function PlaygroundExample(props: SizeScopeProps) {
  return (
    <SizeScope {...props}>
      <Flex direction="column" gap="sm" alignItems="start">
        <Heading>Account</Heading>
        <Text>Review your account settings.</Text>
        <Detail>Last updated 2 hours ago.</Detail>
        <Button variant="primary">Save</Button>
      </Flex>
    </SizeScope>
  );
}
