import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-D20fQPfa.js";import{a as l,c as u,i as d,l as f,n as p,o as m,r as h,s as g,t as _,u as v}from"./range-field.stories-4XlC5mw-.js";function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`rangefield`,children:`RangeField`}),`
`,(0,x.jsx)(t.p,{children:`RangeField lets users select one numeric value or a related set of values on a bounded scale.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Select one value or render one thumb for each value in an array`}),`
`,(0,x.jsx)(t.li,{children:`Supports controlled and uncontrolled values with typed change callbacks`}),`
`,(0,x.jsx)(t.li,{children:`Provides localized value output, endpoint labels, descriptions, and markers`}),`
`,(0,x.jsx)(t.li,{children:`Integrates with native forms, keyboard, pointer, and touch interaction through React Aria`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`Minimal usage with a single value and min/max bounds.`}),`
`,(0,x.jsx)(a,{of:p,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { RangeField } from '@godaddy/antares';

export function DefaultExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`onChange`}),` for immediate updates and `,(0,x.jsx)(t.code,{children:`onChangeEnd`}),` for work that should run after interaction finishes.`]}),`
`,(0,x.jsx)(a,{of:_,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Flex, RangeField } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [value, setValue] = useState(50);
  const [committedValue, setCommittedValue] = useState(50);

  return (
    <Flex direction="column" gap="sm">
      <RangeField<number>
        aria-label="Volume"
        value={value}
        onChange={setValue}
        onChangeEnd={setCommittedValue}
        step={10}
      />
      <p>Current value: {value}</p>
      <p>Committed value: {committedValue}</p>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`isDisabled`}),` when the value is visible but unavailable for interaction.`]}),`
`,(0,x.jsx)(a,{of:h,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { RangeField } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <RangeField
      aria-label="Volume"
      label="Volume"
      description="This is a description"
      minLabel="Low"
      maxLabel="High"
      defaultValue={50}
      isDisabled
    />
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`labels`,children:`Labels`}),`
`,(0,x.jsx)(t.p,{children:`Combine an input label, value label, range labels, and helper text when users need additional context.`}),`
`,(0,x.jsx)(a,{of:d,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { RangeField } from '@godaddy/antares';

export function LabelsExample() {
  return (
    <RangeField
      label="Price limit"
      defaultValue={50}
      formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      valueLabel
      minLabel="$0"
      maxLabel="$100"
      description="Choose the maximum price."
    />
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`value-display`,children:`Value Display`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`valueLabel`}),` to show formatted values, static context, or output derived from the current slider state.`]}),`
`,(0,x.jsx)(a,{of:u,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { Flex, RangeField } from '@godaddy/antares';

export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <RangeField
        label="Monthly budget"
        defaultValue={50}
        formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        valueLabel
      />
      <RangeField label="Storage quota" defaultValue={50} valueLabel={<span>Recommended</span>} />
      <RangeField
        label="Volume"
        defaultValue={50}
        valueLabel={function renderValue({ state }) {
          return \`Current: \${state.values[0]}%\`;
        }}
      />
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`markers`,children:`Markers`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`markers`}),` to expose a manageable set of discrete steps for a single value.`]}),`
`,(0,x.jsx)(a,{of:l,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { RangeField } from '@godaddy/antares';

export function MarkersExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} step={10} markers />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,x.jsxs)(t.p,{children:[`Pass a `,(0,x.jsx)(t.code,{children:`number[]`}),` to render a range with two thumbs and step markers.`]}),`
`,(0,x.jsx)(a,{of:g,inline:!0}),`
`,(0,x.jsx)(i,{code:`import { RangeField } from '@godaddy/antares';

