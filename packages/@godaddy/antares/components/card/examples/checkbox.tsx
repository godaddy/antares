import {
  Card,
  CardSelectionIndicator,
  CheckboxGroup,
  CornerActions,
  Flex,
  Heading,
  Icon,
  Button,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Standalone checkbox Cards own their state. Grouped cards belong in CheckboxGroup.
 * @title Checkbox
 * @order 7
 */
export function CheckboxExample() {
  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" gap="sm">
        <Heading>Single</Heading>

        <Card selection="checkbox" aria-label="Automatic renewal">
          <TextLockup>
            <Heading slot="title">Automatic renewal</Heading>
            <Text slot="body">Keep this plan active when it expires.</Text>
          </TextLockup>
          <CornerActions>
            <CardSelectionIndicator data-testid="card-selection-indicator" />
          </CornerActions>
        </Card>
      </Flex>

      <Flex direction="column" gap="sm">
        <Heading>Group</Heading>

        <CheckboxGroup aria-label="Select add-ons" defaultValue={['privacy']}>
          <Card selection="checkbox" value="privacy" aria-label="Domain privacy">
            <TextLockup>
              <Heading slot="title">Domain privacy</Heading>
              <Text slot="body">Hide your contact details from the public directory.</Text>
            </TextLockup>
            <CornerActions>
              <Button aria-label="More options">
                <Icon icon="ellipsis" />
              </Button>
              <CardSelectionIndicator />
            </CornerActions>
          </Card>

          <Card selection="checkbox" value="email" aria-label="Professional email">
            <TextLockup>
              <Heading slot="title">Professional email</Heading>
              <Text slot="body">Send from a mailbox at your domain.</Text>
            </TextLockup>
            <CornerActions>
              <CardSelectionIndicator />
            </CornerActions>
          </Card>
        </CheckboxGroup>
      </Flex>
    </Flex>
  );
}
