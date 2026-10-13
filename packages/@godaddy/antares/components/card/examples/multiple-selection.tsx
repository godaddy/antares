import { useState } from 'react';
import {
  Card,
  CardGroup,
  CardSelectionIndicator,
  CornerActions,
  Flex,
  Header,
  Heading,
  type Selection,
  Text,
  TextLockup
} from '@godaddy/antares';

/**
 * Choose optional add-ons and see the monthly total update. The indicators show selection,
 * including a custom text indicator for email.
 * @title Multiple selection
 * @order 7
 */
export function MultipleSelectionExample() {
  const [selected, setSelected] = useState<Selection>(new Set(['privacy']));
  const privacyPrice = 5;
  const emailPrice = 8;
  const total =
    (selected === 'all' || selected.has('privacy') ? privacyPrice : 0) +
    (selected === 'all' || selected.has('email') ? emailPrice : 0);

  return (
    <Flex direction="column" gap="md">
      <CardGroup
        aria-label="Select add-ons"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Card id="privacy" textValue="Domain privacy">
          <TextLockup>
            <Header>
              <CornerActions>
                <CardSelectionIndicator data-testid="privacy-indicator" />
              </CornerActions>
              <Heading slot="title">Domain privacy</Heading>
            </Header>
            <Text slot="body">Hide your contact details from the public directory.</Text>
            <Text>${privacyPrice}/month</Text>
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
            <Text>${emailPrice}/month</Text>
          </TextLockup>
        </Card>
      </CardGroup>
      <Text role="status">Add-ons total: ${total}/month</Text>
    </Flex>
  );
}
