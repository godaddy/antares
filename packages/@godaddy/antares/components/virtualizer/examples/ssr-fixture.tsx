import { Button, Flex, ListBox, ListBoxItem, ListLayout, Virtualizer } from '@godaddy/antares';

const items = [
  { id: 'item-1', name: 'Item 1' },
  { id: 'item-2', name: 'Item 2' },
  { id: 'item-3', name: 'Item 3' }
];

/**
 * Small deterministic collection for SSR, hydration, and keyboard coverage.
 * @ignore
 */
export function SSRFixtureExample() {
  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: 48 }}>
        <ListBox
          aria-label="Small collection"
          items={items}
          disabledKeys={['item-2']}
          selectionMode="single"
          gap="0"
          padding="0"
          style={{ display: 'block', overflow: 'auto', blockSize: 144, inlineSize: 320 }}
        >
          {(item) => (
            <ListBoxItem
              id={item.id}
              textValue={item.name}
              padding="sm"
              style={{ blockSize: '100%', minBlockSize: 0, boxSizing: 'border-box' }}
            >
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
      </Virtualizer>
      <Button type="button">After collection</Button>
    </Flex>
  );
}
