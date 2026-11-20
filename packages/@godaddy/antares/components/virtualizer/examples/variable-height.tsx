import { ListBox, ListBoxItem, ListLayout, Text, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Item ${index + 1}`,
  description: 'Collection content can wrap as the available width changes. '.repeat((index % 4) + 1)
}));

/**
 * Estimate row size and observe each item's intrinsic size when content wraps or text is enlarged.
 * @order 2
 */
export function VariableHeightExample() {
  return (
    <Virtualizer layout={ListLayout} layoutOptions={{ estimatedRowSize: 72 }} shouldObserveItemSize>
      <ListBox
        aria-label="Variable height collection"
        items={items}
        selectionMode="single"
        gap="0"
        padding="0"
        style={{ display: 'block', blockSize: 288, inlineSize: '100%', maxInlineSize: 480, overflow: 'auto' }}
      >
        {(item) => (
          <ListBoxItem id={item.id} textValue={item.name} direction="column" gap="xs" padding="sm">
            <Text slot="label">{item.name}</Text>
            <Text slot="description">{item.description}</Text>
          </ListBoxItem>
        )}
      </ListBox>
    </Virtualizer>
  );
}
