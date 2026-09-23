import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

/**
 * Reveal optional details without an Accordion group.
 * @order 1
 */
export function DefaultExample({ defaultExpanded = false }: { defaultExpanded?: boolean } = {}) {
  return (
    <Collapsible defaultExpanded={defaultExpanded}>
      <Heading level={2}>
        <Button slot="trigger">
          <Text>Advanced settings</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel role="region">Configure additional options here.</CollapsiblePanel>
    </Collapsible>
  );
}
