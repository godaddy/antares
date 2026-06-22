import{i as e}from"./preload-helper-CLVkNUVT.js";import{y as t}from"./iframe-CkigS-hY.js";import{S as n,s as r,u as i}from"./blocks-CsGU0cD8.js";import{t as a}from"./mdx-react-shim-CC_KIf4k.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Bento/Architecture/PDRs/Select`}),`
`,(0,c.jsx)(t.h1,{id:`select-primitive-pdr`,children:`Select Primitive PDR`}),`
`,(0,c.jsx)(t.h2,{id:`overview`,children:`Overview`}),`
`,(0,c.jsxs)(t.p,{children:[`PDR describing the `,(0,c.jsx)(t.code,{children:`Select`}),` primitive built on React Aria's `,(0,c.jsx)(t.code,{children:`useSelect`}),` and `,(0,c.jsx)(t.code,{children:`useSelectState`}),` hooks, following the `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/`,rel:`nofollow`,children:`W3C ARIA combobox (select-only) pattern`}),`.`]}),`
`,(0,c.jsx)(t.h3,{id:`unique-attributes`,children:`Unique Attributes`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Reuses ListBox selection patterns`}),`: Uses existing `,(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox.tsx#L107`,children:(0,c.jsx)(t.code,{children:`ListStateContext`})}),` from `,(0,c.jsx)(t.code,{children:`@bento/listbox`}),` to share selection state with `,(0,c.jsx)(t.code,{children:`ListBox`}),` and `,(0,c.jsx)(t.code,{children:`ListBoxItem`}),` components. Source: `,(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox.tsx#L107`,children:(0,c.jsx)(t.code,{children:`ListStateContext`})}),` is exported and consumed by `,(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox-item.tsx#L133`,children:(0,c.jsx)(t.code,{children:`ListBoxItem`})}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Form integration via HiddenSelect`}),`: React Aria provides `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L142`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`HiddenSelect`})}),` which renders a visually hidden native `,(0,c.jsxs)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L152-L172`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`<select>`}),` with `,(0,c.jsx)(t.code,{children:`<option>`}),` elements`]}),` when `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L151`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`state.collection.size <= 300`})}),`, and for larger collections renders one or more hidden inputs (`,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L174-L214`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`type="hidden"`})}),` or `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L216-L264`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`type="text"`})}),` when `,(0,c.jsx)(t.code,{children:`validationBehavior="native"`}),`) wired to the `,(0,c.jsx)(t.code,{children:`name`}),`/`,(0,c.jsx)(t.code,{children:`form`}),` props for native form submission (browser autofill is only supported in the `,(0,c.jsx)(t.code,{children:`<select>`}),` path when `,(0,c.jsx)(t.code,{children:`state.collection.size <= 300`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L142`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`HiddenSelect.tsx`})}),`.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`goals`,children:`Goals`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Provide a single- and multi-select dropdown primitive built on React Aria's `,(0,c.jsx)(t.code,{children:`useSelect`}),` and `,(0,c.jsx)(t.code,{children:`useSelectState`}),` hooks.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Reuse existing Bento primitives (`,(0,c.jsx)(t.code,{children:`ListBox`}),`, `,(0,c.jsx)(t.code,{children:`ListBoxItem`}),`, `,(0,c.jsx)(t.code,{children:`Container`}),`, slots) rather than introducing new option or popover primitives.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Integrate with native HTML forms via React Aria's `,(0,c.jsx)(t.code,{children:`HiddenSelect`}),` using the `,(0,c.jsx)(t.code,{children:`name`}),` prop.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Expose a small public API surface that forwards most props to React Aria `,(0,c.jsx)(t.code,{children:`SelectProps`}),` while using Bento's slot system for composition.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`constraints`,children:`Constraints`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Must not introduce new shared hooks or utilities if existing packages (`,(0,c.jsx)(t.code,{children:`@bento/slots`}),`, `,(0,c.jsx)(t.code,{children:`@bento/use-props`}),`, `,(0,c.jsx)(t.code,{children:`@bento/use-data-attributes`}),`, `,(0,c.jsx)(t.code,{children:`@bento/listbox`}),`) can satisfy the requirements.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Must use `,(0,c.jsx)(t.code,{children:`ListBoxItem`}),` as the only option primitive so selection behavior stays aligned with `,(0,c.jsx)(t.code,{children:`@bento/listbox`}),`.`]}),`
`,(0,c.jsx)(t.li,{children:`Must rely on React Aria and React Stately for selection, overlay, and keyboard behavior rather than reimplementing this logic.`}),`
`,(0,c.jsx)(t.li,{children:`Consumers handle portal rendering for the popover; Select passes overlay-related props to slots and does not depend on a dedicated popover primitive.`}),`
`,(0,c.jsxs)(t.li,{children:[`Must treat other not-yet-implemented primitives (e.g., `,(0,c.jsx)(t.code,{children:`Dismiss`}),`) as optional dependencies, not hard requirements for core `,(0,c.jsx)(t.code,{children:`Select`}),` behavior.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`api`,children:`API`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Components`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Select`}),` — Coordinator component`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Type Safety Exports`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectProps`}),` — Generic props interface for the `,(0,c.jsx)(t.code,{children:`Select`}),` component (`,(0,c.jsx)(t.code,{children:`SelectProps<T, M extends SelectionMode>`}),`).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectionMode`}),` — Type alias for selection modes: `,(0,c.jsx)(t.code,{children:`'single' | 'multiple'`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectSlots`}),` — Type map for all slot prop types. Enables type-safe slot component implementations.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`PropsFromSelectSlot<S>`}),` — Utility type for extracting individual slot prop types without importing each interface.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectRenderProps`}),` — Type for render props passed to `,(0,c.jsx)(t.code,{children:`renderEmptyState`}),` function.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Individual slot prop interfaces: `,(0,c.jsx)(t.code,{children:`SelectTriggerSlotProps`}),`, `,(0,c.jsx)(t.code,{children:`SelectValueSlotProps`}),`, `,(0,c.jsx)(t.code,{children:`SelectPopoverSlotProps`}),`, `,(0,c.jsx)(t.code,{children:`SelectListSlotProps`}),` — Available for direct import when needed (derivable from `,(0,c.jsx)(t.code,{children:`PropsFromSelectSlot`}),`).`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Advanced type & hook exports (optional)`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectState`}),` — React Stately `,(0,c.jsx)(t.code,{children:`SelectState<T, M>`}),` type (re-exported for advanced integrations; not required for normal usage).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Placement`}),` — Popover placement type from React Aria (re-exported for convenience).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useSelectState`}),` — React Stately hook for Select state management (re-exported for advanced control flows).`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Dependencies`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/listbox`}),` — Provides `,(0,c.jsx)(t.code,{children:`ListBox`}),`, `,(0,c.jsx)(t.code,{children:`ListBoxItem`}),`, and `,(0,c.jsx)(t.code,{children:`ListStateContext`}),`. Source: `,(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox.tsx#L107`,children:(0,c.jsx)(t.code,{children:`ListStateContext`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/container`}),` — Provides `,(0,c.jsx)(t.code,{children:`Container`}),` for slot-based composition. Source: `,(0,c.jsx)(t.a,{href:`../../packages/container/src/index.tsx#L84`,children:(0,c.jsx)(t.code,{children:`Container`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/slots`}),` — Provides `,(0,c.jsx)(t.code,{children:`withSlots`}),` for slot system. Source: `,(0,c.jsx)(t.a,{href:`../../packages/slots/src/slots.tsx#L51`,children:(0,c.jsx)(t.code,{children:`withSlots`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/use-props`}),` — Provides `,(0,c.jsx)(t.code,{children:`useProps`}),` for prop merging. Source: `,(0,c.jsx)(t.a,{href:`../../packages/use-props/src/index.ts#L117`,children:(0,c.jsx)(t.code,{children:`useProps`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@bento/use-data-attributes`}),` — Provides `,(0,c.jsx)(t.code,{children:`useDataAttributes`}),` for data attributes. Source: `,(0,c.jsx)(t.a,{href:`../../packages/use-data-attributes/src/index.ts#L25`,children:(0,c.jsx)(t.code,{children:`useDataAttributes`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`react-aria`}),` — Provides `,(0,c.jsx)(t.code,{children:`useSelect`}),`, `,(0,c.jsx)(t.code,{children:`useOverlay`}),`, `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),`, `,(0,c.jsx)(t.code,{children:`usePreventScroll`}),`, `,(0,c.jsx)(t.code,{children:`useFocusRing`}),`, `,(0,c.jsx)(t.code,{children:`useHover`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L74`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`react-stately`}),` — Provides `,(0,c.jsx)(t.code,{children:`useSelectState`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L81`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelectState`})}),` exists.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`@react-aria/collections`}),` — Provides `,(0,c.jsx)(t.code,{children:`CollectionBuilder`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/CollectionBuilder.tsx#L36`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`CollectionBuilder`})}),` exists.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Using ListBoxItem with Select:`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`ListBoxItem`}),` from `,(0,c.jsx)(t.code,{children:`@bento/listbox`}),` is the option primitive for Select. The `,(0,c.jsx)(t.code,{children:`id`}),` and `,(0,c.jsx)(t.code,{children:`textValue`}),` props are optional:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`id`}),` prop`]}),` — Optional. Source: `,(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox-item.tsx#L90`,children:(0,c.jsx)(t.code,{children:`ListBoxItemProps.id`})}),` is `,(0,c.jsx)(t.code,{children:`readonly id?: Key`}),`. If not provided, React Aria auto-generates a unique key. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/Document.ts#L336`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`Document.setProps`})}),` uses `,(0,c.jsx)(t.code,{children:`id ?? \\`}),`react-aria-$`,++this.ownerDocument.nodeId,"``"]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsxs)(t.strong,{children:[(0,c.jsx)(t.code,{children:`textValue`}),` prop`]}),` — Optional. Source: `,(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox-item.tsx#L94`,children:(0,c.jsx)(t.code,{children:`ListBoxItemProps.textValue`})}),` is `,(0,c.jsx)(t.code,{children:`readonly textValue?: string`}),`. If not provided, React Aria auto-derives it from children. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/Document.ts#L350`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`Document.setProps`})}),` uses `,(0,c.jsx)(t.code,{children:`textValue || (typeof props.children === 'string' ? props.children : '') || obj['aria-label'] || ''`})]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`About `,(0,c.jsx)(t.code,{children:`Node<T>.value`})]}),`: React Aria populates `,(0,c.jsx)(t.code,{children:`Node<T>.value`}),` with the original item object when using dynamic collections (`,(0,c.jsx)(t.code,{children:`items`}),` / `,(0,c.jsx)(t.code,{children:`childItems`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/Item.ts#L32-L45`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`Item.getCollectionNode`})}),` yields `,(0,c.jsx)(t.code,{children:`{ type: 'item', value: child }`}),` for each `,(0,c.jsx)(t.code,{children:`childItems`}),` entry. For `,(0,c.jsx)(t.strong,{children:`static JSX children`}),`, `,(0,c.jsx)(t.code,{children:`Node.value`}),` is not meaningful and should not be relied upon.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`// Simple usage - id auto-generated, textValue derived from children
<ListBoxItem>Apple</ListBoxItem>

// Explicit id for selection state - state.value will be "apple"
<ListBoxItem id="apple">Apple</ListBoxItem>

// Complex markup - explicit textValue for typeahead, id for selection
<ListBoxItem id="apple" textValue="Apple">
  <Icon name="apple" />
  <Text>Apple Special</Text>
</ListBoxItem>
`})}),`
`,(0,c.jsx)(t.h3,{id:`working-with-item-data`,children:`Working with item data`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`For dynamic collections`}),`, use `,(0,c.jsx)(t.code,{children:`items`}),` on `,(0,c.jsx)(t.code,{children:`Select`}),`/`,(0,c.jsx)(t.code,{children:`ListBox`}),` and read `,(0,c.jsx)(t.code,{children:`Node.value`}),` from `,(0,c.jsx)(t.code,{children:`selectedItem`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`For static children`}),`, map keys to your own data:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern requirements`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`If you want a `,(0,c.jsx)(t.strong,{children:`component`}),` to receive slot props (like `,(0,c.jsx)(t.code,{children:`selectedItem`}),`, `,(0,c.jsx)(t.code,{children:`selectedItems`}),`) via `,(0,c.jsx)(t.code,{children:`useProps`}),`, it must be wrapped with `,(0,c.jsx)(t.code,{children:`withSlots`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Plain elements like `,(0,c.jsx)(t.code,{children:`<span slot="value" />`}),` do not receive `,(0,c.jsx)(t.code,{children:`selectedItem`}),` themselves via `,(0,c.jsx)(t.code,{children:`useProps`}),`; they only act as slot markers for a slotted component (e.g. `,(0,c.jsx)(t.code,{children:`ValueDisplay`}),`) that actually consumes the props.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`implementation-notes`,children:`Implementation Notes`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Concept`}),(0,c.jsx)(t.th,{children:`Implementation`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L74`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),`, `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L81`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelectState`})}),`, `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useOverlay.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlay`})}),`, `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayPosition`})}),`, `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/usePreventScroll.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`usePreventScroll`})}),`, `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useFocusRing.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useFocusRing`})}),`, `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useHover.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useHover`})})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Overlay Management`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.a,{href:`../../packages/select/src/use-select-overlay.ts`,children:(0,c.jsx)(t.code,{children:`useSelectOverlay`})}),` custom hook encapsulates overlay dismiss behavior, positioning, and scroll prevention`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Slots`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.a,{href:`../../packages/slots/src/slots.tsx#L51`,children:(0,c.jsx)(t.code,{children:`withSlots`})}),`, `,(0,c.jsx)(t.a,{href:`../../packages/container/src/index.tsx#L84`,children:(0,c.jsx)(t.code,{children:`Container`})}),` with `,(0,c.jsx)(t.code,{children:`slots`}),` prop`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Context`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox.tsx#L107`,children:(0,c.jsx)(t.code,{children:`ListStateContext`})}),` for selection state (consumed by `,(0,c.jsx)(t.code,{children:`ListBox`}),`/`,(0,c.jsx)(t.code,{children:`ListBoxItem`}),`)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`CollectionBuilder`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/CollectionBuilder.tsx#L36`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`CollectionBuilder`})}),` builds collection from children`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`data-* Attributes`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.a,{href:`../../packages/use-data-attributes/src/index.ts#L25`,children:(0,c.jsx)(t.code,{children:`useDataAttributes`})}),` exists. Boolean conversion: `,(0,c.jsx)(t.code,{children:`true`}),` → `,(0,c.jsx)(t.code,{children:`"true"`}),` string, `,(0,c.jsx)(t.code,{children:`false`}),` → attribute not added (returns `,(0,c.jsx)(t.code,{children:`undefined`}),`). Source: `,(0,c.jsx)(t.a,{href:`../../packages/to-attribute-value/src/index.ts#L41`,children:(0,c.jsx)(t.code,{children:`to-attribute-value/src/index.ts:41`})}),` returns `,(0,c.jsx)(t.code,{children:`value ? value.toString() : undefined`}),` for booleans.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Event Handler Passing`}),(0,c.jsxs)(t.td,{children:[`Bento slots system passes event handlers (props matching `,(0,c.jsx)(t.code,{children:`/^on[A-Z]/`}),`) via context. Source: `,(0,c.jsx)(t.a,{href:`../../packages/use-props/src/index.ts#L32`,children:(0,c.jsx)(t.code,{children:`isEventListener`})}),` matches `,(0,c.jsx)(t.code,{children:`/^on[A-Z]/`}),`, `,(0,c.jsx)(t.a,{href:`../../packages/slots/src/slots.tsx#L51`,children:(0,c.jsx)(t.code,{children:`withSlots`})}),` wraps components to receive slot props via context.`]})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`internal-structure--reuse-potential`,children:`Internal Structure & Reuse Potential`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Reuses existing patterns`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`../../packages/listbox/src/listbox.tsx#L107`,children:(0,c.jsx)(t.code,{children:`ListStateContext`})}),` pattern from `,(0,c.jsx)(t.code,{children:`@bento/listbox`}),` (similar to `,(0,c.jsx)(t.a,{href:`../../packages/checkbox/src/checkbox-group-state.tsx#L4`,children:(0,c.jsx)(t.code,{children:`CheckboxGroupStateContext`})}),` in `,(0,c.jsx)(t.code,{children:`@bento/checkbox`}),`). Source: Both contexts exist and follow the same pattern.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Bento slots system: `,(0,c.jsx)(t.a,{href:`../../packages/slots/src/slots.tsx#L51`,children:(0,c.jsx)(t.code,{children:`withSlots`})}),`, `,(0,c.jsx)(t.a,{href:`../../packages/container/src/index.tsx#L84`,children:(0,c.jsx)(t.code,{children:`Container`})}),`, `,(0,c.jsx)(t.a,{href:`../../packages/use-props/src/index.ts#L117`,children:(0,c.jsx)(t.code,{children:`useProps`})}),`. Source: All exist.`]}),`
`,(0,c.jsxs)(t.li,{children:[`React Aria hooks: `,(0,c.jsx)(t.code,{children:`useSelect`}),`, `,(0,c.jsx)(t.code,{children:`useSelectState`}),`, `,(0,c.jsx)(t.code,{children:`useOverlay`}),`, `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),`, etc. Source: All exist in React Aria.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`No new reusable utilities proposed`}),`: All functionality provided by existing Bento packages and React Aria hooks.`]}),`
`,(0,c.jsx)(t.h2,{id:`react-aria-or-external-hook-integration`,children:`React Aria or External Hook Integration`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`React Aria hooks used`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L74`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` — Returns `,(0,c.jsx)(t.code,{children:`labelProps`}),`, `,(0,c.jsx)(t.code,{children:`triggerProps`}),`, `,(0,c.jsx)(t.code,{children:`valueProps`}),`, `,(0,c.jsx)(t.code,{children:`menuProps`}),`, `,(0,c.jsx)(t.code,{children:`descriptionProps`}),`, `,(0,c.jsx)(t.code,{children:`errorMessageProps`}),`, `,(0,c.jsx)(t.code,{children:`hiddenSelectProps`}),`. Source: `,(0,c.jsxs)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L35`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`SelectAria`}),` interface`]}),` defines return types.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L81`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelectState`})}),` — Manages selection state, overlay open state, and collection. Source: `,(0,c.jsxs)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L23`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`SelectState`}),` interface`]}),` extends `,(0,c.jsx)(t.code,{children:`ListState<T>`}),` and `,(0,c.jsx)(t.code,{children:`OverlayTriggerState`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useOverlay.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlay`})}),` — Handles overlay dismiss behavior. Source: Hook exists in React Aria.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useOverlayPosition.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayPosition`})}),` — Handles positioning relative to trigger. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayPosition.ts#L100`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayPosition.ts`})}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/usePreventScroll.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`usePreventScroll`})}),` — Prevents body scrolling when overlay is open. Source: Hook exists in React Aria.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useFocusRing.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useFocusRing`})}),` — Manages focus visibility. Source: Hook exists in React Aria.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useHover.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useHover`})}),` — Manages hover state. Source: Hook exists in React Aria.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L142`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`HiddenSelect`})}),` — Component for form integration. Source: Component exists and accepts `,(0,c.jsx)(t.code,{children:`name`}),` prop via `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L22`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`AriaHiddenSelectProps`})}),` (line 32).`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`CollectionBuilder usage`}),`: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/collections/src/CollectionBuilder.tsx#L36`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`CollectionBuilder`})}),` builds a collection from the children passed to it.`]}),`
`,(0,c.jsx)(t.h2,{id:`behaviors`,children:`Behaviors`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`State management`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Uses `,(0,c.jsx)(t.code,{children:`useSelectState`}),` which internally calls `,(0,c.jsx)(t.code,{children:`useListState`}),` from `,(0,c.jsx)(t.code,{children:`@react-stately/list`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L113`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelectState`})}),` calls `,(0,c.jsx)(t.code,{children:`useListState`}),` (line 113).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectState`}),` extends `,(0,c.jsx)(t.code,{children:`ListState<T>`}),` which provides `,(0,c.jsx)(t.code,{children:`collection`}),`, `,(0,c.jsx)(t.code,{children:`disabledKeys`}),`, and `,(0,c.jsx)(t.code,{children:`selectionManager`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L23`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectState`})}),` extends `,(0,c.jsx)(t.code,{children:`ListState<T>`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectState`}),` provides `,(0,c.jsx)(t.code,{children:`selectedItems: Node<T>[]`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L58`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectState.selectedItems`})}),` is `,(0,c.jsx)(t.code,{children:`readonly selectedItems: Node<T>[]`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectState.selectedKey`}),` exists but is deprecated. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L28`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectState.selectedKey`})}),` is marked `,(0,c.jsx)(t.code,{children:`@deprecated`}),`. `,(0,c.jsx)(t.code,{children:`SelectState.value`}),` is the current API. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L43`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectState.value`})}),` is `,(0,c.jsx)(t.code,{children:`readonly value: ValueType<M>`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Props from React Aria`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`value`}),`/`,(0,c.jsx)(t.code,{children:`defaultValue`}),` — Type: `,(0,c.jsx)(t.code,{children:`Key | null`}),` (single) or `,(0,c.jsx)(t.code,{children:`Key[]`}),` (multiple). Selection state control. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/inputs.d.ts#L65`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`ValueBase`})}),` provides these props.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`onChange`}),` — Handler called when selection/value changes. Type: `,(0,c.jsx)(t.code,{children:`(value: Key | null) => void`}),` (single) or `,(0,c.jsx)(t.code,{children:`(value: Key[]) => void`}),` (multiple). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L38`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectProps<T, M>`})}),` extends `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/inputs.d.ts#L65`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`ValueBase<ValueType<M>>`})}),` from `,(0,c.jsx)(t.code,{children:`@react-types/shared`}),`, which defines `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/shared/src/inputs.d.ts#L71`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`onChange?: (value: C) => void`})}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`selectionMode`}),` — Type: `,(0,c.jsx)(t.code,{children:`'single' | 'multiple'`}),`, default `,(0,c.jsx)(t.code,{children:`'single'`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L43`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectProps.selectionMode`})}),` with default `,(0,c.jsx)(t.code,{children:`'single'`}),` from `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L82`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelectState`})}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`isOpen`}),` / `,(0,c.jsx)(t.code,{children:`defaultOpen`}),` / `,(0,c.jsx)(t.code,{children:`onOpenChange`}),` — Overlay trigger-style props controlling the open state of the menu. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectProps`})}),` in `,(0,c.jsx)(t.code,{children:`@react-types/select`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`name`}),` — For form submission. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L77`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`AriaSelectProps.name`})}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`label`}),` — From `,(0,c.jsx)(t.code,{children:`LabelableProps`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L69`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`AriaSelectProps`})}),` extends `,(0,c.jsx)(t.code,{children:`LabelableProps`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`isDisabled`}),`, `,(0,c.jsx)(t.code,{children:`isRequired`}),`, `,(0,c.jsx)(t.code,{children:`isInvalid`}),` — From React Aria types. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L38`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectProps`})}),` includes these from `,(0,c.jsx)(t.code,{children:`InputBase`}),` and `,(0,c.jsx)(t.code,{children:`Validation`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`placement`}),`, `,(0,c.jsx)(t.code,{children:`offset`}),`, `,(0,c.jsx)(t.code,{children:`crossOffset`}),`, `,(0,c.jsx)(t.code,{children:`shouldFlip`}),`, `,(0,c.jsx)(t.code,{children:`containerPadding`}),` — Positioning props for `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),`.`,`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`React Aria defaults`}),`: `,(0,c.jsx)(t.code,{children:`placement='bottom'`}),`, `,(0,c.jsx)(t.code,{children:`offset=0`}),`, `,(0,c.jsx)(t.code,{children:`crossOffset=0`}),`, `,(0,c.jsx)(t.code,{children:`shouldFlip=true`}),`, `,(0,c.jsx)(t.code,{children:`containerPadding=12`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayPosition.ts#L100-104`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayPosition.ts`})}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bento Select will override`}),`: `,(0,c.jsx)(t.code,{children:`placement='bottom start'`}),` (aligns popover to start edge like React Spectrum's Picker).`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`renderEmptyState`}),` — Render function or element to display when collection is empty. Receives `,(0,c.jsx)(t.code,{children:`SelectRenderProps`}),` with `,(0,c.jsx)(t.code,{children:`{ isOpen, isDisabled, isInvalid, isRequired, selectedItem, selectedItems, isEmpty }`}),`. Extracted before `,(0,c.jsx)(t.code,{children:`useProps`}),` to prevent render prop corruption (Bento invariant #16).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`required`}),` — Native HTML attribute available via `,(0,c.jsx)(t.code,{children:`React.ComponentProps<'div'>`}),`. Select combines `,(0,c.jsx)(t.code,{children:`required`}),` and `,(0,c.jsx)(t.code,{children:`isRequired`}),` when computing ARIA decoration (`,(0,c.jsx)(t.code,{children:`aria-required`}),`), but React Aria's `,(0,c.jsx)(t.code,{children:`HiddenSelect`}),` and validation behavior are driven by `,(0,c.jsx)(t.code,{children:`isRequired`}),` + `,(0,c.jsx)(t.code,{children:`validationBehavior`}),`, not `,(0,c.jsx)(t.code,{children:`required`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`aria-labelledby`}),` — ARIA attribute for custom label associations, inherited from `,(0,c.jsx)(t.code,{children:`React.ComponentProps<'div'>`}),`. Can override React Aria's auto-generated label associations when explicit control is needed.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Slot structure`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`trigger`}),` — Receives `,(0,c.jsx)(t.code,{children:`triggerProps`}),` (type: `,(0,c.jsx)(t.code,{children:`AriaButtonProps`}),`), `,(0,c.jsx)(t.code,{children:`focusProps`}),`, `,(0,c.jsx)(t.code,{children:`hoverProps`}),`, `,(0,c.jsx)(t.code,{children:`role="combobox"`}),`, `,(0,c.jsx)(t.code,{children:`aria-haspopup="listbox"`}),`, `,(0,c.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,c.jsx)(t.code,{children:`aria-controls`}),`, `,(0,c.jsx)(t.code,{children:`aria-required`}),`, `,(0,c.jsx)(t.code,{children:`aria-invalid`}),`, `,(0,c.jsx)(t.code,{children:`aria-disabled`}),`, `,(0,c.jsx)(t.code,{children:`data-open`}),`, `,(0,c.jsx)(t.code,{children:`ref`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L40`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns `,(0,c.jsx)(t.code,{children:`triggerProps: AriaButtonProps`}),`. React Aria provides `,(0,c.jsx)(t.code,{children:`aria-haspopup`}),`, `,(0,c.jsx)(t.code,{children:`aria-expanded`}),` (boolean), `,(0,c.jsx)(t.code,{children:`aria-controls`}),` via `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),`. Bento adds `,(0,c.jsx)(t.code,{children:`role="combobox"`}),`, converts `,(0,c.jsx)(t.code,{children:`aria-expanded`}),` to string, and adds `,(0,c.jsx)(t.code,{children:`aria-required`}),`, `,(0,c.jsx)(t.code,{children:`aria-invalid`}),`, `,(0,c.jsx)(t.code,{children:`aria-disabled`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`label`}),` — Receives `,(0,c.jsx)(t.code,{children:`labelProps`}),` (type: `,(0,c.jsx)(t.code,{children:`DOMAttributes`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L37`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns `,(0,c.jsx)(t.code,{children:`labelProps: DOMAttributes`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`value`}),` / `,(0,c.jsx)(t.code,{children:`trigger.value`}),` — Receives `,(0,c.jsx)(t.code,{children:`valueProps`}),` (type: `,(0,c.jsx)(t.code,{children:`DOMAttributes`}),` with `,(0,c.jsx)(t.code,{children:`id`}),`), `,(0,c.jsx)(t.code,{children:`selectedItem`}),` (Node<T> | null), `,(0,c.jsx)(t.code,{children:`selectedItems`}),` (Node<T>[]). Slot alias `,(0,c.jsx)(t.code,{children:`trigger.value`}),` allows nesting value display inside trigger. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L215`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns `,(0,c.jsx)(t.code,{children:`valueProps: { id: valueId }`}),`. React Aria's `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L58`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectState.selectedItems`})}),` provides the Node array. For dynamic collections, `,(0,c.jsx)(t.code,{children:`Node.value`}),` holds the original item object. Consumers handle placeholder rendering using the provided selection data.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`popover`}),` — Receives `,(0,c.jsx)(t.code,{children:`overlayProps`}),`, `,(0,c.jsx)(t.code,{children:`positionProps`}),`, `,(0,c.jsx)(t.code,{children:`isOpen`}),`, `,(0,c.jsx)(t.code,{children:`onClose`}),`, `,(0,c.jsx)(t.code,{children:`ref`}),`, `,(0,c.jsx)(t.code,{children:`data-open`}),`. Consumer handles portal rendering and styling.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`listbox`}),` — Receives `,(0,c.jsx)(t.code,{children:`menuProps`}),` (type: `,(0,c.jsx)(t.code,{children:`AriaListBoxOptions<T>`}),`), `,(0,c.jsx)(t.code,{children:`ref`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L46`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns `,(0,c.jsx)(t.code,{children:`menuProps: AriaListBoxOptions<T>`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`description`}),` — Receives `,(0,c.jsx)(t.code,{children:`descriptionProps`}),` (type: `,(0,c.jsx)(t.code,{children:`DOMAttributes`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L49`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns `,(0,c.jsx)(t.code,{children:`descriptionProps: DOMAttributes`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`error`}),` — Receives `,(0,c.jsx)(t.code,{children:`errorMessageProps`}),` (type: `,(0,c.jsx)(t.code,{children:`DOMAttributes`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L52`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns `,(0,c.jsx)(t.code,{children:`errorMessageProps: DOMAttributes`}),`.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Rendered DOM structure`}),`: Consumer-controlled via slots. Select coordinator only distributes props via context.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Controlled vs Uncontrolled`}),`: Supports both via `,(0,c.jsx)(t.code,{children:`value`}),` / `,(0,c.jsx)(t.code,{children:`defaultValue`}),` (selection) and `,(0,c.jsx)(t.code,{children:`isOpen`}),` / `,(0,c.jsx)(t.code,{children:`defaultOpen`}),` (menu open state). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-types/select/src/index.d.ts#L38`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`SelectProps`})}),` extends `,(0,c.jsx)(t.code,{children:`ValueBase<ValueType<M>>`}),` and includes explicit open-state props.`]}),`
`,(0,c.jsx)(t.h2,{id:`typescript-considerations`,children:`TypeScript Considerations`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Type Casts and Erasure`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Select`}),` uses `,(0,c.jsx)(t.code,{children:`CollectionBuilder`}),` which requires a render callback, necessitating split into `,(0,c.jsx)(t.code,{children:`Select`}),` and `,(0,c.jsx)(t.code,{children:`SelectInner`}),` components`]}),`
`,(0,c.jsxs)(t.li,{children:[`Generic type `,(0,c.jsx)(t.code,{children:`T`}),` is intentionally erased when passing to `,(0,c.jsx)(t.code,{children:`SelectInner`}),` - the inner component only needs keys and nodes, not specific item types`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`ListStateContext.Provider`}),` requires type cast from `,(0,c.jsx)(t.code,{children:`SelectState<object, SelectionMode>`}),` to `,(0,c.jsx)(t.code,{children:`ListState<unknown>`}),` - this is safe because `,(0,c.jsx)(t.code,{children:`SelectState`}),` extends `,(0,c.jsx)(t.code,{children:`ListState`}),` (Bento invariants #42, #43)`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Ref Type Constraints`}),`:`]}),`
`,(0,c.jsx)(t.p,{children:`Select's implementation uses specific ref types to ensure type compatibility with slotted primitives:`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot`}),(0,c.jsx)(t.th,{children:`Ref Type`}),(0,c.jsx)(t.th,{children:`Reason`}),(0,c.jsx)(t.th,{children:`Could Be Relaxed?`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`trigger`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`HTMLButtonElement`})}),(0,c.jsx)(t.td,{children:`Button primitive expects this specific type`}),(0,c.jsx)(t.td,{children:`❌ No - constrained by Button's forwardRef type`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`popover`})}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`HTMLDivElement`}),` internal, `,(0,c.jsx)(t.code,{children:`HTMLElement`}),` in public slot props`]}),(0,c.jsxs)(t.td,{children:[`Internal implementation detail; React Aria only requires `,(0,c.jsx)(t.code,{children:`Element`})]}),(0,c.jsx)(t.td,{children:`🔶 Internally could be generalized further if needed`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`listbox`})}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`HTMLDivElement`})}),(0,c.jsxs)(t.td,{children:[`ListBox primitive renders `,(0,c.jsx)(t.code,{children:`<div role="listbox">`})]}),(0,c.jsx)(t.td,{children:`❌ No - constrained by ListBox implementation`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note`}),`: The internal `,(0,c.jsx)(t.code,{children:`popoverRef`}),` uses `,(0,c.jsx)(t.code,{children:`HTMLDivElement`}),` for now, but the public `,(0,c.jsx)(t.code,{children:`SelectPopoverSlotProps.ref`}),` is already `,(0,c.jsx)(t.code,{children:`RefObject<HTMLElement>`}),`, and React Aria's `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),` only requires `,(0,c.jsx)(t.code,{children:`RefObject<Element>`}),`. The `,(0,c.jsx)(t.code,{children:`trigger`}),` and `,(0,c.jsx)(t.code,{children:`listbox`}),` constraints are fundamental - Button expects `,(0,c.jsx)(t.code,{children:`HTMLButtonElement`}),` and ListBox renders a `,(0,c.jsx)(t.code,{children:`div`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`W3C ARIA Combobox Pattern Conformance`}),`:`]}),`
`,(0,c.jsxs)(t.p,{children:[`Select implements the `,(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/`,rel:`nofollow`,children:`W3C ARIA combobox (select-only) pattern`}),` with the following ARIA attributes:`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Source`}),(0,c.jsx)(t.th,{children:`Notes`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`role="combobox"`})}),(0,c.jsx)(t.td,{children:`Bento Select`}),(0,c.jsxs)(t.td,{children:[`Added explicitly (line 271). React Aria's `,(0,c.jsx)(t.code,{children:`useSelect`}),` doesn't provide this.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-haspopup="listbox"`})}),(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsxs)(t.td,{children:[`Provided by `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),` (called by `,(0,c.jsx)(t.code,{children:`useMenuTrigger`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayTrigger.ts#L57`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayTrigger.ts:57`})})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-expanded`})}),(0,c.jsx)(t.td,{children:`React Aria + Bento`}),(0,c.jsxs)(t.td,{children:[`React Aria provides as boolean. Bento converts to string (`,(0,c.jsx)(t.code,{children:`"true"`}),`/`,(0,c.jsx)(t.code,{children:`"false"`}),`) for CSS attribute selector compatibility.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-controls`})}),(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsxs)(t.td,{children:[`Provided by `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),`, references listbox `,(0,c.jsx)(t.code,{children:`id`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayTrigger.ts#L65`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayTrigger.ts:65`})})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-labelledby`})}),(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsxs)(t.td,{children:[`Auto-generated by `,(0,c.jsx)(t.code,{children:`useSelect`}),` to concatenate label and value IDs. Can be overridden via prop.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-required`})}),(0,c.jsx)(t.td,{children:`Bento Select`}),(0,c.jsxs)(t.td,{children:[`Added when `,(0,c.jsx)(t.code,{children:`isRequired`}),` or `,(0,c.jsx)(t.code,{children:`required`}),` prop is set. React Aria doesn't add this.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-invalid`})}),(0,c.jsx)(t.td,{children:`Bento Select`}),(0,c.jsxs)(t.td,{children:[`Added when `,(0,c.jsx)(t.code,{children:`isInvalid`}),` prop is set. React Aria doesn't add this.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-disabled`})}),(0,c.jsx)(t.td,{children:`Bento Select`}),(0,c.jsxs)(t.td,{children:[`Added when `,(0,c.jsx)(t.code,{children:`isDisabled`}),` prop is set. React Aria doesn't add this.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`role="listbox"`})}),(0,c.jsx)(t.td,{children:`React Aria`}),(0,c.jsxs)(t.td,{children:[`Provided by `,(0,c.jsx)(t.code,{children:`useListBox`}),` (via `,(0,c.jsx)(t.code,{children:`@bento/listbox`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBox.ts#L121`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBox.ts:121`})})]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`ARIA attributes`}),`: Provided by React Aria's `,(0,c.jsx)(t.code,{children:`useSelect`}),` hook. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` returns props with ARIA attributes via `,(0,c.jsx)(t.code,{children:`triggerProps`}),` and `,(0,c.jsx)(t.code,{children:`menuProps`}),`. `,(0,c.jsx)(t.code,{children:`useMenuTrigger`}),` calls `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),`, which sets `,(0,c.jsx)(t.code,{children:`aria-haspopup`}),`, `,(0,c.jsx)(t.code,{children:`aria-expanded`}),`, and `,(0,c.jsx)(t.code,{children:`aria-controls`}),` on the trigger. Sources: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/menu/src/useMenuTrigger.ts#L55-L56`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useMenuTrigger`})}),` calls `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),`, and `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayTrigger.ts#L62-L66`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayTrigger`})}),` sets these attributes.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Keyboard interactions`}),`: Handled by React Aria hooks and native button semantics:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Arrow keys for navigation in the listbox (via `,(0,c.jsx)(t.code,{children:`useListBox`}),`/`,(0,c.jsx)(t.code,{children:`useSelectableList`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBox.ts#L67`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBox`})}),` uses `,(0,c.jsx)(t.code,{children:`useSelectableList`}),` for keyboard navigation.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Typeahead (via `,(0,c.jsx)(t.code,{children:`useTypeSelect`}),`). Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L127`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` uses `,(0,c.jsx)(t.code,{children:`useTypeSelect`}),` (line 127).`]}),`
`,(0,c.jsxs)(t.li,{children:[`Enter/Space activate the trigger and commit selection via native `,(0,c.jsx)(t.code,{children:`<button>`}),` semantics composed with React Aria `,(0,c.jsx)(t.code,{children:`useButton`}),`/`,(0,c.jsx)(t.code,{children:`usePress`}),`, and Escape closes the overlay via `,(0,c.jsx)(t.code,{children:`useOverlay`}),`. Sources: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/button/src/useButton.ts#L43-L48`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useButton`})}),` provides keyboard/mouse handling for buttons and composes `,(0,c.jsx)(t.code,{children:`usePress`}),` (lines 92–103), and `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlay.ts#L112-L119`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlay`})}),` handles the Escape key in its `,(0,c.jsx)(t.code,{children:`onKeyDown`}),` handler.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Focus management`}),`: `,(0,c.jsx)(t.code,{children:`useFocusRing`}),` provides focus visibility, and examples wrap the popover contents in React Aria's `,(0,c.jsx)(t.code,{children:`FocusScope`}),` (`,(0,c.jsx)(t.code,{children:`contain`}),`, `,(0,c.jsx)(t.code,{children:`restoreFocus`}),`, `,(0,c.jsx)(t.code,{children:`autoFocus`}),`) so focus stays within the popup while open and returns to the trigger on unmount. Sources: `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/useFocusRing.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useFocusRing`})}),` exists in React Aria, and `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/focus/src/FocusScope.tsx#L85-L90`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`FocusScope`})}),` is documented as managing focus for its descendants, including containing focus, restoring focus on unmount, and auto-focusing children.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Screen reader support`}),`: ARIA attributes and relationships provided by React Aria hooks. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts#L174`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelect`})}),` sets `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),` on trigger (lines 179-183). React Aria’s listbox hooks set roles on the popup and options: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useListBox.ts#L121`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListBox`})}),` sets `,(0,c.jsx)(t.code,{children:`role: 'listbox'`}),` on the listbox element, and `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/listbox/src/useOption.ts#L105`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOption`})}),` sets `,(0,c.jsx)(t.code,{children:`role: 'option'`}),` and related ARIA attributes on each option.`]}),`
`,(0,c.jsx)(t.h2,{id:`internationalization-rtl-and-mobile-considerations`,children:`Internationalization, RTL, and Mobile Considerations`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`RTL support`}),`: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/useOverlayPosition.ts#L93`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useOverlayPosition`})}),` uses `,(0,c.jsx)(t.code,{children:`useLocale`}),` for direction (line 93). Source: Hook calls `,(0,c.jsx)(t.code,{children:`useLocale()`}),` to get `,(0,c.jsx)(t.code,{children:`direction`}),`.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Mobile support`}),`: `,(0,c.jsx)(t.a,{href:`https://react-spectrum.adobe.com/react-aria/usePreventScroll.html`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`usePreventScroll`})}),` prevents body scrolling when overlay is open (`,(0,c.jsx)(t.code,{children:`isDisabled: !state.isOpen`}),`). This keeps options in viewport during keyboard navigation. Source: Hook exists in React Aria.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`I18n`}),`: React Aria provides internationalization hooks. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/i18n/src/useCollator.ts`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useCollator`})}),` is used by `,(0,c.jsx)(t.code,{children:`useSelect`}),` (line 86) for typeahead matching.`]}),`
`,(0,c.jsx)(t.h2,{id:`performance`,children:`Performance`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`React Aria optimizations`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`HiddenSelect`}),` switches from rendering a native `,(0,c.jsx)(t.code,{children:`<select>`}),` with `,(0,c.jsx)(t.code,{children:`<option>`}),` elements to rendering hidden `,(0,c.jsx)(t.code,{children:`<input>`}),` elements when `,(0,c.jsx)(t.code,{children:`state.collection.size > 300`}),`. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L151-L183`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`HiddenSelect`})}),` branches on `,(0,c.jsx)(t.code,{children:`state.collection.size <= 300`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`useSelectState`}),` and `,(0,c.jsx)(t.code,{children:`useListState`}),` memoize derived values like `,(0,c.jsx)(t.code,{children:`defaultValue`}),`, `,(0,c.jsx)(t.code,{children:`value`}),`, `,(0,c.jsx)(t.code,{children:`collection`}),`, and `,(0,c.jsx)(t.code,{children:`selectionManager`}),` using `,(0,c.jsx)(t.code,{children:`useMemo`}),`. Sources: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/select/src/useSelectState.ts#L85-L90`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useSelectState`})}),` and `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/list/src/useListState.ts#L49-L60`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useListState`})}),`.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Bento Select optimizations`}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Trigger props memoized with `,(0,c.jsx)(t.code,{children:`React.useMemo`}),` using explicit dependencies to prevent unnecessary re-computation of merged props (`,(0,c.jsx)(t.code,{children:`triggerProps`}),`, `,(0,c.jsx)(t.code,{children:`focusProps`}),`, `,(0,c.jsx)(t.code,{children:`hoverProps`}),`, ARIA attributes).`]}),`
`,(0,c.jsx)(t.li,{children:`Slots object memoized with explicit dependency tracking (Bento invariant #45). All slot props must be listed in dependency array to prevent stale closures and unnecessary re-renders of slotted children.`}),`
`,(0,c.jsxs)(t.li,{children:[`Props merged using React Aria's `,(0,c.jsx)(t.code,{children:`mergeProps`}),` to combine `,(0,c.jsx)(t.code,{children:`triggerProps`}),`, `,(0,c.jsx)(t.code,{children:`focusProps`}),`, and `,(0,c.jsx)(t.code,{children:`hoverProps`}),` without duplicate event handlers.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Children prop destructured before passing to React Aria to prevent unnecessary re-renders. React Stately's `,(0,c.jsx)(t.code,{children:`useCollection`}),` includes `,(0,c.jsx)(t.code,{children:`children`}),` in its `,(0,c.jsx)(t.code,{children:`useMemo`}),` dependency array (even with early-return when `,(0,c.jsx)(t.code,{children:`collection`}),` is provided), causing re-renders on every reference change even though `,(0,c.jsx)(t.code,{children:`CollectionBuilder`}),` already processed children. Source: `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/useCollection.ts#L32`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`useCollection.ts:32`})}),`.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`implementation-subtleties--maintainer-notes`,children:`Implementation Subtleties & Maintainer Notes`}),`
`,(0,c.jsx)(t.p,{children:`This section documents non-obvious implementation decisions that prevent regressions and knowledge loss. These patterns should be preserved unless you understand the full implications of changing them.`}),`
`,(0,c.jsx)(t.h3,{id:`1-liststatecontext-type-cast`,children:`1. ListStateContext Type Cast`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: `,(0,c.jsx)(t.code,{children:`<ListStateContext.Provider value={state as ListState<unknown>}>`})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: Bento's `,(0,c.jsx)(t.code,{children:`ListBox`}),` components expect `,(0,c.jsx)(t.code,{children:`ListState<unknown>`}),` via `,(0,c.jsx)(t.code,{children:`ListStateContext`}),`, but Select provides `,(0,c.jsx)(t.code,{children:`SelectState<object, SelectionMode>`}),`. The cast is safe because:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`SelectState`}),` extends `,(0,c.jsx)(t.code,{children:`ListState<T>`}),` (verified in React Aria source)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`object`}),` is compatible with `,(0,c.jsx)(t.code,{children:`unknown`}),` in this contravariant position`]}),`
`,(0,c.jsx)(t.li,{children:`ListBox only accesses ListState methods, not Select-specific ones`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: Type error. ListBox won't receive selection state.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Related`}),`: Bento invariants #42, #43 (type cast documentation requirements)`]}),`
`,(0,c.jsx)(t.h3,{id:`2-children-destructuring-performance-pattern`,children:`2. Children Destructuring Performance Pattern`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: `,(0,c.jsx)(t.code,{children:`const { children: _, ...propsWithoutChildren } = processedProps;`})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: React Stately's `,(0,c.jsx)(t.code,{children:`useCollection`}),` hook includes `,(0,c.jsx)(t.code,{children:`children`}),` in its `,(0,c.jsx)(t.code,{children:`useMemo`}),` dependency array. Even though `,(0,c.jsx)(t.code,{children:`CollectionBuilder`}),` already processed children in the parent component and passes the built `,(0,c.jsx)(t.code,{children:`collection`}),`, the presence of `,(0,c.jsx)(t.code,{children:`children`}),` triggers re-renders on every reference change.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Evidence`}),`: `,(0,c.jsxs)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/useCollection.ts#L26-L32`,rel:`nofollow`,children:[(0,c.jsx)(t.code,{children:`useCollection`}),` source`]}),` - `,(0,c.jsx)(t.code,{children:`children`}),` in dependency array at line 32. Even though line 27-29 early-returns when `,(0,c.jsx)(t.code,{children:`collection`}),` is provided, React's `,(0,c.jsx)(t.code,{children:`useMemo`}),` still evaluates all dependencies before executing the function.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: Performance degradation - unnecessary re-renders of entire Select tree on every parent re-render.`]}),`
`,(0,c.jsx)(t.h3,{id:`3-prop-merge-order-onclose-after-spreads`,children:`3. Prop Merge Order: onClose After Spreads`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`popover: {
  ...overlayProps,
  ...positionProps,
  onClose: handleOverlayClose  // After spreads
}
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: Ensures Select's close handler cannot be accidentally overridden by consumer props spread into overlay or position props. Our `,(0,c.jsx)(t.code,{children:`onClose`}),` must always be the final handler to maintain proper state management.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: Consumer-provided props could override `,(0,c.jsx)(t.code,{children:`onClose`}),`, breaking popover dismiss behavior.`]}),`
`,(0,c.jsx)(t.h3,{id:`4-dual-required-attribute-support`,children:`4. Dual Required Attribute Support`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: `,(0,c.jsx)(t.code,{children:`const isRequired = processedProps.required || processedProps.isRequired;`})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: Call sites may use either the native `,(0,c.jsx)(t.code,{children:`required`}),` attribute or React Aria's `,(0,c.jsx)(t.code,{children:`isRequired`}),` prop. Select combines them when computing `,(0,c.jsx)(t.code,{children:`aria-required`}),` so ARIA decoration is correct even if only `,(0,c.jsx)(t.code,{children:`required`}),` is set.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Behavior`}),`: React Aria's `,(0,c.jsx)(t.code,{children:`HiddenSelect`}),` and validation behavior are driven by `,(0,c.jsx)(t.code,{children:`isRequired`}),` + `,(0,c.jsx)(t.code,{children:`validationBehavior`}),` (stored via `,(0,c.jsx)(t.code,{children:`selectData`}),` inside `,(0,c.jsx)(t.code,{children:`useSelect`}),`), not by the native `,(0,c.jsx)(t.code,{children:`required`}),` attribute. The combined `,(0,c.jsx)(t.code,{children:`isRequired`}),` here only affects ARIA decoration on the trigger, not the underlying `,(0,c.jsx)(t.code,{children:`HiddenSelect`}),` validation logic.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: If we stopped considering `,(0,c.jsx)(t.code,{children:`required`}),` when computing `,(0,c.jsx)(t.code,{children:`aria-required`}),`, consumers relying on the native attribute alone would lose ARIA-level required semantics on the trigger.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Consider`}),`: Should this pattern be standardized across all Bento form primitives?`]}),`
`,(0,c.jsx)(t.h3,{id:`5-aria-labelledby-override-pattern`,children:`5. aria-labelledby Override Pattern`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`...(processedProps['aria-labelledby'] && {
  'aria-labelledby': processedProps['aria-labelledby']
})
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: React Aria auto-concatenates label IDs (trigger's value ID + label element ID). This override allows consumers to opt out when they need precise control over label associations (e.g., complex layouts with multiple labels, or integration with external label management).`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: Consumers lose ability to control label associations in complex scenarios.`]}),`
`,(0,c.jsx)(t.h3,{id:`6-hiddenselect-conditional-rendering`,children:`6. HiddenSelect Conditional Rendering`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: `,(0,c.jsx)(t.code,{children:`{processedProps.name && <HiddenSelect ... />}`})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: `,(0,c.jsx)(t.code,{children:`HiddenSelect`}),` only serves form submission and autofill. Without a `,(0,c.jsx)(t.code,{children:`name`}),` prop, there's no form field to submit, so rendering it wastes DOM nodes and React reconciliation.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: Unnecessary DOM pollution, but no functional breakage.`]}),`
`,(0,c.jsx)(t.h3,{id:`7-renderemptystate-extraction-before-useprops`,children:`7. renderEmptyState Extraction Before useProps`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: `,(0,c.jsx)(t.code,{children:`const originalRenderEmptyState = props.renderEmptyState;`}),` (before `,(0,c.jsx)(t.code,{children:`useProps`}),`)`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: `,(0,c.jsx)(t.code,{children:`useProps`}),` processes render props as slot render props, executing them with slot prop arguments. User's `,(0,c.jsx)(t.code,{children:`renderEmptyState`}),` expects `,(0,c.jsx)(t.code,{children:`SelectRenderProps`}),`, not slot props. Extracting before `,(0,c.jsx)(t.code,{children:`useProps`}),` prevents corruption.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Related`}),`: Bento invariant #16 (render function extraction requirement)`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if removed`}),`: Runtime error - `,(0,c.jsx)(t.code,{children:`renderEmptyState`}),` receives wrong arguments.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Consider`}),`: Could `,(0,c.jsx)(t.code,{children:`useProps`}),` detect and skip user render functions? Current approach requires manual extraction for every user render prop.`]}),`
`,(0,c.jsx)(t.h3,{id:`8-focusscope-ownership-resolved`,children:`8. FocusScope Ownership (Resolved)`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Status`}),`: Consumer responsibility (not an open question)`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: Consumer popover components are expected to wrap contents in React Aria's `,(0,c.jsx)(t.code,{children:`<FocusScope>`}),` when they need focus containment and restore behavior.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: Different applications need different focus management:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Modals: Trap focus completely`}),`
`,(0,c.jsx)(t.li,{children:`Dropdowns: Allow Tab to escape`}),`
`,(0,c.jsx)(t.li,{children:`Inline popovers: May not need focus management`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`Select provides the positioning and state; consumers handle focus policy via their Popover implementation.`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if changed`}),`: Forcing focus management in Select reduces flexibility for different UX patterns.`]}),`
`,(0,c.jsx)(t.h3,{id:`9-deliberate-aria-invariant-deviation`,children:`9. Deliberate ARIA Invariant Deviation`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Pattern`}),`: `,(0,c.jsx)(t.code,{children:`Select`}),` manually sets certain ARIA attributes on the trigger:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.code,{children:`role="combobox"`})}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`aria-required`}),`, `,(0,c.jsx)(t.code,{children:`aria-invalid`}),`, `,(0,c.jsx)(t.code,{children:`aria-disabled`})]}),`
`,(0,c.jsxs)(t.li,{children:[`Stringified `,(0,c.jsx)(t.code,{children:`aria-expanded`}),` (`,(0,c.jsx)(t.code,{children:`"true"`}),` / `,(0,c.jsx)(t.code,{children:`"false"`}),`)`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Why`}),`: React Aria's `,(0,c.jsx)(t.code,{children:`useSelect`}),` and `,(0,c.jsx)(t.code,{children:`useOverlayTrigger`}),` provide most ARIA attributes (`,(0,c.jsx)(t.code,{children:`aria-haspopup`}),`, boolean `,(0,c.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,c.jsx)(t.code,{children:`aria-controls`}),`, `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),`), but:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`WAI-ARIA combobox (select-only) requires `,(0,c.jsx)(t.code,{children:`role="combobox"`}),` on the trigger, which `,(0,c.jsx)(t.code,{children:`useSelect`}),` does not set.`]}),`
`,(0,c.jsxs)(t.li,{children:[`React Aria does not set `,(0,c.jsx)(t.code,{children:`aria-required`}),`, `,(0,c.jsx)(t.code,{children:`aria-invalid`}),`, or `,(0,c.jsx)(t.code,{children:`aria-disabled`}),` on the trigger; Bento adds these to align with other form primitives and to expose state to assistive tech and CSS.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Invariant impact`}),`: This is a deliberate, narrow exception to Bento invariant #22 ("ARIA Props from React Aria"). All other ARIA attributes still come from React Aria hooks; manual ARIA is limited to the attributes above and documented here.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Risk if changed`}),`: Removing these manual attributes would:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Break strict conformance with the WAI-ARIA combobox select-only pattern (`,(0,c.jsx)(t.code,{children:`role="combobox"`}),`).`]}),`
`,(0,c.jsxs)(t.li,{children:[`Make `,(0,c.jsx)(t.code,{children:`isRequired`}),` / `,(0,c.jsx)(t.code,{children:`isInvalid`}),` / `,(0,c.jsx)(t.code,{children:`isDisabled`}),` states invisible to assistive tech and CSS on the trigger element.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`data-attributes-and-slot-map`,children:`Data Attributes and Slot Map`}),`
`,(0,c.jsxs)(t.h3,{id:`expected-data--attributes`,children:[`Expected `,(0,c.jsx)(t.code,{children:`data-*`}),` Attributes`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribute`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Example Values`}),(0,c.jsx)(t.th,{children:`Source`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-open`})}),(0,c.jsx)(t.td,{children:`Whether overlay is open`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`state.isOpen`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-disabled`})}),(0,c.jsx)(t.td,{children:`Whether select is disabled`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`props.isDisabled`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focused`})}),(0,c.jsx)(t.td,{children:`Whether select is focused`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`useFocusRing().isFocused`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-focus-visible`})}),(0,c.jsx)(t.td,{children:`Whether focus ring should be shown`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`useFocusRing().isFocusVisible`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-hovered`})}),(0,c.jsx)(t.td,{children:`Whether select is hovered`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`useHover().isHovered`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-invalid`})}),(0,c.jsx)(t.td,{children:`Whether select is invalid`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`props.isInvalid`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-required`})}),(0,c.jsx)(t.td,{children:`Whether select is required`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`props.isRequired`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`data-empty`})}),(0,c.jsx)(t.td,{children:`Whether collection is empty`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`"true"`}),` / undefined (attribute omitted)`]}),(0,c.jsxs)(t.td,{children:[`From `,(0,c.jsx)(t.code,{children:`state.collection.size === 0`})]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Boolean conversion`}),`: `,(0,c.jsx)(t.code,{children:`true`}),` booleans convert to `,(0,c.jsx)(t.code,{children:`"true"`}),` string; `,(0,c.jsx)(t.code,{children:`false`}),` booleans result in attribute not being added (returns `,(0,c.jsx)(t.code,{children:`undefined`}),`). Source: `,(0,c.jsx)(t.a,{href:`../../packages/to-attribute-value/src/index.ts#L41`,children:(0,c.jsx)(t.code,{children:`to-attribute-value/src/index.ts:41`})}),` returns `,(0,c.jsx)(t.code,{children:`value ? value.toString() : undefined`}),` for booleans.`]}),`
`,(0,c.jsx)(t.h3,{id:`slot-map`,children:`Slot Map`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Slot Name`}),(0,c.jsx)(t.th,{children:`Description`}),(0,c.jsx)(t.th,{children:`Required`}),(0,c.jsx)(t.th,{children:`Default Fallback`}),(0,c.jsx)(t.th,{children:`Props Received`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`trigger`})}),(0,c.jsx)(t.td,{children:`Button that opens/closes the select`}),(0,c.jsx)(t.td,{children:`Yes`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[`Merged trigger props from React Aria (`,(0,c.jsx)(t.code,{children:`triggerProps`}),` with `,(0,c.jsx)(t.code,{children:`aria-haspopup`}),`, `,(0,c.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,c.jsx)(t.code,{children:`aria-controls`}),`) and Bento (`,(0,c.jsx)(t.code,{children:`useFocusRing`}),`, `,(0,c.jsx)(t.code,{children:`useHover`}),`), plus `,(0,c.jsx)(t.code,{children:`role="combobox"`}),`, `,(0,c.jsx)(t.code,{children:`aria-required`}),`, `,(0,c.jsx)(t.code,{children:`aria-invalid`}),`, `,(0,c.jsx)(t.code,{children:`aria-disabled`}),`, `,(0,c.jsx)(t.code,{children:`data-open`}),`, `,(0,c.jsx)(t.code,{children:`ref`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`label`})}),(0,c.jsx)(t.td,{children:`Accessible label`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`labelProps`}),` (DOMAttributes)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`value`}),` / `,(0,c.jsx)(t.code,{children:`trigger.value`})]}),(0,c.jsx)(t.td,{children:`Displayed selected value`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`valueProps`}),` (DOMAttributes with `,(0,c.jsx)(t.code,{children:`id`}),`), `,(0,c.jsx)(t.code,{children:`selectedItem`}),` (Node<T> or null), `,(0,c.jsx)(t.code,{children:`selectedItems`}),` (Node<T>[]) — for dynamic collections, `,(0,c.jsx)(t.code,{children:`selectedItem?.value`}),` / `,(0,c.jsx)(t.code,{children:`selectedItems[i].value`}),` is the backing object. Alias `,(0,c.jsx)(t.code,{children:`trigger.value`}),` enables nesting value inside trigger.`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`popover`})}),(0,c.jsx)(t.td,{children:`Overlay container`}),(0,c.jsx)(t.td,{children:`Yes`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`overlayProps`}),`, `,(0,c.jsx)(t.code,{children:`positionProps`}),`, `,(0,c.jsx)(t.code,{children:`isOpen`}),`, `,(0,c.jsx)(t.code,{children:`onClose`}),`, `,(0,c.jsx)(t.code,{children:`ref`}),`, `,(0,c.jsx)(t.code,{children:`data-open`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`listbox`})}),(0,c.jsx)(t.td,{children:`List of options`}),(0,c.jsx)(t.td,{children:`Yes`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`menuProps`}),` (AriaListBoxOptions), `,(0,c.jsx)(t.code,{children:`ref`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`description`})}),(0,c.jsx)(t.td,{children:`Help text`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`descriptionProps`}),` (DOMAttributes)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`error`})}),(0,c.jsx)(t.td,{children:`Error message`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsx)(t.td,{children:`No`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`errorMessageProps`}),` (DOMAttributes)`]})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`Optional `,(0,c.jsx)(t.code,{children:`description`}),` and `,(0,c.jsx)(t.code,{children:`error`}),` slots mirror the form help/error pattern shown in the `,(0,c.jsx)(t.code,{children:`ControlGroup`}),` example in `,(0,c.jsx)(t.a,{href:`../../packages/container/CONCEPTS.mdx#L61-L82`,children:(0,c.jsx)(t.code,{children:`packages/container/CONCEPTS.mdx`})}),`: they provide a place to attach React Aria’s `,(0,c.jsx)(t.code,{children:`descriptionProps`}),` and `,(0,c.jsx)(t.code,{children:`errorMessageProps`}),` without hard-coding layout. Consumers who need different placement or ordering for help text and errors can render those elements outside `,(0,c.jsx)(t.code,{children:`Select`}),` instead of using these slots.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note`}),`: Slotted children must use `,(0,c.jsx)(t.code,{children:`withSlots`}),` + `,(0,c.jsx)(t.code,{children:`useProps`}),` to receive event handlers from context. Source: `,(0,c.jsx)(t.a,{href:`../../packages/use-props/src/index.ts#L32`,children:(0,c.jsx)(t.code,{children:`isEventListener`})}),` matches `,(0,c.jsx)(t.code,{children:`/^on[A-Z]/`}),`, `,(0,c.jsx)(t.a,{href:`../../packages/slots/src/slots.tsx#L51`,children:(0,c.jsx)(t.code,{children:`withSlots`})}),` wraps components to receive slot props via context.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Popover Implementation Requirements`}),`:
Consumers must implement popover components that handle:`]}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Portal rendering`}),`: Render outside parent DOM hierarchy to escape overflow/z-index constraints`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Positioning styles`}),`: Spread the `,(0,c.jsx)(t.code,{children:`popover`}),` slot props (which include `,(0,c.jsx)(t.code,{children:`style`}),` from `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),`) onto the popover element so it is correctly positioned relative to the trigger.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Display toggling`}),`: Show/hide based on `,(0,c.jsx)(t.code,{children:`isOpen`}),` prop or `,(0,c.jsx)(t.code,{children:`data-open`}),` attribute`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Focus management`}),`: Typically wrap contents in React Aria's `,(0,c.jsx)(t.code,{children:`FocusScope`}),` with `,(0,c.jsx)(t.code,{children:`contain`}),`, `,(0,c.jsx)(t.code,{children:`restoreFocus`}),`, `,(0,c.jsx)(t.code,{children:`autoFocus`})]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Select provides positioning via `,(0,c.jsx)(t.code,{children:`useOverlayPosition`}),` but does not render portals or apply styles automatically.`]}),`
`,(0,c.jsx)(t.h2,{id:`open-questions`,children:`Open Questions`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Dismiss behavior primitive`}),`: Should Select provide dismiss affordances via a dedicated primitive (e.g. a future `,(0,c.jsx)(t.code,{children:`@bento/dismiss`}),`), or require consumers to add their own buttons/handlers inside the popover? A `,(0,c.jsx)(t.code,{children:`Dismiss`}),` primitive is described in `,(0,c.jsx)(t.a,{href:`./dismiss-primitive.mdx`,children:(0,c.jsx)(t.code,{children:`docs/pdrs/dismiss-primitive.mdx`})}),`, but no `,(0,c.jsx)(t.code,{children:`@bento/dismiss`}),` package exists yet; integration pattern is unverified.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`code-examples`,children:`Code Examples`}),`
`,(0,c.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note`}),`: Examples assume a `,(0,c.jsx)(t.code,{children:`Popover`}),` component that handles portal rendering, positioning styles from `,(0,c.jsx)(t.code,{children:`positionProps`}),`, and display toggling based on `,(0,c.jsx)(t.code,{children:`isOpen`}),`. See "Popover Implementation Requirements" above.`]}),`
`,(0,c.jsx)(t.h3,{id:`multi-select`,children:`Multi-select`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsx)(t.h3,{id:`with-form-integration`,children:`With Form Integration`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note`}),`: React Aria's `,(0,c.jsx)(t.code,{children:`HiddenSelect`}),` accepts `,(0,c.jsx)(t.code,{children:`name`}),` via `,(0,c.jsx)(t.a,{href:`https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx#L22`,rel:`nofollow`,children:(0,c.jsx)(t.code,{children:`AriaHiddenSelectProps`})}),` (line 32) and uses it when constructing hidden form fields for form submission (lines 174–212).`]}),`
`,(0,c.jsx)(t.h3,{id:`with-empty-state`,children:`With Empty State`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { withSlots } from '@bento/slots';
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
`,(0,c.jsxs)(t.p,{children:[(0,c.jsxs)(t.strong,{children:[`When to use `,(0,c.jsx)(t.code,{children:`renderEmptyState`})]}),`:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Use `,(0,c.jsx)(t.code,{children:`renderEmptyState`}),` when you need access to selection state (`,(0,c.jsx)(t.code,{children:`isOpen`}),`, `,(0,c.jsx)(t.code,{children:`isDisabled`}),`, etc.) via `,(0,c.jsx)(t.code,{children:`SelectRenderProps`})]}),`
`,(0,c.jsx)(t.li,{children:`Use conditional rendering outside Select when you control visibility independently`}),`
`,(0,c.jsxs)(t.li,{children:[`Empty state replaces all children when collection is empty (`,(0,c.jsx)(t.code,{children:`state.collection.size === 0`}),`)`]}),`
`,(0,c.jsx)(t.li,{children:`Does not affect overlay behavior - popover still opens/closes normally`}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Note`}),`: `,(0,c.jsx)(t.code,{children:`renderEmptyState`}),` must be extracted before `,(0,c.jsx)(t.code,{children:`useProps`}),` (Bento invariant #16) to prevent `,(0,c.jsx)(t.code,{children:`useProps`}),` from executing it as a slot render prop with incorrect arguments.`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};