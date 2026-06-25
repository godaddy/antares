import{i as e}from"./preload-helper-Dcqo6Rym.js";import{y as t}from"./iframe-Dmde6qag.js";import{S as n,s as r,u as i}from"./blocks-B0-62Zr_.js";import{t as a}from"./mdx-react-shim-DmShkeuj.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/ListBox`}),`
`,(0,c.jsx)(t.h1,{id:`listbox-component-pdr`,children:`ListBox Component PDR`}),`
`,(0,c.jsx)(t.h2,{id:`purpose`,children:`Purpose`}),`
`,(0,c.jsxs)(t.p,{children:[`The ListBox primitive provides an accessible, keyboard-navigable list of selectable options that serves as the foundation for dropdown menus, autocomplete widgets, multi-select controls, and other selection interfaces. It encapsulates complex accessibility patterns, `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/`,rel:`nofollow`,children:`ARIA semantics`}),`, and keyboard interactions, while remaining completely unstyled and highly composable. This component follows the `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/listbox/`,rel:`nofollow`,children:`W3C ARIA Authoring Practices Guide listbox pattern`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[`It is essential for components like `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/`,rel:`nofollow`,children:`Select`}),`, `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/combobox/`,rel:`nofollow`,children:`Combobox`}),`, Menu, and any custom selection interface where users need to choose from a list of options. This primitive allows developers to build both standardized and bespoke selection UIs, maintaining consistent accessibility and interaction behavior.`]}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Behavior-first abstraction`}),`: Pure interaction logic without visual styling`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Compositional flexibility`}),`: Accepts both static children and dynamic item collections`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Advanced keyboard support`}),`: Arrow navigation, home/end, typeahead, and optional wrapping`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Selection modes`}),`: Single, multiple, or none`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ARIA sectioning`}),`: Grouped options with proper labeling semantics`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus management`}),`: `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex`,rel:`nofollow`,children:`Roving tabindex`}),` for efficient accessibility`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Override support`}),`: Exposes `,(0,c.jsx)(t.code,{children:`slots`}),`, `,(0,c.jsx)(t.code,{children:`renderProps`}),`, and `,(0,c.jsx)(t.code,{children:`data-*`}),` attributes`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`primitive-composition`,children:`Primitive Composition`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`SelectableList`}),`: Core list state and keyboard navigation behavior`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`SelectableGroup`}),`: Section/grouping logic used by `,(0,c.jsx)(t.code,{children:`ListBoxSection`})]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`React Aria Hooks`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useListBox.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBox`})}),`: Provides ARIA roles, selection logic, focus tracking`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useOption.ts#L88`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOption`})}),`: Hook for individual options with `,(0,c.jsx)(t.code,{children:`aria-selected`}),`, focus, press`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBoxSection.ts#L40`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBoxSection`})}),`: Hook for `,(0,c.jsx)(t.code,{children:`ListBoxSection`}),` with `,(0,c.jsx)(t.code,{children:`role=group`})]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Shared Hooks`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useProps`}),`: Enables render function overrides`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useDataAttributes`}),`: Applies state-reflective `,(0,c.jsx)(t.code,{children:`data-*`}),` attributes`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useControlledState`}),`: Manages controlled vs uncontrolled selection state`]}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`This primitive is implemented as both a UI component and a composable set of behavior-focused hooks.`}),`
`,(0,c.jsx)(t.h2,{id:`implementation-patterns`,children:`Implementation Patterns`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Concept`}),(0,c.jsx)(t.th,{children:`Implementation`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsx)(t.td,{children:`useListBox, useOption, useListBoxSection`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Slots`}),(0,c.jsx)(t.td,{children:`root, item, section, label`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Render Props`}),(0,c.jsx)(t.td,{children:`className, style, children, onClick with meta object`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-* Attributes`}),(0,c.jsx)(t.td,{children:`data-selected, data-focus-visible, data-disabled, etc.`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-override`}),(0,c.jsx)(t.td,{children:`Set when props/slots override internal behavior`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-version`}),(0,c.jsx)(t.td,{children:`Dev-only metadata for debugging`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Composability`}),(0,c.jsx)(t.td,{children:`Children and items support, slot/prop overrides`})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Reusable hooks`}),`: Selection, keyboard navigation, typeahead search`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus management`}),`: Roving tabindex via React Aria`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Group handling`}),`: Logical sections via `,(0,c.jsx)(t.code,{children:`useListBoxSection`})]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Collection utils`}),`: Shared patterns for mapping items vs children`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Headless support`}),`: Could expose `,(0,c.jsx)(t.code,{children:`useListBoxBehavior`}),` for custom implementations`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`This is the minimal reusable unit for list-based selection components.`}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Built on top of `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/`,rel:`nofollow`,children:`React Aria`}),` hooks including `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useListBox.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBox`})}),`, `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useOption.ts#L88`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOption`})}),`, and `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBoxSection.ts#L40`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBoxSection`})}),`, as well as `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-stately/`,rel:`nofollow`,children:`React Stately`}),` for state management`]}),`
`,(0,c.jsx)(t.li,{children:`React Aria handles ARIA semantics, selection, and focus events`}),`
`,(0,c.jsx)(t.li,{children:`Custom slot and override layers added via Bento's slot/renderProps/meta patterns`}),`
`,(0,c.jsxs)(t.li,{children:[`No gaps in coverage — React Aria ensures `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG22/quickref/`,rel:`nofollow`,children:`WCAG-compliant`}),` behavior out of the box`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`architecture--features`,children:`Architecture & Features`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Large Datasets and Virtualization:`}),`
Handling large datasets (e.g., 1000+ items) should be offloaded to a separate virtualization utility or `,(0,c.jsx)(t.code,{children:`VirtualizedCollection`}),` primitive. This keeps Listbox focused on accessibility and interaction logic while enabling high-performance rendering through composition. Developers are encouraged to use the `,(0,c.jsx)(t.code,{children:`items`}),` and render function pattern in conjunction with virtualization tools like `,(0,c.jsx)(t.a,{href:`https://github.com/TanStack/virtual`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`react-virtual`})}),` or a shared `,(0,c.jsx)(t.code,{children:`useVirtualizedCollection`}),` hook for optimal scalability.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Nested Listboxes:`}),`
Nested listboxes (e.g., for cascaded or hierarchical menus) are `,(0,c.jsx)(t.strong,{children:`not directly supported`}),` by this primitive. Developers who require nested selection behaviors should compose multiple `,(0,c.jsx)(t.code,{children:`ListBox`}),` instances manually with coordinated state, focus, and ARIA handling. Alternatively, consider using a `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/treeview/`,rel:`nofollow`,children:`tree`}),` or `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/grid/`,rel:`nofollow`,children:`grid`}),` primitive more appropriate for hierarchical navigation.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Orientation Use Cases:`}),`
Horizontal orientation is useful in UI scenarios where selection items are arranged inline rather than stacked. Common examples include:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Segmented controls`}),` or `,(0,c.jsx)(t.strong,{children:`button groups`}),` (e.g., view toggles: Grid | List)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Timeline pickers`}),` (e.g., month or year selectors)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Pill-style selectors`}),` (e.g., filters like "Popular", "Recent", "Trending")`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Tab-like menus`}),` where visual design favors horizontal layout but needs selection behavior`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`Horizontal mode still supports full keyboard navigation via left/right arrows and adapts to RTL environments by reversing key mappings.`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Props and Modes:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`selectionMode`}),`: single | multiple | none`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`orientation`}),`: vertical (default) | horizontal`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`autoFocus`}),`: optional focus target`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`keyboardWrapping`}),`: enable/disable arrow key looping`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`DOM Structure Example:`})}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div role="listbox" aria-orientation="vertical" data-orientation="vertical">
  <!-- Section label is outside the group to comply with ARIA authoring practices -->
  <span id="section-fruits">Fruits</span>
  <div role="group" aria-labelledby="section-fruits">
    <div role="option" aria-selected="true" data-selected="true">Apple</div>
    <div role="option" aria-selected="false" data-selected="false">Banana</div>
  </div>
