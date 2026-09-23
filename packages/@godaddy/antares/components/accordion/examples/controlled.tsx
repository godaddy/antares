import { useState } from 'react';
import {
  Accordion,
  Button,
  Collapsible,
  CollapsiblePanel,
  Flex,
  Heading,
  Text,
  Icon,
  type AccordionProps
} from '@godaddy/antares';

/**
 * Coordinate expanded sections with application state in either expansion mode.
 * @order 3
 */
export function ControlledExample({
  onChange,
  allowsMultipleExpanded = false
}: {
  onChange?: AccordionProps['onExpandedChange'];
  allowsMultipleExpanded?: boolean;
} = {}) {
  const [keys, setKeys] = useState<Set<string | number>>(new Set(['account']));
  return (
    <Flex direction="column" gap="md">
      <Button onPress={() => setKeys(new Set())}>Close all sections</Button>
      <Text>Open panels: {[...keys].join(', ') || 'none'}</Text>
      <Accordion
        allowsMultipleExpanded={allowsMultipleExpanded}
        expandedKeys={keys}
        onExpandedChange={function handleExpandedChange(next) {
          setKeys(next);
          onChange?.(next);
        }}
      >
        <Collapsible id="account">
          <Heading>
            <Button slot="trigger">
              <Text>Account</Text>
              <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
            </Button>
          </Heading>
          <CollapsiblePanel>Manage your account information.</CollapsiblePanel>
        </Collapsible>
        <Collapsible id="billing">
          <Heading>
            <Button slot="trigger">
              <Text>Billing</Text>
              <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
            </Button>
          </Heading>
          <CollapsiblePanel>Manage payment methods.</CollapsiblePanel>
        </Collapsible>
        <Collapsible id="notifications">
          <Heading>
            <Button slot="trigger">
              <Text>Notifications</Text>
              <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
            </Button>
          </Heading>
          <CollapsiblePanel>Choose how you receive account updates.</CollapsiblePanel>
        </Collapsible>
      </Accordion>
    </Flex>
  );
}
