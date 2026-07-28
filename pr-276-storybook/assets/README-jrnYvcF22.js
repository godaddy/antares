import{i as e}from"./preload-helper-DvdRENtr.js";import{y as t}from"./iframe-DU54qsde.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DGorHbCd.js";import{t as c}from"./mdx-react-shim-DLYVPQu0.js";import{Controlled as l,Default as u,Disabled as d,Labels as f,Markers as p,Props as m,Range as h,n as g,t as _}from"./range-field.stories-Dm5BWFYe.js";var v,y=e((()=>{v=`import { RangeField } from '@godaddy/antares';

export function RangeFieldDefaultExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} />;
}
`})),b,x=e((()=>{b=`import { Flex, RangeField } from '@godaddy/antares';
import { useState } from 'react';

export function RangeFieldControlledExample() {
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
}
`})),S,C=e((()=>{S=`import { RangeField } from '@godaddy/antares';

export function RangeFieldDisabledExample() {
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
}
`})),w,T=e((()=>{w=`import { RangeField } from '@godaddy/antares';

export function RangeFieldLabelsExample() {
  return (
    <RangeField
      label="Price range"
      defaultValue={[25, 75]}
      thumbLabels={['Minimum price', 'Maximum price']}
      valueLabel
      minLabel="Low"
      maxLabel="High"
      description="Choose the minimum and maximum price."
    />
  );
}
`})),E,D=e((()=>{E=`import { RangeField } from '@godaddy/antares';

export function RangeFieldMarkersExample() {
  return <RangeField aria-label="Volume" defaultValue={50} minValue={0} maxValue={100} step={10} markers />;
}
`})),O,k=e((()=>{O=`import { RangeField } from '@godaddy/antares';

export function RangeFieldRangeExample() {
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
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`rangefield`,children:`RangeField`}),`
`,(0,M.jsx)(t.p,{children:`RangeField lets users select one or multiple independently adjustable numeric values on a shared bounded scale.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Generic `,(0,M.jsx)(t.code,{children:`number`}),` or `,(0,M.jsx)(t.code,{children:`number[]`}),` value with one thumb for each array entry`]}),`
`,(0,M.jsxs)(t.li,{children:[`Type-aligned controlled and uncontrolled state, including `,(0,M.jsx)(t.code,{children:`onChange`}),` and `,(0,M.jsx)(t.code,{children:`onChangeEnd`})]}),`
`,(0,M.jsx)(t.li,{children:`Per-thumb accessible labels and native form names matched by array index`}),`
`,(0,M.jsx)(t.li,{children:`Configurable minimum, maximum, and step values, including negative numeric ranges`}),`
`,(0,M.jsx)(t.li,{children:`Optional localized value output, endpoint labels, description, and markers`}),`
`,(0,M.jsx)(t.li,{children:`Required, disabled, keyboard, pointer, and touch behavior provided through React Aria`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:m}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`RangeField`}),` infers its generic value type from `,(0,M.jsx)(t.code,{children:`value`}),` or `,(0,M.jsx)(t.code,{children:`defaultValue`}),`, keeping `,(0,M.jsx)(t.code,{children:`onChange`}),` and `,(0,M.jsx)(t.code,{children:`onChangeEnd`}),` aligned with either `,(0,M.jsx)(t.code,{children:`number`}),` or `,(0,M.jsx)(t.code,{children:`number[]`}),`. Provide the generic explicitly when inference is not available, for example `,(0,M.jsx)(t.code,{children:`<RangeField<number[]> />`}),`.`]}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,M.jsx)(t.p,{children:`Use the default presentation for one adjustable value on a continuous track.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`onChange`}),` for immediate updates and `,(0,M.jsx)(t.code,{children:`onChangeEnd`}),` for work that should run after interaction finishes.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`isDisabled`}),` when the value is visible but unavailable for interaction.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`labels`,children:`Labels`}),`
`,(0,M.jsx)(t.p,{children:`Combine an input label, value label, range labels, and helper text when users need additional context.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`markers`,children:`Markers`}),`
`,(0,M.jsx)(t.p,{children:`Use markers to expose a manageable set of discrete steps for a single value.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,M.jsx)(t.p,{children:`Pass two values to render a range with two thumbs and step markers.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`RangeField`}),` supports scalar and array values, so customize it according to the number and meaning of the rendered thumbs. Prefer its content props and CSS custom properties over targeting the internal DOM structure.`]}),`
`,(0,M.jsx)(t.h3,{id:`value-shape-and-thumbs`,children:`Value shape and thumbs`}),`
`,(0,M.jsxs)(t.p,{children:[`A `,(0,M.jsx)(t.code,{children:`number`}),` renders one thumb. A `,(0,M.jsx)(t.code,{children:`number[]`}),` renders one thumb per array entry. The generic type keeps `,(0,M.jsx)(t.code,{children:`value`}),`, `,(0,M.jsx)(t.code,{children:`defaultValue`}),`, `,(0,M.jsx)(t.code,{children:`onChange`}),`, and `,(0,M.jsx)(t.code,{children:`onChangeEnd`}),` aligned:`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`<RangeField<number[]>
  label="Target band"
  defaultValue={[20, 80]}
  thumbLabels={['Lower target', 'Upper target']}
/>
`})}),`
`,(0,M.jsxs)(t.p,{children:[`TypeScript usually infers the type from `,(0,M.jsx)(t.code,{children:`value`}),` or `,(0,M.jsx)(t.code,{children:`defaultValue`}),`. Supply `,(0,M.jsx)(t.code,{children:`<number>`}),` or `,(0,M.jsx)(t.code,{children:`<number[]>`}),` explicitly when the initial props do not provide enough information for inference.`]}),`
`,(0,M.jsx)(t.h3,{id:`programmatic-focus`,children:`Programmatic focus`}),`
`,(0,M.jsxs)(t.p,{children:[`Attach a `,(0,M.jsx)(t.code,{children:`RangeFieldRef`}),` when an application needs to move focus after validation or navigate to the field. Calling `,(0,M.jsx)(t.code,{children:`focus()`}),` focuses the first thumb; `,(0,M.jsx)(t.code,{children:`container`}),` exposes the root element for DOM operations such as scrolling.`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`const rangeFieldRef = useRef<RangeFieldRef>(null);

<RangeField
  ref={rangeFieldRef}
  label="Price range"
  defaultValue={[20, 80]}
  thumbLabels={['Minimum price', 'Maximum price']}
/>

rangeFieldRef.current?.focus();
rangeFieldRef.current?.container?.scrollIntoView();
`})}),`
`,(0,M.jsx)(t.h3,{id:`value-display`,children:`Value display`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`valueLabel`}),` to place content opposite the field label:`]}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`true`}),` displays all current values using `,(0,M.jsx)(t.code,{children:`formatOptions`}),` and the active locale.`]}),`
`,(0,M.jsx)(t.li,{children:`A React node displays static content.`}),`
`,(0,M.jsx)(t.li,{children:`A render function receives the React Aria slider state and can derive output from every current value.`}),`
`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`<RangeField<number[]>
  label="Working range"
  defaultValue={[30, 70]}
  thumbLabels={['Range start', 'Range end']}
  valueLabel={({ state }) => state.values.join(' – ')}
/>
`})}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`valueLabel`}),` is visual supporting content. It does not name the field or its individual thumbs.`]}),`
`,(0,M.jsx)(t.h3,{id:`endpoint-labels-and-markers`,children:`Endpoint labels and markers`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`minLabel`}),` and `,(0,M.jsx)(t.code,{children:`maxLabel`}),` are independent `,(0,M.jsx)(t.code,{children:`ReactNode`}),` slots below the track. Provide either one or both; the component does not generate or format their content. Each slot uses at most 40% of the available width so the sides remain visually separated.`]}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`markers`}),` to render one marker for every valid step beginning at `,(0,M.jsx)(t.code,{children:`minValue`}),`. Marker positions use the same scale as every thumb. `,(0,M.jsx)(t.code,{children:`minValue`}),`, `,(0,M.jsx)(t.code,{children:`maxValue`}),`, and `,(0,M.jsx)(t.code,{children:`step`}),` determine their count and spacing; `,(0,M.jsx)(t.code,{children:`markers`}),` does not accept a custom list or count. If the scale would require more than 1,000 markers, no markers are rendered.`]}),`
`,(0,M.jsx)(t.h3,{id:`number-formatting`,children:`Number formatting`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`formatOptions`}),` accepts `,(0,M.jsx)(t.code,{children:`Intl.NumberFormatOptions`}),` and controls localized output for the default value label and assistive-technology announcements. It does not format `,(0,M.jsx)(t.code,{children:`minLabel`}),` or `,(0,M.jsx)(t.code,{children:`maxLabel`}),` because those props accept arbitrary React content.`]}),`
`,(0,M.jsx)(t.h3,{id:`visual-styling`,children:`Visual styling`}),`
`,(0,M.jsxs)(t.p,{children:[`Pass `,(0,M.jsx)(t.code,{children:`className`}),` to add a class to the root element. The following custom properties are the supported styling surface:`]}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-track-height`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-fill-height`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-thumb-size`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-marker-size`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-fill-color`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-track-color`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-thumb-bg`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-thumb-border`})}),`
`,(0,M.jsx)(t.li,{children:(0,M.jsx)(t.code,{children:`--slider-label-color`})}),`
`]}),`
`,(0,M.jsx)(t.p,{children:`Scope overrides to a local class so other range fields are unaffected.`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-css`,children:`.thresholdField {
  --slider-fill-color: var(--color-input-background-selected);
  --slider-marker-size: 6px;
}
`})}),`
`,(0,M.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsx)(t.h3,{id:`accessible-names`,children:`Accessible names`}),`
`,(0,M.jsxs)(t.p,{children:[`Every range field needs a name as a whole. Prefer a visible `,(0,M.jsx)(t.code,{children:`label`}),`; use `,(0,M.jsx)(t.code,{children:`aria-label`}),` only when equivalent visible context already exists.`]}),`
`,(0,M.jsxs)(t.p,{children:[`When using an array, provide one descriptive `,(0,M.jsx)(t.code,{children:`thumbLabels`}),` entry for every value. Entries are matched by index, so the labels must remain aligned when values are added, removed, or reordered. Describe each thumb's purpose, such as `,(0,M.jsx)(t.code,{children:`Lower warning threshold`}),`, rather than its current number.`]}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`thumbNames`}),` configures native form field names and does not provide accessible labels. Likewise, `,(0,M.jsx)(t.code,{children:`valueLabel`}),`, `,(0,M.jsx)(t.code,{children:`minLabel`}),`, and `,(0,M.jsx)(t.code,{children:`maxLabel`}),` are visual context rather than substitutes for accessible naming.`]}),`
`,(0,M.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,M.jsx)(t.p,{children:`Each thumb follows the React Aria slider keyboard model:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Tab and Shift+Tab move among thumbs and surrounding controls.`}),`
`,(0,M.jsxs)(t.li,{children:[`Arrow Right and Arrow Up increase the focused value by `,(0,M.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Arrow Left and Arrow Down decrease the focused value by `,(0,M.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,M.jsx)(t.li,{children:`Home and End move the focused thumb to its permitted bounds.`}),`
`,(0,M.jsx)(t.li,{children:`Page Up and Page Down make larger changes.`}),`
`]}),`
`,(0,M.jsx)(t.p,{children:`Directional behavior follows the user's locale where appropriate. Pointer, touch, and keyboard interaction all use the same scale and constraints.`}),`
`,(0,M.jsx)(t.h3,{id:`value-announcements`,children:`Value announcements`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`formatOptions`}),` to expose the meaning and unit of each number to assistive technology. A percentage, currency, or measurement should be announced in that format rather than as an unexplained raw value.`]}),`
`,(0,M.jsx)(t.p,{children:`Markers are decorative and hidden from the accessibility tree. Ensure the field label, thumb labels, bounds, step, and formatted values communicate all required information without relying on marker appearance.`}),`
`,(0,M.jsx)(t.h3,{id:`instructions-and-required-state`,children:`Instructions and required state`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`description`}),` for persistent guidance that applies to every thumb. React Aria associates it with each slider input. Set `,(0,M.jsx)(t.code,{children:`isRequired`}),` to display the required indicator in the visible label.`]}),`
`,(0,M.jsx)(t.h3,{id:`disabled-state`,children:`Disabled state`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`isDisabled`}),` prevents interaction with every thumb and exposes the disabled state semantically. The slider control is visually muted while the label, endpoint labels, and description remain readable.`]}),`
`,(0,M.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Use a scalar value for one adjustable number and an array only when each entry has a clear, independently adjustable meaning.`}),`
`,(0,M.jsxs)(t.li,{children:[`Keep `,(0,M.jsx)(t.code,{children:`value`}),`, `,(0,M.jsx)(t.code,{children:`thumbLabels`}),`, and `,(0,M.jsx)(t.code,{children:`thumbNames`}),` aligned by index. Treat them as parallel collections whenever values are added, removed, or reordered.`]}),`
`,(0,M.jsx)(t.li,{children:`Use thumb labels that explain purpose instead of repeating the current number.`}),`
`,(0,M.jsx)(t.li,{children:`Keep array values in a stable semantic order. If crossing or reordering thumbs would make their meaning ambiguous, enforce the appropriate ordering in product state.`}),`
`,(0,M.jsx)(t.li,{children:`Avoid large value arrays. Every entry creates another focusable control, which increases keyboard effort and cognitive load.`}),`
`,(0,M.jsxs)(t.li,{children:[`Set meaningful `,(0,M.jsx)(t.code,{children:`minValue`}),`, `,(0,M.jsx)(t.code,{children:`maxValue`}),`, and `,(0,M.jsx)(t.code,{children:`step`}),` values. The scale should match the precision users actually need.`]}),`
`,(0,M.jsx)(t.li,{children:`Use markers only when there are few enough steps to scan. Tiny steps across a large range can create an excessive number of DOM elements.`}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`formatOptions`}),` for currency, percentages, measurements, and other locale-sensitive units.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`onChange`}),` for lightweight immediate feedback and `,(0,M.jsx)(t.code,{children:`onChangeEnd`}),` for expensive requests, filtering, or calculations.`]}),`
`,(0,M.jsx)(t.li,{children:`Use a text-entry control when exact numeric input is essential. A track is best for exploring or adjusting values within known bounds.`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,M.jsx)(t.h3,{id:`a-thumb-is-missing-a-label-or-form-value`,children:`A thumb is missing a label or form value`}),`
`,(0,M.jsxs)(t.p,{children:[`Check the same index in `,(0,M.jsx)(t.code,{children:`thumbLabels`}),` and `,(0,M.jsx)(t.code,{children:`thumbNames`}),`. Each array entry renders a thumb, and its accessible label and form name are read from the corresponding positions. A form name does not replace an accessible label.`]}),`
`,(0,M.jsx)(t.h3,{id:`typescript-reports-the-wrong-callback-value-type`,children:`TypeScript reports the wrong callback value type`}),`
`,(0,M.jsxs)(t.p,{children:[`Keep the controlled or default value and callback signatures consistent. When inference is unavailable, provide the generic explicitly: `,(0,M.jsx)(t.code,{children:`<RangeField<number>>`}),` for a scalar or `,(0,M.jsx)(t.code,{children:`<RangeField<number[]>>`}),` for an array.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-controlled-thumbs-do-not-move`,children:`The controlled thumbs do not move`}),`
`,(0,M.jsxs)(t.p,{children:[`The `,(0,M.jsx)(t.code,{children:`value`}),` prop is the source of truth. Update the scalar or array in `,(0,M.jsx)(t.code,{children:`onChange`}),` without changing its intended shape. For arrays, return a new array so application state observes the update.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-wrong-thumb-changes-meaning`,children:`The wrong thumb changes meaning`}),`
`,(0,M.jsxs)(t.p,{children:[`Values, `,(0,M.jsx)(t.code,{children:`thumbLabels`}),`, and `,(0,M.jsx)(t.code,{children:`thumbNames`}),` are associated by index. Update all parallel arrays together and keep their semantic order stable.`]}),`
`,(0,M.jsx)(t.h3,{id:`values-snap-unexpectedly`,children:`Values snap unexpectedly`}),`
`,(0,M.jsxs)(t.p,{children:[`Verify that `,(0,M.jsx)(t.code,{children:`step`}),` represents the intended interval from `,(0,M.jsx)(t.code,{children:`minValue`}),`. Every thumb snaps to valid positions on the same configured scale.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-final-marker-is-missing`,children:`The final marker is missing`}),`
`,(0,M.jsxs)(t.p,{children:[`Markers begin at `,(0,M.jsx)(t.code,{children:`minValue`}),` and appear at complete step positions. `,(0,M.jsx)(t.code,{children:`maxValue`}),` receives a marker only when the range is evenly divisible by `,(0,M.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`markers-are-crowded-or-rendering-is-slow`,children:`Markers are crowded or rendering is slow`}),`
`,(0,M.jsxs)(t.p,{children:[`Increase `,(0,M.jsx)(t.code,{children:`step`}),` or omit `,(0,M.jsx)(t.code,{children:`markers`}),`. Large ranges with small steps can produce many decorative elements even when users cannot distinguish them visually.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-value-or-endpoint-labels-are-blank`,children:`The value or endpoint labels are blank`}),`
`,(0,M.jsxs)(t.p,{children:[`Enable automatic current-value output with `,(0,M.jsx)(t.code,{children:`valueLabel={true}`}),` or provide custom content. `,(0,M.jsx)(t.code,{children:`minLabel`}),` and `,(0,M.jsx)(t.code,{children:`maxLabel`}),` display only explicitly supplied content; neither defaults to a numeric bound or receives `,(0,M.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`negative-values-do-not-behave-as-expected`,children:`Negative values do not behave as expected`}),`
`,(0,M.jsxs)(t.p,{children:[`Negative values are supported. Set a negative `,(0,M.jsx)(t.code,{children:`minValue`}),` and ensure every scalar or array value remains within the configured bounds.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-range-configuration-is-invalid`,children:`The range configuration is invalid`}),`
`,(0,M.jsxs)(t.p,{children:[`Provide finite bounds where `,(0,M.jsx)(t.code,{children:`minValue`}),` is less than `,(0,M.jsx)(t.code,{children:`maxValue`}),`, a finite `,(0,M.jsx)(t.code,{children:`step`}),` greater than zero, and finite values inside the configured range.`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};