export function RangeExample() {
  return (
    <RangeField
      aria-label="Price range"
      defaultValue={[25, 75]}
      thumbLabels={['Minimum price', 'Maximum price']}
      minValue={0}
      maxValue={100}
      step={25}
      markers
    />
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsx)(t.h3,{id:`accessible-names`,children:`Accessible names`}),`
`,(0,x.jsxs)(t.p,{children:[`For a single value, prefer a visible `,(0,x.jsx)(t.code,{children:`label`}),`; use `,(0,x.jsx)(t.code,{children:`aria-label`}),` only when equivalent visible context already exists.`]}),`
`,(0,x.jsxs)(t.p,{children:[`For an array, provide one descriptive `,(0,x.jsx)(t.code,{children:`thumbLabels`}),` entry for every value. Entries are matched by index, so keep them aligned when values are added, removed, or reordered. Describe each thumb's purpose, such as `,(0,x.jsx)(t.code,{children:`Lower warning threshold`}),`, rather than its current number.`]}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.code,{children:`thumbNames`}),` configures native form field names and does not provide accessible labels. Likewise, `,(0,x.jsx)(t.code,{children:`valueLabel`}),`, `,(0,x.jsx)(t.code,{children:`minLabel`}),`, and `,(0,x.jsx)(t.code,{children:`maxLabel`}),` are visual context rather than substitutes for accessible naming.`]}),`
`,(0,x.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,x.jsx)(t.p,{children:`Each thumb follows the React Aria slider keyboard model:`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Tab and Shift+Tab move among thumbs and surrounding controls.`}),`
`,(0,x.jsxs)(t.li,{children:[`Arrow Right and Arrow Up increase the focused value by `,(0,x.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Arrow Left and Arrow Down decrease the focused value by `,(0,x.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,x.jsx)(t.li,{children:`Home and End move the focused thumb to its permitted bounds.`}),`
`,(0,x.jsx)(t.li,{children:`Page Up and Page Down make larger changes.`}),`
`]}),`
`,(0,x.jsx)(t.p,{children:`Directional behavior follows the user's locale where appropriate. Pointer, touch, and keyboard interaction all use the same scale and constraints.`}),`
`,(0,x.jsx)(t.p,{children:`Markers are decorative and hidden from the accessibility tree. Ensure the field label, thumb labels, bounds, step, and formatted values communicate all required information without relying on marker appearance.`}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Use an array only when every entry has a clear, independently adjustable meaning.`}),`
`,(0,x.jsxs)(t.li,{children:[`Keep `,(0,x.jsx)(t.code,{children:`value`}),`, `,(0,x.jsx)(t.code,{children:`thumbLabels`}),`, and `,(0,x.jsx)(t.code,{children:`thumbNames`}),` aligned by index.`]}),`
`,(0,x.jsx)(t.li,{children:`Use thumb labels that explain purpose instead of repeating the current number.`}),`
`,(0,x.jsx)(t.li,{children:`Keep array values in a stable semantic order. If crossing or reordering thumbs would make their meaning ambiguous, enforce the appropriate ordering in product state.`}),`
`,(0,x.jsx)(t.li,{children:`Avoid large value arrays. Every entry creates another focusable control, which increases keyboard effort and cognitive load.`}),`
`,(0,x.jsxs)(t.li,{children:[`Set meaningful `,(0,x.jsx)(t.code,{children:`minValue`}),`, `,(0,x.jsx)(t.code,{children:`maxValue`}),`, and `,(0,x.jsx)(t.code,{children:`step`}),` values. The scale should match the precision users actually need.`]}),`
`,(0,x.jsx)(t.li,{children:`Use markers only when there are few enough steps to scan. Tiny steps across a large range can create an excessive number of DOM elements.`}),`
`,(0,x.jsxs)(t.li,{children:[`Use `,(0,x.jsx)(t.code,{children:`formatOptions`}),` for currency, percentages, measurements, and other locale-sensitive units so values display and announce their meaning.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Use `,(0,x.jsx)(t.code,{children:`description`}),` for persistent guidance and `,(0,x.jsx)(t.code,{children:`isRequired`}),` when a value is required.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Use `,(0,x.jsx)(t.code,{children:`isDisabled`}),` when the value should remain visible but unavailable for interaction.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Use `,(0,x.jsx)(t.code,{children:`onChange`}),` for lightweight immediate feedback and `,(0,x.jsx)(t.code,{children:`onChangeEnd`}),` for expensive requests, filtering, or calculations.`]}),`
`,(0,x.jsx)(t.li,{children:`Use a text-entry control when exact numeric input is essential. A track is best for exploring or adjusting values within known bounds.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(o,{of:m}),`
`,(0,x.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,x.jsx)(t.h3,{id:`a-thumb-is-missing-a-label-or-form-value`,children:`A thumb is missing a label or form value`}),`
`,(0,x.jsxs)(t.p,{children:[`Check the same index in `,(0,x.jsx)(t.code,{children:`thumbLabels`}),` and `,(0,x.jsx)(t.code,{children:`thumbNames`}),`. Each array entry renders a thumb, and its accessible label and form name are read from the corresponding positions. A form name does not replace an accessible label.`]}),`
`,(0,x.jsx)(t.h3,{id:`typescript-reports-the-wrong-callback-value-type`,children:`TypeScript reports the wrong callback value type`}),`
`,(0,x.jsxs)(t.p,{children:[`Keep the controlled or default value and callback signatures consistent. When inference is unavailable, provide the generic explicitly: `,(0,x.jsx)(t.code,{children:`<RangeField<number>>`}),` for a scalar or `,(0,x.jsx)(t.code,{children:`<RangeField<number[]>>`}),` for an array.`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`const [targets, setTargets] = useState<number[]>([20, 80]);

<RangeField<number[]>
  label="Target range"
  value={targets}
  onChange={setTargets}
  thumbLabels={['Minimum target', 'Maximum target']}
/>;
`})}),`
`,(0,x.jsx)(t.h3,{id:`the-controlled-thumbs-do-not-move`,children:`The controlled thumbs do not move`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`value`}),` prop is the source of truth. Update the scalar or array in `,(0,x.jsx)(t.code,{children:`onChange`}),` without changing its intended shape. For arrays, return a new array so application state observes the update.`]}),`
`,(0,x.jsx)(t.h3,{id:`values-snap-unexpectedly`,children:`Values snap unexpectedly`}),`
`,(0,x.jsxs)(t.p,{children:[`Verify that `,(0,x.jsx)(t.code,{children:`step`}),` represents the intended interval from `,(0,x.jsx)(t.code,{children:`minValue`}),`. Every thumb snaps to valid positions on the same configured scale.`]}),`
`,(0,x.jsx)(t.h3,{id:`the-final-marker-is-missing`,children:`The final marker is missing`}),`
`,(0,x.jsxs)(t.p,{children:[`Markers begin at `,(0,x.jsx)(t.code,{children:`minValue`}),` and appear at complete step positions. `,(0,x.jsx)(t.code,{children:`maxValue`}),` receives a marker only when the range is evenly divisible by `,(0,x.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,x.jsx)(t.h3,{id:`markers-are-crowded-or-rendering-is-slow`,children:`Markers are crowded or rendering is slow`}),`
`,(0,x.jsxs)(t.p,{children:[`Increase `,(0,x.jsx)(t.code,{children:`step`}),` or omit `,(0,x.jsx)(t.code,{children:`markers`}),`. Large ranges with small steps can produce many decorative elements even when users cannot distinguish them visually.`]}),`
`,(0,x.jsx)(t.h3,{id:`the-value-or-endpoint-labels-are-blank`,children:`The value or endpoint labels are blank`}),`
`,(0,x.jsxs)(t.p,{children:[`Enable automatic current-value output with `,(0,x.jsx)(t.code,{children:`valueLabel={true}`}),` or provide custom content. `,(0,x.jsx)(t.code,{children:`minLabel`}),` and `,(0,x.jsx)(t.code,{children:`maxLabel`}),` display only explicitly supplied content; neither defaults to a numeric bound or receives `,(0,x.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,x.jsx)(t.h3,{id:`negative-values-do-not-behave-as-expected`,children:`Negative values do not behave as expected`}),`
`,(0,x.jsxs)(t.p,{children:[`Negative values are supported. Set a negative `,(0,x.jsx)(t.code,{children:`minValue`}),` and ensure every scalar or array value remains within the configured bounds.`]}),`
`,(0,x.jsx)(t.h3,{id:`the-range-configuration-is-invalid`,children:`The range configuration is invalid`}),`
`,(0,x.jsxs)(t.p,{children:[`Provide finite bounds where `,(0,x.jsx)(t.code,{children:`minValue`}),` is less than `,(0,x.jsx)(t.code,{children:`maxValue`}),`, a finite `,(0,x.jsx)(t.code,{children:`step`}),` greater than zero, and finite values inside the configured range.`]})]})}function b(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=t(),n(),c(),f()})))()}S();export{b as default};