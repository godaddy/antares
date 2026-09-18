import { Button, Heading, SizeProvider, Text, type SizeProviderProps } from '@godaddy/antares';

export function PlaygroundExample(props: SizeProviderProps) {
  return (
    <SizeProvider {...props}>
      <Heading>Account</Heading>
      <Text>Review your account settings.</Text>
      <Button>Save</Button>
    </SizeProvider>
  );
}
