import { ListBox, ListBoxItem, ListLayout, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 10000 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Item ${index + 1}`
}));

/**
 * Browse 10,000 fixed-size items. The layout positions rows; the ListBox owns scrolling and selection.
 * @order 1
 */
export function DefaultExample() {
  return (
    <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: 48 }}>
      <ListBox
        aria-label="Large collection"
        items={items}
        selectionMode="single"
        gap="0"
        padding="0"
        style={{ display: 'block', blockSize: 288, inlineSize: '100%', maxInlineSize: 480, overflow: 'auto' }}
      >
        {(item) => (
          <ListBoxItem
            id={item.id}
            textValue={item.name}
            padding="sm"
            style={{ blockSize: '100%', minHeight: 0, boxSizing: 'border-box' }}
          >
            {item.name}
          </ListBoxItem>
        )}
      </ListBox>
    </Virtualizer>
  );
}
