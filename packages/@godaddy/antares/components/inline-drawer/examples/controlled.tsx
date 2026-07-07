import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Button, Box, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
      <Text>Expanded: {String(expanded)}</Text>
      <Box style={{ maxInlineSize: 360 }}>
        <InlineDrawer isExpanded={expanded} onExpandedChange={setExpanded}>
          <InlineDrawerTrigger>Details</InlineDrawerTrigger>
          <InlineDrawerPanel>
            <Box padding="md" style={{ background: '#ecfdf5' }}>
              <Text>Controlled panel content.</Text>
            </Box>
          </InlineDrawerPanel>
        </InlineDrawer>
      </Box>
    </>
  );
}
