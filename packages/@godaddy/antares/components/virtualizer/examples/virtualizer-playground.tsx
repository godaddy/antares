import { useMemo } from 'react';
import { ListBox, ListBoxItem, ListLayout, Virtualizer } from '@godaddy/antares';

/** Props for the Virtualizer playground example. */
export interface PlaygroundExampleProps {
  /** Number of items in the collection. */
  itemCount?: number;

  /** Fixed item block size, in CSS pixels. */
  rowSize?: number;

  /** Scrollport block size, in CSS pixels. */
  viewportHeight?: number;
}

export function PlaygroundExample({ itemCount = 10000, rowSize = 48, viewportHeight = 288 }: PlaygroundExampleProps) {
  const items = useMemo(
    () => Array.from({ length: itemCount }, (_, index) => ({ id: index + 1, name: `Item ${index + 1}` })),
    [itemCount]
  );

  return (
    <Virtualizer layout={ListLayout} layoutOptions={{ rowSize }}>
      <ListBox
        aria-label="Virtualizer playground"
        items={items}
        selectionMode="single"
        gap="0"
        padding="0"
        style={{
          display: 'block',
          blockSize: viewportHeight,
          inlineSize: '100%',
          maxInlineSize: 480,
          overflow: 'auto'
        }}
      >
        {(item) => (
          <ListBoxItem
            id={item.id}
            textValue={item.name}
            padding="sm"
            style={{ blockSize: rowSize, minHeight: 0, boxSizing: 'border-box' }}
          >
            {item.name}
          </ListBoxItem>
        )}
      </ListBox>
    </Virtualizer>
  );
}
