import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Button, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
      <Text>Expanded: {String(expanded)}</Text>
      <InlineDrawer isExpanded={expanded} onExpandedChange={setExpanded}>
        <InlineDrawerTrigger>Details</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Text>Controlled panel content.</Text>
        </InlineDrawerPanel>
      </InlineDrawer>
    </>
  );
}
