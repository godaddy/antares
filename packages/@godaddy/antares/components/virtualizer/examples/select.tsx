import {
  Button,
  Content,
  Label,
  ListBox,
  ListLayout,
  Popover,
  Select,
  SelectItem,
  Virtualizer
} from '@godaddy/antares';

const items = Array.from({ length: 10000 }, (_, index) => ({
  id: `item-${index + 1}`,
  name: `Item ${index + 1}`
}));

/**
 * Open a Select with an item selected far beyond the initial viewport. Compose its overlay to place Virtualizer around ListBox.
 * @order 4
 */
export function SelectExample() {
  return (
    <Select defaultValue="item-9000">
      <Label>Choose an item</Label>
      <Button slot="trigger" />
      <Popover hideArrow aria-label="Choose an item">
        <Content inlinePadding="0" blockPadding="0" style={{ overflow: 'visible' }}>
          <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: 48 }}>
            <ListBox
              aria-label="Available items"
              items={items}
              gap="0"
              padding="0"
              onFocus={function revealFocusedOption(event) {
                const { currentTarget, target } = event;
                // The selected option can mount after React Aria first tries to scroll to it.
                if (
                  target instanceof HTMLElement &&
                  currentTarget.contains(target) &&
                  target.getAttribute('role') === 'option'
                ) {
                  const options = { block: 'nearest', container: 'nearest' } as const;
                  target.scrollIntoView(options);
                }
              }}
              style={{ display: 'block', blockSize: 288, inlineSize: 280, maxInlineSize: '100%', overflow: 'auto' }}
            >
              {(item) => (
                <SelectItem
                  id={item.id}
                  textValue={item.name}
                  padding="sm"
                  style={{ blockSize: '100%', minBlockSize: 0, boxSizing: 'border-box' }}
                >
                  {item.name}
                </SelectItem>
              )}
            </ListBox>
          </Virtualizer>
        </Content>
      </Popover>
    </Select>
  );
}
