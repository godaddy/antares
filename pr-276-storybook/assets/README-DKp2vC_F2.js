import{i as e}from"./preload-helper-DvdRENtr.js";import{y as t}from"./iframe-DhuG6jpW.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-D8d9ding.js";import{t as c}from"./mdx-react-shim-BOtSxo7g.js";import{Controlled as l,Default as u,Disabled as d,Labels as f,Markers as p,Props as m,n as h,t as g}from"./slider.stories-DuAamoLG.js";var _,v=e((()=>{_=`import { Slider } from '@godaddy/antares';

export function SliderDefaultExample() {
  return <Slider label="Volume" defaultValue={50} />;
}
`})),y,b=e((()=>{y=`import { Flex, Slider } from '@godaddy/antares';
import { useState } from 'react';

export function SliderControlledExample() {
  const [value, setValue] = useState(30);

  return (
    <Flex direction="column" gap="sm">
      <Slider label="Opacity" value={value} onChange={setValue} valueLabel />
      <p>Current value: {value}</p>
    </Flex>
  );
}
`})),x,S=e((()=>{x=`import { Slider } from '@godaddy/antares';

export function SliderDisabledExample() {
  return <Slider aria-label="Volume" defaultValue={40} isDisabled />;
}
`})),C,w=e((()=>{C=`import { Slider } from '@godaddy/antares';

export function SliderLabelsExample() {
  return (
    <Slider
      label="Quality"
      defaultValue={6}
      valueLabel
      minValue={0}
      maxValue={8}
      step={1}
      minLabel="Low"
      maxLabel="High"
      description="Choose the desired quality level."
      isRequired
    />
  );
}
`})),T,E=e((()=>{T=`import { Slider } from '@godaddy/antares';

export function SliderMarkersExample() {
  return <Slider aria-label="Quality" defaultValue={6} minValue={0} maxValue={8} step={1} markers />;
}
`}));function D(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(o,{of:h,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`slider`,children:`Slider`}),`
`,(0,k.jsx)(t.p,{children:`Slider lets users choose one numeric value within fixed bounds using pointer, touch, or keyboard input.`}),`
`,(0,k.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[`Single `,(0,k.jsx)(t.code,{children:`number`}),` value with configurable minimum, maximum, and step`]}),`
`,(0,k.jsxs)(t.li,{children:[`Controlled and uncontrolled state with `,(0,k.jsx)(t.code,{children:`onChange`}),` and `,(0,k.jsx)(t.code,{children:`onChangeEnd`}),` callbacks`]}),`
`,(0,k.jsx)(t.li,{children:`Optional localized value output, endpoint labels, description, and error message`}),`
`,(0,k.jsx)(t.li,{children:`Optional markers generated from the configured step positions`}),`
`,(0,k.jsx)(t.li,{children:`Required, disabled, keyboard, pointer, and touch behavior provided through React Aria`}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(a,{of:m}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`Slider`}),` when the user chooses one value, such as volume or quality.`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:_}),`
`,(0,k.jsx)(i,{of:u,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`value`}),` and `,(0,k.jsx)(t.code,{children:`onChange`}),` when application state owns the selection.`]}),`
`,(0,k.jsx)(r,{language:`tsx`,code:y}),`
`,(0,k.jsx)(i,{of:l,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,k.jsx)(t.p,{children:`Disable the slider when the value is visible but unavailable.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:x}),`
`,(0,k.jsx)(i,{of:d,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`labels`,children:`Labels`}),`
`,(0,k.jsx)(t.p,{children:`Display the current value and endpoints when users need more context.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:C}),`
`,(0,k.jsx)(i,{of:f,inline:!0}),`
`,(0,k.jsx)(t.h3,{id:`markers`,children:`Markers`}),`
`,(0,k.jsx)(t.p,{children:`Use markers for a small set of meaningful steps.`}),`
`,(0,k.jsx)(r,{language:`tsx`,code:T}),`
`,(0,k.jsx)(i,{of:p,inline:!0}),`
`,(0,k.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`Slider`}),` provides content props for common product requirements and CSS custom properties for visual adjustments. Prefer these APIs over targeting its internal DOM structure.`]}),`
`,(0,k.jsx)(t.h3,{id:`programmatic-focus`,children:`Programmatic focus`}),`
`,(0,k.jsxs)(t.p,{children:[`Attach a `,(0,k.jsx)(t.code,{children:`SliderRef`}),` when an application needs to move focus after validation or navigate to the field. Calling `,(0,k.jsx)(t.code,{children:`focus()`}),` focuses the thumb; `,(0,k.jsx)(t.code,{children:`container`}),` exposes the root element for DOM operations such as scrolling.`]}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`const sliderRef = useRef<SliderRef>(null);

<Slider ref={sliderRef} label="Volume" defaultValue={50} />

sliderRef.current?.focus();
sliderRef.current?.container?.scrollIntoView();
`})}),`
`,(0,k.jsx)(t.h3,{id:`value-display`,children:`Value display`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`valueLabel`}),` to place content opposite the field label:`]}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`true`}),` displays the current value using `,(0,k.jsx)(t.code,{children:`formatOptions`}),` and the active locale.`]}),`
`,(0,k.jsx)(t.li,{children:`A React node displays static content, such as a unit or status.`}),`
`,(0,k.jsx)(t.li,{children:`A render function receives the React Aria slider state and can derive custom content from the current value.`}),`
`]}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<Slider
  label="Storage"
  defaultValue={50}
  valueLabel={({ state }) => \`\${state.values[0]} GB\`}
/>
`})}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`valueLabel`}),` is visual supporting content. It does not replace the control's `,(0,k.jsx)(t.code,{children:`label`}),` or `,(0,k.jsx)(t.code,{children:`aria-label`}),`.`]}),`
`,(0,k.jsx)(t.h3,{id:`endpoint-labels-and-markers`,children:`Endpoint labels and markers`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`minLabel`}),` and `,(0,k.jsx)(t.code,{children:`maxLabel`}),` are independent `,(0,k.jsx)(t.code,{children:`ReactNode`}),` slots below the track. Provide either one or both; the component does not generate or format their content. Each slot uses at most 40% of the available width so long labels can wrap without colliding in the center.`]}),`
`,(0,k.jsxs)(t.p,{children:[`Set `,(0,k.jsx)(t.code,{children:`markers`}),` to render one marker for every valid step beginning at `,(0,k.jsx)(t.code,{children:`minValue`}),`. Marker positions always use the same scale as the thumb, so they remain aligned. Use `,(0,k.jsx)(t.code,{children:`minValue`}),`, `,(0,k.jsx)(t.code,{children:`maxValue`}),`, and `,(0,k.jsx)(t.code,{children:`step`}),` to control their number and spacing.`]}),`
`,(0,k.jsx)(t.h3,{id:`number-formatting`,children:`Number formatting`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`formatOptions`}),` accepts `,(0,k.jsx)(t.code,{children:`Intl.NumberFormatOptions`}),` and controls localized value output, including the default `,(0,k.jsx)(t.code,{children:`valueLabel`}),` and the value announced by assistive technology.`]}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<Slider
  label="Budget"
  defaultValue={50}
  minValue={0}
  maxValue={100}
  step={10}
  valueLabel
  formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
