import { useState } from 'react';
import { Card, CardGroup, Text } from '@godaddy/antares';

/**
 * Numeric collection keys, numeric text, and standalone DOM ids.
 * @ignore
 */
export function NumericExample() {
  const [selected, setSelected] = useState<'all' | Set<string | number>>(new Set([2]));

  return (
    <>
      <CardGroup
        aria-label="Numeric cards"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={[
          { id: 1, label: 0 },
          { id: 2, label: 42 },
          { id: 3, label: 100 }
        ]}
      >
        {(item) => <Card id={item.id}>{item.label}</Card>}
      </CardGroup>
      <Text>
        Selected: {selected === 'all' ? 'all' : [...selected].map((key) => `${typeof key}:${key}`).join(',') || 'none'}
      </Text>
      <Card id={0} role="region" aria-label="Numeric static card">
        Static card
      </Card>
      <Card id={42} href="#numeric-link">
        Numeric link card
      </Card>
    </>
  );
}
