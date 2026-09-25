import { Accordion, Button, Collapsible, CollapsiblePanel, Heading, Icon, Text } from '@godaddy/antares';

/**
 * Keep related answers visible together when people need to compare information.
 * @title Multiple sections open
 * @order 2
 */
export function MultipleExample() {
  return (
    <Accordion allowsMultipleExpanded defaultExpandedKeys={['shipping', 'returns']}>
      <Collapsible id="shipping">
        <Heading>
          <Button slot="trigger">
            <Text>Shipping</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Most orders arrive within two business days.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="returns">
        <Heading>
          <Button slot="trigger">
            <Text>Returns</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Return eligible items within thirty days.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="tracking">
        <Heading>
          <Button slot="trigger">
            <Text>Tracking</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Track your order from the confirmation email.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}
