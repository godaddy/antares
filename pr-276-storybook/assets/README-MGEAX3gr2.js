import{i as e}from"./preload-helper-DvdRENtr.js";import{y as t}from"./iframe-6FzX8S1w.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CNIs2f1z.js";import{t as c}from"./mdx-react-shim-DoJ2Y2VX.js";import{Controlled as l,Default as u,Disabled as d,Form as f,Labels as p,Markers as m,Props as h,n as g,t as _}from"./range-slider.stories-p-B33Wjk.js";var v,y=e((()=>{v=`import { RangeSlider } from '@godaddy/antares';

export function RangeSliderDefaultExample() {
  return (
    <RangeSlider aria-label="Price range" defaultValue={[20, 80]} thumbLabels={['Minimum price', 'Maximum price']} />
  );
}
`})),b,x=e((()=>{b=`import { Flex, RangeSlider } from '@godaddy/antares';
import { useState } from 'react';

export function RangeSliderControlledExample() {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <Flex direction="column" gap="sm">
      <RangeSlider
        label="Price range"
        value={value}
        onChange={setValue}
        thumbLabels={['Minimum price', 'Maximum price']}
        valueLabel
      />
      <p>Current range: {value.join(' – ')}</p>
    </Flex>
  );
}
`})),S,C=e((()=>{S=`import { RangeSlider } from '@godaddy/antares';

export function RangeSliderDisabledExample() {
  return (
    <RangeSlider
      label="Price range"
      defaultValue={[20, 80]}
      thumbLabels={['Minimum price', 'Maximum price']}
      isDisabled
    />
  );
}
`})),w,T=e((()=>{w=`import { RangeSlider } from '@godaddy/antares';

export function RangeSliderLabelsExample() {
  return (
    <RangeSlider
      label="Price range"
      defaultValue={[20, 80]}
      minValue={0}
      maxValue={100}
      step={10}
      thumbLabels={['Minimum price', 'Maximum price']}
      minLabel="Low"
      maxLabel="High"
      description="Choose the minimum and maximum price."
      isRequired
      valueLabel
    />
  );
}
`})),E,D=e((()=>{E=`import { RangeSlider } from '@godaddy/antares';

export function RangeSliderMarkersExample() {
  return (
    <RangeSlider
      aria-label="Price range"
      defaultValue={[20, 80]}
      minValue={0}
      maxValue={100}
      step={20}
      thumbLabels={['Minimum price', 'Maximum price']}
      markers
    />
  );
}
`})),O,k=e((()=>{O=`import { Button, Flex, RangeSlider } from '@godaddy/antares';
import type { FormEvent } from 'react';

export function RangeSliderFormExample() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    alert(\`Min: \${data.get('priceMin')}, Max: \${data.get('priceMax')}\`);
  }

  return (
    <Flex as="form" direction="column" gap="sm" onSubmit={handleSubmit}>
      <RangeSlider
        label="Price range"
        defaultValue={[20, 80]}
        thumbLabels={['Minimum price', 'Maximum price']}
        thumbNames={['priceMin', 'priceMax']}
        valueLabel
      />
      <Button type="submit">Apply filter</Button>
    </Flex>
  );
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`rangeslider`,children:`RangeSlider`}),`
`,(0,M.jsx)(t.p,{children:`RangeSlider lets users choose exactly two values that define the start and end of a bounded numeric interval.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Fixed `,(0,M.jsx)(t.code,{children:`[start, end]`}),` tuple with one independently adjustable thumb per value`]}),`
`,(0,M.jsx)(t.li,{children:`Required accessible labels that distinguish the start and end thumbs`}),`
`,(0,M.jsxs)(t.li,{children:[`Controlled and uncontrolled state with `,(0,M.jsx)(t.code,{children:`onChange`}),` and `,(0,M.jsx)(t.code,{children:`onChangeEnd`}),` callbacks`]}),`
`,(0,M.jsxs)(t.li,{children:[`A `,(0,M.jsx)(t.code,{children:`thumbNames`}),` tuple for native form submission`]}),`
`,(0,M.jsx)(t.li,{children:`Configurable minimum, maximum, step, localized value output, endpoint labels, and markers`}),`
`,(0,M.jsx)(t.li,{children:`Required, disabled, keyboard, pointer, and touch behavior provided through React Aria`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:h}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`RangeSlider`}),` for fixed two-value selections such as price or date bounds.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`value`}),` and `,(0,M.jsx)(t.code,{children:`onChange`}),` when application state owns both ends of the range.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,M.jsx)(t.p,{children:`Disable the range slider when its values are visible but unavailable.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`labels`,children:`Labels`}),`
`,(0,M.jsx)(t.p,{children:`Provide visible context and formatted values when precision matters.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(i,{of:p,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`markers`,children:`Markers`}),`
`,(0,M.jsx)(t.p,{children:`Use markers to show a manageable set of meaningful steps across the range.`}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(i,{of:m,inline:!0}),`
`,(0,M.jsx)(t.h3,{id:`form-submission`,children:`Form submission`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`thumbNames`}),` to submit each thumb as a separate form value.`]}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`RangeSlider`}),` exposes content props for product-specific labels and CSS custom properties for visual adjustments. Prefer these APIs over targeting its internal DOM structure.`]}),`
`,(0,M.jsx)(t.h3,{id:`programmatic-focus`,children:`Programmatic focus`}),`
`,(0,M.jsxs)(t.p,{children:[`Attach a `,(0,M.jsx)(t.code,{children:`RangeSliderRef`}),` when an application needs to move focus after validation or navigate to the field. Calling `,(0,M.jsx)(t.code,{children:`focus()`}),` focuses the start thumb; `,(0,M.jsx)(t.code,{children:`container`}),` exposes the root element for DOM operations such as scrolling.`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`const rangeSliderRef = useRef<RangeSliderRef>(null);

<RangeSlider
  ref={rangeSliderRef}
  label="Price range"
  defaultValue={[20, 80]}
  thumbLabels={['Minimum price', 'Maximum price']}
/>

rangeSliderRef.current?.focus();
rangeSliderRef.current?.container?.scrollIntoView();
`})}),`
`,(0,M.jsx)(t.h3,{id:`value-display`,children:`Value display`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`valueLabel`}),` to place content opposite the field label:`]}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`true`}),` displays both current values using `,(0,M.jsx)(t.code,{children:`formatOptions`}),` and the active locale.`]}),`
`,(0,M.jsx)(t.li,{children:`A React node displays static content.`}),`
`,(0,M.jsx)(t.li,{children:`A render function receives the React Aria slider state and can format both values together.`}),`
`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`<RangeSlider
  label="Price range"
  defaultValue={[25, 75]}
  thumbLabels={['Minimum price', 'Maximum price']}
  valueLabel={({ state }) => \`$\${state.values[0]} – $\${state.values[1]}\`}
/>
`})}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`valueLabel`}),` is visual supporting content. It does not replace the field's accessible name or the individual `,(0,M.jsx)(t.code,{children:`thumbLabels`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`endpoint-labels-and-markers`,children:`Endpoint labels and markers`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`minLabel`}),` and `,(0,M.jsx)(t.code,{children:`maxLabel`}),` are independent `,(0,M.jsx)(t.code,{children:`ReactNode`}),` slots below the track. Provide either one or both; the component does not generate or format their content. Each slot uses at most 40% of the available width so the labels remain separated.`]}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`markers`}),` to render one marker for every valid step beginning at `,(0,M.jsx)(t.code,{children:`minValue`}),`. Markers and thumbs share the same scale and remain aligned. `,(0,M.jsx)(t.code,{children:`minValue`}),`, `,(0,M.jsx)(t.code,{children:`maxValue`}),`, and `,(0,M.jsx)(t.code,{children:`step`}),` determine the marker positions. If the scale would require more than 1,000 markers, no markers are rendered.`]}),`
`,(0,M.jsx)(t.h3,{id:`number-formatting`,children:`Number formatting`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`formatOptions`}),` accepts `,(0,M.jsx)(t.code,{children:`Intl.NumberFormatOptions`}),` and controls localized output for the default value label and assistive-technology announcements.`]}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-tsx`,children:`<RangeSlider
  label="Budget"
  defaultValue={[500, 1500]}
  minValue={0}
  maxValue={2000}
  step={100}
  thumbLabels={['Minimum budget', 'Maximum budget']}
  valueLabel
  formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