/>
`})}),`
`,(0,k.jsx)(t.h3,{id:`visual-styling`,children:`Visual styling`}),`
`,(0,k.jsxs)(t.p,{children:[`Pass `,(0,k.jsx)(t.code,{children:`className`}),` to add a class to the root element. The following custom properties are the supported styling surface:`]}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-track-height`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-fill-height`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-thumb-size`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-marker-size`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-fill-color`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-track-color`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-thumb-bg`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-thumb-border`})}),`
`,(0,k.jsx)(t.li,{children:(0,k.jsx)(t.code,{children:`--slider-label-color`})}),`
`]}),`
`,(0,k.jsx)(t.p,{children:`Scope overrides to a local class so other sliders are unaffected.`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-css`,children:`.volumeSlider {
  --slider-fill-color: var(--color-control-chosen-background);
  --slider-thumb-size: 28px;
}
`})}),`
`,(0,k.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,k.jsx)(t.h3,{id:`accessible-name`,children:`Accessible name`}),`
`,(0,k.jsxs)(t.p,{children:[`Every slider needs an accessible name. Prefer a concise visible `,(0,k.jsx)(t.code,{children:`label`}),` because it gives the same context to sighted users and assistive technology. If the surrounding interface already supplies an equivalent visible label, provide `,(0,k.jsx)(t.code,{children:`aria-label`}),` instead. Do not use `,(0,k.jsx)(t.code,{children:`valueLabel`}),`, `,(0,k.jsx)(t.code,{children:`minLabel`}),`, `,(0,k.jsx)(t.code,{children:`maxLabel`}),`, or placeholder-like nearby text as the only name.`]}),`
`,(0,k.jsx)(t.h3,{id:`keyboard-interaction`,children:`Keyboard interaction`}),`
`,(0,k.jsx)(t.p,{children:`The thumb follows the React Aria slider keyboard model:`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[`Arrow Right and Arrow Up increase the value by `,(0,k.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,k.jsxs)(t.li,{children:[`Arrow Left and Arrow Down decrease the value by `,(0,k.jsx)(t.code,{children:`step`}),`.`]}),`
`,(0,k.jsxs)(t.li,{children:[`Home moves to `,(0,k.jsx)(t.code,{children:`minValue`}),`; End moves to `,(0,k.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,k.jsx)(t.li,{children:`Page Up and Page Down make larger changes.`}),`
`,(0,k.jsx)(t.li,{children:`Tab moves focus into and out of the control.`}),`
`]}),`
`,(0,k.jsx)(t.p,{children:`Directional behavior follows the user's locale where appropriate. Pointer, touch, and keyboard input all update the same value scale.`}),`
`,(0,k.jsx)(t.h3,{id:`value-announcements`,children:`Value announcements`}),`
`,(0,k.jsxs)(t.p,{children:[`Choose `,(0,k.jsx)(t.code,{children:`formatOptions`}),` that communicates the meaning of the number—not only its appearance. For example, announce `,(0,k.jsx)(t.code,{children:`50`}),` as 50 US dollars when the value represents a budget. The formatted value is exposed to assistive technology as the thumb changes.`]}),`
`,(0,k.jsx)(t.p,{children:`Markers are decorative and are hidden from the accessibility tree. Their meaning must therefore be represented by the slider's label, bounds, step, and formatted value.`}),`
`,(0,k.jsx)(t.h3,{id:`instructions-required-state-and-errors`,children:`Instructions, required state, and errors`}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`description`}),` for persistent guidance that helps users make a selection. Set `,(0,k.jsx)(t.code,{children:`isRequired`}),` when the slider is required, and use `,(0,k.jsx)(t.code,{children:`errorMessage`}),` with the component's validation state to explain how to correct an invalid selection. React Aria associates this content with the control; error messages should state the problem and the corrective action.`]}),`
`,(0,k.jsx)(t.h3,{id:`disabled-state`,children:`Disabled state`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`isDisabled`}),` prevents pointer and keyboard changes and exposes the disabled state semantically. The slider control is visually muted while its label, endpoint labels, description, and error text remain readable.`]}),`
`,(0,k.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[`Use `,(0,k.jsx)(t.code,{children:`Slider`}),` for one approximate numeric choice within known bounds, such as volume, zoom, or intensity.`]}),`
`,(0,k.jsx)(t.li,{children:`Use a numeric text field when users must enter or verify an exact value efficiently. A slider should not be the only input for high-precision or unbounded data.`}),`
`,(0,k.jsxs)(t.li,{children:[`Set meaningful `,(0,k.jsx)(t.code,{children:`minValue`}),`, `,(0,k.jsx)(t.code,{children:`maxValue`}),`, and `,(0,k.jsx)(t.code,{children:`step`}),` values. The step should match the smallest choice users need to make.`]}),`
`,(0,k.jsx)(t.li,{children:`Show markers only when the available steps are few enough to scan. Dense markers add visual noise without improving comprehension.`}),`
`,(0,k.jsxs)(t.li,{children:[`Add `,(0,k.jsx)(t.code,{children:`minLabel`}),` and `,(0,k.jsx)(t.code,{children:`maxLabel`}),` when the endpoints have product meaning that the numeric bounds alone do not explain.`]}),`
`,(0,k.jsxs)(t.li,{children:[`Use `,(0,k.jsx)(t.code,{children:`formatOptions`}),` for currencies, percentages, units, or other locale-sensitive values.`]}),`
`,(0,k.jsxs)(t.li,{children:[`Use `,(0,k.jsx)(t.code,{children:`onChange`}),` for immediate UI feedback. Put expensive operations, such as network requests or large calculations, in `,(0,k.jsx)(t.code,{children:`onChangeEnd`}),` so they run after the interaction finishes.`]}),`
`,(0,k.jsxs)(t.li,{children:[`In controlled usage, update `,(0,k.jsx)(t.code,{children:`value`}),` from `,(0,k.jsx)(t.code,{children:`onChange`}),`; otherwise the thumb cannot reflect the user's change.`]}),`
`,(0,k.jsxs)(t.li,{children:[`Do not use this component to select a minimum and maximum simultaneously. `,(0,k.jsx)(t.code,{children:`Slider`}),` intentionally represents one number.`]}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,k.jsx)(t.h3,{id:`the-thumb-snaps-to-unexpected-values`,children:`The thumb snaps to unexpected values`}),`
`,(0,k.jsxs)(t.p,{children:[`Check that `,(0,k.jsx)(t.code,{children:`step`}),` represents the intended interval from `,(0,k.jsx)(t.code,{children:`minValue`}),`. Slider values snap to valid steps within the configured bounds. Decimal steps should use values appropriate for the precision your product displays.`]}),`
`,(0,k.jsx)(t.h3,{id:`the-final-marker-is-missing`,children:`The final marker is missing`}),`
`,(0,k.jsxs)(t.p,{children:[`Markers begin at `,(0,k.jsx)(t.code,{children:`minValue`}),` and are generated at each complete step. A marker appears at `,(0,k.jsx)(t.code,{children:`maxValue`}),` only when the range is evenly divisible by `,(0,k.jsx)(t.code,{children:`step`}),`. For example, a range from `,(0,k.jsx)(t.code,{children:`0`}),` to `,(0,k.jsx)(t.code,{children:`10`}),` with a step of `,(0,k.jsx)(t.code,{children:`3`}),` ends its markers at `,(0,k.jsx)(t.code,{children:`9`}),`.`]}),`
`,(0,k.jsx)(t.h3,{id:`markers-are-crowded-or-affect-rendering-performance`,children:`Markers are crowded or affect rendering performance`}),`
`,(0,k.jsxs)(t.p,{children:[`Increase `,(0,k.jsx)(t.code,{children:`step`}),` or omit `,(0,k.jsx)(t.code,{children:`markers`}),`. Avoid producing hundreds of decorative positions; use a continuous track when every step is not useful to scan.`]}),`
`,(0,k.jsx)(t.h3,{id:`the-controlled-thumb-does-not-move`,children:`The controlled thumb does not move`}),`
`,(0,k.jsxs)(t.p,{children:[`The `,(0,k.jsx)(t.code,{children:`value`}),` prop is the source of truth. Update that value in `,(0,k.jsx)(t.code,{children:`onChange`}),`, and ensure it remains between `,(0,k.jsx)(t.code,{children:`minValue`}),` and `,(0,k.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,k.jsx)(t.h3,{id:`the-value-label-is-not-visible`,children:`The value label is not visible`}),`
`,(0,k.jsxs)(t.p,{children:[`Pass `,(0,k.jsx)(t.code,{children:`valueLabel={true}`}),`, a React node, or a render function. `,(0,k.jsx)(t.code,{children:`formatOptions`}),` only formats a value; it does not enable the visual value label.`]}),`
`,(0,k.jsx)(t.h3,{id:`an-endpoint-label-is-blank`,children:`An endpoint label is blank`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`minLabel`}),` and `,(0,k.jsx)(t.code,{children:`maxLabel`}),` render only the content explicitly provided. They do not default to `,(0,k.jsx)(t.code,{children:`minValue`}),` or `,(0,k.jsx)(t.code,{children:`maxValue`}),`, and `,(0,k.jsx)(t.code,{children:`formatOptions`}),` is not applied to them.`]}),`
`,(0,k.jsx)(t.h3,{id:`negative-values-do-not-behave-as-expected`,children:`Negative values do not behave as expected`}),`
`,(0,k.jsxs)(t.p,{children:[`Negative values are supported. Set a negative `,(0,k.jsx)(t.code,{children:`minValue`}),` and ensure the controlled or default value is within the configured range.`]}),`
`,(0,k.jsx)(t.h3,{id:`the-range-is-invalid`,children:`The range is invalid`}),`
`,(0,k.jsxs)(t.p,{children:[`Provide finite bounds where `,(0,k.jsx)(t.code,{children:`minValue`}),` is less than `,(0,k.jsx)(t.code,{children:`maxValue`}),`, and a finite `,(0,k.jsx)(t.code,{children:`step`}),` greater than zero. Invalid scale values also prevent markers from being generated.`]})]})}function O(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;e((()=>{k=t(),c(),s(),g(),v(),b(),S(),w(),E()}))();export{O as default};