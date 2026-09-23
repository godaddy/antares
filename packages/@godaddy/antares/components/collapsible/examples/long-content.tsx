import { Collapsible, CollapsiblePanel, Heading, Text, Button, Icon } from '@godaddy/antares';

/**
 * Long labels wrap and content grows naturally at narrow widths and larger text sizes.
 * @order 5
 */
export function LongContentExample() {
  return (
    <Collapsible defaultExpanded>
      <Heading>
        <Button slot="trigger">
          <Text>How do I transfer a domain when my account name and the domain name are both very long?</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>
        <Text>
          Check your contact information, unlock the domain, and request an authorization code from your current
          provider.
        </Text>
        <Text>
          Keep a copy of your confirmation email. You can return to these instructions while the transfer is processing.
        </Text>
        <Text>Reference: exceptionally-long-domain-name-without-spaces-for-testing.example</Text>
      </CollapsiblePanel>
    </Collapsible>
  );
}
