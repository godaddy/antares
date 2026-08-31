import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-Biz6xSrB.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-VhroJ_WZ.js";import{t as c}from"./mdx-react-shim-AbUrKz4h.js";import{t as l}from"./runtime-CCpseHws.js";import{Default as u,ListBoxControlled as d,ListBoxMultiple as f,ListBoxProps as p,n as m,t as h}from"./listbox.stories-CigSSvxL.js";function g(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{of:m,name:`Overview`}),`
`,(0,v.jsx)(t.h1,{id:`listbox`,children:`ListBox`}),`
`,(0,v.jsx)(t.p,{children:`ListBox is a selectable collection of items rendered inline. Use it for non-popover pickers, inline lists, or as a building block for higher-level components like Select.`}),`
`,(0,v.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,v.jsx)(t.code,{children:`selectionMode="single"`}),` or `,(0,v.jsx)(t.code,{children:`"multiple"`}),`.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,v.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,v.jsx)(t.code,{children:`onSelectionChange`}),` for controlled state, or `,(0,v.jsx)(t.code,{children:`defaultSelectedKeys`}),` for uncontrolled.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`Layout primitive`}),`: `,(0,v.jsx)(t.code,{children:`ListBox`}),` and `,(0,v.jsx)(t.code,{children:`ListBoxItem`}),` accept layout props (`,(0,v.jsx)(t.code,{children:`gap`}),`, `,(0,v.jsx)(t.code,{children:`padding`}),`, etc.) — they extend `,(0,v.jsx)(t.code,{children:`FlexOwnProps`}),`.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`Composes into other components`}),`: `,(0,v.jsx)(t.code,{children:`Select`}),` uses `,(0,v.jsx)(t.code,{children:`ListBox`}),` internally; reach for `,(0,v.jsx)(t.code,{children:`ListBox`}),` directly when you need an inline list rather than a popover dropdown.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria ListBox for accessibility, keyboard navigation, and typeahead.`]}),`
`]}),`
`,(0,v.jsxs)(t.p,{children:[(0,v.jsx)(t.code,{children:`ListBox`}),` requires either `,(0,v.jsx)(t.code,{children:`aria-label`}),` or `,(0,v.jsx)(t.code,{children:`aria-labelledby`}),`. For a labeled, popover-style picker, prefer `,(0,v.jsx)(t.code,{children:`Select`}),`.`]}),`
`,(0,v.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,v.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,v.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,v.jsxs)(t.p,{children:[`Single selection with static children. Use `,(0,v.jsx)(t.code,{children:`aria-label`}),` to give the listbox an accessible name.`]}),`
`,(0,v.jsx)(i,{of:u,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { ListBox, ListBoxItem } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ListBox aria-label="Coffee" selectionMode="single">
      <ListBoxItem id="espresso">Espresso</ListBoxItem>
      <ListBoxItem id="latte">Latte</ListBoxItem>
      <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
      <ListBoxItem id="americano">Americano</ListBoxItem>
      <ListBoxItem id="mocha">Mocha</ListBoxItem>
    </ListBox>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`list-box-controlled`,children:`List Box Controlled`}),`
`,(0,v.jsxs)(t.p,{children:[`Use `,(0,v.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,v.jsx)(t.code,{children:`onSelectionChange`}),` for controlled state.`]}),`
`,(0,v.jsx)(i,{of:d,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { useState } from 'react';
import { ListBox, ListBoxItem, Text, type ListBoxKey } from '@godaddy/antares';

export function ListBoxControlledExample() {
  const [selectedKeys, setSelectedKeys] = useState<Set<ListBoxKey>>(new Set(['latte']));

  return (
    <>
      <ListBox
        aria-label="Coffee"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys === 'all' ? new Set() : new Set(keys))}
      >
        <ListBoxItem id="espresso">Espresso</ListBoxItem>
        <ListBoxItem id="latte">Latte</ListBoxItem>
        <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
        <ListBoxItem id="americano">Americano</ListBoxItem>
        <ListBoxItem id="mocha">Mocha</ListBoxItem>
      </ListBox>
      <Text>
        <strong>Value:</strong> {selectedKeys.size === 0 ? '(none)' : Array.from(selectedKeys).join(', ')}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h3,{id:`list-box-multiple`,children:`List Box Multiple`}),`
`,(0,v.jsxs)(t.p,{children:[`Set `,(0,v.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values. `,(0,v.jsx)(t.code,{children:`selectedKeys`}),` is a `,(0,v.jsx)(t.code,{children:`Set<Key>`}),` (or the literal `,(0,v.jsx)(t.code,{children:`'all'`}),`).`]}),`
`,(0,v.jsx)(i,{of:f,inline:!0}),`
`,(0,v.jsx)(r,{code:`import { useState } from 'react';
import { ListBox, ListBoxItem, Text, type ListBoxKey } from '@godaddy/antares';

export function ListBoxMultipleExample() {
  const [selectedKeys, setSelectedKeys] = useState<'all' | Set<ListBoxKey>>(new Set(['latte', 'mocha']));

  return (
    <>
      <ListBox
        aria-label="Coffees you like"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys === 'all' ? 'all' : new Set(keys))}
      >
        <ListBoxItem id="espresso">Espresso</ListBoxItem>
        <ListBoxItem id="latte">Latte</ListBoxItem>
        <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
        <ListBoxItem id="americano">Americano</ListBoxItem>
        <ListBoxItem id="mocha">Mocha</ListBoxItem>
      </ListBox>
      <Text>
        <strong>Selected:</strong>{' '}
        {selectedKeys === 'all' ? '(all)' : selectedKeys.size === 0 ? '(none)' : Array.from(selectedKeys).join(', ')}
      </Text>
    </>
  );
}`,language:`tsx`}),`
`,(0,v.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,v.jsx)(t.p,{children:`The ListBox component accepts the following props:`}),`
`,(0,v.jsx)(a,{of:p})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;e((()=>{v=t(),c(),s(),l(),h()}))();export{_ as default};