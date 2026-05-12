import{j as e}from"./iframe-fSexQ0W-.js";import{u as t,M as r}from"./blocks-CB_wgupa.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BW33JMus.js";import"./index-cq0IvEJJ.js";import"./index-FfQZoQ4p.js";function n(s){const i={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Bento/Architecture/PDRs/ListBox"}),`
`,e.jsx(i.h1,{id:"listbox-component-pdr",children:"ListBox Component PDR"}),`
`,e.jsx(i.h2,{id:"purpose",children:"Purpose"}),`
`,e.jsxs(i.p,{children:["The ListBox primitive provides an accessible, keyboard-navigable list of selectable options that serves as the foundation for dropdown menus, autocomplete widgets, multi-select controls, and other selection interfaces. It encapsulates complex accessibility patterns, ",e.jsx(i.a,{href:"https://www.w3.org/TR/wai-aria-1.2/",rel:"nofollow",children:"ARIA semantics"}),", and keyboard interactions, while remaining completely unstyled and highly composable. This component follows the ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/listbox/",rel:"nofollow",children:"W3C ARIA Authoring Practices Guide listbox pattern"}),"."]}),`
`,e.jsxs(i.p,{children:["It is essential for components like ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/",rel:"nofollow",children:"Select"}),", ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",rel:"nofollow",children:"Combobox"}),", Menu, and any custom selection interface where users need to choose from a list of options. This primitive allows developers to build both standardized and bespoke selection UIs, maintaining consistent accessibility and interaction behavior."]}),`
`,e.jsx(i.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Behavior-first abstraction"}),": Pure interaction logic without visual styling"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Compositional flexibility"}),": Accepts both static children and dynamic item collections"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Advanced keyboard support"}),": Arrow navigation, home/end, typeahead, and optional wrapping"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Selection modes"}),": Single, multiple, or none"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"ARIA sectioning"}),": Grouped options with proper labeling semantics"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Focus management"}),": ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex",rel:"nofollow",children:"Roving tabindex"})," for efficient accessibility"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Override support"}),": Exposes ",e.jsx(i.code,{children:"slots"}),", ",e.jsx(i.code,{children:"renderProps"}),", and ",e.jsx(i.code,{children:"data-*"})," attributes"]}),`
`]}),`
`,e.jsx(i.h2,{id:"primitive-composition",children:"Primitive Composition"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"SelectableList"}),": Core list state and keyboard navigation behavior"]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"SelectableGroup"}),": Section/grouping logic used by ",e.jsx(i.code,{children:"ListBoxSection"})]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"React Aria Hooks"}),":"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"https://react-spectrum.adobe.com/react-aria/useListBox.html",rel:"nofollow",children:e.jsx(i.code,{children:"useListBox"})}),": Provides ARIA roles, selection logic, focus tracking"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useOption.ts#L88",rel:"nofollow",children:e.jsx(i.code,{children:"useOption"})}),": Hook for individual options with ",e.jsx(i.code,{children:"aria-selected"}),", focus, press"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBoxSection.ts#L40",rel:"nofollow",children:e.jsx(i.code,{children:"useListBoxSection"})}),": Hook for ",e.jsx(i.code,{children:"ListBoxSection"})," with ",e.jsx(i.code,{children:"role=group"})]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Shared Hooks"}),":"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"useProps"}),": Enables render function overrides"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"useDataAttributes"}),": Applies state-reflective ",e.jsx(i.code,{children:"data-*"})," attributes"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"useControlledState"}),": Manages controlled vs uncontrolled selection state"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(i.p,{children:"This primitive is implemented as both a UI component and a composable set of behavior-focused hooks."}),`
`,e.jsx(i.h2,{id:"implementation-patterns",children:"Implementation Patterns"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Concept"}),e.jsx(i.th,{children:"Implementation"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"React Aria"}),e.jsx(i.td,{children:"useListBox, useOption, useListBoxSection"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Slots"}),e.jsx(i.td,{children:"root, item, section, label"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Render Props"}),e.jsx(i.td,{children:"className, style, children, onClick with meta object"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"data-* Attributes"}),e.jsx(i.td,{children:"data-selected, data-focus-visible, data-disabled, etc."})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"data-override"}),e.jsx(i.td,{children:"Set when props/slots override internal behavior"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"data-version"}),e.jsx(i.td,{children:"Dev-only metadata for debugging"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Composability"}),e.jsx(i.td,{children:"Children and items support, slot/prop overrides"})]})]})]}),`
`,e.jsx(i.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Reusable hooks"}),": Selection, keyboard navigation, typeahead search"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Focus management"}),": Roving tabindex via React Aria"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Group handling"}),": Logical sections via ",e.jsx(i.code,{children:"useListBoxSection"})]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Collection utils"}),": Shared patterns for mapping items vs children"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Headless support"}),": Could expose ",e.jsx(i.code,{children:"useListBoxBehavior"})," for custom implementations"]}),`
`]}),`
`,e.jsx(i.p,{children:"This is the minimal reusable unit for list-based selection components."}),`
`,e.jsx(i.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Built on top of ",e.jsx(i.a,{href:"https://react-spectrum.adobe.com/react-aria/",rel:"nofollow",children:"React Aria"})," hooks including ",e.jsx(i.a,{href:"https://react-spectrum.adobe.com/react-aria/useListBox.html",rel:"nofollow",children:e.jsx(i.code,{children:"useListBox"})}),", ",e.jsx(i.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useOption.ts#L88",rel:"nofollow",children:e.jsx(i.code,{children:"useOption"})}),", and ",e.jsx(i.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBoxSection.ts#L40",rel:"nofollow",children:e.jsx(i.code,{children:"useListBoxSection"})}),", as well as ",e.jsx(i.a,{href:"https://react-spectrum.adobe.com/react-stately/",rel:"nofollow",children:"React Stately"})," for state management"]}),`
`,e.jsx(i.li,{children:"React Aria handles ARIA semantics, selection, and focus events"}),`
`,e.jsx(i.li,{children:"Custom slot and override layers added via Bento's slot/renderProps/meta patterns"}),`
`,e.jsxs(i.li,{children:["No gaps in coverage — React Aria ensures ",e.jsx(i.a,{href:"https://www.w3.org/WAI/WCAG22/quickref/",rel:"nofollow",children:"WCAG-compliant"})," behavior out of the box"]}),`
`]}),`
`,e.jsx(i.h2,{id:"architecture--features",children:"Architecture & Features"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Large Datasets and Virtualization:"}),`
Handling large datasets (e.g., 1000+ items) should be offloaded to a separate virtualization utility or `,e.jsx(i.code,{children:"VirtualizedCollection"})," primitive. This keeps Listbox focused on accessibility and interaction logic while enabling high-performance rendering through composition. Developers are encouraged to use the ",e.jsx(i.code,{children:"items"})," and render function pattern in conjunction with virtualization tools like ",e.jsx(i.a,{href:"https://github.com/TanStack/virtual",rel:"nofollow",children:e.jsx(i.code,{children:"react-virtual"})})," or a shared ",e.jsx(i.code,{children:"useVirtualizedCollection"})," hook for optimal scalability."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Nested Listboxes:"}),`
Nested listboxes (e.g., for cascaded or hierarchical menus) are `,e.jsx(i.strong,{children:"not directly supported"})," by this primitive. Developers who require nested selection behaviors should compose multiple ",e.jsx(i.code,{children:"ListBox"})," instances manually with coordinated state, focus, and ARIA handling. Alternatively, consider using a ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/treeview/",rel:"nofollow",children:"tree"})," or ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/grid/",rel:"nofollow",children:"grid"})," primitive more appropriate for hierarchical navigation."]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Orientation Use Cases:"}),`
Horizontal orientation is useful in UI scenarios where selection items are arranged inline rather than stacked. Common examples include:`]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Segmented controls"})," or ",e.jsx(i.strong,{children:"button groups"})," (e.g., view toggles: Grid | List)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Timeline pickers"})," (e.g., month or year selectors)"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Pill-style selectors"}),' (e.g., filters like "Popular", "Recent", "Trending")']}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Tab-like menus"})," where visual design favors horizontal layout but needs selection behavior"]}),`
`]}),`
`,e.jsx(i.p,{children:"Horizontal mode still supports full keyboard navigation via left/right arrows and adapts to RTL environments by reversing key mappings."}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"Props and Modes:"})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"selectionMode"}),": single | multiple | none"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"orientation"}),": vertical (default) | horizontal"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"autoFocus"}),": optional focus target"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"keyboardWrapping"}),": enable/disable arrow key looping"]}),`
`]}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"DOM Structure Example:"})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<div role="listbox" aria-orientation="vertical" data-orientation="vertical">
  <!-- Section label is outside the group to comply with ARIA authoring practices -->
  <span id="section-fruits">Fruits</span>
  <div role="group" aria-labelledby="section-fruits">
    <div role="option" aria-selected="true" data-selected="true">Apple</div>
    <div role="option" aria-selected="false" data-selected="false">Banana</div>
  </div>
</div>
`})}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Note on Section Labels"}),": The section label (",e.jsx(i.code,{children:"<span>"}),") is placed ",e.jsx(i.strong,{children:"outside"})," the ",e.jsx(i.code,{children:'role="group"'})," element to comply with ",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/",rel:"nofollow",children:"ARIA authoring practices"}),". According to ",e.jsx(i.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#group",rel:"nofollow",children:"ARIA specifications"}),", elements with ",e.jsx(i.code,{children:'role="group"'})," inside a listbox should only contain ",e.jsx(i.code,{children:'role="option"'})," elements as direct children. Unlike HTML's native ",e.jsx(i.code,{children:"<fieldset>/<legend>"})," pattern which has built-in tolerance for mixed content, ARIA roles have strict content models. Placing the label outside the group and using ",e.jsx(i.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby",rel:"nofollow",children:e.jsx(i.code,{children:"aria-labelledby"})})," to associate them ensures proper semantics while avoiding the need for ",e.jsx(i.code,{children:'role="presentation"'})," workarounds."]}),`
`,e.jsx(i.p,{children:e.jsx(i.strong,{children:"Supported Patterns:"})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Children vs Items API"}),`
`,e.jsx(i.li,{children:"Controlled and uncontrolled state"}),`
`,e.jsx(i.li,{children:"Grouping and headers"}),`
`,e.jsx(i.li,{children:"Async and virtualized content"}),`
`,e.jsx(i.li,{children:"Slot-based overrides and style customizations"}),`
`]}),`
`,e.jsx(i.h2,{id:"accessibility-highlights",children:"Accessibility Highlights"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Roles"}),": ",e.jsx(i.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#listbox",rel:"nofollow",children:e.jsx(i.code,{children:"listbox"})}),", ",e.jsx(i.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#option",rel:"nofollow",children:e.jsx(i.code,{children:"option"})}),", ",e.jsx(i.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#group",rel:"nofollow",children:e.jsx(i.code,{children:"group"})})]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Attributes"}),": ",e.jsx(i.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected",rel:"nofollow",children:e.jsx(i.code,{children:"aria-selected"})}),", ",e.jsx(i.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant",rel:"nofollow",children:e.jsx(i.code,{children:"aria-activedescendant"})}),", ",e.jsx(i.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiselectable",rel:"nofollow",children:e.jsx(i.code,{children:"aria-multiselectable"})}),", ",e.jsx(i.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation",rel:"nofollow",children:e.jsx(i.code,{children:"aria-orientation"})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Note: ARIA attributes like ",e.jsx(i.code,{children:"aria-selected"})," and ",e.jsx(i.code,{children:"aria-disabled"})," are ",e.jsx(i.strong,{children:"required"})," for accessibility. Data attributes (",e.jsx(i.code,{children:"data-selected"}),", ",e.jsx(i.code,{children:"data-disabled"}),") are additional hooks for styling and should not replace ARIA attributes."]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Keyboard Support"}),": (",e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/listbox/#keyboard-interaction-12",rel:"nofollow",children:"Full keyboard interaction details"}),")"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Arrow keys for navigation (looping disabled by default, enable with ",e.jsx(i.code,{children:"keyboardWrapping"}),")"]}),`
`,e.jsx(i.li,{children:"Home/End to jump to first/last option"}),`
`,e.jsx(i.li,{children:"Typeahead search"}),`
`,e.jsx(i.li,{children:"Enter/Space to select"}),`
`,e.jsx(i.li,{children:"Escape to close (in composed components)"}),`
`,e.jsx(i.li,{children:"Tab to move focus out"}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Focus Handling"}),":"]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex",rel:"nofollow",children:"Roving tabindex"})}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"data-focus-visible"})," for focus ring styling"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"autoFocus"})," support"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(i.h2,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"RTL"}),": Direction-aware keyboard handling in horizontal orientation"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Touch"}),": Meets ",e.jsx(i.a,{href:"https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",rel:"nofollow",children:"touch target sizing"})," and responsive scroll areas"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"I18n"}),": All ARIA and label content fully localizable; typeahead respects locale"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Mobile"}),": Optimized for virtual keyboard, inert overflow, and focus clarity"]}),`
`]}),`
`,e.jsx(i.h2,{id:"data-attributes-and-slot-map",children:"Data Attributes and Slot Map"}),`
`,e.jsx(i.h3,{id:"expected-attributes",children:"Expected Attributes"}),`
`,e.jsx(i.p,{children:"Components in the Listbox family use both ARIA attributes (for accessibility) and data attributes (for styling). This separation ensures:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"ARIA attributes"})," provide semantic information to assistive technologies"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Data attributes"})," provide hooks for CSS styling without relying on ARIA for presentation"]}),`
`]}),`
`,e.jsx(i.h4,{id:"listbox-container-attributes",children:"Listbox Container Attributes"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Attribute"}),e.jsx(i.th,{children:"Type"}),e.jsx(i.th,{children:"Description"}),e.jsx(i.th,{children:"Example Values"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"aria-orientation"})}),e.jsx(i.td,{children:"ARIA"}),e.jsx(i.td,{children:"Semantic orientation for assistive tech"}),e.jsx(i.td,{children:'"vertical" / "horizontal"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-orientation"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Listbox orientation for styling"}),e.jsx(i.td,{children:'"vertical" / "horizontal"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-selection-mode"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Single, multiple, or none"}),e.jsx(i.td,{children:'"single" / "multiple" / "none"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-override"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Indicates customization via props/slots"}),e.jsx(i.td,{children:'"style slot"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-version"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Dev-only version tag"}),e.jsx(i.td,{children:'"listbox@1.0"'})]})]})]}),`
`,e.jsx(i.h4,{id:"itemoption-attributes",children:"Item/Option Attributes"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Attribute"}),e.jsx(i.th,{children:"Type"}),e.jsx(i.th,{children:"Description"}),e.jsx(i.th,{children:"Example Values"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"aria-selected"})}),e.jsx(i.td,{children:"ARIA"}),e.jsx(i.td,{children:"Semantic selected state for a11y"}),e.jsx(i.td,{children:'"true" / "false"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"aria-disabled"})}),e.jsx(i.td,{children:"ARIA"}),e.jsx(i.td,{children:"Semantic disabled state for a11y"}),e.jsx(i.td,{children:'"true" / "false"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-selected"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Selected state for styling"}),e.jsx(i.td,{children:'"true" / "false"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-disabled"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Disabled state for styling"}),e.jsx(i.td,{children:'"true" / "false"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-focus-visible"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Whether focus ring should be shown"}),e.jsx(i.td,{children:'"true" / "false"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-hovered"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Option is hovered by mouse"}),e.jsx(i.td,{children:'"true" / "false"'})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"data-pressed"})}),e.jsx(i.td,{children:"Data"}),e.jsx(i.td,{children:"Indicates active mouse press state"}),e.jsx(i.td,{children:'"true" / "false"'})]})]})]}),`
`,e.jsx(i.h3,{id:"slot-map",children:"Slot Map"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Slot Name"}),e.jsx(i.th,{children:"Description"}),e.jsx(i.th,{children:"Required"}),e.jsx(i.th,{children:"Default Fallback"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"root"})}),e.jsx(i.td,{children:"Outer listbox container"}),e.jsx(i.td,{children:"Yes"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"<ul>"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"item"})}),e.jsx(i.td,{children:"Selectable option wrapper"}),e.jsx(i.td,{children:"Yes"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"<li>"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"section"})}),e.jsx(i.td,{children:"Grouping container"}),e.jsx(i.td,{children:"No"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"<div>"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"label"})}),e.jsx(i.td,{children:"Label for section/group"}),e.jsx(i.td,{children:"No"}),e.jsx(i.td,{children:"None"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:e.jsx(i.code,{children:"description"})}),e.jsx(i.td,{children:"Additional text for option"}),e.jsx(i.td,{children:"No"}),e.jsx(i.td,{children:"None"})]})]})]}),`
`,e.jsxs(i.p,{children:[e.jsxs(i.strong,{children:["Note on ",e.jsx(i.code,{children:"label"})," slot"]}),": This does not default to an HTML ",e.jsx(i.code,{children:"<label>"})," element because labels in listbox sections are text elements referenced by ",e.jsx(i.code,{children:"aria-labelledby"}),", not form control labels. When provided, this slot typically renders a ",e.jsx(i.code,{children:"<span>"})," or similar text element."]}),`
`,e.jsx(i.h2,{id:"competitive-research",children:"Competitive Research"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.a,{href:"https://www.radix-ui.com/primitives/docs/components/select",rel:"nofollow",children:"Radix UI"})}),": Strong accessibility but lacks deep override/slot patterns"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.a,{href:"https://ark-ui.com/docs/components/select",rel:"nofollow",children:"Ark UI"})}),": Similar primitives but limited in customization depth"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.a,{href:"https://headlessui.com/react/listbox",rel:"nofollow",children:"Headless UI"})}),": Rigid component structure; lacks data attributes"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:e.jsx(i.a,{href:"https://react-spectrum.adobe.com/react-spectrum/ListBox.html",rel:"nofollow",children:"React Spectrum"})}),": Robust ARIA logic but no slot/prop flexibility"]}),`
`]}),`
`,e.jsxs(i.p,{children:["Bento provides the best blend of accessibility and full override support via ",e.jsx(i.code,{children:"slots"}),", ",e.jsx(i.code,{children:"renderProps"}),", and meta-driven event handling."]}),`
`,e.jsx(i.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(i.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<ListBox aria-label="Fruits">
  <ListBoxItem key="apple">Apple</ListBoxItem>
  <ListBoxItem key="banana">Banana</ListBoxItem>
</ListBox>
`})}),`
`,e.jsx(i.h3,{id:"controlled-vs-uncontrolled",children:"Controlled vs Uncontrolled"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`// Controlled
const [selected, setSelected] = useState(new Set(['apple']));
<ListBox selectedKeys={selected} onSelectionChange={setSelected} />

// Uncontrolled
<ListBox defaultSelectedKeys={["apple"]} />
`})}),`
`,e.jsx(i.h3,{id:"dynamic-items-with-render-function",children:"Dynamic Items with Render Function"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<ListBox items={items}>
  {(item) => <ListBoxItem key={item.id}>{item.name}</ListBoxItem>}
</ListBox>
`})}),`
`,e.jsx(i.h3,{id:"grouped-sections",children:"Grouped Sections"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<ListBox>
  <Label id="fruits-label">Fruits</Label>
  <ListBoxSection aria-labelledby="fruits-label">
    <ListBoxItem key="apple">Apple</ListBoxItem>
    <ListBoxItem key="banana">Banana</ListBoxItem>
  </ListBoxSection>
  <Label id="vegetables-label">Vegetables</Label>
  <ListBoxSection aria-labelledby="vegetables-label">
    <ListBoxItem key="carrot">Carrot</ListBoxItem>
    <ListBoxItem key="lettuce">Lettuce</ListBoxItem>
  </ListBoxSection>
</ListBox>
`})}),`
`,e.jsx(i.h3,{id:"slot-overrides-and-render-props",children:"Slot Overrides and Render Props"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<ListBox
  slots={{
    item: ({ props, children, state }) => (
      <div {...props} className="custom-option">
        {state.isSelected && <CheckIcon />}
        {children}
      </div>
    )
  }}
/>

<ListBoxItem
  className={({ isSelected, isFocused }) =>
    \`option \${isSelected ? 'selected' : ''} \${isFocused ? 'focused' : ''}\`}
>
  Apple
</ListBoxItem>
`})}),`
`,e.jsx(i.h3,{id:"event-handling-with-meta-object",children:"Event Handling with Meta Object"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-tsx",children:`<ListBox onSelectionChange={(keys, { event, state }) => {
  console.log('Selected keys:', keys);
  console.log('Previous state:', state);
}}>
  <ListBoxItem key="apple">Apple</ListBoxItem>
  <ListBoxItem key="banana">Banana</ListBoxItem>
</ListBox>
`})})]})}function x(s={}){const{wrapper:i}={...t(),...s.components};return i?e.jsx(i,{...s,children:e.jsx(n,{...s})}):n(s)}export{x as default};
