import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text, Button } from '@godaddy/antares';

export function DismissOnBlurExample() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Flex direction="row" gap="md" style={{ height: 200 }}>
      <InlineDrawer
        placement="left"
        isExpanded={expanded}
        onExpandedChange={setExpanded}
        shouldDismissOnBlur
        maxSize={220}
      >
        <InlineDrawerTrigger>Panel</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex direction="column" gap="sm" padding="sm">
            <Text>Focus here, then Tab out.</Text>
            <Button variant="secondary" onPress={() => undefined}>
              Inside button
            </Button>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" direction="column" gap="sm" style={{ flex: 1 }}>
        <Text>Outside content</Text>
        <Button variant="secondary" onPress={() => undefined}>
          Outside button
        </Button>
        <Button variant="primary" onPress={() => setExpanded(true)}>
          Re-expand
        </Button>
      </Flex>
    </Flex>
  );
}
