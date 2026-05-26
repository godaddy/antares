import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, FocusScope, Flex, Text, Button } from '@godaddy/antares';

export function FocusScopeExample() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Flex direction="row" style={{ height: 200, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="left" isExpanded={expanded} onExpandedChange={setExpanded} maxSize={220}>
        <InlineDrawerTrigger>Sidebar</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <FocusScope contain={expanded} restoreFocus>
            <Flex direction="column" gap="sm" padding="sm">
              <Text>Focus is trapped when expanded.</Text>
              <Button variant="secondary" onPress={() => undefined}>
                Action A
              </Button>
              <Button variant="secondary" onPress={() => undefined}>
                Action B
              </Button>
            </Flex>
          </FocusScope>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1 }}>
        <Text>Main content. Tab cannot reach here while sidebar is expanded.</Text>
        <Button variant="primary" onPress={() => setExpanded(true)}>
          Open sidebar
        </Button>
      </Flex>
    </Flex>
  );
}
