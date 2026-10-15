import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Header,
  Heading,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Explain why billing or add-ons are unavailable. Disable an individual Card with `isDisabled`,
 * or disable Cards by key with `disabledKeys` on the group.
 * @title Disabled
 * @order 9
 */
export function DisabledExample() {
  return (
    <Flex direction="column" gap="lg">
      <Card href="#billing" isDisabled>
        <TextLockup>
          <Heading slot="title">Billing temporarily unavailable</Heading>
          <Text slot="body">Finish transferring your account to manage billing.</Text>
        </TextLockup>
      </Card>

      <CardGroup aria-label="Available add-ons" selectionMode="multiple" disabledKeys={['ssl']}>
        <Card id="backup" textValue="Automatic backups" isDisabled>
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator />
              </CornerActions>
              <Heading slot="title">Automatic backups</Heading>
            </Header>
            <Text slot="body">Add a hosting plan to enable daily backups.</Text>
          </TextLockup>
        </Card>

        <Card id="ssl" textValue="SSL certificate">
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator />
              </CornerActions>
              <Heading slot="title">SSL certificate</Heading>
            </Header>
            <Text slot="body">Connect a domain to activate your SSL certificate.</Text>
          </TextLockup>
        </Card>
      </CardGroup>
    </Flex>
  );
}
