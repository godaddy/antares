import { Card, CardGroup, GridLayout, Heading, Size, Text, TextLockup, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 500 }, (_, index) => ({
  id: `card-${index + 1}`,
  name: `Card ${index + 1}`,
  description: `Selectable surface ${index + 1} in a virtualized CardGroup.`
}));

/**
 * Virtualize a CardGroup with GridLayout. The group owns selection and focus; the layout owns cell geometry.
 * @order 6
 */
export function CardGroupExample() {
  return (
    <Virtualizer
      layout={GridLayout}
      layoutOptions={{
        minItemSize: new Size(200, 128),
        maxItemSize: new Size(240, 128),
        minSpace: new Size(8, 8),
        preserveAspectRatio: true
      }}
    >
      <CardGroup
        aria-label="Virtualized cards"
        items={items}
        selectionMode="single"
        gap="0"
        style={{ display: 'block', blockSize: 320, inlineSize: '100%', maxInlineSize: 640, overflow: 'auto' }}
      >
        {(item) => (
          <Card
            id={item.id}
            textValue={item.name}
            padding="sm"
            style={{ blockSize: '100%', minBlockSize: 0, boxSizing: 'border-box' }}
          >
            <TextLockup>
              <Heading slot="title">{item.name}</Heading>
              <Text slot="body">{item.description}</Text>
            </TextLockup>
          </Card>
        )}
      </CardGroup>
    </Virtualizer>
  );
}
