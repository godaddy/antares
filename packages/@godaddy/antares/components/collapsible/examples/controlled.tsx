import { useState } from 'react';
import { Button, Collapsible, CollapsiblePanel, Heading, Icon, Text, Flex } from '@godaddy/antares';

/**
 * Control a section from application state or an external action.
 * @order 2
 */
export function ControlledExample({ onChange }: { onChange?: (isExpanded: boolean) => void } = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Flex direction="column" gap="md">
      <Button onPress={() => setIsExpanded((value) => !value)}>Toggle details externally</Button>
      <Collapsible
        isExpanded={isExpanded}
        onExpandedChange={function handleExpandedChange(value) {
          setIsExpanded(value);
          onChange?.(value);
        }}
      >
        <Heading>
          <Button slot="trigger">
            <Text>Account details</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Your account details.</CollapsiblePanel>
      </Collapsible>
    </Flex>
  );
}
