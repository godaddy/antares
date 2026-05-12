import{j as e}from"./iframe-ClWTPl5x.js";import{u as s,M as d,A as r,S as o}from"./blocks-DG6eLz6l.js";import{S as i,C as h,a as l}from"./checkbox.stories-CrxizoGD.js";import"./preload-helper-PPVm8Dsz.js";import"./index-GsngMiyr.js";import"./index-DUACdkfR.js";import"./index-BbqJLgpW.js";import"./index-Bxxum18q.js";import"./slots-C-wNTvaf.js";import"./mergeProps-BJpXx4bB.js";import"./SSRProvider-CfbBhIjL.js";import"./clsx-B-dksMZM.js";import"./index-Ckd9fOVu.js";import"./index-CLj43KZG.js";import"./index-DzS4bbTN.js";import"./index-B3IMV5iP.js";import"./index-D8m644f2.js";import"./index-2bjkk-qr.js";import"./create-external-store-TtP3UJpK.js";import"./index-KhMAmn8o.js";import"./client-DYqE1Xvq.js";import"./index-3j5nZGKZ.js";import"./useFocusRing-CqVf9l6b.js";import"./useHover-BR_Y-GQi.js";import"./DOMFunctions-1-yhhTt0.js";import"./useGlobalListeners-BnImAHxc.js";import"./platform-DTNzKOdA.js";import"./useFocusWithin-CrR9OGu2.js";import"./index--4iOPGX2.js";import"./VisuallyHidden-D5PZ-hA2.js";import"./useObjectRef-Bmub13Bc.js";import"./useCheckboxGroupState-CrboKW11.js";import"./filterDOMProps-SeKkUh_q.js";import"./useField-3X6TQ2_3.js";import"./useEffectEvent-BVbYnPFx.js";import"./useLabel-DJxP5-DH.js";import"./useLabels-BP5V8t_Z.js";import"./useFocusable-DEJIEQ8h.js";import"./usePress-D6HH4oj5.js";import"./useToggleState-BcpOOpEa.js";import"./useControlledState-dyoyjkUJ.js";import"./index-CYXNUOuP.js";import"./index-Cw-rsVed.js";const x=`/* v8 ignore next */
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
`,a=`/* v8 ignore next */
import React from 'react';
import { Checkbox } from '@bento/checkbox';

export function CheckboxExample(args: React.ComponentProps<typeof Checkbox>) {
  return (
    <Checkbox name="checkbox-example" value="checkbox-value" {...args}>
      Checkbox Label
    </Checkbox>
  );
}
`,p=`/* v8 ignore next */
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
`,b=`/* v8 ignore next */
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
`,m=`/* v8 ignore next */
import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '@bento/checkbox';
import { Text } from '@bento/text';

export function CheckboxGroupIndeterminateExample() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const items = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' }
  ];

  const allItemIds = items.map(function getItemId(item) {
    return item.id;
  });
  const isAllSelected = checkedItems.size === items.length;
  const isIndeterminate = checkedItems.size > 0 && checkedItems.size < items.length;

  function handleSelectAll(checked: boolean) {
    if (checked) {
      setCheckedItems(new Set([...allItemIds, 'select-all']));
    } else {
      setCheckedItems(new Set());
    }
  }

  function handleItemChange(itemId: string, checked: boolean) {
    setCheckedItems(function updateCheckedItems(prev) {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(itemId);
        if (
          allItemIds.every(function checkItemInSet(id) {
            return newSet.has(id);
          })
        ) {
          newSet.add('select-all');
        }
      } else {
        newSet.delete(itemId);
        newSet.delete('select-all');
      }
      return newSet;
    });
  }

  return (
    <CheckboxGroup value={Array.from(checkedItems)} data-value={Array.from(checkedItems)}>
      <Text slot="label">Select Items</Text>
      <Checkbox
        name="select-all"
        value="select-all"
        isSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onChange={handleSelectAll}
      >
        Select All
      </Checkbox>

      {items.map((item) => (
        <Checkbox
          key={item.id}
          name={item.id}
          value={item.id}
          isSelected={checkedItems.has(item.id)}
          onChange={function handleItemChangeForItem(checked) {
            return handleItemChange(item.id, checked);
          }}
        >
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
`;function n(c){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...s(),...c.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:i,name:"Overview"}),`
`,e.jsx(t.h1,{id:"checkbox",children:"Checkbox"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"@bento/checkbox"})," package provides accessible and customizable checkbox inputs. It exports the ",e.jsx(t.strong,{children:"CheckboxGroup"})," and ",e.jsx(t.strong,{children:"Checkbox"})," primitives, enabling you to build individual or groups of checkboxes with consistent keyboard navigation, focus management, and ARIA support. React Aria is used to ensure that the checkboxes are accessible to all users."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"CheckboxGroup"})," allows a user to select multiple items from a list of ",e.jsx(t.code,{children:"Checkbox"})," components."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Checkbox"})," is a single checkbox option that can be selected by the user."]}),`
`,e.jsx(t.h1,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @bento/checkbox
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsxs(t.p,{children:["The following properties are available to be used on the ",e.jsx(t.code,{children:"CheckboxGroup"})," and ",e.jsx(t.code,{children:"Checkbox"})," primitives:"]}),`
`,e.jsx(t.h3,{id:"checkbox-1",children:"Checkbox"}),`
`,e.jsx(r,{of:h}),`
`,e.jsx(t.h3,{id:"checkboxgroup",children:"CheckboxGroup"}),`
`,e.jsx(r,{of:l}),`
`,e.jsx(t.h2,{id:"data-attributes-slot-map-and-props",children:"Data Attributes, Slot Map and Props"}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsxs(t.p,{children:["The following data attributes can be used to style and customize the ",e.jsx(t.code,{children:"CheckboxGroup"})," and ",e.jsx(t.code,{children:"Checkbox"})," primitives."]}),`
`,e.jsxs(t.h4,{id:"checkboxgroup-data-attributes",children:[e.jsx(t.code,{children:"CheckboxGroup"})," Data Attributes"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Attribute"}),e.jsx(t.th,{children:"Description"}),e.jsx(t.th,{children:"Example Values"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-disabled"})}),e.jsx(t.td,{children:"Indicates the checkbox group is disabled"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-readonly"})}),e.jsx(t.td,{children:"Indicates the checkbox group is readonly"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-required"})}),e.jsx(t.td,{children:"Indicates the checkbox group is required"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-invalid"})}),e.jsx(t.td,{children:"Indicates the checkbox group is invalid"}),e.jsx(t.td,{children:'"true"'})]})]})]}),`
`,e.jsxs(t.h4,{id:"checkbox-data-attributes",children:[e.jsx(t.code,{children:"Checkbox"})," Data Attributes"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Attribute"}),e.jsx(t.th,{children:"Description"}),e.jsx(t.th,{children:"Example Values"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-disabled"})}),e.jsx(t.td,{children:"Indicates the checkbox is disabled"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-readonly"})}),e.jsx(t.td,{children:"Indicates the checkbox is readonly"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-required"})}),e.jsx(t.td,{children:"Indicates the checkbox is required"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-invalid"})}),e.jsx(t.td,{children:"Indicates the checkbox is invalid"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-indeterminate"})}),e.jsx(t.td,{children:"Indicates the checkbox is in an indeterminate state"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-pressed"})}),e.jsx(t.td,{children:"Indicates the checkbox is being pressed"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-hovered"})}),e.jsx(t.td,{children:"Indicates the checkbox is hovered"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-focused"})}),e.jsx(t.td,{children:"Indicates the checkbox has focus"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-focus-visible"})}),e.jsx(t.td,{children:"Indicates focus should be visible"}),e.jsx(t.td,{children:'"true"'})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"data-selected"})}),e.jsx(t.td,{children:"Indicates the checkbox is selected"}),e.jsx(t.td,{children:'"true"'})]})]})]}),`
`,e.jsxs(t.h3,{id:"checkboxgroup-slot-map",children:[e.jsx(t.code,{children:"CheckboxGroup"})," Slot Map"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Slot Name"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"label"})}),e.jsx(t.td,{children:"Label for checkbox group"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"description"})}),e.jsx(t.td,{children:"Description for checkbox group"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"error"})}),e.jsx(t.td,{children:"Error for checkbox group"})]})]})]}),`
`,e.jsxs(t.h3,{id:"checkbox-slot-map",children:[e.jsx(t.code,{children:"Checkbox"})," Slot Map"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Slot Name"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"icon-checked"})}),e.jsx(t.td,{children:"Icon for checked checkbox"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"icon-unchecked"})}),e.jsx(t.td,{children:"Icon for unchecked checkbox"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"icon-indeterminate"})}),e.jsx(t.td,{children:"Icon for indeterminate checkbox"})]})]})]}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default-checkbox---uncontrolled",children:"Default Checkbox - Uncontrolled"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Checkbox"})," primitive is uncontrolled by default, meaning it manages its own state internally. You can also use it in a controlled manner by providing the ",e.jsx(t.code,{children:"checked"})," and ",e.jsx(t.code,{children:"onChange"})," props."]}),`
`,e.jsx(o,{language:"tsx",code:a}),`
`,e.jsx(t.h3,{id:"controlled-checkbox",children:"Controlled Checkbox"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"Checkbox"})," can also be used in a controlled manner, where you manage its state externally with the ",e.jsx(t.code,{children:"checked"})," and ",e.jsx(t.code,{children:"onChange"})," props."]}),`
`,e.jsx(o,{language:"tsx",code:x}),`
`,e.jsx(t.h3,{id:"checkbox-group",children:"Checkbox Group"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"CheckboxGroup"})," allows a user to select multiple items from a list of ",e.jsx(t.code,{children:"Checkbox"})," components."]}),`
`,e.jsx(o,{language:"tsx",code:p}),`
`,e.jsx(t.h3,{id:"controlled-checkbox-group",children:"Controlled Checkbox Group"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"CheckboxGroup"})," can also be used in a controlled manner, where you manage the state of the checkboxes externally with the ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"onChange"})," props."]}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(t.h3,{id:"checkbox-group-with-indeterminate-state",children:"Checkbox Group with Indeterminate State"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"CheckboxGroup"})," can also support an indeterminate state, which is useful when some but not all checkboxes are selected. The complex state management shown here is an example of how to handle indeterminate states in a checkbox group in a common way."]}),`
`,e.jsx(o,{language:"tsx",code:m})]})}function ne(c={}){const{wrapper:t}={...s(),...c.components};return t?e.jsx(t,{...c,children:e.jsx(n,{...c})}):n(c)}export{ne as default};
