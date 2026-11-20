import { GridLayout, ListBox, ListBoxItem, Size, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Item ${index + 1}`
}));

/**
 * Resize the collection to change its column count. GridLayout owns cell geometry and keyboard positions.
 * @order 3
 */
export function GridExample() {
  return (
    <Virtualizer
      layout={GridLayout}
      layoutOptions={{
        minItemSize: new Size(160, 96),
        maxItemSize: new Size(200, 96),
        minSpace: new Size(8, 8),
        preserveAspectRatio: true
      }}
    >
      <ListBox
        aria-label="Grid collection"
        layout="grid"
        items={items}
        selectionMode="single"
        gap="0"
        padding="0"
        style={{ display: 'block', blockSize: 320, inlineSize: '100%', maxInlineSize: 640, overflow: 'auto' }}
      >
        {(item) => (
          <ListBoxItem
            id={item.id}
            textValue={item.name}
            padding="sm"
            alignItems="center"
            justifyContent="center"
            style={{ blockSize: '100%', minHeight: 0, boxSizing: 'border-box' }}
          >
            {item.name}
          </ListBoxItem>
        )}
      </ListBox>
    </Virtualizer>
  );
}
