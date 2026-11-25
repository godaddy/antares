import { useMemo, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListLayout,
  type ListBoxKey,
  Text,
  TextField,
  Virtualizer
} from '@godaddy/antares';

const initialItems = Array.from({ length: 1000 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Item ${index + 1}`
}));

/**
 * Filter, append, clear, and reset a collection while keeping stable item IDs. Loading data remains application-owned.
 * @order 5
 */
export function DynamicCollectionExample() {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<ListBoxKey>>(new Set());
  const filteredItems = useMemo(
    function filterItems() {
      const normalizedQuery = query.toLocaleLowerCase();
      return items.filter((item) => item.name.toLocaleLowerCase().includes(normalizedQuery));
    },
    [items, query]
  );

  function appendItems() {
    setItems(function nextItems(current) {
      const nextIndex = current.length;
      return [
        ...current,
        ...Array.from({ length: 100 }, (_, index) => ({
          id: `item-${nextIndex + index + 1}`,
          name: `Item ${nextIndex + index + 1}`
        }))
      ];
    });
  }

  function clearCollection() {
    setItems([]);
    setSelectedKeys(new Set());
  }

  function resetCollection() {
    setItems(initialItems);
    setQuery('');
    setSelectedKeys(new Set());
  }

  return (
    <Flex direction="column" gap="md" style={{ inlineSize: '100%', maxInlineSize: 480 }}>
      <TextField value={query} onChange={setQuery}>
        <Label>Filter items</Label>
        <Input />
      </TextField>
      <Flex gap="sm" wrap="wrap">
        <Button onPress={appendItems}>Append 100 items</Button>
        <Button onPress={clearCollection}>Clear collection</Button>
        <Button onPress={resetCollection}>Reset collection</Button>
      </Flex>
      <Text role="status">
        {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
      </Text>
      <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: 48 }}>
        <ListBox
          aria-label="Dynamic collection"
          items={filteredItems}
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={function handleSelectionChange(keys) {
            setSelectedKeys(keys === 'all' ? new Set() : new Set(keys));
          }}
          gap="0"
          padding="0"
          renderEmptyState={function renderEmptyState() {
            return <Text>No items</Text>;
          }}
          style={{ display: 'block', blockSize: 288, overflow: 'auto' }}
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
    </Flex>
  );
}
