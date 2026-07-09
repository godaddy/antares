import{i as e}from"./preload-helper-DC4ZmUQl.js";import{y as t}from"./iframe-CWhXmSnF.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-wWTpXXcY.js";import{t as c}from"./mdx-react-shim-3Txel1EJ.js";import{Basic as l,Controlled as u,ListBoxProps as d,Multiple as f,n as p,t as m}from"./listbox.stories-CO1qnof5.js";var h,g=e((()=>{h=`import { ListBox, ListBoxItem } from '@godaddy/antares';

export function ListBoxBasic() {
  return (
    <ListBox aria-label="Coffee" selectionMode="single">
      <ListBoxItem id="espresso">Espresso</ListBoxItem>
      <ListBoxItem id="latte">Latte</ListBoxItem>
      <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
      <ListBoxItem id="americano">Americano</ListBoxItem>
      <ListBoxItem id="mocha">Mocha</ListBoxItem>
    </ListBox>
  );
}
`})),_,v=e((()=>{_=`import { useState } from 'react';
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
}
`})),y,b=e((()=>{y=`import { useState } from 'react';
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
}
`}));function x(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(o,{of:p,name:`Overview`}),`
`,(0,C.jsx)(t.h1,{id:`listbox`,children:`ListBox`}),`
`,(0,C.jsx)(t.p,{children:`ListBox is a selectable collection of items rendered inline. Use it for non-popover pickers, inline lists, or as a building block for higher-level components like Select.`}),`
`,(0,C.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,C.jsxs)(t.ul,{children:[`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Single or multiple selection`}),`: Set `,(0,C.jsx)(t.code,{children:`selectionMode="single"`}),` or `,(0,C.jsx)(t.code,{children:`"multiple"`}),`.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Controlled or uncontrolled`}),`: Use `,(0,C.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,C.jsx)(t.code,{children:`onSelectionChange`}),` for controlled state, or `,(0,C.jsx)(t.code,{children:`defaultSelectedKeys`}),` for uncontrolled.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Layout primitive`}),`: `,(0,C.jsx)(t.code,{children:`ListBox`}),` and `,(0,C.jsx)(t.code,{children:`ListBoxItem`}),` accept layout props (`,(0,C.jsx)(t.code,{children:`gap`}),`, `,(0,C.jsx)(t.code,{children:`padding`}),`, etc.) — they extend `,(0,C.jsx)(t.code,{children:`FlexOwnProps`}),`.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`Composes into other components`}),`: `,(0,C.jsx)(t.code,{children:`Select`}),` uses `,(0,C.jsx)(t.code,{children:`ListBox`}),` internally; reach for `,(0,C.jsx)(t.code,{children:`ListBox`}),` directly when you need an inline list rather than a popover dropdown.`]}),`
`,(0,C.jsxs)(t.li,{children:[(0,C.jsx)(t.strong,{children:`React Aria integration`}),`: Built on React Aria ListBox for accessibility, keyboard navigation, and typeahead.`]}),`
`]}),`
`,(0,C.jsxs)(t.p,{children:[(0,C.jsx)(t.code,{children:`ListBox`}),` requires either `,(0,C.jsx)(t.code,{children:`aria-label`}),` or `,(0,C.jsx)(t.code,{children:`aria-labelledby`}),`. For a labeled, popover-style picker, prefer `,(0,C.jsx)(t.code,{children:`Select`}),`.`]}),`
`,(0,C.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,C.jsx)(t.pre,{children:(0,C.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,C.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,C.jsx)(t.p,{children:`The ListBox component accepts the following props:`}),`
`,(0,C.jsx)(a,{of:d}),`
`,(0,C.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,C.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,C.jsxs)(t.p,{children:[`Single selection with static children. Use `,(0,C.jsx)(t.code,{children:`aria-label`}),` to give the listbox an accessible name.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:h}),`
`,(0,C.jsx)(i,{of:l,inline:!0}),`
`,(0,C.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,C.jsxs)(t.p,{children:[`Use `,(0,C.jsx)(t.code,{children:`selectedKeys`}),` and `,(0,C.jsx)(t.code,{children:`onSelectionChange`}),` for controlled state.`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:_}),`
`,(0,C.jsx)(i,{of:u,inline:!0}),`
`,(0,C.jsx)(t.h3,{id:`multiple`,children:`Multiple`}),`
`,(0,C.jsxs)(t.p,{children:[`Set `,(0,C.jsx)(t.code,{children:`selectionMode="multiple"`}),` to allow multiple values. `,(0,C.jsx)(t.code,{children:`selectedKeys`}),` is a `,(0,C.jsx)(t.code,{children:`Set<Key>`}),` (or the literal `,(0,C.jsx)(t.code,{children:`'all'`}),`).`]}),`
`,(0,C.jsx)(r,{language:`tsx`,code:y}),`
`,(0,C.jsx)(i,{of:f,inline:!0})]})}function S(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;e((()=>{C=t(),c(),s(),m(),g(),v(),b()}))();export{S as default};