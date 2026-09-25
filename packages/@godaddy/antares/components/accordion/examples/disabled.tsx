import { Accordion, Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

/**
 * Keep unavailable options visible and explain the reason in their label.
 * @order 5
 */
export function DisabledExample({ isGroupDisabled = false }: { isGroupDisabled?: boolean } = {}) {
  return (
    <Accordion isDisabled={isGroupDisabled}>
      <Collapsible id="basic">
        <Heading>
          <Button slot="trigger">
            <Text>Basic plan</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Features included with your plan.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="premium" isDisabled>
        <Heading>
          <Button slot="trigger">
            <Text>Premium plan (Upgrade required)</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Additional premium features.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="enterprise" isDisabled>
        <Heading>
          <Button slot="trigger">
            <Text>Enterprise plan (Contact sales)</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Contact our sales team for a plan tailored to your business.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}
