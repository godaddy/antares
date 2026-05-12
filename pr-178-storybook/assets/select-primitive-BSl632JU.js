import{j as e}from"./iframe-DTALigXZ.js";import{useMDXComponents as n}from"./index-DRsmTLPg.js";import{M as i}from"./blocks-BZIvt908.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CBWsPa5X.js";import"./index-D0CmnqIM.js";import"./index-mIY3p9VN.js";function t(r){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Architecture/PDRs/Select"}),`
`,e.jsx(s.h1,{id:"select-primitive-pdr",children:"Select Primitive PDR"}),`
`,e.jsx(s.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(s.p,{children:["PDR describing the ",e.jsx(s.code,{children:"Select"})," primitive built on React Aria's ",e.jsx(s.code,{children:"useSelect"})," and ",e.jsx(s.code,{children:"useSelectState"})," hooks, following the ",e.jsx(s.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/",rel:"nofollow",children:"W3C ARIA combobox (select-only) pattern"}),"."]}),`
`,e.jsx(s.h3,{id:"unique-attributes",children:"Unique Attributes"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Reuses ListBox selection patterns"}),": Uses existing ",e.jsx(s.a,{href:"../../packages/listbox/src/listbox.tsx#L107",children:e.jsx(s.code,{children:"ListStateContext"})})," from ",e.jsx(s.code,{children:"@bento/listbox"})," to share selection state with ",e.jsx(s.code,{children:"ListBox"})," and ",e.jsx(s.code,{children:"ListBoxItem"})," components. Source: ",e.jsx(s.a,{href:"../../packages/listbox/src/listbox.tsx#L107",children:e.jsx(s.code,{children:"ListStateContext"})})," is exported and consumed by ",e.jsx(s.a,{href:"../../packages/listbox/src/listbox-item.tsx#L133",children:e.jsx(s.code,{children:"ListBoxItem"})}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Form integration via HiddenSelect"}),": React Aria provides ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L142",rel:"nofollow",children:e.jsx(s.code,{children:"HiddenSelect"})})," which renders a visually hidden native ",e.jsxs(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L152-L172",rel:"nofollow",children:[e.jsx(s.code,{children:"<select>"})," with ",e.jsx(s.code,{children:"<option>"})," elements"]})," when ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L151",rel:"nofollow",children:e.jsx(s.code,{children:"state.collection.size <= 300"})}),", and for larger collections renders one or more hidden inputs (",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L174-L214",rel:"nofollow",children:e.jsx(s.code,{children:'type="hidden"'})})," or ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L216-L264",rel:"nofollow",children:e.jsx(s.code,{children:'type="text"'})})," when ",e.jsx(s.code,{children:'validationBehavior="native"'}),") wired to the ",e.jsx(s.code,{children:"name"}),"/",e.jsx(s.code,{children:"form"})," props for native form submission (browser autofill is only supported in the ",e.jsx(s.code,{children:"<select>"})," path when ",e.jsx(s.code,{children:"state.collection.size <= 300"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L142",rel:"nofollow",children:e.jsx(s.code,{children:"HiddenSelect.tsx"})}),"."]}),`
`]}),`
`,e.jsx(s.h2,{id:"goals",children:"Goals"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Provide a single- and multi-select dropdown primitive built on React Aria's ",e.jsx(s.code,{children:"useSelect"})," and ",e.jsx(s.code,{children:"useSelectState"})," hooks."]}),`
`,e.jsxs(s.li,{children:["Reuse existing Bento primitives (",e.jsx(s.code,{children:"ListBox"}),", ",e.jsx(s.code,{children:"ListBoxItem"}),", ",e.jsx(s.code,{children:"Container"}),", slots) rather than introducing new option or popover primitives."]}),`
`,e.jsxs(s.li,{children:["Integrate with native HTML forms via React Aria's ",e.jsx(s.code,{children:"HiddenSelect"})," using the ",e.jsx(s.code,{children:"name"})," prop."]}),`
`,e.jsxs(s.li,{children:["Expose a small public API surface that forwards most props to React Aria ",e.jsx(s.code,{children:"SelectProps"})," while using Bento's slot system for composition."]}),`
`]}),`
`,e.jsx(s.h2,{id:"constraints",children:"Constraints"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Must not introduce new shared hooks or utilities if existing packages (",e.jsx(s.code,{children:"@bento/slots"}),", ",e.jsx(s.code,{children:"@bento/use-props"}),", ",e.jsx(s.code,{children:"@bento/use-data-attributes"}),", ",e.jsx(s.code,{children:"@bento/listbox"}),") can satisfy the requirements."]}),`
`,e.jsxs(s.li,{children:["Must use ",e.jsx(s.code,{children:"ListBoxItem"})," as the only option primitive so selection behavior stays aligned with ",e.jsx(s.code,{children:"@bento/listbox"}),"."]}),`
`,e.jsx(s.li,{children:"Must rely on React Aria and React Stately for selection, overlay, and keyboard behavior rather than reimplementing this logic."}),`
`,e.jsx(s.li,{children:"Consumers handle portal rendering for the popover; Select passes overlay-related props to slots and does not depend on a dedicated popover primitive."}),`
`,e.jsxs(s.li,{children:["Must treat other not-yet-implemented primitives (e.g., ",e.jsx(s.code,{children:"Dismiss"}),") as optional dependencies, not hard requirements for core ",e.jsx(s.code,{children:"Select"})," behavior."]}),`
`]}),`
`,e.jsx(s.h2,{id:"api",children:"API"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Components"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"Select"})," — Coordinator component"]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Type Safety Exports"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectProps"})," — Generic props interface for the ",e.jsx(s.code,{children:"Select"})," component (",e.jsx(s.code,{children:"SelectProps<T, M extends SelectionMode>"}),")."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectionMode"})," — Type alias for selection modes: ",e.jsx(s.code,{children:"'single' | 'multiple'"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectSlots"})," — Type map for all slot prop types. Enables type-safe slot component implementations."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"PropsFromSelectSlot<S>"})," — Utility type for extracting individual slot prop types without importing each interface."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectRenderProps"})," — Type for render props passed to ",e.jsx(s.code,{children:"renderEmptyState"})," function."]}),`
`,e.jsxs(s.li,{children:["Individual slot prop interfaces: ",e.jsx(s.code,{children:"SelectTriggerSlotProps"}),", ",e.jsx(s.code,{children:"SelectValueSlotProps"}),", ",e.jsx(s.code,{children:"SelectPopoverSlotProps"}),", ",e.jsx(s.code,{children:"SelectListSlotProps"})," — Available for direct import when needed (derivable from ",e.jsx(s.code,{children:"PropsFromSelectSlot"}),")."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Advanced type & hook exports (optional)"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectState"})," — React Stately ",e.jsx(s.code,{children:"SelectState<T, M>"})," type (re-exported for advanced integrations; not required for normal usage)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"Placement"})," — Popover placement type from React Aria (re-exported for convenience)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"useSelectState"})," — React Stately hook for Select state management (re-exported for advanced control flows)."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Dependencies"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@bento/listbox"})," — Provides ",e.jsx(s.code,{children:"ListBox"}),", ",e.jsx(s.code,{children:"ListBoxItem"}),", and ",e.jsx(s.code,{children:"ListStateContext"}),". Source: ",e.jsx(s.a,{href:"../../packages/listbox/src/listbox.tsx#L107",children:e.jsx(s.code,{children:"ListStateContext"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@bento/container"})," — Provides ",e.jsx(s.code,{children:"Container"})," for slot-based composition. Source: ",e.jsx(s.a,{href:"../../packages/container/src/index.tsx#L84",children:e.jsx(s.code,{children:"Container"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@bento/slots"})," — Provides ",e.jsx(s.code,{children:"withSlots"})," for slot system. Source: ",e.jsx(s.a,{href:"../../packages/slots/src/slots.tsx#L51",children:e.jsx(s.code,{children:"withSlots"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@bento/use-props"})," — Provides ",e.jsx(s.code,{children:"useProps"})," for prop merging. Source: ",e.jsx(s.a,{href:"../../packages/use-props/src/index.ts#L117",children:e.jsx(s.code,{children:"useProps"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@bento/use-data-attributes"})," — Provides ",e.jsx(s.code,{children:"useDataAttributes"})," for data attributes. Source: ",e.jsx(s.a,{href:"../../packages/use-data-attributes/src/index.ts#L25",children:e.jsx(s.code,{children:"useDataAttributes"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"react-aria"})," — Provides ",e.jsx(s.code,{children:"useSelect"}),", ",e.jsx(s.code,{children:"useOverlay"}),", ",e.jsx(s.code,{children:"useOverlayPosition"}),", ",e.jsx(s.code,{children:"usePreventScroll"}),", ",e.jsx(s.code,{children:"useFocusRing"}),", ",e.jsx(s.code,{children:"useHover"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L74",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"react-stately"})," — Provides ",e.jsx(s.code,{children:"useSelectState"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L81",rel:"nofollow",children:e.jsx(s.code,{children:"useSelectState"})})," exists."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"@react-aria/collections"})," — Provides ",e.jsx(s.code,{children:"CollectionBuilder"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/CollectionBuilder.tsx#L36",rel:"nofollow",children:e.jsx(s.code,{children:"CollectionBuilder"})})," exists."]}),`
`]}),`
`,e.jsx(s.p,{children:e.jsx(s.strong,{children:"Using ListBoxItem with Select:"})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"ListBoxItem"})," from ",e.jsx(s.code,{children:"@bento/listbox"})," is the option primitive for Select. The ",e.jsx(s.code,{children:"id"})," and ",e.jsx(s.code,{children:"textValue"})," props are optional:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"id"})," prop"]})," — Optional. Source: ",e.jsx(s.a,{href:"../../packages/listbox/src/listbox-item.tsx#L90",children:e.jsx(s.code,{children:"ListBoxItemProps.id"})})," is ",e.jsx(s.code,{children:"readonly id?: Key"}),". If not provided, React Aria auto-generates a unique key. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/Document.ts#L336",rel:"nofollow",children:e.jsx(s.code,{children:"Document.setProps"})})," uses ",e.jsx(s.code,{children:"id ?? \\"}),"react-aria-$",++this.ownerDocument.nodeId,"``"]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"textValue"})," prop"]})," — Optional. Source: ",e.jsx(s.a,{href:"../../packages/listbox/src/listbox-item.tsx#L94",children:e.jsx(s.code,{children:"ListBoxItemProps.textValue"})})," is ",e.jsx(s.code,{children:"readonly textValue?: string"}),". If not provided, React Aria auto-derives it from children. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/Document.ts#L350",rel:"nofollow",children:e.jsx(s.code,{children:"Document.setProps"})})," uses ",e.jsx(s.code,{children:"textValue || (typeof props.children === 'string' ? props.children : '') || obj['aria-label'] || ''"})]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsxs(s.strong,{children:["About ",e.jsx(s.code,{children:"Node<T>.value"})]}),": React Aria populates ",e.jsx(s.code,{children:"Node<T>.value"})," with the original item object when using dynamic collections (",e.jsx(s.code,{children:"items"})," / ",e.jsx(s.code,{children:"childItems"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/Item.ts#L32-L45",rel:"nofollow",children:e.jsx(s.code,{children:"Item.getCollectionNode"})})," yields ",e.jsx(s.code,{children:"{ type: 'item', value: child }"})," for each ",e.jsx(s.code,{children:"childItems"})," entry. For ",e.jsx(s.strong,{children:"static JSX children"}),", ",e.jsx(s.code,{children:"Node.value"})," is not meaningful and should not be relied upon."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`// Simple usage - id auto-generated, textValue derived from children
<ListBoxItem>Apple</ListBoxItem>

// Explicit id for selection state - state.value will be "apple"
<ListBoxItem id="apple">Apple</ListBoxItem>

// Complex markup - explicit textValue for typeahead, id for selection
<ListBoxItem id="apple" textValue="Apple">
  <Icon name="apple" />
  <Text>Apple Special</Text>
</ListBoxItem>
`})}),`
`,e.jsx(s.h3,{id:"working-with-item-data",children:"Working with item data"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"For dynamic collections"}),", use ",e.jsx(s.code,{children:"items"})," on ",e.jsx(s.code,{children:"Select"}),"/",e.jsx(s.code,{children:"ListBox"})," and read ",e.jsx(s.code,{children:"Node.value"})," from ",e.jsx(s.code,{children:"selectedItem"}),":"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

type Fruit = { id: string; name: string; calories: number };

const fruits: Fruit[] = [
  { id: 'apple', name: 'Apple', calories: 52 },
  { id: 'orange', name: 'Orange', calories: 47 }
];

// Value display component using withSlots pattern
const FruitValue = withSlots('FruitValue', function FruitValue(args: any) {
  const { props } = useProps(args);
  const { selectedItem, ...rest } = props;
  const fruit = selectedItem?.value as Fruit | undefined;

  return (
    <span {...rest}>
      {fruit ? \`\${fruit.name} (\${fruit.calories} kcal)\` : 'Select a fruit'}
    </span>
  );
});

<Select<Fruit> items={fruits}>
  <Button slot="trigger">
    <FruitValue slot="value" />
  </Button>
  <div slot="popover" style={{ display: 'block' }}>
    <ListBox<Fruit> slot="listbox">
      {(item) => <ListBoxItem id={item.id}>{item.name}</ListBoxItem>}
    </ListBox>
  </div>
</Select>
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"For static children"}),", map keys to your own data:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

const fruitsById = {
  apple: { name: 'Apple', calories: 52 },
  orange: { name: 'Orange', calories: 47 }
} as const;

// Value display component using withSlots pattern
const FruitValue = withSlots('FruitValue', function FruitValue(args: any) {
  const { props } = useProps(args);
  const { selectedItem, ...rest } = props;
  const id = selectedItem?.key as keyof typeof fruitsById | undefined;
  const fruit = id ? fruitsById[id] : undefined;

  return (
    <span {...rest}>
      {fruit ? \`\${fruit.name} (\${fruit.calories} kcal)\` : 'Select a fruit'}
    </span>
  );
});

<Select defaultValue="apple">
  <Button slot="trigger">
    <FruitValue slot="value" />
  </Button>
  <Popover slot="popover">
    <ListBox slot="listbox">
      <ListBoxItem id="apple">Apple</ListBoxItem>
      <ListBoxItem id="orange">Orange</ListBoxItem>
    </ListBox>
  </Popover>
</Select>
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern requirements"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["If you want a ",e.jsx(s.strong,{children:"component"})," to receive slot props (like ",e.jsx(s.code,{children:"selectedItem"}),", ",e.jsx(s.code,{children:"selectedItems"}),") via ",e.jsx(s.code,{children:"useProps"}),", it must be wrapped with ",e.jsx(s.code,{children:"withSlots"}),"."]}),`
`,e.jsxs(s.li,{children:["Plain elements like ",e.jsx(s.code,{children:'<span slot="value" />'})," do not receive ",e.jsx(s.code,{children:"selectedItem"})," themselves via ",e.jsx(s.code,{children:"useProps"}),"; they only act as slot markers for a slotted component (e.g. ",e.jsx(s.code,{children:"ValueDisplay"}),") that actually consumes the props."]}),`
`]}),`
`,e.jsx(s.h2,{id:"implementation-notes",children:"Implementation Notes"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Concept"}),e.jsx(s.th,{children:"Implementation"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"React Aria"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L74",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})}),", ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L81",rel:"nofollow",children:e.jsx(s.code,{children:"useSelectState"})}),", ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlay.html",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlay"})}),", ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayPosition"})}),", ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/usePreventScroll.html",rel:"nofollow",children:e.jsx(s.code,{children:"usePreventScroll"})}),", ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useFocusRing.html",rel:"nofollow",children:e.jsx(s.code,{children:"useFocusRing"})}),", ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useHover.html",rel:"nofollow",children:e.jsx(s.code,{children:"useHover"})})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Overlay Management"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"../../packages/select/src/use-select-overlay.ts",children:e.jsx(s.code,{children:"useSelectOverlay"})})," custom hook encapsulates overlay dismiss behavior, positioning, and scroll prevention"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Slots"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"../../packages/slots/src/slots.tsx#L51",children:e.jsx(s.code,{children:"withSlots"})}),", ",e.jsx(s.a,{href:"../../packages/container/src/index.tsx#L84",children:e.jsx(s.code,{children:"Container"})})," with ",e.jsx(s.code,{children:"slots"})," prop"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Context"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"../../packages/listbox/src/listbox.tsx#L107",children:e.jsx(s.code,{children:"ListStateContext"})})," for selection state (consumed by ",e.jsx(s.code,{children:"ListBox"}),"/",e.jsx(s.code,{children:"ListBoxItem"}),")"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"CollectionBuilder"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/CollectionBuilder.tsx#L36",rel:"nofollow",children:e.jsx(s.code,{children:"CollectionBuilder"})})," builds collection from children"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"data-* Attributes"}),e.jsxs(s.td,{children:[e.jsx(s.a,{href:"../../packages/use-data-attributes/src/index.ts#L25",children:e.jsx(s.code,{children:"useDataAttributes"})})," exists. Boolean conversion: ",e.jsx(s.code,{children:"true"})," → ",e.jsx(s.code,{children:'"true"'})," string, ",e.jsx(s.code,{children:"false"})," → attribute not added (returns ",e.jsx(s.code,{children:"undefined"}),"). Source: ",e.jsx(s.a,{href:"../../packages/to-attribute-value/src/index.ts#L41",children:e.jsx(s.code,{children:"to-attribute-value/src/index.ts:41"})})," returns ",e.jsx(s.code,{children:"value ? value.toString() : undefined"})," for booleans."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Event Handler Passing"}),e.jsxs(s.td,{children:["Bento slots system passes event handlers (props matching ",e.jsx(s.code,{children:"/^on[A-Z]/"}),") via context. Source: ",e.jsx(s.a,{href:"../../packages/use-props/src/index.ts#L32",children:e.jsx(s.code,{children:"isEventListener"})})," matches ",e.jsx(s.code,{children:"/^on[A-Z]/"}),", ",e.jsx(s.a,{href:"../../packages/slots/src/slots.tsx#L51",children:e.jsx(s.code,{children:"withSlots"})})," wraps components to receive slot props via context."]})]})]})]}),`
`,e.jsx(s.h2,{id:"internal-structure--reuse-potential",children:"Internal Structure & Reuse Potential"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Reuses existing patterns"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"../../packages/listbox/src/listbox.tsx#L107",children:e.jsx(s.code,{children:"ListStateContext"})})," pattern from ",e.jsx(s.code,{children:"@bento/listbox"})," (similar to ",e.jsx(s.a,{href:"../../packages/checkbox/src/checkbox-group-state.tsx#L4",children:e.jsx(s.code,{children:"CheckboxGroupStateContext"})})," in ",e.jsx(s.code,{children:"@bento/checkbox"}),"). Source: Both contexts exist and follow the same pattern."]}),`
`,e.jsxs(s.li,{children:["Bento slots system: ",e.jsx(s.a,{href:"../../packages/slots/src/slots.tsx#L51",children:e.jsx(s.code,{children:"withSlots"})}),", ",e.jsx(s.a,{href:"../../packages/container/src/index.tsx#L84",children:e.jsx(s.code,{children:"Container"})}),", ",e.jsx(s.a,{href:"../../packages/use-props/src/index.ts#L117",children:e.jsx(s.code,{children:"useProps"})}),". Source: All exist."]}),`
`,e.jsxs(s.li,{children:["React Aria hooks: ",e.jsx(s.code,{children:"useSelect"}),", ",e.jsx(s.code,{children:"useSelectState"}),", ",e.jsx(s.code,{children:"useOverlay"}),", ",e.jsx(s.code,{children:"useOverlayPosition"}),", etc. Source: All exist in React Aria."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"No new reusable utilities proposed"}),": All functionality provided by existing Bento packages and React Aria hooks."]}),`
`,e.jsx(s.h2,{id:"react-aria-or-external-hook-integration",children:"React Aria or External Hook Integration"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"React Aria hooks used"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L74",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," — Returns ",e.jsx(s.code,{children:"labelProps"}),", ",e.jsx(s.code,{children:"triggerProps"}),", ",e.jsx(s.code,{children:"valueProps"}),", ",e.jsx(s.code,{children:"menuProps"}),", ",e.jsx(s.code,{children:"descriptionProps"}),", ",e.jsx(s.code,{children:"errorMessageProps"}),", ",e.jsx(s.code,{children:"hiddenSelectProps"}),". Source: ",e.jsxs(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L35",rel:"nofollow",children:[e.jsx(s.code,{children:"SelectAria"})," interface"]})," defines return types."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L81",rel:"nofollow",children:e.jsx(s.code,{children:"useSelectState"})})," — Manages selection state, overlay open state, and collection. Source: ",e.jsxs(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L23",rel:"nofollow",children:[e.jsx(s.code,{children:"SelectState"})," interface"]})," extends ",e.jsx(s.code,{children:"ListState<T>"})," and ",e.jsx(s.code,{children:"OverlayTriggerState"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlay.html",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlay"})})," — Handles overlay dismiss behavior. Source: Hook exists in React Aria."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayPosition"})})," — Handles positioning relative to trigger. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayPosition.ts#L100",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayPosition.ts"})}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/usePreventScroll.html",rel:"nofollow",children:e.jsx(s.code,{children:"usePreventScroll"})})," — Prevents body scrolling when overlay is open. Source: Hook exists in React Aria."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useFocusRing.html",rel:"nofollow",children:e.jsx(s.code,{children:"useFocusRing"})})," — Manages focus visibility. Source: Hook exists in React Aria."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useHover.html",rel:"nofollow",children:e.jsx(s.code,{children:"useHover"})})," — Manages hover state. Source: Hook exists in React Aria."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L142",rel:"nofollow",children:e.jsx(s.code,{children:"HiddenSelect"})})," — Component for form integration. Source: Component exists and accepts ",e.jsx(s.code,{children:"name"})," prop via ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L22",rel:"nofollow",children:e.jsx(s.code,{children:"AriaHiddenSelectProps"})})," (line 32)."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"CollectionBuilder usage"}),": ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/CollectionBuilder.tsx#L36",rel:"nofollow",children:e.jsx(s.code,{children:"CollectionBuilder"})})," builds a collection from the children passed to it."]}),`
`,e.jsx(s.h2,{id:"behaviors",children:"Behaviors"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"State management"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Uses ",e.jsx(s.code,{children:"useSelectState"})," which internally calls ",e.jsx(s.code,{children:"useListState"})," from ",e.jsx(s.code,{children:"@react-stately/list"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L113",rel:"nofollow",children:e.jsx(s.code,{children:"useSelectState"})})," calls ",e.jsx(s.code,{children:"useListState"})," (line 113)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectState"})," extends ",e.jsx(s.code,{children:"ListState<T>"})," which provides ",e.jsx(s.code,{children:"collection"}),", ",e.jsx(s.code,{children:"disabledKeys"}),", and ",e.jsx(s.code,{children:"selectionManager"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L23",rel:"nofollow",children:e.jsx(s.code,{children:"SelectState"})})," extends ",e.jsx(s.code,{children:"ListState<T>"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectState"})," provides ",e.jsx(s.code,{children:"selectedItems: Node<T>[]"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L58",rel:"nofollow",children:e.jsx(s.code,{children:"SelectState.selectedItems"})})," is ",e.jsx(s.code,{children:"readonly selectedItems: Node<T>[]"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectState.selectedKey"})," exists but is deprecated. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L28",rel:"nofollow",children:e.jsx(s.code,{children:"SelectState.selectedKey"})})," is marked ",e.jsx(s.code,{children:"@deprecated"}),". ",e.jsx(s.code,{children:"SelectState.value"})," is the current API. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L43",rel:"nofollow",children:e.jsx(s.code,{children:"SelectState.value"})})," is ",e.jsx(s.code,{children:"readonly value: ValueType<M>"}),"."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Props from React Aria"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"value"}),"/",e.jsx(s.code,{children:"defaultValue"})," — Type: ",e.jsx(s.code,{children:"Key | null"})," (single) or ",e.jsx(s.code,{children:"Key[]"})," (multiple). Selection state control. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/inputs.d.ts#L65",rel:"nofollow",children:e.jsx(s.code,{children:"ValueBase"})})," provides these props."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"onChange"})," — Handler called when selection/value changes. Type: ",e.jsx(s.code,{children:"(value: Key | null) => void"})," (single) or ",e.jsx(s.code,{children:"(value: Key[]) => void"})," (multiple). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L38",rel:"nofollow",children:e.jsx(s.code,{children:"SelectProps<T, M>"})})," extends ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/inputs.d.ts#L65",rel:"nofollow",children:e.jsx(s.code,{children:"ValueBase<ValueType<M>>"})})," from ",e.jsx(s.code,{children:"@react-types/shared"}),", which defines ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/inputs.d.ts#L71",rel:"nofollow",children:e.jsx(s.code,{children:"onChange?: (value: C) => void"})}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"selectionMode"})," — Type: ",e.jsx(s.code,{children:"'single' | 'multiple'"}),", default ",e.jsx(s.code,{children:"'single'"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L43",rel:"nofollow",children:e.jsx(s.code,{children:"SelectProps.selectionMode"})})," with default ",e.jsx(s.code,{children:"'single'"})," from ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L82",rel:"nofollow",children:e.jsx(s.code,{children:"useSelectState"})}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"isOpen"})," / ",e.jsx(s.code,{children:"defaultOpen"})," / ",e.jsx(s.code,{children:"onOpenChange"})," — Overlay trigger-style props controlling the open state of the menu. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts",rel:"nofollow",children:e.jsx(s.code,{children:"SelectProps"})})," in ",e.jsx(s.code,{children:"@react-types/select"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"name"})," — For form submission. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L77",rel:"nofollow",children:e.jsx(s.code,{children:"AriaSelectProps.name"})}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"label"})," — From ",e.jsx(s.code,{children:"LabelableProps"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L69",rel:"nofollow",children:e.jsx(s.code,{children:"AriaSelectProps"})})," extends ",e.jsx(s.code,{children:"LabelableProps"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"isDisabled"}),", ",e.jsx(s.code,{children:"isRequired"}),", ",e.jsx(s.code,{children:"isInvalid"})," — From React Aria types. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L38",rel:"nofollow",children:e.jsx(s.code,{children:"SelectProps"})})," includes these from ",e.jsx(s.code,{children:"InputBase"})," and ",e.jsx(s.code,{children:"Validation"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"placement"}),", ",e.jsx(s.code,{children:"offset"}),", ",e.jsx(s.code,{children:"crossOffset"}),", ",e.jsx(s.code,{children:"shouldFlip"}),", ",e.jsx(s.code,{children:"containerPadding"})," — Positioning props for ",e.jsx(s.code,{children:"useOverlayPosition"}),".",`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"React Aria defaults"}),": ",e.jsx(s.code,{children:"placement='bottom'"}),", ",e.jsx(s.code,{children:"offset=0"}),", ",e.jsx(s.code,{children:"crossOffset=0"}),", ",e.jsx(s.code,{children:"shouldFlip=true"}),", ",e.jsx(s.code,{children:"containerPadding=12"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayPosition.ts#L100-104",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayPosition.ts"})}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Bento Select will override"}),": ",e.jsx(s.code,{children:"placement='bottom start'"})," (aligns popover to start edge like React Spectrum's Picker)."]}),`
`]}),`
`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"renderEmptyState"})," — Render function or element to display when collection is empty. Receives ",e.jsx(s.code,{children:"SelectRenderProps"})," with ",e.jsx(s.code,{children:"{ isOpen, isDisabled, isInvalid, isRequired, selectedItem, selectedItems, isEmpty }"}),". Extracted before ",e.jsx(s.code,{children:"useProps"})," to prevent render prop corruption (Bento invariant #16)."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"required"})," — Native HTML attribute available via ",e.jsx(s.code,{children:"React.ComponentProps<'div'>"}),". Select combines ",e.jsx(s.code,{children:"required"})," and ",e.jsx(s.code,{children:"isRequired"})," when computing ARIA decoration (",e.jsx(s.code,{children:"aria-required"}),"), but React Aria's ",e.jsx(s.code,{children:"HiddenSelect"})," and validation behavior are driven by ",e.jsx(s.code,{children:"isRequired"})," + ",e.jsx(s.code,{children:"validationBehavior"}),", not ",e.jsx(s.code,{children:"required"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"aria-labelledby"})," — ARIA attribute for custom label associations, inherited from ",e.jsx(s.code,{children:"React.ComponentProps<'div'>"}),". Can override React Aria's auto-generated label associations when explicit control is needed."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Slot structure"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"trigger"})," — Receives ",e.jsx(s.code,{children:"triggerProps"})," (type: ",e.jsx(s.code,{children:"AriaButtonProps"}),"), ",e.jsx(s.code,{children:"focusProps"}),", ",e.jsx(s.code,{children:"hoverProps"}),", ",e.jsx(s.code,{children:'role="combobox"'}),", ",e.jsx(s.code,{children:'aria-haspopup="listbox"'}),", ",e.jsx(s.code,{children:"aria-expanded"}),", ",e.jsx(s.code,{children:"aria-controls"}),", ",e.jsx(s.code,{children:"aria-required"}),", ",e.jsx(s.code,{children:"aria-invalid"}),", ",e.jsx(s.code,{children:"aria-disabled"}),", ",e.jsx(s.code,{children:"data-open"}),", ",e.jsx(s.code,{children:"ref"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L40",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns ",e.jsx(s.code,{children:"triggerProps: AriaButtonProps"}),". React Aria provides ",e.jsx(s.code,{children:"aria-haspopup"}),", ",e.jsx(s.code,{children:"aria-expanded"})," (boolean), ",e.jsx(s.code,{children:"aria-controls"})," via ",e.jsx(s.code,{children:"useOverlayTrigger"}),". Bento adds ",e.jsx(s.code,{children:'role="combobox"'}),", converts ",e.jsx(s.code,{children:"aria-expanded"})," to string, and adds ",e.jsx(s.code,{children:"aria-required"}),", ",e.jsx(s.code,{children:"aria-invalid"}),", ",e.jsx(s.code,{children:"aria-disabled"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"label"})," — Receives ",e.jsx(s.code,{children:"labelProps"})," (type: ",e.jsx(s.code,{children:"DOMAttributes"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L37",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns ",e.jsx(s.code,{children:"labelProps: DOMAttributes"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"value"})," / ",e.jsx(s.code,{children:"trigger.value"})," — Receives ",e.jsx(s.code,{children:"valueProps"})," (type: ",e.jsx(s.code,{children:"DOMAttributes"})," with ",e.jsx(s.code,{children:"id"}),"), ",e.jsx(s.code,{children:"selectedItem"})," (Node<T> | null), ",e.jsx(s.code,{children:"selectedItems"})," (Node<T>[]). Slot alias ",e.jsx(s.code,{children:"trigger.value"})," allows nesting value display inside trigger. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L215",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns ",e.jsx(s.code,{children:"valueProps: { id: valueId }"}),". React Aria's ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L58",rel:"nofollow",children:e.jsx(s.code,{children:"SelectState.selectedItems"})})," provides the Node array. For dynamic collections, ",e.jsx(s.code,{children:"Node.value"})," holds the original item object. Consumers handle placeholder rendering using the provided selection data."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"popover"})," — Receives ",e.jsx(s.code,{children:"overlayProps"}),", ",e.jsx(s.code,{children:"positionProps"}),", ",e.jsx(s.code,{children:"isOpen"}),", ",e.jsx(s.code,{children:"onClose"}),", ",e.jsx(s.code,{children:"ref"}),", ",e.jsx(s.code,{children:"data-open"}),". Consumer handles portal rendering and styling."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"listbox"})," — Receives ",e.jsx(s.code,{children:"menuProps"})," (type: ",e.jsx(s.code,{children:"AriaListBoxOptions<T>"}),"), ",e.jsx(s.code,{children:"ref"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L46",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns ",e.jsx(s.code,{children:"menuProps: AriaListBoxOptions<T>"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"description"})," — Receives ",e.jsx(s.code,{children:"descriptionProps"})," (type: ",e.jsx(s.code,{children:"DOMAttributes"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L49",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns ",e.jsx(s.code,{children:"descriptionProps: DOMAttributes"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"error"})," — Receives ",e.jsx(s.code,{children:"errorMessageProps"})," (type: ",e.jsx(s.code,{children:"DOMAttributes"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L52",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns ",e.jsx(s.code,{children:"errorMessageProps: DOMAttributes"}),"."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Rendered DOM structure"}),": Consumer-controlled via slots. Select coordinator only distributes props via context."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Controlled vs Uncontrolled"}),": Supports both via ",e.jsx(s.code,{children:"value"})," / ",e.jsx(s.code,{children:"defaultValue"})," (selection) and ",e.jsx(s.code,{children:"isOpen"})," / ",e.jsx(s.code,{children:"defaultOpen"})," (menu open state). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L38",rel:"nofollow",children:e.jsx(s.code,{children:"SelectProps"})})," extends ",e.jsx(s.code,{children:"ValueBase<ValueType<M>>"})," and includes explicit open-state props."]}),`
`,e.jsx(s.h2,{id:"typescript-considerations",children:"TypeScript Considerations"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Type Casts and Erasure"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"Select"})," uses ",e.jsx(s.code,{children:"CollectionBuilder"})," which requires a render callback, necessitating split into ",e.jsx(s.code,{children:"Select"})," and ",e.jsx(s.code,{children:"SelectInner"})," components"]}),`
`,e.jsxs(s.li,{children:["Generic type ",e.jsx(s.code,{children:"T"})," is intentionally erased when passing to ",e.jsx(s.code,{children:"SelectInner"})," - the inner component only needs keys and nodes, not specific item types"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"ListStateContext.Provider"})," requires type cast from ",e.jsx(s.code,{children:"SelectState<object, SelectionMode>"})," to ",e.jsx(s.code,{children:"ListState<unknown>"})," - this is safe because ",e.jsx(s.code,{children:"SelectState"})," extends ",e.jsx(s.code,{children:"ListState"})," (Bento invariants #42, #43)"]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Ref Type Constraints"}),":"]}),`
`,e.jsx(s.p,{children:"Select's implementation uses specific ref types to ensure type compatibility with slotted primitives:"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Slot"}),e.jsx(s.th,{children:"Ref Type"}),e.jsx(s.th,{children:"Reason"}),e.jsx(s.th,{children:"Could Be Relaxed?"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"trigger"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"HTMLButtonElement"})}),e.jsx(s.td,{children:"Button primitive expects this specific type"}),e.jsx(s.td,{children:"❌ No - constrained by Button's forwardRef type"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"popover"})}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"HTMLDivElement"})," internal, ",e.jsx(s.code,{children:"HTMLElement"})," in public slot props"]}),e.jsxs(s.td,{children:["Internal implementation detail; React Aria only requires ",e.jsx(s.code,{children:"Element"})]}),e.jsx(s.td,{children:"🔶 Internally could be generalized further if needed"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"listbox"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"HTMLDivElement"})}),e.jsxs(s.td,{children:["ListBox primitive renders ",e.jsx(s.code,{children:'<div role="listbox">'})]}),e.jsx(s.td,{children:"❌ No - constrained by ListBox implementation"})]})]})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note"}),": The internal ",e.jsx(s.code,{children:"popoverRef"})," uses ",e.jsx(s.code,{children:"HTMLDivElement"})," for now, but the public ",e.jsx(s.code,{children:"SelectPopoverSlotProps.ref"})," is already ",e.jsx(s.code,{children:"RefObject<HTMLElement>"}),", and React Aria's ",e.jsx(s.code,{children:"useOverlayPosition"})," only requires ",e.jsx(s.code,{children:"RefObject<Element>"}),". The ",e.jsx(s.code,{children:"trigger"})," and ",e.jsx(s.code,{children:"listbox"})," constraints are fundamental - Button expects ",e.jsx(s.code,{children:"HTMLButtonElement"})," and ListBox renders a ",e.jsx(s.code,{children:"div"}),"."]}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"W3C ARIA Combobox Pattern Conformance"}),":"]}),`
`,e.jsxs(s.p,{children:["Select implements the ",e.jsx(s.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/",rel:"nofollow",children:"W3C ARIA combobox (select-only) pattern"})," with the following ARIA attributes:"]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Attribute"}),e.jsx(s.th,{children:"Source"}),e.jsx(s.th,{children:"Notes"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:'role="combobox"'})}),e.jsx(s.td,{children:"Bento Select"}),e.jsxs(s.td,{children:["Added explicitly (line 271). React Aria's ",e.jsx(s.code,{children:"useSelect"})," doesn't provide this."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:'aria-haspopup="listbox"'})}),e.jsx(s.td,{children:"React Aria"}),e.jsxs(s.td,{children:["Provided by ",e.jsx(s.code,{children:"useOverlayTrigger"})," (called by ",e.jsx(s.code,{children:"useMenuTrigger"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayTrigger.ts#L57",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayTrigger.ts:57"})})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"aria-expanded"})}),e.jsx(s.td,{children:"React Aria + Bento"}),e.jsxs(s.td,{children:["React Aria provides as boolean. Bento converts to string (",e.jsx(s.code,{children:'"true"'}),"/",e.jsx(s.code,{children:'"false"'}),") for CSS attribute selector compatibility."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"aria-controls"})}),e.jsx(s.td,{children:"React Aria"}),e.jsxs(s.td,{children:["Provided by ",e.jsx(s.code,{children:"useOverlayTrigger"}),", references listbox ",e.jsx(s.code,{children:"id"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayTrigger.ts#L65",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayTrigger.ts:65"})})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"aria-labelledby"})}),e.jsx(s.td,{children:"React Aria"}),e.jsxs(s.td,{children:["Auto-generated by ",e.jsx(s.code,{children:"useSelect"})," to concatenate label and value IDs. Can be overridden via prop."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"aria-required"})}),e.jsx(s.td,{children:"Bento Select"}),e.jsxs(s.td,{children:["Added when ",e.jsx(s.code,{children:"isRequired"})," or ",e.jsx(s.code,{children:"required"})," prop is set. React Aria doesn't add this."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"aria-invalid"})}),e.jsx(s.td,{children:"Bento Select"}),e.jsxs(s.td,{children:["Added when ",e.jsx(s.code,{children:"isInvalid"})," prop is set. React Aria doesn't add this."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"aria-disabled"})}),e.jsx(s.td,{children:"Bento Select"}),e.jsxs(s.td,{children:["Added when ",e.jsx(s.code,{children:"isDisabled"})," prop is set. React Aria doesn't add this."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:'role="listbox"'})}),e.jsx(s.td,{children:"React Aria"}),e.jsxs(s.td,{children:["Provided by ",e.jsx(s.code,{children:"useListBox"})," (via ",e.jsx(s.code,{children:"@bento/listbox"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBox.ts#L121",rel:"nofollow",children:e.jsx(s.code,{children:"useListBox.ts:121"})})]})]})]})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"ARIA attributes"}),": Provided by React Aria's ",e.jsx(s.code,{children:"useSelect"})," hook. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," returns props with ARIA attributes via ",e.jsx(s.code,{children:"triggerProps"})," and ",e.jsx(s.code,{children:"menuProps"}),". ",e.jsx(s.code,{children:"useMenuTrigger"})," calls ",e.jsx(s.code,{children:"useOverlayTrigger"}),", which sets ",e.jsx(s.code,{children:"aria-haspopup"}),", ",e.jsx(s.code,{children:"aria-expanded"}),", and ",e.jsx(s.code,{children:"aria-controls"})," on the trigger. Sources: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/menu/src/useMenuTrigger.ts#L55-L56",rel:"nofollow",children:e.jsx(s.code,{children:"useMenuTrigger"})})," calls ",e.jsx(s.code,{children:"useOverlayTrigger"}),", and ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayTrigger.ts#L62-L66",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayTrigger"})})," sets these attributes."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Keyboard interactions"}),": Handled by React Aria hooks and native button semantics:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Arrow keys for navigation in the listbox (via ",e.jsx(s.code,{children:"useListBox"}),"/",e.jsx(s.code,{children:"useSelectableList"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBox.ts#L67",rel:"nofollow",children:e.jsx(s.code,{children:"useListBox"})})," uses ",e.jsx(s.code,{children:"useSelectableList"})," for keyboard navigation."]}),`
`,e.jsxs(s.li,{children:["Typeahead (via ",e.jsx(s.code,{children:"useTypeSelect"}),"). Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L127",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," uses ",e.jsx(s.code,{children:"useTypeSelect"})," (line 127)."]}),`
`,e.jsxs(s.li,{children:["Enter/Space activate the trigger and commit selection via native ",e.jsx(s.code,{children:"<button>"})," semantics composed with React Aria ",e.jsx(s.code,{children:"useButton"}),"/",e.jsx(s.code,{children:"usePress"}),", and Escape closes the overlay via ",e.jsx(s.code,{children:"useOverlay"}),". Sources: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/button/src/useButton.ts#L43-L48",rel:"nofollow",children:e.jsx(s.code,{children:"useButton"})})," provides keyboard/mouse handling for buttons and composes ",e.jsx(s.code,{children:"usePress"})," (lines 92–103), and ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlay.ts#L112-L119",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlay"})})," handles the Escape key in its ",e.jsx(s.code,{children:"onKeyDown"})," handler."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Focus management"}),": ",e.jsx(s.code,{children:"useFocusRing"})," provides focus visibility, and examples wrap the popover contents in React Aria's ",e.jsx(s.code,{children:"FocusScope"})," (",e.jsx(s.code,{children:"contain"}),", ",e.jsx(s.code,{children:"restoreFocus"}),", ",e.jsx(s.code,{children:"autoFocus"}),") so focus stays within the popup while open and returns to the trigger on unmount. Sources: ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/useFocusRing.html",rel:"nofollow",children:e.jsx(s.code,{children:"useFocusRing"})})," exists in React Aria, and ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx#L85-L90",rel:"nofollow",children:e.jsx(s.code,{children:"FocusScope"})})," is documented as managing focus for its descendants, including containing focus, restoring focus on unmount, and auto-focusing children."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Screen reader support"}),": ARIA attributes and relationships provided by React Aria hooks. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L174",rel:"nofollow",children:e.jsx(s.code,{children:"useSelect"})})," sets ",e.jsx(s.code,{children:"aria-labelledby"})," on trigger (lines 179-183). React Aria’s listbox hooks set roles on the popup and options: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBox.ts#L121",rel:"nofollow",children:e.jsx(s.code,{children:"useListBox"})})," sets ",e.jsx(s.code,{children:"role: 'listbox'"})," on the listbox element, and ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useOption.ts#L105",rel:"nofollow",children:e.jsx(s.code,{children:"useOption"})})," sets ",e.jsx(s.code,{children:"role: 'option'"})," and related ARIA attributes on each option."]}),`
`,e.jsx(s.h2,{id:"internationalization-rtl-and-mobile-considerations",children:"Internationalization, RTL, and Mobile Considerations"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"RTL support"}),": ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayPosition.ts#L93",rel:"nofollow",children:e.jsx(s.code,{children:"useOverlayPosition"})})," uses ",e.jsx(s.code,{children:"useLocale"})," for direction (line 93). Source: Hook calls ",e.jsx(s.code,{children:"useLocale()"})," to get ",e.jsx(s.code,{children:"direction"}),"."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Mobile support"}),": ",e.jsx(s.a,{href:"https://react-spectrum.adobe.com/react-aria/usePreventScroll.html",rel:"nofollow",children:e.jsx(s.code,{children:"usePreventScroll"})})," prevents body scrolling when overlay is open (",e.jsx(s.code,{children:"isDisabled: !state.isOpen"}),"). This keeps options in viewport during keyboard navigation. Source: Hook exists in React Aria."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"I18n"}),": React Aria provides internationalization hooks. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/i18n/src/useCollator.ts",rel:"nofollow",children:e.jsx(s.code,{children:"useCollator"})})," is used by ",e.jsx(s.code,{children:"useSelect"})," (line 86) for typeahead matching."]}),`
`,e.jsx(s.h2,{id:"performance",children:"Performance"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"React Aria optimizations"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"HiddenSelect"})," switches from rendering a native ",e.jsx(s.code,{children:"<select>"})," with ",e.jsx(s.code,{children:"<option>"})," elements to rendering hidden ",e.jsx(s.code,{children:"<input>"})," elements when ",e.jsx(s.code,{children:"state.collection.size > 300"}),". Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L151-L183",rel:"nofollow",children:e.jsx(s.code,{children:"HiddenSelect"})})," branches on ",e.jsx(s.code,{children:"state.collection.size <= 300"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"useSelectState"})," and ",e.jsx(s.code,{children:"useListState"})," memoize derived values like ",e.jsx(s.code,{children:"defaultValue"}),", ",e.jsx(s.code,{children:"value"}),", ",e.jsx(s.code,{children:"collection"}),", and ",e.jsx(s.code,{children:"selectionManager"})," using ",e.jsx(s.code,{children:"useMemo"}),". Sources: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L85-L90",rel:"nofollow",children:e.jsx(s.code,{children:"useSelectState"})})," and ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/list/src/useListState.ts#L49-L60",rel:"nofollow",children:e.jsx(s.code,{children:"useListState"})}),"."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Bento Select optimizations"}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Trigger props memoized with ",e.jsx(s.code,{children:"React.useMemo"})," using explicit dependencies to prevent unnecessary re-computation of merged props (",e.jsx(s.code,{children:"triggerProps"}),", ",e.jsx(s.code,{children:"focusProps"}),", ",e.jsx(s.code,{children:"hoverProps"}),", ARIA attributes)."]}),`
`,e.jsx(s.li,{children:"Slots object memoized with explicit dependency tracking (Bento invariant #45). All slot props must be listed in dependency array to prevent stale closures and unnecessary re-renders of slotted children."}),`
`,e.jsxs(s.li,{children:["Props merged using React Aria's ",e.jsx(s.code,{children:"mergeProps"})," to combine ",e.jsx(s.code,{children:"triggerProps"}),", ",e.jsx(s.code,{children:"focusProps"}),", and ",e.jsx(s.code,{children:"hoverProps"})," without duplicate event handlers."]}),`
`,e.jsxs(s.li,{children:["Children prop destructured before passing to React Aria to prevent unnecessary re-renders. React Stately's ",e.jsx(s.code,{children:"useCollection"})," includes ",e.jsx(s.code,{children:"children"})," in its ",e.jsx(s.code,{children:"useMemo"})," dependency array (even with early-return when ",e.jsx(s.code,{children:"collection"})," is provided), causing re-renders on every reference change even though ",e.jsx(s.code,{children:"CollectionBuilder"})," already processed children. Source: ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/useCollection.ts#L32",rel:"nofollow",children:e.jsx(s.code,{children:"useCollection.ts:32"})}),"."]}),`
`]}),`
`,e.jsx(s.h2,{id:"implementation-subtleties--maintainer-notes",children:"Implementation Subtleties & Maintainer Notes"}),`
`,e.jsx(s.p,{children:"This section documents non-obvious implementation decisions that prevent regressions and knowledge loss. These patterns should be preserved unless you understand the full implications of changing them."}),`
`,e.jsx(s.h3,{id:"1-liststatecontext-type-cast",children:"1. ListStateContext Type Cast"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:"<ListStateContext.Provider value={state as ListState<unknown>}>"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": Bento's ",e.jsx(s.code,{children:"ListBox"})," components expect ",e.jsx(s.code,{children:"ListState<unknown>"})," via ",e.jsx(s.code,{children:"ListStateContext"}),", but Select provides ",e.jsx(s.code,{children:"SelectState<object, SelectionMode>"}),". The cast is safe because:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"SelectState"})," extends ",e.jsx(s.code,{children:"ListState<T>"})," (verified in React Aria source)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"object"})," is compatible with ",e.jsx(s.code,{children:"unknown"})," in this contravariant position"]}),`
`,e.jsx(s.li,{children:"ListBox only accesses ListState methods, not Select-specific ones"}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": Type error. ListBox won't receive selection state."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Related"}),": Bento invariants #42, #43 (type cast documentation requirements)"]}),`
`,e.jsx(s.h3,{id:"2-children-destructuring-performance-pattern",children:"2. Children Destructuring Performance Pattern"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:"const { children: _, ...propsWithoutChildren } = processedProps;"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": React Stately's ",e.jsx(s.code,{children:"useCollection"})," hook includes ",e.jsx(s.code,{children:"children"})," in its ",e.jsx(s.code,{children:"useMemo"})," dependency array. Even though ",e.jsx(s.code,{children:"CollectionBuilder"})," already processed children in the parent component and passes the built ",e.jsx(s.code,{children:"collection"}),", the presence of ",e.jsx(s.code,{children:"children"})," triggers re-renders on every reference change."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Evidence"}),": ",e.jsxs(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/useCollection.ts#L26-L32",rel:"nofollow",children:[e.jsx(s.code,{children:"useCollection"})," source"]})," - ",e.jsx(s.code,{children:"children"})," in dependency array at line 32. Even though line 27-29 early-returns when ",e.jsx(s.code,{children:"collection"})," is provided, React's ",e.jsx(s.code,{children:"useMemo"})," still evaluates all dependencies before executing the function."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": Performance degradation - unnecessary re-renders of entire Select tree on every parent re-render."]}),`
`,e.jsx(s.h3,{id:"3-prop-merge-order-onclose-after-spreads",children:"3. Prop Merge Order: onClose After Spreads"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),":"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`popover: {
  ...overlayProps,
  ...positionProps,
  onClose: handleOverlayClose  // After spreads
}
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": Ensures Select's close handler cannot be accidentally overridden by consumer props spread into overlay or position props. Our ",e.jsx(s.code,{children:"onClose"})," must always be the final handler to maintain proper state management."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": Consumer-provided props could override ",e.jsx(s.code,{children:"onClose"}),", breaking popover dismiss behavior."]}),`
`,e.jsx(s.h3,{id:"4-dual-required-attribute-support",children:"4. Dual Required Attribute Support"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:"const isRequired = processedProps.required || processedProps.isRequired;"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": Call sites may use either the native ",e.jsx(s.code,{children:"required"})," attribute or React Aria's ",e.jsx(s.code,{children:"isRequired"})," prop. Select combines them when computing ",e.jsx(s.code,{children:"aria-required"})," so ARIA decoration is correct even if only ",e.jsx(s.code,{children:"required"})," is set."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Behavior"}),": React Aria's ",e.jsx(s.code,{children:"HiddenSelect"})," and validation behavior are driven by ",e.jsx(s.code,{children:"isRequired"})," + ",e.jsx(s.code,{children:"validationBehavior"})," (stored via ",e.jsx(s.code,{children:"selectData"})," inside ",e.jsx(s.code,{children:"useSelect"}),"), not by the native ",e.jsx(s.code,{children:"required"})," attribute. The combined ",e.jsx(s.code,{children:"isRequired"})," here only affects ARIA decoration on the trigger, not the underlying ",e.jsx(s.code,{children:"HiddenSelect"})," validation logic."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": If we stopped considering ",e.jsx(s.code,{children:"required"})," when computing ",e.jsx(s.code,{children:"aria-required"}),", consumers relying on the native attribute alone would lose ARIA-level required semantics on the trigger."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Consider"}),": Should this pattern be standardized across all Bento form primitives?"]}),`
`,e.jsx(s.h3,{id:"5-aria-labelledby-override-pattern",children:"5. aria-labelledby Override Pattern"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),":"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`...(processedProps['aria-labelledby'] && {
  'aria-labelledby': processedProps['aria-labelledby']
})
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": React Aria auto-concatenates label IDs (trigger's value ID + label element ID). This override allows consumers to opt out when they need precise control over label associations (e.g., complex layouts with multiple labels, or integration with external label management)."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": Consumers lose ability to control label associations in complex scenarios."]}),`
`,e.jsx(s.h3,{id:"6-hiddenselect-conditional-rendering",children:"6. HiddenSelect Conditional Rendering"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:"{processedProps.name && <HiddenSelect ... />}"})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": ",e.jsx(s.code,{children:"HiddenSelect"})," only serves form submission and autofill. Without a ",e.jsx(s.code,{children:"name"})," prop, there's no form field to submit, so rendering it wastes DOM nodes and React reconciliation."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": Unnecessary DOM pollution, but no functional breakage."]}),`
`,e.jsx(s.h3,{id:"7-renderemptystate-extraction-before-useprops",children:"7. renderEmptyState Extraction Before useProps"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:"const originalRenderEmptyState = props.renderEmptyState;"})," (before ",e.jsx(s.code,{children:"useProps"}),")"]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": ",e.jsx(s.code,{children:"useProps"})," processes render props as slot render props, executing them with slot prop arguments. User's ",e.jsx(s.code,{children:"renderEmptyState"})," expects ",e.jsx(s.code,{children:"SelectRenderProps"}),", not slot props. Extracting before ",e.jsx(s.code,{children:"useProps"})," prevents corruption."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Related"}),": Bento invariant #16 (render function extraction requirement)"]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if removed"}),": Runtime error - ",e.jsx(s.code,{children:"renderEmptyState"})," receives wrong arguments."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Consider"}),": Could ",e.jsx(s.code,{children:"useProps"})," detect and skip user render functions? Current approach requires manual extraction for every user render prop."]}),`
`,e.jsx(s.h3,{id:"8-focusscope-ownership-resolved",children:"8. FocusScope Ownership (Resolved)"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Status"}),": Consumer responsibility (not an open question)"]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": Consumer popover components are expected to wrap contents in React Aria's ",e.jsx(s.code,{children:"<FocusScope>"})," when they need focus containment and restore behavior."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": Different applications need different focus management:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Modals: Trap focus completely"}),`
`,e.jsx(s.li,{children:"Dropdowns: Allow Tab to escape"}),`
`,e.jsx(s.li,{children:"Inline popovers: May not need focus management"}),`
`]}),`
`,e.jsx(s.p,{children:"Select provides the positioning and state; consumers handle focus policy via their Popover implementation."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if changed"}),": Forcing focus management in Select reduces flexibility for different UX patterns."]}),`
`,e.jsx(s.h3,{id:"9-deliberate-aria-invariant-deviation",children:"9. Deliberate ARIA Invariant Deviation"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Pattern"}),": ",e.jsx(s.code,{children:"Select"})," manually sets certain ARIA attributes on the trigger:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:'role="combobox"'})}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"aria-required"}),", ",e.jsx(s.code,{children:"aria-invalid"}),", ",e.jsx(s.code,{children:"aria-disabled"})]}),`
`,e.jsxs(s.li,{children:["Stringified ",e.jsx(s.code,{children:"aria-expanded"})," (",e.jsx(s.code,{children:'"true"'})," / ",e.jsx(s.code,{children:'"false"'}),")"]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Why"}),": React Aria's ",e.jsx(s.code,{children:"useSelect"})," and ",e.jsx(s.code,{children:"useOverlayTrigger"})," provide most ARIA attributes (",e.jsx(s.code,{children:"aria-haspopup"}),", boolean ",e.jsx(s.code,{children:"aria-expanded"}),", ",e.jsx(s.code,{children:"aria-controls"}),", ",e.jsx(s.code,{children:"aria-labelledby"}),"), but:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["WAI-ARIA combobox (select-only) requires ",e.jsx(s.code,{children:'role="combobox"'})," on the trigger, which ",e.jsx(s.code,{children:"useSelect"})," does not set."]}),`
`,e.jsxs(s.li,{children:["React Aria does not set ",e.jsx(s.code,{children:"aria-required"}),", ",e.jsx(s.code,{children:"aria-invalid"}),", or ",e.jsx(s.code,{children:"aria-disabled"})," on the trigger; Bento adds these to align with other form primitives and to expose state to assistive tech and CSS."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Invariant impact"}),': This is a deliberate, narrow exception to Bento invariant #22 ("ARIA Props from React Aria"). All other ARIA attributes still come from React Aria hooks; manual ARIA is limited to the attributes above and documented here.']}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Risk if changed"}),": Removing these manual attributes would:"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Break strict conformance with the WAI-ARIA combobox select-only pattern (",e.jsx(s.code,{children:'role="combobox"'}),")."]}),`
`,e.jsxs(s.li,{children:["Make ",e.jsx(s.code,{children:"isRequired"})," / ",e.jsx(s.code,{children:"isInvalid"})," / ",e.jsx(s.code,{children:"isDisabled"})," states invisible to assistive tech and CSS on the trigger element."]}),`
`]}),`
`,e.jsx(s.h2,{id:"data-attributes-and-slot-map",children:"Data Attributes and Slot Map"}),`
`,e.jsxs(s.h3,{id:"expected-data--attributes",children:["Expected ",e.jsx(s.code,{children:"data-*"})," Attributes"]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Attribute"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Example Values"}),e.jsx(s.th,{children:"Source"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-open"})}),e.jsx(s.td,{children:"Whether overlay is open"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"state.isOpen"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-disabled"})}),e.jsx(s.td,{children:"Whether select is disabled"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"props.isDisabled"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-focused"})}),e.jsx(s.td,{children:"Whether select is focused"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"useFocusRing().isFocused"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-focus-visible"})}),e.jsx(s.td,{children:"Whether focus ring should be shown"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"useFocusRing().isFocusVisible"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-hovered"})}),e.jsx(s.td,{children:"Whether select is hovered"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"useHover().isHovered"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-invalid"})}),e.jsx(s.td,{children:"Whether select is invalid"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"props.isInvalid"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-required"})}),e.jsx(s.td,{children:"Whether select is required"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"props.isRequired"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"data-empty"})}),e.jsx(s.td,{children:"Whether collection is empty"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:'"true"'})," / undefined (attribute omitted)"]}),e.jsxs(s.td,{children:["From ",e.jsx(s.code,{children:"state.collection.size === 0"})]})]})]})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Boolean conversion"}),": ",e.jsx(s.code,{children:"true"})," booleans convert to ",e.jsx(s.code,{children:'"true"'})," string; ",e.jsx(s.code,{children:"false"})," booleans result in attribute not being added (returns ",e.jsx(s.code,{children:"undefined"}),"). Source: ",e.jsx(s.a,{href:"../../packages/to-attribute-value/src/index.ts#L41",children:e.jsx(s.code,{children:"to-attribute-value/src/index.ts:41"})})," returns ",e.jsx(s.code,{children:"value ? value.toString() : undefined"})," for booleans."]}),`
`,e.jsx(s.h3,{id:"slot-map",children:"Slot Map"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Slot Name"}),e.jsx(s.th,{children:"Description"}),e.jsx(s.th,{children:"Required"}),e.jsx(s.th,{children:"Default Fallback"}),e.jsx(s.th,{children:"Props Received"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"trigger"})}),e.jsx(s.td,{children:"Button that opens/closes the select"}),e.jsx(s.td,{children:"Yes"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:["Merged trigger props from React Aria (",e.jsx(s.code,{children:"triggerProps"})," with ",e.jsx(s.code,{children:"aria-haspopup"}),", ",e.jsx(s.code,{children:"aria-expanded"}),", ",e.jsx(s.code,{children:"aria-controls"}),") and Bento (",e.jsx(s.code,{children:"useFocusRing"}),", ",e.jsx(s.code,{children:"useHover"}),"), plus ",e.jsx(s.code,{children:'role="combobox"'}),", ",e.jsx(s.code,{children:"aria-required"}),", ",e.jsx(s.code,{children:"aria-invalid"}),", ",e.jsx(s.code,{children:"aria-disabled"}),", ",e.jsx(s.code,{children:"data-open"}),", ",e.jsx(s.code,{children:"ref"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"label"})}),e.jsx(s.td,{children:"Accessible label"}),e.jsx(s.td,{children:"No"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"labelProps"})," (DOMAttributes)"]})]}),e.jsxs(s.tr,{children:[e.jsxs(s.td,{children:[e.jsx(s.code,{children:"value"})," / ",e.jsx(s.code,{children:"trigger.value"})]}),e.jsx(s.td,{children:"Displayed selected value"}),e.jsx(s.td,{children:"No"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"valueProps"})," (DOMAttributes with ",e.jsx(s.code,{children:"id"}),"), ",e.jsx(s.code,{children:"selectedItem"})," (Node<T> or null), ",e.jsx(s.code,{children:"selectedItems"})," (Node<T>[]) — for dynamic collections, ",e.jsx(s.code,{children:"selectedItem?.value"})," / ",e.jsx(s.code,{children:"selectedItems[i].value"})," is the backing object. Alias ",e.jsx(s.code,{children:"trigger.value"})," enables nesting value inside trigger."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"popover"})}),e.jsx(s.td,{children:"Overlay container"}),e.jsx(s.td,{children:"Yes"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"overlayProps"}),", ",e.jsx(s.code,{children:"positionProps"}),", ",e.jsx(s.code,{children:"isOpen"}),", ",e.jsx(s.code,{children:"onClose"}),", ",e.jsx(s.code,{children:"ref"}),", ",e.jsx(s.code,{children:"data-open"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"listbox"})}),e.jsx(s.td,{children:"List of options"}),e.jsx(s.td,{children:"Yes"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"menuProps"})," (AriaListBoxOptions), ",e.jsx(s.code,{children:"ref"})]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"description"})}),e.jsx(s.td,{children:"Help text"}),e.jsx(s.td,{children:"No"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"descriptionProps"})," (DOMAttributes)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"error"})}),e.jsx(s.td,{children:"Error message"}),e.jsx(s.td,{children:"No"}),e.jsx(s.td,{children:"No"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"errorMessageProps"})," (DOMAttributes)"]})]})]})]}),`
`,e.jsxs(s.p,{children:["Optional ",e.jsx(s.code,{children:"description"})," and ",e.jsx(s.code,{children:"error"})," slots mirror the form help/error pattern shown in the ",e.jsx(s.code,{children:"ControlGroup"})," example in ",e.jsx(s.a,{href:"../../packages/container/CONCEPTS.mdx#L61-L82",children:e.jsx(s.code,{children:"packages/container/CONCEPTS.mdx"})}),": they provide a place to attach React Aria’s ",e.jsx(s.code,{children:"descriptionProps"})," and ",e.jsx(s.code,{children:"errorMessageProps"})," without hard-coding layout. Consumers who need different placement or ordering for help text and errors can render those elements outside ",e.jsx(s.code,{children:"Select"})," instead of using these slots."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note"}),": Slotted children must use ",e.jsx(s.code,{children:"withSlots"})," + ",e.jsx(s.code,{children:"useProps"})," to receive event handlers from context. Source: ",e.jsx(s.a,{href:"../../packages/use-props/src/index.ts#L32",children:e.jsx(s.code,{children:"isEventListener"})})," matches ",e.jsx(s.code,{children:"/^on[A-Z]/"}),", ",e.jsx(s.a,{href:"../../packages/slots/src/slots.tsx#L51",children:e.jsx(s.code,{children:"withSlots"})})," wraps components to receive slot props via context."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Popover Implementation Requirements"}),`:
Consumers must implement popover components that handle:`]}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Portal rendering"}),": Render outside parent DOM hierarchy to escape overflow/z-index constraints"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Positioning styles"}),": Spread the ",e.jsx(s.code,{children:"popover"})," slot props (which include ",e.jsx(s.code,{children:"style"})," from ",e.jsx(s.code,{children:"useOverlayPosition"}),") onto the popover element so it is correctly positioned relative to the trigger."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Display toggling"}),": Show/hide based on ",e.jsx(s.code,{children:"isOpen"})," prop or ",e.jsx(s.code,{children:"data-open"})," attribute"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Focus management"}),": Typically wrap contents in React Aria's ",e.jsx(s.code,{children:"FocusScope"})," with ",e.jsx(s.code,{children:"contain"}),", ",e.jsx(s.code,{children:"restoreFocus"}),", ",e.jsx(s.code,{children:"autoFocus"})]}),`
`]}),`
`,e.jsxs(s.p,{children:["Select provides positioning via ",e.jsx(s.code,{children:"useOverlayPosition"})," but does not render portals or apply styles automatically."]}),`
`,e.jsx(s.h2,{id:"open-questions",children:"Open Questions"}),`
`,e.jsxs(s.ol,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Dismiss behavior primitive"}),": Should Select provide dismiss affordances via a dedicated primitive (e.g. a future ",e.jsx(s.code,{children:"@bento/dismiss"}),"), or require consumers to add their own buttons/handlers inside the popover? A ",e.jsx(s.code,{children:"Dismiss"})," primitive is described in ",e.jsx(s.a,{href:"./dismiss-primitive.mdx",children:e.jsx(s.code,{children:"docs/pdrs/dismiss-primitive.mdx"})}),", but no ",e.jsx(s.code,{children:"@bento/dismiss"})," package exists yet; integration pattern is unverified."]}),`
`]}),`
`,e.jsx(s.h2,{id:"code-examples",children:"Code Examples"}),`
`,e.jsx(s.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';
import { Select } from '@bento/select';
import { Button } from '@bento/button';
import { ListBox, ListBoxItem } from '@bento/listbox';
import { Popover } from './popover'; // Consumer-provided popover component

// Slottable value component
const ValueDisplay = withSlots('SelectValue', function SelectValue(args: any) {
  const { props } = useProps(args);
  const { selectedItem, ...rest } = props;
  return <span {...rest}>{selectedItem?.textValue || 'Select...'}</span>;
});

<Select value={selectedKey} onChange={setSelectedKey}>
  <Button slot="trigger">
    <ValueDisplay slot="value" />
  </Button>
  <Popover slot="popover">
    <ListBox slot="listbox">
      <ListBoxItem id="apple">Apple</ListBoxItem>
      <ListBoxItem id="orange">Orange</ListBoxItem>
    </ListBox>
  </Popover>
</Select>
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note"}),": Examples assume a ",e.jsx(s.code,{children:"Popover"})," component that handles portal rendering, positioning styles from ",e.jsx(s.code,{children:"positionProps"}),", and display toggling based on ",e.jsx(s.code,{children:"isOpen"}),'. See "Popover Implementation Requirements" above.']}),`
`,e.jsx(s.h3,{id:"multi-select",children:"Multi-select"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

// Slottable value component for multi-select
const MultiValueDisplay = withSlots('MultiSelectValue', function MultiSelectValue(args: any) {
  const { props } = useProps(args);
  const { selectedItems, ...rest } = props;
  return (
    <span {...rest}>
      {selectedItems?.length > 0
        ? selectedItems.map(i => i.textValue).join(', ')
        : 'Select items...'}
    </span>
  );
});

<Select
  selectionMode="multiple"
  value={selectedKeys}
  onChange={setSelectedKeys}
>
  <Button slot="trigger">
    <MultiValueDisplay slot="value" />
  </Button>
  <Popover slot="popover">
    <ListBox slot="listbox">
      <ListBoxItem id="apple">Apple</ListBoxItem>
      <ListBoxItem id="orange">Orange</ListBoxItem>
      <ListBoxItem id="banana">Banana</ListBoxItem>
    </ListBox>
  </Popover>
</Select>
`})}),`
`,e.jsx(s.h3,{id:"with-form-integration",children:"With Form Integration"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

// Slottable value component
const ValueDisplay = withSlots('SelectValue', function SelectValue(args: any) {
  const { props } = useProps(args);
  const { selectedItem, ...rest } = props;
  return <span {...rest}>{selectedItem?.textValue || 'Select a fruit'}</span>;
});

<form>
  <Select
    name="fruit"
    value={selectedKey}
    onChange={setSelectedKey}
  >
    <Button slot="trigger">
      <ValueDisplay slot="value" />
    </Button>
    <Popover slot="popover">
      <ListBox slot="listbox">
        <ListBoxItem id="apple">Apple</ListBoxItem>
        <ListBoxItem id="orange">Orange</ListBoxItem>
      </ListBox>
    </Popover>
  </Select>
  <button type="submit">Submit</button>
</form>
`})}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note"}),": React Aria's ",e.jsx(s.code,{children:"HiddenSelect"})," accepts ",e.jsx(s.code,{children:"name"})," via ",e.jsx(s.a,{href:"https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L22",rel:"nofollow",children:e.jsx(s.code,{children:"AriaHiddenSelectProps"})})," (line 32) and uses it when constructing hidden form fields for form submission (lines 174–212)."]}),`
`,e.jsx(s.h3,{id:"with-empty-state",children:"With Empty State"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { withSlots } from '@bento/slots';
import { useProps } from '@bento/use-props';

// Slottable value component
const ValueDisplay = withSlots('SelectValue', function SelectValue(args: any) {
  const { props } = useProps(args);
  const { selectedItem, ...rest } = props;
  return <span {...rest}>{selectedItem?.textValue || 'Select...'}</span>;
});

<Select
  value={selectedKey}
  onChange={setSelectedKey}
  renderEmptyState={(props) => (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      No options available
    </div>
  )}
>
  <Button slot="trigger">
    <ValueDisplay slot="value" />
  </Button>
  <Popover slot="popover">
    <ListBox slot="listbox">
      {/* No ListBoxItem children - empty state will render */}
    </ListBox>
  </Popover>
</Select>
`})}),`
`,e.jsxs(s.p,{children:[e.jsxs(s.strong,{children:["When to use ",e.jsx(s.code,{children:"renderEmptyState"})]}),":"]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:"renderEmptyState"})," when you need access to selection state (",e.jsx(s.code,{children:"isOpen"}),", ",e.jsx(s.code,{children:"isDisabled"}),", etc.) via ",e.jsx(s.code,{children:"SelectRenderProps"})]}),`
`,e.jsx(s.li,{children:"Use conditional rendering outside Select when you control visibility independently"}),`
`,e.jsxs(s.li,{children:["Empty state replaces all children when collection is empty (",e.jsx(s.code,{children:"state.collection.size === 0"}),")"]}),`
`,e.jsx(s.li,{children:"Does not affect overlay behavior - popover still opens/closes normally"}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note"}),": ",e.jsx(s.code,{children:"renderEmptyState"})," must be extracted before ",e.jsx(s.code,{children:"useProps"})," (Bento invariant #16) to prevent ",e.jsx(s.code,{children:"useProps"})," from executing it as a slot render prop with incorrect arguments."]})]})}function p(r={}){const{wrapper:s}={...n(),...r.components};return s?e.jsx(s,{...r,children:e.jsx(t,{...r})}):t(r)}export{p as default};