</div>
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note on Section Labels`}),`: The section label (`,(0,c.jsx)(t.code,{children:`<span>`}),`) is placed `,(0,c.jsx)(t.strong,{children:`outside`}),` the `,(0,c.jsx)(t.code,{children:`role="group"`}),` element to comply with `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/`,rel:`nofollow`,children:`ARIA authoring practices`}),`. According to `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/#group`,rel:`nofollow`,children:`ARIA specifications`}),`, elements with `,(0,c.jsx)(t.code,{children:`role="group"`}),` inside a listbox should only contain `,(0,c.jsx)(t.code,{children:`role="option"`}),` elements as direct children. Unlike HTML's native `,(0,c.jsx)(t.code,{children:`<fieldset>/<legend>`}),` pattern which has built-in tolerance for mixed content, ARIA roles have strict content models. Placing the label outside the group and using `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`aria-labelledby`})}),` to associate them ensures proper semantics while avoiding the need for `,(0,c.jsx)(t.code,{children:`role="presentation"`}),` workarounds.`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Supported Patterns:`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Children vs Items API`}),`
`,(0,c.jsx)(t.li,{children:`Controlled and uncontrolled state`}),`
`,(0,c.jsx)(t.li,{children:`Grouping and headers`}),`
`,(0,c.jsx)(t.li,{children:`Async and virtualized content`}),`
`,(0,c.jsx)(t.li,{children:`Slot-based overrides and style customizations`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`accessibility-highlights`,children:`Accessibility Highlights`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Roles`}),`: `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/#listbox`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`listbox`})}),`, `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/#option`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`option`})}),`, `,(0,c.jsx)(t.a,{href:`https://www.w3.org/TR/wai-aria-1.2/#group`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`group`})})]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Attributes`}),`: `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`aria-selected`})}),`, `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-activedescendant`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`aria-activedescendant`})}),`, `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-multiselectable`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`aria-multiselectable`})}),`, `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-orientation`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`aria-orientation`})})]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Note: ARIA attributes like `,(0,c.jsx)(t.code,{children:`aria-selected`}),` and `,(0,c.jsx)(t.code,{children:`aria-disabled`}),` are `,(0,c.jsx)(t.strong,{children:`required`}),` for accessibility. Data attributes (`,(0,c.jsx)(t.code,{children:`data-selected`}),`, `,(0,c.jsx)(t.code,{children:`data-disabled`}),`) are additional hooks for styling and should not replace ARIA attributes.`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Keyboard Support`}),`: (`,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/listbox/#keyboard-interaction-12`,rel:`nofollow`,children:`Full keyboard interaction details`}),`)`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Arrow keys for navigation (looping disabled by default, enable with `,(0,c.jsx)(t.code,{children:`keyboardWrapping`}),`)`]}),`
`,(0,c.jsx)(t.li,{children:`Home/End to jump to first/last option`}),`
`,(0,c.jsx)(t.li,{children:`Typeahead search`}),`
`,(0,c.jsx)(t.li,{children:`Enter/Space to select`}),`
`,(0,c.jsx)(t.li,{children:`Escape to close (in composed components)`}),`
`,(0,c.jsx)(t.li,{children:`Tab to move focus out`}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Focus Handling`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex`,rel:`nofollow`,children:`Roving tabindex`})}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`data-focus-visible`}),` for focus ring styling`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`autoFocus`}),` support`]}),`
`]}),`
`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`RTL`}),`: Direction-aware keyboard handling in horizontal orientation`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Touch`}),`: Meets `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html`,rel:`nofollow`,children:`touch target sizing`}),` and responsive scroll areas`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`I18n`}),`: All ARIA and label content fully localizable; typeahead respects locale`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mobile`}),`: Optimized for virtual keyboard, inert overflow, and focus clarity`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-and-slot-map`,children:`Data Attributes and Slot Map`}),`
`,(0,c.jsx)(t.h3,{id:`expected-attributes`,children:`Expected Attributes`}),`
`,(0,c.jsx)(t.p,{children:`Components in the Listbox family use both ARIA attributes (for accessibility) and data attributes (for styling). This separation ensures:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`ARIA attributes`}),` provide semantic information to assistive technologies`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Data attributes`}),` provide hooks for CSS styling without relying on ARIA for presentation`]}),`
`]}),`
`,(0,c.jsx)(t.h4,{id:`listbox-container-attributes`,children:`Listbox Container Attributes`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Type`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-orientation`})}),(0,c.jsx)(t.td,{children:`ARIA`}),(0,c.jsx)(t.td,{children:`Semantic orientation for assistive tech`}),(0,c.jsx)(t.td,{children:`"vertical" / "horizontal"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-orientation`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Listbox orientation for styling`}),(0,c.jsx)(t.td,{children:`"vertical" / "horizontal"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-selection-mode`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Single, multiple, or none`}),(0,c.jsx)(t.td,{children:`"single" / "multiple" / "none"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-override`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Indicates customization via props/slots`}),(0,c.jsx)(t.td,{children:`"style slot"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-version`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Dev-only version tag`}),(0,c.jsx)(t.td,{children:`"listbox@1.0"`})]})]})]}),`
`,(0,c.jsx)(t.h4,{id:`itemoption-attributes`,children:`Item/Option Attributes`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Type`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-selected`})}),(0,c.jsx)(t.td,{children:`ARIA`}),(0,c.jsx)(t.td,{children:`Semantic selected state for a11y`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-disabled`})}),(0,c.jsx)(t.td,{children:`ARIA`}),(0,c.jsx)(t.td,{children:`Semantic disabled state for a11y`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-selected`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Selected state for styling`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-disabled`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Disabled state for styling`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focus-visible`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Whether focus ring should be shown`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-hovered`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Option is hovered by mouse`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-pressed`})}),(0,c.jsx)(t.td,{children:`Data`}),(0,c.jsx)(t.td,{children:`Indicates active mouse press state`}),(0,c.jsx)(t.td,{children:`"true" / "false"`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`slot-map`,children:`Slot Map`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`root`})}),(0,c.jsx)(t.td,{children:`Outer listbox container`}),(0,c.jsx)(t.td,{children:`Yes`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<ul>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`item`})}),(0,c.jsx)(t.td,{children:`Selectable option wrapper`}),(0,c.jsx)(t.td,{children:`Yes`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<li>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`section`})}),(0,c.jsx)(t.td,{children:`Grouping container`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<div>`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`label`})}),(0,c.jsx)(t.td,{children:`Label for section/group`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`None`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`description`})}),(0,c.jsx)(t.td,{children:`Additional text for option`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`None`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`Note on `,(0,c.jsx)(t.code,{children:`label`}),` slot`]}),`: This does not default to an HTML `,(0,c.jsx)(t.code,{children:`<label>`}),` element because labels in listbox sections are text elements referenced by `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),`, not form control labels. When provided, this slot typically renders a `,(0,c.jsx)(t.code,{children:`<span>`}),` or similar text element.`]}),`
`,(0,c.jsx)(t.h2,{id:`competitive-research`,children:`Competitive Research`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://www.radix-ui.com/primitives/docs/components/select`,rel:`nofollow`,children:`Radix UI`})}),`: Strong accessibility but lacks deep override/slot patterns`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://ark-ui.com/docs/components/select`,rel:`nofollow`,children:`Ark UI`})}),`: Similar primitives but limited in customization depth`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://headlessui.com/react/listbox`,rel:`nofollow`,children:`Headless UI`})}),`: Rigid component structure; lacks data attributes`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-spectrum/ListBox.html`,rel:`nofollow`,children:`React Spectrum`})}),`: Robust ARIA logic but no slot/prop flexibility`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Bento provides the best blend of accessibility and full override support via `,(0,c.jsx)(t.code,{children:`slots`}),`, `,(0,c.jsx)(t.code,{children:`renderProps`}),`, and meta-driven event handling.`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<ListBox aria-label="Fruits">
  <ListBoxItem key="apple">Apple</ListBoxItem>
  <ListBoxItem key="banana">Banana</ListBoxItem>
</ListBox>
`})}),`
`,(0,c.jsx)(t.h3,{id:`controlled-vs-uncontrolled`,children:`Controlled vs Uncontrolled`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Controlled
const [selected, setSelected] = useState(new Set(['apple']));
<ListBox selectedKeys={selected} onSelectionChange={setSelected} />

// Uncontrolled
<ListBox defaultSelectedKeys={["apple"]} />
`})}),`
`,(0,c.jsx)(t.h3,{id:`dynamic-items-with-render-function`,children:`Dynamic Items with Render Function`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<ListBox items={items}>
  {(item) => <ListBoxItem key={item.id}>{item.name}</ListBoxItem>}
</ListBox>
`})}),`
`,(0,c.jsx)(t.h3,{id:`grouped-sections`,children:`Grouped Sections`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<ListBox>
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
`,(0,c.jsx)(t.h3,{id:`slot-overrides-and-render-props`,children:`Slot Overrides and Render Props`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<ListBox
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
`,(0,c.jsx)(t.h3,{id:`event-handling-with-meta-object`,children:`Event Handling with Meta Object`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`<ListBox onSelectionChange={(keys, { event, state }) => {
  console.log('Selected keys:', keys);
  console.log('Previous state:', state);
}}>
  <ListBoxItem key="apple">Apple</ListBoxItem>
  <ListBoxItem key="banana">Banana</ListBoxItem>
</ListBox>
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};