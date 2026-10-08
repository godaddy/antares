import {
  Button,
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Header,
  Heading,
  Icon,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * `selectionMode="multiple"` lets each Card toggle on its own. CardSelectionIndicator shows the
 * state, and its children can render custom content from it. Nested buttons keep their own presses.
 * @title Multiple selection
 * @order 7
 */
export function MultipleSelectionExample() {
  return (
    <CardGroup aria-label="Select add-ons" selectionMode="multiple" defaultSelectedKeys={['privacy']}>
      <Card id="privacy" textValue="Domain privacy">
        <TextLockup>
          <Header>
            <CornerActions>
              <Button aria-label="More options">
                <Icon icon="ellipsis" />
              </Button>
              <CardSelectionIndicator data-testid="privacy-indicator" />
            </CornerActions>
            <Heading slot="title">Domain privacy</Heading>
          </Header>
          <Text slot="body">Hide your contact details from the public directory.</Text>
        </TextLockup>
      </Card>

      <Card id="email" textValue="Professional email">
        <TextLockup>
          <Header>
            <CornerActions>
              <CardSelectionIndicator data-testid="email-indicator">
                {({ isSelected }) => <Text>{isSelected ? 'Added' : 'Add'}</Text>}
              </CardSelectionIndicator>
            </CornerActions>
            <Heading slot="title">Professional email</Heading>
          </Header>
          <Text slot="body">Send from a mailbox at your domain.</Text>
        </TextLockup>
      </Card>
    </CardGroup>
  );
}