/>
`})}),`
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
`,(0,M.jsx)(t.p,{children:`Scope overrides to a local class so other range sliders are unaffected.`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-css`,children:`.priceRange {
  --slider-fill-color: var(--color-input-background-selected);
  --slider-thumb-size: 28px;
}
`})}),`
`,(0,M.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsx)(t.h3,{id:`accessible-names`,children:`Accessible names`}),`
`,(0,M.jsx)(t.p,{children:`Every range slider needs two levels of naming:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Use a visible `,(0,M.jsx)(t.code,{children:`label`}),`, or `,(0,M.jsx)(t.code,{children:`aria-label`}),` when equivalent visible context already exists, to name the range as a whole.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Use the required `,(0,M.jsx)(t.code,{children:`thumbLabels`}),` tuple to distinguish the purpose of each thumb, for example `,(0,M.jsx)(t.code,{children:`['Minimum price', 'Maximum price']`}),`.`]}),`
`]}),`
`,(0,M.jsxs)(t.p,{children:[`Thumb labels should describe meaning rather than repeat the current numbers. `,(0,M.jsx)(t.code,{children:`thumbNames`}),` configures form submission; it does not provide accessible labels.`]}),`
`,(0,M.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,M.jsx)(t.p,{children:`Each thumb follows the React Aria slider keyboard model:`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`Tab and Shift+Tab move between the two thumbs and surrounding controls.`}),`
`,(0,M.jsxs)(t.li,{children:[`Arrow Right and Arrow Up increase the focused value by `,(0,M.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Arrow Left and Arrow Down decrease the focused value by `,(0,M.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,M.jsx)(t.li,{children:`Home moves the focused thumb to its permitted minimum; End moves it to its permitted maximum.`}),`
`,(0,M.jsx)(t.li,{children:`Page Up and Page Down make larger changes.`}),`
`]}),`
`,(0,M.jsx)(t.p,{children:`Directional behavior follows the user's locale where appropriate. Each thumb remains within the configured range.`}),`
`,(0,M.jsx)(t.h3,{id:`value-announcements`,children:`Value announcements`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`formatOptions`}),` so each thumb announces values in the product's unit, such as a currency or percentage. `,(0,M.jsx)(t.code,{children:`valueLabel`}),` is visual output and does not replace either `,(0,M.jsx)(t.code,{children:`thumbLabels`}),` entry.`]}),`
`,(0,M.jsx)(t.p,{children:`Markers are decorative and hidden from the accessibility tree. Do not rely on marker appearance alone to explain available choices.`}),`
`,(0,M.jsx)(t.h3,{id:`instructions-and-required-state`,children:`Instructions and required state`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`description`}),` for persistent guidance that applies to the range. React Aria associates it with both slider thumbs. Set `,(0,M.jsx)(t.code,{children:`isRequired`}),` to display the required indicator in the visible label.`]}),`
`,(0,M.jsx)(t.h3,{id:`disabled-state`,children:`Disabled state`}),`
`,(0,M.jsxs)(t.p,{children:[(0,M.jsx)(t.code,{children:`isDisabled`}),` prevents interaction with both thumbs and exposes the disabled state semantically. Only the slider control is visually muted; the label, endpoint labels, and description remain readable.`]}),`
`,(0,M.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`RangeSlider`}),` when users choose exactly two related values that define a bounded interval, such as a minimum and maximum price.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Write `,(0,M.jsx)(t.code,{children:`thumbLabels`}),` that clearly distinguish the lower and upper purpose. Avoid generic labels such as `,(0,M.jsx)(t.code,{children:`Value 1`}),` and `,(0,M.jsx)(t.code,{children:`Value 2`}),`.`]}),`
`,(0,M.jsx)(t.li,{children:`Keep the tuple in semantic order: the first value and label represent the start or minimum, and the second represent the end or maximum.`}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`thumbNames`}),` when a native form must submit both values. Choose stable, unique names that match the receiving API.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Set `,(0,M.jsx)(t.code,{children:`minValue`}),`, `,(0,M.jsx)(t.code,{children:`maxValue`}),`, and `,(0,M.jsx)(t.code,{children:`step`}),` to meaningful product constraints. Do not expose precision users cannot understand or act on.`]}),`
`,(0,M.jsx)(t.li,{children:`Show markers only for a manageable number of meaningful steps. A dense set of dots is harder to scan than a continuous track.`}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`formatOptions`}),` consistently for the visible value and screen-reader announcement.`]}),`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`onChange`}),` for immediate UI feedback and `,(0,M.jsx)(t.code,{children:`onChangeEnd`}),` for expensive filtering, requests, or calculations.`]}),`
`,(0,M.jsx)(t.li,{children:`Use a single-value control when users choose only one number. Use separate numeric fields when exact entry is more important than visually exploring a range.`}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,M.jsx)(t.h3,{id:`the-thumbs-are-indistinguishable-to-screen-reader-users`,children:`The thumbs are indistinguishable to screen-reader users`}),`
`,(0,M.jsxs)(t.p,{children:[`Provide two specific `,(0,M.jsx)(t.code,{children:`thumbLabels`}),` in start/end order. Labels such as `,(0,M.jsx)(t.code,{children:`Minimum price`}),` and `,(0,M.jsx)(t.code,{children:`Maximum price`}),` communicate purpose even before the current values are announced.`]}),`
`,(0,M.jsx)(t.h3,{id:`form-values-are-missing-or-use-the-wrong-keys`,children:`Form values are missing or use the wrong keys`}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`thumbNames`}),` to the two field names expected by the form handler, in start/end order. Each submitted value needs its own unique name. Remember that these names do not replace `,(0,M.jsx)(t.code,{children:`thumbLabels`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`a-controlled-range-does-not-move`,children:`A controlled range does not move`}),`
`,(0,M.jsxs)(t.p,{children:[`The `,(0,M.jsx)(t.code,{children:`value`}),` tuple is the source of truth. Update it in `,(0,M.jsx)(t.code,{children:`onChange`}),` and preserve its `,(0,M.jsx)(t.code,{children:`[start, end]`}),` shape. Both entries must remain within `,(0,M.jsx)(t.code,{children:`minValue`}),` and `,(0,M.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`values-snap-unexpectedly`,children:`Values snap unexpectedly`}),`
`,(0,M.jsxs)(t.p,{children:[`Verify that `,(0,M.jsx)(t.code,{children:`step`}),` represents the intended interval from `,(0,M.jsx)(t.code,{children:`minValue`}),`. Both thumbs snap to valid positions on the same configured scale.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-final-marker-is-missing`,children:`The final marker is missing`}),`
`,(0,M.jsxs)(t.p,{children:[`Markers begin at `,(0,M.jsx)(t.code,{children:`minValue`}),` and appear at complete step positions. `,(0,M.jsx)(t.code,{children:`maxValue`}),` receives a marker only when the range is evenly divisible by `,(0,M.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`markers-are-too-dense`,children:`Markers are too dense`}),`
`,(0,M.jsxs)(t.p,{children:[`Increase `,(0,M.jsx)(t.code,{children:`step`}),` or omit `,(0,M.jsx)(t.code,{children:`markers`}),`. Markers are most effective when users can visually distinguish the available choices.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-value-or-endpoint-labels-are-blank`,children:`The value or endpoint labels are blank`}),`
`,(0,M.jsxs)(t.p,{children:[`Enable the current range with `,(0,M.jsx)(t.code,{children:`valueLabel={true}`}),` or provide custom output. `,(0,M.jsx)(t.code,{children:`minLabel`}),` and `,(0,M.jsx)(t.code,{children:`maxLabel`}),` display only explicitly supplied content; they are not generated from the numeric bounds and are not affected by `,(0,M.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,M.jsx)(t.h3,{id:`negative-ranges-do-not-behave-as-expected`,children:`Negative ranges do not behave as expected`}),`
`,(0,M.jsxs)(t.p,{children:[`Negative values are supported. Set an appropriate negative `,(0,M.jsx)(t.code,{children:`minValue`}),` and keep both tuple entries inside the configured bounds.`]}),`
`,(0,M.jsx)(t.h3,{id:`the-range-configuration-is-invalid`,children:`The range configuration is invalid`}),`
`,(0,M.jsxs)(t.p,{children:[`Provide finite bounds where `,(0,M.jsx)(t.code,{children:`minValue`}),` is less than `,(0,M.jsx)(t.code,{children:`maxValue`}),`, a finite `,(0,M.jsx)(t.code,{children:`step`}),` greater than zero, and a two-number value in semantic start/end order.`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};