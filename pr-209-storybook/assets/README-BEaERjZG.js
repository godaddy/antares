import{i as e}from"./preload-helper-usAeo7Bx.js";import{y as t}from"./iframe-Bfm8QExa.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-BCtUlGzT.js";import{t as s}from"./mdx-react-shim-DcjI738M.js";import{CheckboxGroupProps as c,CheckboxProps as l,n as u,t as d}from"./checkbox.stories-B489P96b.js";var f,p=e((()=>{f=`/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox } from '@bento/checkbox';

export function CheckboxControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      name="checkbox-controlled-example"
      value="checkbox-controlled-value"
      isSelected={checked}
      onChange={setChecked}
    >
      Controlled Checkbox
    </Checkbox>
  );
}
`})),m,h=e((()=>{m=`/* v8 ignore next */
import React from 'react';
import { Checkbox } from '@bento/checkbox';

export function CheckboxExample(args: React.ComponentProps<typeof Checkbox>) {
  return (
    <Checkbox name="checkbox-example" value="checkbox-value" {...args}>
      Checkbox Label
    </Checkbox>
  );
}
`})),g,_=e((()=>{g=`/* v8 ignore next */
import React from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';
import { FieldError } from '@bento/field-error';

export function CheckboxGroupExample(args: React.ComponentProps<typeof CheckboxGroup>) {
  return (
    <CheckboxGroup name="checkbox-group-example" {...args}>
      <Text slot="label">Checkbox Group</Text>
      <Checkbox value="checkbox-1">Checkbox 1</Checkbox>
      <Checkbox value="checkbox-2">Checkbox 2</Checkbox>
      <Text slot="description">Select your options</Text>
      <FieldError slot="error">This is an error message</FieldError>
    </CheckboxGroup>
  );
}
`})),v,y=e((()=>{v=`/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';

export function CheckboxGroupControlledExample() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <CheckboxGroup value={selectedValues} onChange={setSelectedValues}>
      <Text slot="label">Checkbox Group</Text>
      <Checkbox value="option1">Option 1</Checkbox>
      <Checkbox value="option2">Option 2</Checkbox>
      <Checkbox value="option3">Option 3</Checkbox>
    </CheckboxGroup>
  );
}
`})),b,x=e((()=>{b=`/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';

const SELECT_ALL = 'select-all';

export function CheckboxGroupIndeterminateExample() {
  const items = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ];
  const allItemIds = items.map(function getItemId(item) {
    return item.id;
  });

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const itemsSelectedCount = checkedItems.filter(function isItem(value) {
    return value !== SELECT_ALL;
  }).length;
  const isIndeterminate = itemsSelectedCount > 0 && itemsSelectedCount < allItemIds.length;

  function handleGroupChange(nextValues: string[]) {
    const prevHadSelectAll = checkedItems.includes(SELECT_ALL);
    const nextHasSelectAll = nextValues.includes(SELECT_ALL);

    // Select All was just toggled on → select every item, with select-all last.
    if (!prevHadSelectAll && nextHasSelectAll) {
      setCheckedItems([...allItemIds, SELECT_ALL]);
      return;
    }

    // Select All was just toggled off → clear everything.
    if (prevHadSelectAll && !nextHasSelectAll) {
      setCheckedItems([]);
      return;
    }

    // An individual item toggled. Strip select-all so its membership is purely derived.
    const itemsOnly = nextValues.filter(function notSelectAll(value) {
      return value !== SELECT_ALL;
    });
    const allItemsNowSelected = allItemIds.every(function isInItems(id) {
      return itemsOnly.includes(id);
    });
    if (allItemsNowSelected) {
      setCheckedItems([...itemsOnly, SELECT_ALL]);
    } else {
      setCheckedItems(itemsOnly);
    }
  }

  return (
    <CheckboxGroup value={checkedItems} onChange={handleGroupChange} data-value={checkedItems}>
      <Text slot="label">Select Items</Text>
      <Checkbox name={SELECT_ALL} value={SELECT_ALL} isIndeterminate={isIndeterminate}>
        Select All
      </Checkbox>

      {items.map(function renderItem(item) {
        return (
          <Checkbox key={item.id} name={item.id} value={item.id}>
            {item.label}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
}
`}));function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...n(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(a,{of:d,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`checkbox`,children:`Checkbox`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`@bento/checkbox`}),` package provides accessible and customizable checkbox inputs. It exports the `,(0,w.jsx)(t.strong,{children:`CheckboxGroup`}),` and `,(0,w.jsx)(t.strong,{children:`Checkbox`}),` primitives, enabling you to build individual or groups of checkboxes with consistent keyboard navigation, focus management, and ARIA support. React Aria is used to ensure that the checkboxes are accessible to all users.`]}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` allows a user to select multiple items from a list of `,(0,w.jsx)(t.code,{children:`Checkbox`}),` components.`]}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Checkbox`}),` is a single checkbox option that can be selected by the user.`]}),`
`,(0,w.jsx)(t.h1,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @bento/checkbox
`})}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsxs)(t.p,{children:[`The following properties are available to be used on the `,(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` and `,(0,w.jsx)(t.code,{children:`Checkbox`}),` primitives:`]}),`
`,(0,w.jsx)(t.h3,{id:`checkbox-1`,children:`Checkbox`}),`
`,(0,w.jsx)(i,{of:l}),`
`,(0,w.jsx)(t.h3,{id:`checkboxgroup`,children:`CheckboxGroup`}),`
`,(0,w.jsx)(i,{of:c}),`
`,(0,w.jsx)(t.h2,{id:`data-attributes-slot-map-and-props`,children:`Data Attributes, Slot Map and Props`}),`
`,(0,w.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,w.jsxs)(t.p,{children:[`The following data attributes can be used to style and customize the `,(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` and `,(0,w.jsx)(t.code,{children:`Checkbox`}),` primitives.`]}),`
`,(0,w.jsxs)(t.h4,{id:`checkboxgroup-data-attributes`,children:[(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` Data Attributes`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Attribute`}),(0,w.jsx)(t.th,{children:`Description`}),(0,w.jsx)(t.th,{children:`Example Values`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-disabled`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox group is disabled`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-readonly`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox group is readonly`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-required`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox group is required`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-invalid`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox group is invalid`}),(0,w.jsx)(t.td,{children:`"true"`})]})]})]}),`
`,(0,w.jsxs)(t.h4,{id:`checkbox-data-attributes`,children:[(0,w.jsx)(t.code,{children:`Checkbox`}),` Data Attributes`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Attribute`}),(0,w.jsx)(t.th,{children:`Description`}),(0,w.jsx)(t.th,{children:`Example Values`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-disabled`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is disabled`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-readonly`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is readonly`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-required`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is required`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-invalid`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is invalid`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-indeterminate`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is in an indeterminate state`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-pressed`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is being pressed`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-hovered`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is hovered`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-focused`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox has focus`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-focus-visible`})}),(0,w.jsx)(t.td,{children:`Indicates focus should be visible`}),(0,w.jsx)(t.td,{children:`"true"`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`data-selected`})}),(0,w.jsx)(t.td,{children:`Indicates the checkbox is selected`}),(0,w.jsx)(t.td,{children:`"true"`})]})]})]}),`
`,(0,w.jsxs)(t.h3,{id:`checkboxgroup-slot-map`,children:[(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` Slot Map`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Slot Name`}),(0,w.jsx)(t.th,{children:`Description`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`label`})}),(0,w.jsx)(t.td,{children:`Label for checkbox group`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`description`})}),(0,w.jsx)(t.td,{children:`Description for checkbox group`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`error`})}),(0,w.jsx)(t.td,{children:`Error for checkbox group`})]})]})]}),`
`,(0,w.jsxs)(t.h3,{id:`checkbox-slot-map`,children:[(0,w.jsx)(t.code,{children:`Checkbox`}),` Slot Map`]}),`
`,(0,w.jsxs)(t.table,{children:[(0,w.jsx)(t.thead,{children:(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.th,{children:`Slot Name`}),(0,w.jsx)(t.th,{children:`Description`})]})}),(0,w.jsxs)(t.tbody,{children:[(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`icon-checked`})}),(0,w.jsx)(t.td,{children:`Icon for checked checkbox`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`icon-unchecked`})}),(0,w.jsx)(t.td,{children:`Icon for unchecked checkbox`})]}),(0,w.jsxs)(t.tr,{children:[(0,w.jsx)(t.td,{children:(0,w.jsx)(t.code,{children:`icon-indeterminate`})}),(0,w.jsx)(t.td,{children:`Icon for indeterminate checkbox`})]})]})]}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default-checkbox---uncontrolled`,children:`Default Checkbox - Uncontrolled`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Checkbox`}),` primitive is uncontrolled by default, meaning it manages its own state internally. You can also use it in a controlled manner by providing the `,(0,w.jsx)(t.code,{children:`checked`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` props.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:m}),`
`,(0,w.jsx)(t.h3,{id:`controlled-checkbox`,children:`Controlled Checkbox`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Checkbox`}),` can also be used in a controlled manner, where you manage its state externally with the `,(0,w.jsx)(t.code,{children:`checked`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` props.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:f}),`
`,(0,w.jsx)(t.h3,{id:`checkbox-group`,children:`Checkbox Group`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` allows a user to select multiple items from a list of `,(0,w.jsx)(t.code,{children:`Checkbox`}),` components.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:g}),`
`,(0,w.jsx)(t.h3,{id:`controlled-checkbox-group`,children:`Controlled Checkbox Group`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` can also be used in a controlled manner, where you manage the state of the checkboxes externally with the `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),` props.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:v}),`
`,(0,w.jsx)(t.h3,{id:`checkbox-group-with-indeterminate-state`,children:`Checkbox Group with Indeterminate State`}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`CheckboxGroup`}),` can also support an indeterminate state, which is useful when some but not all checkboxes are selected. The complex state management shown here is an example of how to handle indeterminate states in a checkbox group in a common way.`]}),`
`,(0,w.jsx)(r,{language:`tsx`,code:b})]})}function C(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;e((()=>{w=t(),s(),o(),u(),p(),h(),_(),y(),x()}))();export{C as default};