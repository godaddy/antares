import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

/**
 * Keep unavailable details disabled, including when their content starts visible.
 * @order 4
 */
export function DisabledExample({ defaultExpanded = false }: { defaultExpanded?: boolean } = {}) {
  return (
    <Collapsible isDisabled defaultExpanded={defaultExpanded}>
      <Heading>
        <Button slot="trigger">
          <Text>Unavailable settings</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>These settings are currently unavailable.</CollapsiblePanel>
    </Collapsible>
  );
}
