import { Collapsible, CollapsiblePanel, Heading, Icon, Text, Button } from '@godaddy/antares';

/**
 * Pair a status icon with text so completion is understandable without the icon.
 * @order 3
 */
export function WithStatusExample() {
  return (
    <Collapsible defaultExpanded>
      <Heading>
        <Button slot="trigger">
          <Icon icon="checkmark" aria-hidden="true" />
          <Text>Contact details (Completed)</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>Your contact details have been saved.</CollapsiblePanel>
    </Collapsible>
  );
}
