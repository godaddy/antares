import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-bIcFQueH.js";import{a as l,c as u,d,i as f,l as p,n as m,o as h,r as g,s as _,t as v,u as y}from"./virtualizer.stories-CirHfW7f.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(s,{of:d,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`virtualizer`,children:`Virtualizer`}),`
`,(0,S.jsx)(t.p,{children:`Renders only the visible portion of a large collection while preserving selection, keyboard navigation, and focus.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Windowed rendering`}),`: Mounts the visible items and a few neighbors instead of the whole collection.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Wraps a collection`}),`: Works with `,(0,S.jsx)(t.code,{children:`ListBox`}),`, `,(0,S.jsx)(t.code,{children:`CardGroup`}),`, and a composed `,(0,S.jsx)(t.code,{children:`Select`}),` popover. The collection stays the scrolling surface, so the `,(0,S.jsx)(t.code,{children:`Virtualizer`}),` adds no DOM or styling of its own.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Layouts`}),`: `,(0,S.jsx)(t.code,{children:`ListLayout`}),` for rows and `,(0,S.jsx)(t.code,{children:`GridLayout`}),` for uniform grids, with fixed or measured item sizes. `,(0,S.jsx)(t.code,{children:`WaterfallLayout`}),` and `,(0,S.jsx)(t.code,{children:`TableLayout`}),` are also exported for matching collection shapes.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`React Aria integration`}),`: Selection, keyboard navigation, typeahead, and focus keep working for items outside the viewport.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsxs)(t.p,{children:[`Give the collection a definite block size and `,(0,S.jsx)(t.code,{children:`overflow: auto`}),`, and put the `,(0,S.jsx)(t.code,{children:`Virtualizer`}),` around the collection itself. Each item needs a stable `,(0,S.jsx)(t.code,{children:`id`}),` and a readable `,(0,S.jsx)(t.code,{children:`textValue`}),`.`]}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`Browse 10,000 fixed-size items. The layout positions rows; the ListBox owns scrolling and selection.`}),`
`,(0,S.jsx)(a,{of:m,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { ListBox, ListBoxItem, ListLayout, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 10000 }, (_, index) => ({
  id: \`item-\${index + 1}\`,
  name: \`Item \${index + 1}\`
}));

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`variable-height`,children:`Variable Height`}),`
`,(0,S.jsx)(t.p,{children:`Estimate row size and observe each item's intrinsic size when content wraps or text is enlarged.`}),`
`,(0,S.jsx)(a,{of:p,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { ListBox, ListBoxItem, ListLayout, Text, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: \`item-\${index + 1}\`,
  name: \`Item \${index + 1}\`,
  description: 'Collection content can wrap as the available width changes. '.repeat((index % 4) + 1)
}));

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`grid`,children:`Grid`}),`
`,(0,S.jsx)(t.p,{children:`Resize the collection to change its column count. GridLayout owns cell geometry and keyboard positions.`}),`
`,(0,S.jsx)(a,{of:f,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { GridLayout, ListBox, ListBoxItem, Size, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 1000 }, (_, index) => ({
  id: \`item-\${index + 1}\`,
  name: \`Item \${index + 1}\`
}));

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`select`,children:`Select`}),`
`,(0,S.jsx)(t.p,{children:`Open a Select with an item selected far beyond the initial viewport. Compose its overlay to place Virtualizer around ListBox.`}),`
`,(0,S.jsx)(a,{of:u,inline:!0}),`
`,(0,S.jsx)(i,{code:`import {
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
  id: \`item-\${index + 1}\`,
  name: \`Item \${index + 1}\`
}));

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
              onFocus={function scrollFocusedOption(event) {
                // A selected option can mount after the collection's initial autofocus effect.
                if (event.target.getAttribute('role') === 'option') {
                  event.target.scrollIntoView({ block: 'nearest' });
                }
              }}
              style={{ display: 'block', blockSize: 288, inlineSize: 280, maxInlineSize: '100%', overflow: 'auto' }}
            >
              {(item) => (
                <SelectItem
                  id={item.id}
                  textValue={item.name}
                  padding="sm"
                  style={{ blockSize: '100%', minHeight: 0, boxSizing: 'border-box' }}
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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`dynamic-collection`,children:`Dynamic Collection`}),`
`,(0,S.jsx)(t.p,{children:`Filter, append, clear, and reset a collection while keeping stable item IDs. Loading data remains application-owned.`}),`
`,(0,S.jsx)(a,{of:g,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { useMemo, useState } from 'react';
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
  id: \`item-\${index + 1}\`,
  name: \`Item \${index + 1}\`
}));

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
      const nextIndex = current.reduce(function maxItemIndex(max, item) {
        const value = Number(item.id.replace('item-', ''));
        return Number.isFinite(value) ? Math.max(max, value) : max;
      }, 0);
      return [
        ...current,
        ...Array.from({ length: 100 }, (_, index) => ({
          id: \`item-\${nextIndex + index + 1}\`,
          name: \`Item \${nextIndex + index + 1}\`
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
      <Text role="status" aria-live="polite">
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
              style={{ blockSize: '100%', minHeight: 0, boxSizing: 'border-box' }}
            >
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
      </Virtualizer>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`card-group`,children:`Card Group`}),`
`,(0,S.jsx)(t.p,{children:`Virtualize a CardGroup with GridLayout. The group owns selection and focus; the layout owns cell geometry.`}),`
`,(0,S.jsx)(a,{of:v,inline:!0}),`
`,(0,S.jsx)(i,{code:`import { Card, CardGroup, GridLayout, Heading, Size, Text, TextLockup, Virtualizer } from '@godaddy/antares';

const items = Array.from({ length: 500 }, (_, index) => ({
  id: \`card-\${index + 1}\`,
  name: \`Card \${index + 1}\`,
  description: \`Selectable surface \${index + 1} in a virtualized CardGroup.\`
}));

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
            style={{ blockSize: '100%', minHeight: 0, boxSizing: 'border-box' }}
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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`List sizes`}),`: Use `,(0,S.jsx)(t.code,{children:`rowSize`}),` when every item is the same height. Use `,(0,S.jsx)(t.code,{children:`estimatedRowSize`}),` with `,(0,S.jsx)(t.code,{children:`shouldObserveItemSize`}),` when content wraps or can be enlarged.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Grid sizes`}),`: Pass `,(0,S.jsx)(t.code,{children:`new Size(width, height)`}),` for `,(0,S.jsx)(t.code,{children:`minItemSize`}),` and `,(0,S.jsx)(t.code,{children:`maxItemSize`}),`. Set `,(0,S.jsx)(t.code,{children:`preserveAspectRatio`}),` to keep a fixed cell height. Pair `,(0,S.jsx)(t.code,{children:`GridLayout`}),` with `,(0,S.jsx)(t.code,{children:`layout="grid"`}),` on the child collection so keyboard movement matches the cell geometry.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Item fit`}),`: Let each item fill the size the layout gives it (`,(0,S.jsx)(t.code,{children:`blockSize: '100%'`}),`), and keep padding and borders inside it.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Stability`}),`: Keep the layout class and `,(0,S.jsx)(t.code,{children:`layoutOptions`}),` stable across renders, and use stable item `,(0,S.jsx)(t.code,{children:`id`}),`s when filtering or appending data.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Select`}),`: `,(0,S.jsx)(t.code,{children:`SelectOptions`}),` owns its list, so compose `,(0,S.jsx)(t.code,{children:`Popover`}),`, `,(0,S.jsx)(t.code,{children:`Content`}),`, and `,(0,S.jsx)(t.code,{children:`ListBox`}),` yourself to place a `,(0,S.jsx)(t.code,{children:`Virtualizer`}),` inside a `,(0,S.jsx)(t.code,{children:`Select`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`CardGroup`}),`: Prefer `,(0,S.jsx)(t.code,{children:`CardGroup`}),` when items are selectable surfaces with media or actions. Keep CSS grid columns and gaps off the group so the virtualizer layout owns geometry.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Other layouts`}),`: Use `,(0,S.jsx)(t.code,{children:`WaterfallLayout`}),` for masonry-style cells and `,(0,S.jsx)(t.code,{children:`TableLayout`}),` when composing a table-shaped collection. Pass the matching collection and keep layout options stable.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,S.jsx)(t.p,{children:`React Aria owns keyboard navigation and focus while items enter and leave the viewport, so do not add a competing key handler. Keys reach items that are not mounted yet.`}),`
`,(0,S.jsxs)(t.table,{children:[(0,S.jsx)(t.thead,{children:(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.th,{children:`Key`}),(0,S.jsx)(t.th,{children:`Action`})]})}),(0,S.jsxs)(t.tbody,{children:[(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Tab`}),` / `,(0,S.jsx)(t.code,{children:`Shift + Tab`})]}),(0,S.jsx)(t.td,{children:`Moves focus into and out of the collection as a single tab stop`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Arrow Up`}),` / `,(0,S.jsx)(t.code,{children:`Arrow Down`})]}),(0,S.jsx)(t.td,{children:`Moves focus to the previous or next item, or row in a grid`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Arrow Left`}),` / `,(0,S.jsx)(t.code,{children:`Arrow Right`})]}),(0,S.jsx)(t.td,{children:`Moves focus between columns in a grid. Directions reverse in RTL`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Page Up`}),` / `,(0,S.jsx)(t.code,{children:`Page Down`})]}),(0,S.jsx)(t.td,{children:`Moves focus by about one viewport of items`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Home`}),` / `,(0,S.jsx)(t.code,{children:`End`})]}),(0,S.jsx)(t.td,{children:`Moves focus to the first or last item, even when it is offscreen`})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsxs)(t.td,{children:[(0,S.jsx)(t.code,{children:`Enter`}),` / `,(0,S.jsx)(t.code,{children:`Space`})]}),(0,S.jsxs)(t.td,{children:[`Selects the focused item according to the collection's `,(0,S.jsx)(t.code,{children:`selectionMode`})]})]}),(0,S.jsxs)(t.tr,{children:[(0,S.jsx)(t.td,{children:`Typeahead (letters)`}),(0,S.jsxs)(t.td,{children:[`Moves focus to the item whose `,(0,S.jsx)(t.code,{children:`textValue`}),` matches`]})]})]})]}),`
`,(0,S.jsx)(t.h3,{id:`screen-readers`,children:`Screen readers`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Give every standalone `,(0,S.jsx)(t.code,{children:`ListBox`}),` or `,(0,S.jsx)(t.code,{children:`CardGroup`}),` an `,(0,S.jsx)(t.code,{children:`aria-label`}),` or `,(0,S.jsx)(t.code,{children:`aria-labelledby`}),`, and a `,(0,S.jsx)(t.code,{children:`Select`}),` a visible `,(0,S.jsx)(t.code,{children:`Label`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Items expose their position in the full collection with `,(0,S.jsx)(t.code,{children:`aria-posinset`}),` and `,(0,S.jsx)(t.code,{children:`aria-setsize`}),`, even though only some are mounted.`]}),`
`,(0,S.jsx)(t.li,{children:`Offscreen items are not in the DOM. Browser find and print only see the mounted items, so offer search, filtering, or an export when people need the whole collection.`}),`
`,(0,S.jsxs)(t.li,{children:[`Keep interactive controls out of `,(0,S.jsx)(t.code,{children:`ListBoxItem`}),`. For items with actions, use `,(0,S.jsx)(t.code,{children:`CardGroup`}),`.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`Virtualize only when the unvirtualized collection is slow. Small collections are simpler to render normally.`}),`
`,(0,S.jsx)(t.li,{children:`Keep selection and other item state outside the rendered rows, because offscreen rows unmount.`}),`
`,(0,S.jsx)(t.li,{children:`Virtualization controls rendering, not fetching. Keep pagination, loading, and retries in your application.`}),`
`,(0,S.jsxs)(t.li,{children:[`Avoid animating item positions or adding CSS gaps. Use the layout's `,(0,S.jsx)(t.code,{children:`gap`}),` option instead.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Render empty states with the collection's `,(0,S.jsx)(t.code,{children:`renderEmptyState`}),`, not as an item.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`No items appear:`}),` the collection needs a nonzero inline and block size, and it must be the element that scrolls.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Items overlap or clip:`}),` make `,(0,S.jsx)(t.code,{children:`rowSize`}),` match the rendered height, or use `,(0,S.jsx)(t.code,{children:`estimatedRowSize`}),` for variable content.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Scroll jumps after an update:`}),` keep item ids and the layout identity stable.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`A Select opens away from its selected item:`}),` scroll the focused option into view from the `,(0,S.jsx)(t.code,{children:`ListBox`}),` `,(0,S.jsx)(t.code,{children:`onFocus`}),` handler, as the Select example does.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Server markup is not windowed:`}),` SSR can render the collection fallback, but real windowing needs client viewport and item measurements. Do not treat server HTML as the virtualized list.`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`A custom composition does not virtualize:`}),` `,(0,S.jsx)(t.code,{children:`Virtualizer`}),` needs a React Aria collection. CSS `,(0,S.jsx)(t.code,{children:`Grid`}),` or `,(0,S.jsx)(t.code,{children:`Flex`}),` markup is not one.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`<Virtualizer>
  <ListBox>
    <ListBoxItem />
    {/* ... */}
  </ListBox>
</Virtualizer>
`})}),`
`,(0,S.jsx)(t.h3,{id:`virtualizer-1`,children:`Virtualizer`}),`
`,(0,S.jsx)(o,{of:_}),`
`,(0,S.jsx)(t.h3,{id:`listlayout-options`,children:`ListLayout options`}),`
`,(0,S.jsx)(o,{of:h}),`
`,(0,S.jsx)(t.h3,{id:`gridlayout-options`,children:`GridLayout options`}),`
`,(0,S.jsx)(o,{of:l}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`WaterfallLayout`}),` and `,(0,S.jsx)(t.code,{children:`TableLayout`}),` share the same `,(0,S.jsx)(t.code,{children:`layout`}),` and `,(0,S.jsx)(t.code,{children:`layoutOptions`}),` pattern as `,(0,S.jsx)(t.code,{children:`ListLayout`}),` and `,(0,S.jsx)(t.code,{children:`GridLayout`}),`. Pair each with a collection that matches its geometry.`]})]})}function x(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;function C(){return(C=e((()=>{S=t(),n(),c(),y()})))()}C();export{x as default};